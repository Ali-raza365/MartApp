import { Customer, DeliveryPartner } from "../../models/index.js";


export const updateUserInfo = async (req, reply) => {
    const { userId, role } = req.user;
    const updateData = req.body;

    if (!userId || !role) {
        return createError(reply, 401, "error updating user");
    }
    let user = null;
    let userModel = null;
    user = await Customer.findById(userId) || await DeliveryPartner.findById(userId);
    if (!user) {
        return createError(reply, 401, "no user found");
    }
    userModel = user instanceof Customer ? Customer : DeliveryPartner;


    const updatedUser = await userModel.findByIdAndUpdate(userId, { $set: updateData }, { new: true, noValidator: true });
    if (!updatedUser) {
        return createError(reply, 401, "error updating user");
    }
    return reply.send({ user: updatedUser, success: true });
}