const express = require('express');
const multer = require('multer');
const BusPass = require('../models/BusPass');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Bus Pass Application Route
router.post('/apply', upload.single('signature'), async (req, res) => {
    console.log("Received Form Data:", req.body);
    console.log("Uploaded File:", req.file);

    const {
        name, rollno, age, dob, collegeName, startPlace, endPlace, 
        source1, destination1, source2, destination2, studyingYear, department, distance
    } = req.body;

    let charge = 0;
    if (distance < 15) charge = 150;
    else if (distance <= 25) charge = 250;
    else charge = 360;

    try {
        const newApplication = new BusPass({
            name, rollno, age, dob, collegeName, startPlace, endPlace,
            routeDetails: { source1, destination1, source2, destination2 },
            studyingYear, department, 
            studentSignature: req.file ? req.file.filename : "", // Ensure file exists
            distance, charge, status: "Pending" 
        });

        await newApplication.save();
        res.status(201).json({ message: "Bus pass application submitted successfully!" });
    } catch (err) {
        console.error("Application error:", err);  // Log full error message
        res.status(500).json({ message: "Application failed", error: err.message });
    }
});
router.get("/:rollno/:dob", async (req, res) => {
    try {
        const { rollno, dob } = req.params;
        const busPass = await BusPass.findOne({ rollno, dob });

        if (!busPass) {
            return res.status(404).json({ message: "Invalid Roll Number or Date of Birth!" });
        }

        res.json({
            name: busPass.name,
            collegeName: busPass.collegeName,
            startPlace: busPass.startPlace,
            endPlace: busPass.endPlace,
            studyingYear: busPass.studyingYear,
            department: busPass.department,
            expiryDate: busPass.expiryDate,
            renewalAmount: busPass.charge
        });
    } catch (error) {
        console.error("Error fetching bus pass:", error);
        res.status(500).json({ message: "Server error!" });
    }
});
router.post("/update-bus-pass", async (req, res) => {
    const { rollno, paymentStatus } = req.body;
    console.log("Backend Roll no : ",rollno)
    if (!rollno) {
        return res.status(400).json({ success: false, message: "Roll number is required" });
    }

    try {
        const pass = await BusPass.findOne({ rollno });

        if (!pass) {
            return res.status(404).json({ success: false, message: "Bus pass not found" });
        }

        // Update the expiration date and set the status as "Paid"
        pass.status = paymentStatus;
        await pass.save();

        res.json({ success: true, message: "Bus pass status updated successfully" });
    } catch (error) {
        console.error("Error updating bus pass:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;

