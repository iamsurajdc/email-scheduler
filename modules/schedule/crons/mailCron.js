const cron = require('node-cron');
const con = require('../../database/mysql');
const { promisify } = require('util');
const query = promisify(con.query).bind(con);
var { isPast } = require('date-fns');
const functions = require('../../common/function');

cron.schedule('* * * * *', () => {
  console.log(`running every minute: ${new Date().toLocaleString()}`);
  sendSchedules();
});

const sendSchedules = async () => {
  // TODO: Get All records from DB of Unsent schedules => status IsSent = 0

  const getPendingSchedules = `SELECT * FROM schedule where IsSent = 0 AND IsDeleted = 0`;
  const PendingSchedules = await query(getPendingSchedules);

  // TODO: compare scheduledDate with currenttime and send the mail with async API Calls

  let schedulesForMail;
  if (PendingSchedules.length) {
    schedulesForMail = PendingSchedules.filter((e) => isPast(new Date(e.ScheduledDate)));
  }
  if (schedulesForMail.length) {
    let mailCalls = [];
    for (const e of schedulesForMail) {
      mailCalls.push(functions.sendInquiry(e.Id));
    }
    const resultmailCalls = await Promise.all(mailCalls);

    let updateCalls = [];
    if (resultmailCalls.length == schedulesForMail.length) {
      for (const e of schedulesForMail) {
        const UpdateSchedule = `UPDATE schedule SET IsSent = ? WHERE Id = ?`;
        updateCalls.push(query(UpdateSchedule, [1, e.Id]));
      }
    }
    const resUpdateScheduleCalls = await Promise.all(updateCalls);
  }
};
// sendSchedules();

module.exports = {
  sendSchedules,
};
