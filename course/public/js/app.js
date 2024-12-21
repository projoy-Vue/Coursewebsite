// Global variables

const courses = [
    { "id": 1, "title": "JavaScript for Beginners", "category": "web-development", "difficulty": "beginner", "price": 50 },
    { "id": 2, "title": "Advanced CSS Techniques", "category": "web-development", "difficulty": "advanced", "price": 75 },
    { "id": 3, "title": "Data Science with Python", "category": "data-science", "difficulty": "intermediate", "price": 100 },
    { "id": 4, "title": "Machine Learning Fundamentals", "category": "data-science", "difficulty": "advanced", "price": 120 },
    { "id": 5, "title": "Front-End Development with React", "category": "web-development", "difficulty": "intermediate", "price": 90 },
    { "id": 6, "title": "Introduction to Cybersecurity", "category": "cybersecurity", "difficulty": "beginner", "price": 70 },
    { "id": 7, "title": "Ethical Hacking and Penetration Testing", "category": "cybersecurity", "difficulty": "advanced", "price": 150 },
    { "id": 8, "title": "Python for Data Analysis", "category": "data-science", "difficulty": "beginner", "price": 80 },
    { "id": 9, "title": "HTML & CSS for Beginners", "category": "web-development", "difficulty": "beginner", "price": 40 },
    { "id": 10, "title": "Blockchain Essentials", "category": "blockchain", "difficulty": "intermediate", "price": 130 },
    { "id": 11, "title": "DevOps: Continuous Integration and Deployment", "category": "devops", "difficulty": "intermediate", "price": 110 },
    { "id": 12, "title": "Cloud Computing with AWS", "category": "cloud-computing", "difficulty": "advanced", "price": 140 },
    { "id": 13, "title": "Mobile App Development with Flutter", "category": "mobile-development", "difficulty": "intermediate", "price": 100 },
    { "id": 14, "title": "UI/UX Design Fundamentals", "category": "design", "difficulty": "beginner", "price": 60 },
    { "id": 15, "title": "Full Stack Development with MERN", "category": "web-development", "difficulty": "advanced", "price": 150 },
    { "id": 16, "title": "Big Data Analytics with Hadoop", "category": "data-science", "difficulty": "advanced", "price": 160 },
    { "id": 17, "title": "Introduction to Artificial Intelligence", "category": "ai", "difficulty": "beginner", "price": 110 },
    { "id": 18, "title": "Deep Learning with TensorFlow", "category": "ai", "difficulty": "advanced", "price": 180 },
    { "id": 19, "title": "Project Management with Agile", "category": "management", "difficulty": "intermediate", "price": 90 },
    { "id": 20, "title": "Financial Modeling for Data Analysts", "category": "data-science", "difficulty": "advanced", "price": 120 }
];

// Load courses dynamically

let currentPage = 1;
const itemsPerPage = 8;
let filteredCourses = [...courses];

// Initialize course load
window.onload = () => {
    displayCourses(filteredCourses);
    updatePaginationInfo();
};

// Display a subset of courses based on pagination
function displayCourses(coursesToDisplay) {
    const courseList = document.getElementById('course-list');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const coursesOnPage = coursesToDisplay.slice(startIndex, endIndex);

    let output = '';

    if (coursesOnPage.length === 0) {
        output = '<p>No courses found.</p>';
    } else {
        coursesOnPage.forEach(course => {
            output += `
                <div class="course-card">
                    <h3>${course.title}</h3>
                    <p>Category: ${course.category}</p>
                    <p>Difficulty: ${course.difficulty}</p>
                    <p>Price: $${course.price}</p>
                    <a href="course-details.html?id=${course.id}" class="btn">View Details</a>
                </div>
            `;
        });
    }

    courseList.innerHTML = output;
    updatePaginationInfo(coursesToDisplay.length);
}

// Update pagination info and buttons
function updatePaginationInfo(totalItems = filteredCourses.length) {
    totalPages = Math.ceil(totalItems / itemsPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;

    document.getElementById('prevPage').disabled = (currentPage === 1);
    document.getElementById('nextPage').disabled = (currentPage === totalPages || totalPages === 0);
}

// Handle page changes
function changePage(direction) {
    currentPage += direction;

    // Make sure currentPage stays in bounds
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    displayCourses(filteredCourses);
}

// Filter courses based on category, difficulty, and search term
function filterCourses() {
    const category = document.getElementById('categoryFilter').value;
    const difficulty = document.getElementById('difficultyFilter').value;
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const sortCriteria = document.getElementById('sortFilter').value;

    filteredCourses = courses.filter(course => {
        return (
            (category === "" || course.category === category) &&
            (difficulty === "" || course.difficulty === difficulty) &&
            course.title.toLowerCase().includes(searchTerm)
        );
    });

    sortCourses(sortCriteria);
    currentPage = 1; // Reset to first page after filtering
    displayCourses(filteredCourses);
}

// Sort courses based on selected criteria
function sortCourses(criteria) {
    switch (criteria) {
        case 'price':
            filteredCourses.sort((a, b) => a.price - b.price);
            break;
        case 'rating':
            // Assuming you have a 'rating' property for each course
            filteredCourses.sort((a, b) => b.rating - a.rating);
            break;
        case 'popularity':
        default:
            // Placeholder, sort by some popularity measure or keep default order
            break;
    }
}