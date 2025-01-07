import { createError } from '../middleware/errorHandler.js';
import Product from '../models/product.js';

export const getProductsByCategoryId = async (req, reply) => {
    try {
        const { categoryId } = req.params;
        if (!categoryId) {
            return createError(reply, 400, "Category ID is required");
        }
        const products = await Product.find({ category: categoryId });
       return reply.send({ products, success: true });
    } catch (error) {
        return createError(reply, null, null, error);
    }
};

