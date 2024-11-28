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

    if (user.role === "service provider") {
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
        user.services.push(newService._id);
        await user.save();
        return messageHandler(res, 200, "Created Suceesfully", newService);
      }
    } else {
      return messageHandler(
        res,
        400,
        "Only service provider can create a service"
      );
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

const getServiceById = async (req, res) => {
  try {
    const { serviceId } = req.query;

    const service = await Service.findById(serviceId).populate({
      path: "serviceProvider",
    });

    if (!service) {
      return messageHandler(res, 400, "Service not found");
    }

    messageHandler(res, 200, "service Found", service);
  } catch (error) {
    console.log(error);
    messageHandler(res, 500, "server Error");
  }
};

const editServiceById = async (req, res) => {
  try {
    const { serviceId } = req.query;
    const userId = req.userId;
    let service = await Service.findById(serviceId);
    const user = await User.findById(userId);

    if (!service) {
      return messageHandler(res, 400, "Service not found");
    }

    if (!user) {
      return messageHandler(res, 400, "user not found");
    }

    if (service.serviceProvider.toString() !== userId) {
      return messageHandler(res, 403, "unauthorized to edit ");
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
      !serviceTitle ||
      !serviceCost ||
      !discount ||
      !timeOfCompletion ||
      !region ||
      !category
    ) {
      return messageHandler(res, 400, "All details of service Required");
    }

    service.serviceTitle = serviceTitle;
    service.serviceCost = serviceCost;
    service.discount = discount;
    service.timeOfCompletion = timeOfCompletion;
    service.region = region;
    service.category = category;

    const updateService = await service.save();

    // await Service.findByIdAndUpdate(serviceId, {
    //   serviceTitle,
    //   serviceCost,
    //   discount,
    //   timeOfCompletion,
    //   region,
    //   category,
    // });

    // const updateService = await Service.findById(serviceId);

    if (updateService) {
      return messageHandler(res, 200, "Updated Succesfully!", updateService);
    }
  } catch (error) {
    console.error(error);
    messageHandler(res, 500, "server Error");
  }
};

const delServicebyId = async (req, res) => {
  try {
    const { serviceId } = req.query;
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return messageHandler(res, 404, "User Not found");
    }

    const service = await Service.findByIdAndDelete(serviceId);

    if (!service) {
      return messageHandler(res, 200, "Service Cant be deleted some Error");
    }

    const findIndex = user.services.findIndex(
      (element) => element._id.toString() === serviceId
    );

    const deleteFromUserServiceArr = user.services.splice(findIndex, 1);

    if (deleteFromUserServiceArr) {
      await user.save();
      messageHandler(res, 200, "Service Deleted Succesfully");
    }
  } catch (error) {
    console.log(error);
    return messageHandler(res, 500, "server Error");
  }
};

module.exports = {
  createService,
  getAllservices,
  getServiceById,
  editServiceById,
  delServicebyId,
};