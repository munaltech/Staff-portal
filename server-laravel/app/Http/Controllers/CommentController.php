<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // Fetch all COmments
    public function index()
    {
        $comments = Comment::all();
        return response()->json([
            "message" => "Comments fetched Successfully",
            "comments" => $comments
        ]);
    }

    // Post a comment
    public function store(Request $request)
    {
        $fields = $request->validate([
            "text" => "required|max:255",
            "client_id" => "required",
        ]);
        $fields["user_id"] = $request->user()->id;

        $comment = Comment::create($fields);
        return response()->json([
            "message" => "Comment Posted Successfully",
            "comment" => $comment
        ]);
    }

    // Fetch a comment
    public function show(Comment $comment)
    {
        //
    }

    // Update Comment
    public function update(Request $request, Comment $comment)
    {
        //
    }

    // Delete Comment
    public function destroy(Comment $comment)
    {
        $comment->delete();
    }
}
