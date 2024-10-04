<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $requestingUser = $request->user();
        if ($requestingUser->role !== "admin") {
            return response()->json([
                "message" => "Not Authorized"
            ], 401);
        }


        $fields = $request->validate([
            'full_name' => 'required|max:100',
            'role' => 'required|in:admin,level1,level2',
            'email' => 'required|email|unique:users',
            'phone_number' => 'required|unique:users',
            'username' => 'required|unique:users',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::create($fields);

        $token = $user->createToken($request->username);

        return response()->json([
            'message' => 'User Registered Successfully',
            'user' => $user,
            'token' => $token->plainTextToken,
        ], 200);
    }
    public function login(Request $request)
    {
        $fields = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('username', $request->username)->first();


        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid Login Credentials'], 401);
        }

        $token = $user->createToken($user->username);
        return response()->json([
            'message' => 'User Logged In Successfully',
            'token' => $token->plainTextToken,
            'user' => $user,
        ], 200);
    }
    public function logout(Request $request)
    {
        $token = str_replace('Bearer ', '', $request->header('Authorization'));

        if (!$token) {
            return response()->json(['message' => 'Token not provided'], 401);
        }

        $tokenId = $token[0];

        $request->user()->tokens()->where('id', $tokenId)->delete();

        return response()->json(['message' => 'User Logged Out Successfully'], 200);
    }
    public function update(Request $request, $id)
    {
        $requestingUser = $request->user();

        $user = User::findOrFail($id);

        // Check if the requesting user is an admin or the owner of the account
        if ($requestingUser->role !== "admin" && $requestingUser->id !== $user->id) {
            return response()->json([
                "message" => "Not Authorized"
            ], 401);
        }

        // Validate inputs, but skip 'role' validation if the user is not admin
        $fields = $request->validate([
            'full_name' => 'sometimes|max:100',
            'role' => ($requestingUser->role === "admin") ? 'sometimes|in:admin,level1,level2' : '',  // Only allow role change for admin
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'phone_number' => 'sometimes|unique:users,phone_number,' . $id,
            'username' => 'sometimes|unique:users,username,' . $id,
            'password' => 'sometimes|min:8|confirmed',
        ]);

        // Remove 'role' field if the user is not an admin, so it can't be updated
        if ($requestingUser->role !== "admin") {
            unset($fields['role']);
        }

        // Update the user's data
        $user->update($fields);

        return response()->json([
            'message' => 'User Updated Successfully',
            'user' => $user,
        ], 200);
    }
    public function destroy(Request $request, $id)
    {
        $requestingUser = $request->user();
        $user = User::findOrFail($id);
        if ($requestingUser->role !== 'admin') {
            return response()->json([
                'message' => 'Not Authorized',
            ], 401);
        }
        $user->delete();
        return response()->json([
            'message' => 'User Deleted Successfully'
        ], 200);
    }
    public function getUser(Request $request, $id)
    {
        $requestingUser = $request->user();
        $user = User::findOrFail($id);
        if ($requestingUser->role !== 'admin' && $requestingUser->id !== $user->id) {
            return response()->json([
                'message' => 'Not Authenticated'
            ], 401);
        }

        return response()->json([
            'message' => 'User Fetched Successfully',
            'user' => $user,
        ], 200);
    }
    public function getAllUsers(Request $request)
    {
        $requestingUser = $request->user();
        if ($requestingUser->role !== 'admin') {
            return response()->json([
                'message' => 'Not Authorized'
            ], 401);
        }
        $users = User::all();
        return response()->json([
            'message' => 'All Users Fetched Successfully',
            'users' => $users,
        ], 200);
    }
}
