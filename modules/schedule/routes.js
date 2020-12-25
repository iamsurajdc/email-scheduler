const router = require("express").Router();
const api = require("./controller");

router.post("/sendInquiry", api.sendInquiry)
router.post("/scheduleEmail", api.createSchedule);
router.post("/pendingSchedules", api.pendingSchedules);

router.get("/scheduleEmail", api.getAllSchedules);
router.get("/scheduleEmail/:id", api.getSchedule);
router.patch("/scheduleEmail", api.updateSchedule);
router.delete("/scheduleEmail/:id", api.deleteSchedule);

module.exports = router;
