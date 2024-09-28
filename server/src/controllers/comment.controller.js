import Comment from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addComment = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const { id } = req.params;
    const commentCreated = await Comment.create({
        text,
        client_id: id,
        user_id: req.user.id,
    });
    return res
        .status(201)
        .json(
            new ApiResponse(201, commentCreated, "Comment created successfully")
        );
});

const getComments = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comments = await Comment.findAll({ where: { client_id: id } });
    return res
        .status(200)
        .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

export { addComment, getComments };
