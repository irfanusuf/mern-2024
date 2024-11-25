const { Service } = require("../models/serviceModel");
const { User } = require("../models/userModel");
const { messageHandler } = require("../utils/messageHandler");

const createService = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return messageHandler(res, 404, "User not Found");
    }

    const {
      serviceTitle,
      serviceCost,
      discount,
      timeOfCompletion,
      region,
      category,
    } = req.body;

    if (
      serviceTitle === "" ||
      serviceCost === "" ||
      discount === "" ||
      timeOfCompletion === "" ||
      region === "" ||
      category === ""
    ) {
      return messageHandler(res, 400, "All details of service Required");
    }

    const newService = await Service({
      serviceTitle,
      serviceProvider: user._id,
      serviceCost,
      discount,
      timeOfCompletion,
      region,
      category,
    });

    await newService.save();

    if (newService) {

      user.services.push(newService._id) 
      await user.save()
      return messageHandler(res, 200, "Created Suceesfully", newService);
    }
  } catch (error) {
    console.log(error);
    messageHandler(res, 500, "Server Error");
  }
};

const getAllservices = async (req, res) => {
  try {
    const services = await Service.find();

    if (services) {
      return messageHandler(res, 200, "All services", services);
    }
  } catch (error) {
    console.log(error);
    messageHandler(res, 500, "Server Error");
  }
};

module.exports = { createService, getAllservices };
