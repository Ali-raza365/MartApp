import { fetchUser, loginCustomer, loginDeliveryPerson, refreshToken } from "../controller/auth.js"
import { updateUserInfo } from "../controller/tracking/user.js"
import { verifyToken } from "../middleware/auth.js"



const authRoutes = async (fastify, options) => {
    await fastify.post('/customer/login', loginCustomer)
    await fastify.post('/delivery/login', loginDeliveryPerson)
    await fastify.post('/refresh-token', refreshToken)
    await fastify.get('/user',{preHandler:[verifyToken]}, fetchUser)
    await fastify.patch('/user',{preHandler:[verifyToken]}, updateUserInfo)
}

export default authRoutes