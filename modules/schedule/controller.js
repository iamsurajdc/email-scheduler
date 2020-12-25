const scheduleObject = require("./schedule");
const functions = require("../common/function");

const scheduleController = {


  sendInquiry: async (req, res) => {
    try {
      var userId = null;
      const result = await scheduleObject
        .scheduleService()
        .sendInquiry(userId, req.body);
      res.send(
        functions.responseGenerator(result.code, result.message, result.data)
      );
    } catch (error) {
      res.send(
        functions.responseGenerator(error.code, error.message, error.data)
      );
    }
  },

  createSchedule: async (req, res) => {
    try {
      var userId = null;
      const result = await scheduleObject
        .scheduleService()
        .createSchedule(userId, req.body);
      res.send(
        functions.responseGenerator(result.code, result.message, result.data)
      );
    } catch (error) {
      res.send(
        functions.responseGenerator(error.code, error.message, error.data)
      );
    }
  },

  pendingSchedules: async (req, res) => {
    try {
      var userId = null;
      const result = await scheduleObject
        .scheduleService()
        .pendingSchedules(userId, req.body);
      res.send(
        functions.responseGenerator(result.code, result.message, result.data)
      );
    } catch (error) {
      res.send(
        functions.responseGenerator(error.code, error.message, error.data)
      );
    }
  },

  getAllSchedules: async (req, res) => {
    try {
      var userId = null;
      const result = await scheduleObject
        .scheduleService()
        .getAllSchedules(userId, req.body);
      res.send(
        functions.responseGenerator(result.code, result.message, result.data)
      );
    } catch (error) {
      res.send(
        functions.responseGenerator(error.code, error.message, error.data)
      );
    }
  },

  getSchedule: async (req, res) => {
    try {
      var userId = null;
      let body = {...req.body, "Id": req.params.id }
      const result = await scheduleObject
        .scheduleService()
        .getSchedule(userId, body);
      res.send(
        functions.responseGenerator(result.code, result.message, result.data)
      );
    } catch (error) {
      res.send(
        functions.responseGenerator(error.code, error.message, error.data)
      );
    }
  },

  updateSchedule: async (req, res) => {
    try {
      var userId = null;
      const result = await scheduleObject
        .scheduleService()
        .updateSchedule(userId, req.body);
      res.send(
        functions.responseGenerator(result.code, result.message, result.data)
      );
    } catch (error) {
      res.send(
        functions.responseGenerator(error.code, error.message, error.data)
      );
    }
  },

  deleteSchedule: async (req, res) => {
    try {
      var userId = null;
      let body = {...req.body, "Id": req.params.id }
      const result = await scheduleObject
        .scheduleService()
        .deleteSchedule(userId, body);
      res.send(
        functions.responseGenerator(result.code, result.message, result.data)
      );
    } catch (error) {
      res.send(
        functions.responseGenerator(error.code, error.message, error.data)
      );
    }
  },
};
module.exports = scheduleController;
