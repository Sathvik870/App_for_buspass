document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("buspassForm");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const name = document.getElementById("name").value.trim();
        const rollno = document.getElementById("rollno").value.trim();
        const age = document.getElementById("age").value.trim();
        const dob = document.getElementById("dob").value.trim();
        const collegeName = document.getElementById("collegeName").value.trim();
        const startPlace = document.getElementById("startPlace").value.trim();
        const endPlace = document.getElementById("endPlace").value.trim();
        const source1 = document.getElementById("source1").value.trim();
        const destination1 = document.getElementById("destination1").value.trim();
        const source2 = document.getElementById("source2").value.trim();
        const destination2 = document.getElementById("destination2").value.trim();
        const studyingYear = document.getElementById("studyingYear").value.trim();
        const department = document.getElementById("department").value.trim();
        const distance = parseFloat(document.getElementById("distance").value.trim());
        const fileInput = document.getElementById('signature');
        const file = fileInput.files[0];
        
        if (file.size > 1024 * 1024) { // 1MB limit
            alert("File size must be less than 1MB.");
            return;
        }
        
        // Calculate the charge based on distance
        let charge = 0;
        if (distance < 15) {
            charge = 150;
        } else if (distance >= 15 && distance <= 25) {
            charge = 250;
        } else if (distance > 25 && distance <= 45) {
            charge = 360;
        }

        // Read student signature file and convert it to Base64
        const signatureFile = document.getElementById("signature").files[0];

        if (!signatureFile) {
            alert("Please upload your signature.");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(signatureFile);
        reader.onload = async function () {
            const signatureBase64 = reader.result;

            // Create an object with the collected data
            const formData = {
                name,
                rollno,
                age,
                dob,
                collegeName,
                startPlace,
                endPlace,
                routeDetails: {
                    source1,
                    destination1,
                    source2,
                    destination2
                },
                studyingYear,
                department,
                signature: signatureBase64,
                distance,
                charge
            };

            try {
                // Send data to the backend
                const response = await fetch("https://buspass-api.onrender.com/api/buspass/apply", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                console.log("Form data:", formData.charge);
                if (response.ok) {
                    alert("Application submitted successfully!");
                        if (formData.charge !== undefined) {
                            console.log("Storing charge amount:", formData.charge);
                
                            // Store all the bus pass details in localStorage
                            const busPassData = {
                                name: formData.name,
                                collegeName: formData.collegeName,
                                startPlace: formData.startPlace,
                                endPlace: formData.endPlace,
                                distance: formData.distance,
                                charge: formData.charge
                            };
                            console.log("Bus Pass Data:", busPassData);
                            localStorage.setItem("payableAmount",formData.charge)
                            localStorage.setItem("busPassData", JSON.stringify(busPassData));
                        } else {
                            console.error("Charge amount is missing in response.");
                        }
                        window.location.href = "payment.html";
                
                } else {
                    alert("Error: " + result.message);
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("An error occurred while submitting the application.");
            }
        };

        reader.onerror = function () {
            console.error("Error reading the signature file.");
            alert("Error reading the signature file.");
        };
    });
});
