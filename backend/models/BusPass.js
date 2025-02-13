const mongoose = require('mongoose');

const BusPassSchema = new mongoose.Schema({
    name: String,
    rollno: String,
    age: Number,
    dob: String,
    collegeName: String,
    startPlace: String,
    endPlace: String,
    routeDetails: {
        source1: String,
        destination1: String,
        source2: String,
        destination2: String
    },
    studyingYear: String,
    department: String,
    studentSignature: String,  // Stores image filename
    distance: Number,
    charge: Number,
    status: { type: String, default: "Pending" },
});

module.exports = mongoose.model('BusPass', BusPassSchema);
