// script.js

// Mock user data for demonstration
const users = [];
const courses = [
    { id: 1, title: 'HTML Basics', progress: 70 },
    { id: 2, title: 'CSS Fundamentals', progress: 50 },
    { id: 3, title: 'JavaScript Essentials', progress: 30 },
];

// Handle Signup
document.getElementById('signupForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // Save user data
    users.push({ name, email, password });
    alert('Signup successful! You can now log in.');
    window.location.href = 'login.html';
});

// Handle Login
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid email or password. Please try again.');
    }
});

// Populate Dashboard
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
        document.querySelector('h1').innerText = `Welcome, ${user.name}!`;
        const courseList = document.getElementById('courseList');
        courses.forEach(course => {
            const li = document.createElement('li');
            li.innerText = `${course.title} - Progress: ${course.progress}%`;
            courseList.appendChild(li);
        });
    } else {
         alert('Please log in to view your dashboard.');
        window.location.href = 'login.html';
    }
});

// Handle Logout
document.getElementById('logout')?.addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
});
