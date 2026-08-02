/* ---------------------------
   NAVIGATION FUNCTIONS
---------------------------- */

function goToPin() {
    window.location.href = "pin.html";
}

function goToReports() {
    window.location.href = "reports.html";
}

/* ---------------------------
   PIN ENTRY LOGIC
---------------------------- */

let enteredPin = "";

function updatePinDisplay() {
    const dots = [
        document.getElementById("dot1"),
        document.getElementById("dot2"),
        document.getElementById("dot3"),
        document.getElementById("dot4")
    ];

    dots.forEach(dot => dot.style.backgroundColor = "white");

    for (let i = 0; i < enteredPin.length; i++) {
        dots[i].style.backgroundColor = "#FFD700";
    }
}

function pressNumber(num) {
    if (enteredPin.length < 4) {
        enteredPin += num;
        updatePinDisplay();
    }
}

function deleteNumber() {
    enteredPin = enteredPin.slice(0, -1);
    updatePinDisplay();
}

function submitPin() {

    if (enteredPin.length !== 4) {
        alert("Please enter your 4 digit PIN");
        return;
    }

    db.ref("users/" + enteredPin).get()
        .then(snapshot => {

            if (snapshot.exists()) {

                const user = snapshot.val();

                // Save user details for the app to use
                localStorage.setItem("currentUser", enteredPin);
                localStorage.setItem("userName", user.name);
                localStorage.setItem("userRole", user.role);
                localStorage.setItem("userTeam", user.team);
                localStorage.setItem("userPosition", user.position);
                localStorage.setItem("loggedIn", "true");

                // Continue into the app
                window.location.href = "dashboard.html";

            } else {

                alert("Invalid PIN");
                enteredPin = "";
                updatePinDisplay();

            }

        })
        .catch(error => {

            console.error("Firebase error:", error);
            alert("Unable to check PIN");

        });
}

