const express = require("express");
const router = express.Router();

const Patient = require("../models/patient");

// GET all patients
router.get("/patients", async (req, res) => {
try {
const patients = await Patient.find();
res.status(200).json(patients);
} catch (error) {
res.status(500).json({ message: error.message });
}
});

// SEARCH patient by name or disease
router.get("/patients/search", async (req, res) => {
try {
const { name, disease } = req.query;


if (!name && !disease) {
  return res.status(400).json({
    message: "Provide name or disease to search"
  });
}

const query = {};

if (name) {
  query.fullName = { $regex: name, $options: "i" };
}

if (disease) {
  query.disease = { $regex: disease, $options: "i" };
}

const patients = await Patient.find(query);

if (patients.length === 0) {
  return res.status(404).json({ message: "Patient not found" });
}

res.status(200).json(patients);


} catch (error) {
res.status(500).json({ message: error.message });
}
});

// GET patient by ID
router.get("/patients/:id", async (req, res) => {
try {
const patient = await Patient.findOne({ patientId: req.params.id });


if (!patient) {
  return res.status(404).json({ message: "Patient not found" });
}

res.status(200).json(patient);


} catch (error) {
res.status(500).json({ message: error.message });
}
});

// REGISTER new patient
router.post("/patients", async (req, res) => {
try {
const patient = new Patient(req.body);


await patient.save();

res.status(201).json(patient);


} catch (error) {
res.status(400).json({ message: error.message });
}
});

// UPDATE patient
router.put("/patients/:id", async (req, res) => {
try {


const updatedPatient = await Patient.findOneAndUpdate(
  { patientId: req.params.id },
  req.body,
  { new: true }
);

if (!updatedPatient) {
  return res.status(404).json({ message: "Patient not found" });
}

res.status(200).json(updatedPatient);


} catch (error) {
res.status(500).json({ message: error.message });
}
});

// DELETE patient
router.delete("/patients/:id", async (req, res) => {
try {


const deletedPatient = await Patient.findOneAndDelete({
  patientId: req.params.id
});

if (!deletedPatient) {
  return res.status(404).json({ message: "Patient not found" });
}

res.status(200).json({
  message: "Patient record deleted",
  patient: deletedPatient
});


} catch (error) {
res.status(500).json({ message: error.message });
}
});

module.exports = router;