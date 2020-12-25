const axios = require('axios');
const con = require('../database/mysql');
const { promisify } = require('util');
const query = promisify(con.query).bind(con);

class ScheduleService {
  /**
   * function to create email schedule with date and message
   * @param {userId} userId
   * @param {info Body} info
   */
  async createSchedule(userId, info) {
    try {
      let { message, scheduledDate } = info;

      const InsertSchedule = `INSERT INTO schedule (ScheduledDate, IsSent, Message)
                              VALUES (?, ?, ?)`;
      const resultInsertSchedule = await query(InsertSchedule, [scheduledDate, 0, message]);

      return {
        code: 200,
        message: 'Schedule created successfully!',
        data: null,
      };
    } catch (e) {
      return {
        code: 500,
        message: 'Something went wrong, please contact admin',
        data: e,
      };
    }
  }

  /**
   * Get All Pending Schedules
   */
  async pendingSchedules() {
    try {
      const getPendingSchedules = `SELECT * FROM schedule where IsSent = 0 AND IsDeleted = 0`;
      const resultgetPendingSchedules = await query(getPendingSchedules);

      return {
        code: 200,
        message: 'Schedule fetched successfully!',
        data: resultgetPendingSchedules,
      };
    } catch (e) {
      return {
        code: 500,
        message: 'Something went wrong, please contact admin',
        data: e,
      };
    }
  }

  /**
   * Get All non deleted schedules
   * @param {userId} userId 
   * @param {Info Body} info 
   */
  async getAllSchedules(userId, info) {
    try {
      const getAllSchedules = `SELECT * FROM schedule WHERE IsDeleted = 0`;
      const resultgetAllSchedules = await query(getAllSchedules);

      return {
        code: 200,
        message: 'Schedules are fetched successfully!',
        data: resultgetAllSchedules,
      };
    } catch (e) {
      return {
        code: 500,
        message: 'Something went wrong, please contact admin',
        data: e,
      };
    }
  }

  /**
   * Get a single schedule by passing Id to URL
   * @param {userId} userId 
   * @param {Info body} info 
   */
  async getSchedule(userId, info) {
    try {
      const getSchedule = `SELECT * FROM schedule WHERE Id = ? WHERE IsDeleted = 0`;
      const resultgetSchedule = await query(getSchedule, info.Id);

      return {
        code: 200,
        message: 'Schedule fetched successfully!',
        data: resultgetSchedule,
      };
    } catch (e) {
      return {
        code: 500,
        message: 'Something went wrong, please contact admin',
        data: e,
      };
    }
  }

  /**
   * Update Schedule using new date and time for particular schedule Id
   * @param {userId} userId 
   * @param {Info body} info 
   */
  async updateSchedule(userId, info) {
    try {
      let { scheduledDate, Id } = info;

      const UpdateSchedule = `UPDATE schedule SET ScheduledDate = ? WHERE Id = ${Id}`;
      const resUpdateSchedule = await query(UpdateSchedule, [scheduledDate]);

      return {
        code: 200,
        message: 'Schedule fetched successfully!',
        data: null,
      };
    } catch (e) {
      return {
        code: 500,
        message: 'Something went wrong, please contact admin',
        data: e,
      };
    }
  }

  /**
   * delete a schedule using Id
   * @param {userId} userId 
   * @param {info body} info 
   */
  async deleteSchedule(userId, info) {
    try {
      let { Id } = info;

      const deleteSchedule = `UPDATE schedule SET IsDeleted = ? WHERE Id = ?`;
      const resdeleteSchedule = await query(deleteSchedule, [1, Id]);

      return {
        code: 200,
        message: 'Schedule deleted successfully!',
        data: null,
      };
    } catch (e) {
      return {
        code: 500,
        message: 'Something went wrong, please contact admin',
        data: e,
      };
    }
  }
}

module.exports = {
  scheduleService: function () {
    return new ScheduleService();
  },
};
