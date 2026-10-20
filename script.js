document.getElementById("jobForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let countryCode = document.getElementById("countryCode").value;
    let phone = document.getElementById("phone").value.trim();
    let message = document.getElementById("message").value.trim();
    let error = document.getElementById("error");

    
    error.style.color = "#e74c3c";
    error.textContent = "";

    
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    if (name === "" || email === "" || phone === "" || message === "") {
        error.textContent = "All fields are required!";
        return;
    }

   
    if (!emailPattern.test(email)) {
        error.textContent = "Please enter a valid email address!";
        return;
    }

    
    if (phone.length < 7 || !/^[0-9]+$/.test(phone)) {
        error.textContent = "Please enter a valid phone number!";
        return;
    }

    
    let formData = {
        name: name,
        email: email,
        phone: countryCode + phone,
        message: message,
        timestamp: new Date().toLocaleString()
    };

    let submissions = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    submissions.push(formData);
    localStorage.setItem('jobApplications', JSON.stringify(submissions));

    
    error.style.color = "#28a745";
    error.textContent = "Form submitted and saved successfully!";
    
   
    setTimeout(() => {
        document.getElementById("jobForm").reset();
        error.textContent = "";
        document.getElementById("flagDisplay").textContent = "🇺🇸";
    }, 2000);
});


document.getElementById("countryCode").addEventListener("change", function() {
    let selectedOption = this.options[this.selectedIndex];
    let flag = selectedOption.getAttribute("data-flag");
    document.getElementById("flagDisplay").textContent = flag;
});
