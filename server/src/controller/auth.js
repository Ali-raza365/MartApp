import { config } from "../config/config.js";
import { generateTokens } from "../config/generateToken.js";
import { createError } from "../middleware/errorHandler.js";
import { Customer, DeliveryPartner } from "../models/index.js";
import jwt from 'jsonwebtoken'

export const loginCustomer = async (req, reply) => {

    try {
        let { phone } = req.body;
        let customer = await Customer.findOne({ phone });
        if (!customer) {
            customer = new Customer({ phone, role: "Customer", isActivated: true })
            await customer.save();

        }
        const { accessToken, refreshToken } = await generateTokens(customer);

        return reply.send({ accessToken, refreshToken, message: "Login Successfull", customer, success: true });

    } catch (error) {
        console.log(error)
        return createError(reply, null, null, error);
    }
}

export const loginDeliveryPerson = async (req, reply) => {
    try {
        let { email, password } = req.body;
        let deliveryPartner = await DeliveryPartner.findOne({ email });
        if (!deliveryPartner) {
            return createError(reply, 401, "Invalid credentials");
        }
        const isMatch = deliveryPartner.password === password;
        if (!isMatch) {
            return createError(reply, 401, "Invalid credentials");
        }

        const { accessToken, refreshToken } = await generateTokens(deliveryPartner);

        deliveryPartner = deliveryPartner?.toObject();
        delete deliveryPartner?.password;
        return reply.send({ accessToken, refreshToken, message: "Login Successful", deliveryPartner, success: true });
    } catch (error) {

        return createError(reply, null, null, error);
    }
}

export const refreshToken = async (req, reply) => {

    try {
        const { refresh_token } = req.body;
        if (!refresh_token) { 
            return createError(reply, 401, "Invalid refresh credentials");
        }
        const decoded = await jwt.verify(refresh_token, config.RefreshSecret);
        console.log(decoded)
        if (!decoded) {
            return createError(reply, 401, "Invalid refresh credentials");
        }
        let user = null;
        if (decoded.role === "Customer") {
            user = await Customer.findById(decoded.userId);
        }
        else if (decoded.role === "DeliveryPartner") {
            user = await DeliveryPartner.findById(decoded.userId);
        } else {
            return createError(reply, 401, "Invalid refresh credentials");
        }
        if(!user?.isActivated){
            return createError(reply, 401, "User is not activated");
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateTokens(user);
        return reply.send({ accessToken, refreshToken: newRefreshToken, message: "Token Refreshed", success: true });
    } catch (error) {
        return createError(reply, null, null, error);
    }
}

export const fetchUser = async (req, reply) => {
    try {
        let { userId, role } = req.user;
        if (!userId || !role) {
            return createError(reply, 401, "error fetching user");
        }
        let user = null;
        if (role === "Customer") {
            user = await Customer.findById(userId)?.select('-password');
        }
        else if (role === "DeliveryPartner") {
            user = await DeliveryPartner.findById(userId)?.select('-password');
        } else {
            return createError(reply, 401, "no user found");
        }
        return reply.send({ user, success: true });
    } catch (error) {
        return createError(reply, null, null, error);
    }
}