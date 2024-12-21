
// Fetch course data based on ID from the URL
const courseId = new URLSearchParams(window.location.search).get('id');

// Fetch course data from JSON
fetch('courses.json')
    .then(response => response.json())
    .then(data => {
        const course = data.find(c => c.id == courseId);
        if (course) {
            loadCourseDetails(course);
        } else {
            document.body.innerHTML = '<h1>Course Not Found</h1>';
            console.error('Course not found');
        }
    })
    .catch(err => {
        console.error('Error fetching course data:', err);
    });

// Function to load course details into the page
function loadCourseDetails(course) {
    // Header section
    document.getElementById('course-title').textContent = course.title;
    document.getElementById('course-title-header').textContent = course.title;
    document.getElementById('course-category').textContent = course.category;
    document.getElementById('course-difficulty').textContent = course.difficulty;
    document.getElementById('course-rating').textContent = `★★★★☆ (${course.rating})`;

    // Overview section
    document.getElementById('course-price').textContent = `$${course.price}`;
    document.getElementById('course-discounted-price').textContent = `$${course.discounted_price}`;
    document.getElementById('course-description').textContent = course.description;

    // Instructor info section
    document.getElementById('instructor-name').textContent = course.instructor.name;
    document.getElementById('instructor-bio').textContent = course.instructor.bio;
    document.getElementById('instructor-photo').src = course.instructor.photo;

    // Curriculum section
    const curriculumContainer = document.getElementById('course-curriculum');
    course.curriculum.forEach(module => {
        const moduleElement = document.createElement('div');
        moduleElement.classList.add('accordion-item');
        moduleElement.innerHTML = `
            <button class="accordion-btn">${module.title}</button>
            <div class="accordion-content">${module.content}</div>
        `;
        curriculumContainer.appendChild(moduleElement);
    });

    // Reviews section
    const reviewSummary = document.getElementById('review-summary');
    reviewSummary.textContent = `${course.rating}/5 - ${course.reviews.length} reviews`;

    const reviewList = document.getElementById('review-list');
    course.reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `
            <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
            <p>"${review.text}"</p>
        `;
        reviewList.appendChild(reviewItem);
    });

    // Related courses section
    const relatedCoursesContainer = document.getElementById('related-courses');
    course.related_courses.forEach(relatedCourse => {
        const relatedCourseElement = document.createElement('div');
        relatedCourseElement.classList.add('course-card');
        relatedCourseElement.innerHTML = `
            <h3>${relatedCourse.title}</h3>
            <p>${relatedCourse.description}</p>
        `;
        relatedCoursesContainer.appendChild(relatedCourseElement);
    });
}