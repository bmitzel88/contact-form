document.getElementById("contact-form").onsubmit = () => {

    let isValid = true;

    // Clear all errors
    clearErrors();
    
    // Validate first name
    let fname = document.getElementById("fname").value.trim();
    if (fname === "") {
        document.getElementById("err-fname").style.visibility = "visible";
        isValid = false;
    }

    // Validate last name
    let lname = document.getElementById("lname").value.trim();
    if (lname === "") {
        document.getElementById("err-lname").style.visibility = "visible";
        isValid = false;
    }

    // Check if email is required
    let mailingList = document.getElementById("mailing-list").checked;
    let email = document.getElementById("email").value.trim();
    if (mailingList) {
        document.getElementById("err-email").style.visibility = "visible";
        isValid = false;
    }

    // Validate LinkedIn URL
    let lkedIn = document.getElementById("lkedIn").value.trim();

    if (lkedIn != "" && !lkedIn.startsWith("https://linkedin.com/in/")) {
        document.getElementById("err-lkedIn").style.visibility = "visible";
        isValid = false;
    }

    // Do not submit the form if data is invalid
    return isValid;
};

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i=0; i<errors.length; i++) {
        errors[i].style.visibility = "hidden";
    }
}