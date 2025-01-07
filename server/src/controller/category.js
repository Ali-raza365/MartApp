import { createError } from "../middleware/errorHandler.js";
import { Category } from "../models/index.js";

export const getAllCategories = async (req, reply) => {
    try {
        const categories = await Category.find({});
        return reply.send({ categories, success: true });
    } catch (error) {
        return createError(reply, null, null, error);
    }
};