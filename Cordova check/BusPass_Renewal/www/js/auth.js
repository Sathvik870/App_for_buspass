document.addEventListener("deviceready", function () {
    var permissions = cordova.plugins.permissions;
    var storagePermission = permissions.WRITE_EXTERNAL_STORAGE;

    permissions.checkPermission(storagePermission, function (status) {
        if (!status.hasPermission) {
            permissions.requestPermission(storagePermission, function (status) {
                if (status.hasPermission) {
                    console.log("Storage permission granted!");
                } else {
                    alert("Storage permission is required to save PDFs.");
                }
            }, function () {
                console.error("Storage permission request failed");
            });
        } else {
            console.log("Storage permission already granted.");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {

    
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            const response = await fetch("https://buspass-api.onrender.com/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert("Signup successful! Please login.");
                window.location.href = "index.html";
            } else {
                alert(data.message);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            const response = await fetch("https://buspass-api.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert("Login successful!");
                window.location.href = "dashboard.html";
            } else {
                alert(data.message);
            }
        });
    }
});
