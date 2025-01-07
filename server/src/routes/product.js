import { getAllCategories } from "../controller/category.js"
import { getProductsByCategoryId } from "../controller/product.js"

const ProductRoutes = async (fastify, options) => {
    await fastify.get('/products/:categoryId', getProductsByCategoryId)

}

const CategoryRoutes = async (fastify, options) => {
    await fastify.get('/categories', getAllCategories)

}

export  {ProductRoutes ,CategoryRoutes}