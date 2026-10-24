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
    if (mailingList && email === "") {
        document.getElementById("err-email").style.visibility = "visible";
        isValid = false;

    }
    else if(mailingList && (!email.includes("@") || !email.includes("."))) {
        let errEmail = document.getElementById("err-email");
        errEmail.style.visibility = "visible";
        errEmail.textContent = "Email must include @ and ."
        isValid = false;
    }

    // Validate LinkedIn URL
    let lkedIn = document.getElementById("lkedIn").value.trim();

    if (lkedIn !== "" && !lkedIn.startsWith("https://linkedin.com/in/")) {
        document.getElementById("err-lkedIn").style.visibility = "visible";
        isValid = false;
    }

    // Validate How we Met
    let meetOption = document.getElementById("meet-method").value;
    let meetOptionOther = document.getElementById("meet-method-other").value.trim();
    if (meetOption === "") {
        document.getElementById("err-meet-method").style.visibility = "visible";
        isValid = false;
    }
    else if(meetOption === "other") {

        if (meetOptionOther === "") {
            document.getElementById("err-meet-method").style.visibility = "visible";
            isValid = false;
        }
    }

    // Do not submit the form if data is invalid
    return isValid;
};

// Display the "other" section once other is selected
document.getElementById("meet-method").onchange = () => {
    let meetOption = document.getElementById("meet-method").value;

    if (meetOption === "other") {
        document.getElementById("meet-method-other").style.visibility = "visible";
        document.getElementById("lbl-meet-method-other").style.visibility = "visible";
    }
}

document.getElementById("mailing-list").onchange = () => {
    if (document.getElementById("mailing-list").checked) {
        document.getElementById("inline-html").style.visibility = "visible";
        document.getElementById("inline-text").style.visibility = "visible";
    }
}

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i=0; i<errors.length; i++) {
        errors[i].style.visibility = "hidden";
    }
}