const { Order } = require("../models/OrderModel");
const { Service } = require("../models/serviceModel");
const { User } = require("../models/userModel");
const { messageHandler } = require("../utils/messageHandler");

const createOrder = async (req, res) => {
  try {
    const { serviceId } = req.query;
    const userId = req.userId;
    const { paymentMode } = req.body;
    const service = await Service.findById(serviceId);
    const user = await User.findById(userId)


    if (!service || service.isActive === false) {
      return messageHandler(res, 404, "service unavialble ");
    }

    if(!user || user.role !== "customer" ){
      return messageHandler(res, 404, "No user Found | Service providers Cant place order!");
    }

    const orderCost =
      service.serviceCost - (service.discount / 100 ) * service.serviceCost;

    const order = await Order.create({
      service: serviceId,
      orderCost: orderCost,
      paymentMode: paymentMode,
      customer: userId,
    });
     
    const updateUserOrdersArr = user.orders.push(order._id)

    if(updateUserOrdersArr){
      await user.save()
      return messageHandler(res, 200, "Booking Succesfull", order);
    }
   

  } catch (error) {
    console.error(error);
  }
};


const cancelOrder = async(req,res) =>{

try {
  
   const {orderId} = req.query

   const order = await Order.findById(orderId)

   if(!order) {
   return messageHandler (res , 404 , "order not Found")
   }

  const updatedOrder =  order.orderStatus = "cancelled" 

   await order.save()
   messageHandler(res , 200 , "order updated" , updatedOrder)



} catch (error) {
  console.error(error)
  messageHandler(res , 500 , "server Error")
}

}



const getorderById = async(req,res) =>{

  try {
    
     const {orderId} = req.query
  
     const order = await Order.findById(orderId)
  
     if(!order) {
     return messageHandler (res , 404 , "order not Found")
     }
  
     return messageHandler(res , 200 , "order updated" , order)
  
  
  
  } catch (error) {
    console.error(error)
    messageHandler(res , 500 , "server Error")
  }
  
  }



  




module.exports = { createOrder, cancelOrder , getorderById};
