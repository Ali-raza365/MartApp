import { createError } from "../middleware/errorHandler.js";
import { Branch, Customer, DeliveryPartner, Order } from "../models/index.js";



export const createOrder = async (req, reply) => {
    try {
        const { userId, } = req?.user
        const { items, branch, totalPrice } = req.body;

        if (!userId || !items?.length || !totalPrice) {
            return createError(reply, 400, "Missing required fields");
        }
        const customerData = await Customer.findById(userId);
        if (!customerData) {
            return createError(reply, 400, "Customer Data not found");
        }
        const branchData = await Branch.findById(branch)
        if (!branchData) {
            return reply.status(400).send({ error: 'Branch Data not found' });
        }

        console.log({ branchData, customerData });

        const order = new Order({
            items: items?.map(item => ({ id: item?.id, count: item?.count, item: item?.item })),
            branch,
            totalPrice,
            customer: userId,
            pickupLocation: {
                latitude: branchData?.Location?.latitude,
                longitude: branchData?.Location?.longitude,
                address: branchData?.address
            },
            deliveryLocation: {
                latitude: customerData?.liveLocation?.latitude,
                longitude: customerData?.liveLocation?.longitude,
                address: customerData?.address
            }
        })

        let orderData = await order.save();
        return reply.status(201).send({ order: orderData, success: true });
    } catch (error) {
        return createError(reply, null, null, error);

    }



}


export const confirmOrder = async (req, reply) => {
    try {
        const { orderId } = req.params;
        const { userId } = req?.user;
        const { deliveryPersonLocation } = req.body;
        if (!orderId) {
            return createError(reply, 400, "Missing required fields");
        }
        const devliveryPerson = await DeliveryPartner.findById(userId);
        if (!devliveryPerson) {
            return createError(reply, 400, "Delivery Person Data not found");
        }
        let orderData = await Order.findById(orderId);
        if (!orderData) {
            return createError(reply, 400, "Order Data not found");
        }
        if (orderData?.orderStatus !== "available") {
            return createError(reply, 400, "Order is not available");
        }

        orderData.orderStatus = 'confirmed';
        orderData.deliveryPartner = userId
        orderData.deliveryManLocation = {
            latitude: deliveryPersonLocation?.latitude,
            longitude: deliveryPersonLocation?.longitude,
            address: deliveryPersonLocation?.address
        }
        await orderData.save()

        return reply.send({ success: true, orderData })

    } catch (error) {
        return createError(reply, null, null, error);
    }
}


export const updateOrder = async (req, reply) => {
    try {
        const { orderId } = req.params;
        const { userId } = req?.user;
        const { deliveryPersonLocation, status } = req.body;
        if (!orderId) {
            return createError(reply, 400, "Missing required fields");
        }
        console.log(orderId)
        let orderData = await Order.findById(orderId);
        console.log(orderData)
        if (!orderData) {
            return createError(reply, 400, "Order Data not found");
        }
        const devliveryPerson = await DeliveryPartner.findById(userId);
        if (!devliveryPerson) {
            return createError(reply, 400, "Delivery Person Data not found");
        }
      
        if (["cancelled", "delivered"].includes(orderData?.orderStatus)) {
            return createError(reply, 400, "Order is not available");
        }

        if (orderData.deliveryPartner?.toString() !== userId) {
            return createError(reply, 400, "order can not be updated")
        }

        orderData.orderStatus = status
        orderData.deliveryManLocation = {
            latitude: deliveryPersonLocation?.latitude,
            longitude: deliveryPersonLocation?.longitude,
            address: deliveryPersonLocation?.address
        }
        await orderData.save()

        return reply.send({ success: true, orderData })

    } catch (error) {
        console.log(error)
        return createError(reply, null, null, error);
    }
}

export const getOrders = async (req, reply) => {
    try {
        const { status, orderId, customerId, deliveryPartnerId, branchId } = req.query;
        let query = {}
        if (status) {
            query.orderStatus = status
        }
        if (orderId) {
            query._id = orderId
        }
        if (customerId) {
            query.customer = customerId
        }
        if (deliveryPartnerId) {
            query.deliveryPartner = deliveryPartnerId
        }
        if (branchId) {
            query.branch = branchId
        }
        let orderData = await Order.find(query).populate('customer branch items.id deliveryPartner').exec();
        if (!orderData) {
            return createError(reply, 400, "Order Data not found");
        }
        return reply.send({ success: true, orderData });
    } catch (error) {
        return createError(reply, null, null, error);
    }
}

export const getOrderById = async (req, reply) => {
    try {
        const { orderId} = req.params;

        let orderData = await Order.findById(orderId).populate('customer branch items.id deliveryPartner').exec();
        if (!orderData) {
            return createError(reply, 400, "Order Data not found");
        }
        return reply.send({ success: true, orderData });
    } catch (error) {
        return createError(reply, null, null, error);
    }
}