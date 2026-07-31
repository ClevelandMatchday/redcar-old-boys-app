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
const validPins = ["1234", "5678", "9999"];

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
    if (validPins.includes(enteredPin)) {

        // Store the logged-in user's PIN
        localStorage.setItem("currentUser", enteredPin);

        // Go to match list
        window.location.href = "matches.html";

    } else {
        alert("Invalid PIN");
        enteredPin = "";
        updatePinDisplay();
    }
}

