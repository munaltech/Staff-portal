<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Display all categories
    public function index()
    {
        $categories = Category::all();
        return response()->json([
            "message" => "Categories Fetched Successfully",
            "categories" => $categories
        ], 200);
    }

    // Create a Category
    public function store(Request $request)
    {
        $fields = $request->validate([
            "name" => "required|max:255",
            "description" => "required|max:1000",
        ]);
        $fields["created_by"] = $request->user()->id;
        $category = Category::create($fields);
        return response()->json([
            "message" => "Category Created Successfully",
            "categories" => $category
        ], 200);
    }

    // Display a category
    public function show(Category $category)
    {
        return response()->json([
            "message" => "Category Fetched Successfully",
            "categories" => $category
        ], 200);
    }

    // Update a category
    public function update(Request $request, Category $category)
    {
        $fields = $request->validate([
            "name" => "required|max:255",
            "description" => "required|max:1000",
        ]);

        $category->update($fields);
        return response()->json([
            "message" => "Category Updated Successfully",
            "categories" => $category
        ], 200);
    }

    // Delete a category
    public function destroy(Category $category)
    {
        // Delete the category
        if ($category->delete()) {
            return response()->json([
                'message' => 'Category Deleted Successfully'
            ], 200);
        }

        // In case of failure
        return response()->json([
            'message' => 'Error Deleting Category'
        ], 500);
    }
}
