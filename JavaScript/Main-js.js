document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Registration successful!");
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Login successful!");
});

document.getElementById("postRideForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Ride posted!");
});

document.getElementById("searchRidesForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const route = document.getElementById("searchRoute").value;
    document.getElementById("rideResults").innerHTML = `<p>Rides available for route: ${route}</p>`;
});

document.getElementById("sendMessage").addEventListener("click", function() {
    const message = document.getElementById("message").value;
    alert(`Message sent: ${message}`);
});
