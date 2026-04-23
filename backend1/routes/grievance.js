const express = require("express");
const Grievance = require("../models/Grievance");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/grievances", auth, async (req, res) => {
  const grievance = new Grievance(req.body);
  await grievance.save();
  res.json(grievance);
});

router.get("/grievances", auth, async (req, res) => {
  const data = await Grievance.find();
  res.json(data);
});

router.put("/grievances/:id", auth, async (req, res) => {
  const updated = await Grievance.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete("/grievances/:id", auth, async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

router.get("/grievances/search", auth, async (req, res) => {
  const { title } = req.query;

  const result = await Grievance.find({
    title: { $regex: title, $options: "i" }
  });

  res.json(result);
});

module.exports = router;