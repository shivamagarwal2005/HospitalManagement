const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
patientId: {
type: String,
unique: true
},

fullName: {
type: String,
required: true,
trim: true
},

email: {
type: String,
required: true,
unique: true
},

phoneNumber: {
type: String,
required: true
},

age: {
type: Number,
required: true,
min: 0
},

gender: {
type: String,
enum: ["Male", "Female", "Other"]
},

disease: {
type: String,
required: true
},

doctorAssigned: {
type: String,
required: true
},

admissionDate: {
type: Date,
default: Date.now
},

roomNumber: {
type: String
},

patientType: {
type: String,
enum: ["Inpatient", "Outpatient"]
},

status: {
type: String,
enum: ["Admitted", "Discharged"],
default: "Admitted"
}
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);