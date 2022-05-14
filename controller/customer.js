const { ProjectManager, Company, Customer, Worker } = require("../models");
const joi = require("@hapi/joi");

// <----- start Customer schema
exports.readAllCustomer = async (req, res) => {
  try {
    const customer = await Customer.findAll({
      include: [
        {
          model: Company,
          as: "company",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: ProjectManager,
          as: "projectmanagers",
          attributes: {
            exclude: ["createdAt", "updatedAt", "customerId"],
          },
        },
        {
          model: Worker,
          as: "workers",
          attributes: {
            exclude: ["createdAt", "updatedAt", "customerId"],
          },
        },
      ],
      attributes: {
        exclude: ["companyId", "createdAt", "updatedAt"],
      },
    });
    res.status(200).send({
      statusCode: 200,
      message: "read Customer success",
      result: customer,
    });
  } catch (err) {
    res.status(500).send({ status: 500, message: err.message });
  }
};

exports.readDetailCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findOne({
      where: { id: id },
      include: [
        {
          model: Company,
          as: "company",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: ProjectManager,
          as: "projectmanagers",
          attributes: {
            exclude: ["createdAt", "updatedAt", "customerId"],
          },
        },
        {
          model: Worker,
          as: "workers",
          attributes: {
            exclude: ["createdAt", "updatedAt", "customerId"],
          },
        },
      ],
      attributes: {
        exclude: ["companyId", "createdAt", "updatedAt"],
      },
    });
    res.status(200).send({
      statusCode: 200,
      message: "read detail customer success",
      result: customer,
    });
  } catch (err) {
    res
      .status(500)
      .send({ status: 500, message: "read detail customer failed" });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const { company, isActive, projectManagers, workers } = req.body;

    const { name, organizationNumber, city, address, postalCode } = company;

    if (!company || !projectManagers || !workers) {
      return res.status(500).send({
        statusCode: 500,
        message: "Project Manager or Company or Worker can not be empty",
      });
    }

    const companyApi = await Company.create({
      name,
      organizationNumber,
      city,
      address,
      postalCode,
    });
    const companyId = companyApi.dataValues.id;

    const customer = await Customer.create({
      companyId: companyApi.id,
      isActive,
    });
    const customerId = customer.dataValues.id;

    const projectManagerValues = projectManagers.map((item) => {
      return {
        customerId,
        workerId: item.workerId,
        email: item.email,
      };
    });
    const projectmanagerApi = await ProjectManager.bulkCreate(
      projectManagerValues
    );

    const workerValues = workers.map((item) => {
      return {
        customerId,
        workerId: item.workerId,
        email: item.email,
      };
    });
    const workerApi = await Worker.bulkCreate(workerValues);

    res.status(200).send({
      statusCode: 200,
      message: "create Customer success",
      result: {
        company: companyApi.dataValues,
        isActive: customer.dataValues.isActive,
        projectManagers: projectManagers,
        workers: workers,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const customer = await Customer.update(
      {
        name,
      },
      { where: { id: id } }
    );
    res.status(200).send({
      statusCode: 200,
      message: "change status customer success",
      data: customer,
    });
  } catch (err) {
    res
      .status(500)
      .send({ statusCode: 500, message: "change status customer failed" });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.destroy({
      where: { id: id },
    });
    res.status(200).send({
      statusCode: 200,
      message: "delete customer success",
      data: customer,
    });
  } catch (err) {
    res.status(500).send({ status: 500, message: "delete customer failed" });
  }
};

exports.changeStatusCustomer = async (req, res) => {
  try {
    const { isActive, customerId } = req.body;
    const schema = joi.object({
      isActive: joi.boolean().required(),
      customerId: joi.number().required(),
    });
    const { error } = schema.validate(req.body);

    const customer = await Customer.update(
      {
        isActive,
      },
      { where: { id: customerId }, returning: true }
    );
    res.status(200).send({
      statusCode: 200,
      message: "update customer success",
      data: customer,
    });
  } catch (err) {
    res
      .status(500)
      .send({ statusCode: 200, message: "update customer failed" });
  }
};

exports.createWorker = async (req, res) => {
  try {
    const { isActive, customerId, email, workerId } = req.body;
    const schema = joi.object({
      customerId: joi.number().required(),
      workerId: joi.string().required(),
      email: joi.string().email().required(),
      isActive: joi.boolean().required(),
    });
    const { error } = schema.validate(req.body);

    const worker = await Worker.create(req.body, {
      returning: true,
    });

    res.status(200).send({
      statusCode: 200,
      message: "create worker success",
      result: worker.dataValues,
    });
  } catch (err) {
    res.status(500).send({ statusCode: 200, message: "create worker failed" });
  }
};

exports.deleteWorker = async (req, res) => {
  try {
    const { customerId, workerId } = req.body;
    const schema = joi.object({
      customerId: joi.number().required(),
      workerId: joi.string().required(),
    });
    const { error } = schema.validate(req.body);

    const worker = await Worker.destroy({
      where: { customerId, workerId },
    });

    res.status(200).send({
      statusCode: 200,
      message: "delete worker success",
      result: worker.dataValues,
    });
  } catch (err) {
    res.status(500).send({ statusCode: 500, message: "delete worker failed" });
  }
};

exports.changeStatusWorker = async (req, res) => {
  try {
    const { isActive, customerId, workerId } = req.body;
    const schema = joi.object({
      isActive: joi.boolean().required(),
      customerId: joi.number().required(),
    });
    const { error } = schema.validate(req.body);

    const customer = await Worker.update(
      {
        isActive,
      },
      { where: { customerId, workerId }, returning: true }
    );
    res.status(200).send({
      statusCode: 200,
      message: "change status worker success",
      data: customer,
    });
  } catch (err) {
    res
      .status(500)
      .send({ statusCode: 200, message: "change status worker failed" });
  }
};
