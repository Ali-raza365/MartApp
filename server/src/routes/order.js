import { confirmOrder, createOrder, getOrderById, getOrders, updateOrder } from "../controller/order.js"
import { verifyToken } from "../middleware/auth.js"
import { createError } from "../middleware/errorHandler.js";


const OrderRoutes = async (fastify, options) => {
    fastify.addHook('preHandler', async (request, reply) => {
        const isAutenticated = await verifyToken(request, reply)
        if (!isAutenticated) return createError(reply, 401, "Unauthorized");
    });
    await fastify.post('/order', createOrder)
    await fastify.get('/order', getOrders)
    await fastify.get('/order/:orderId', getOrderById)
    await fastify.patch('/order/:orderId/status', updateOrder)
    await fastify.post('/order/:orderId/confirm', confirmOrder)

}


export default OrderRoutes