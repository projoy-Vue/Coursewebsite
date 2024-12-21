// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinksMobile = document.querySelector('.nav-links-mobile');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
  navLinksMobile.classList.toggle('active');
});

// Dropdown Hover for Desktop
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('mouseenter', () => {
    dropdown.querySelector('.dropdown-content').style.opacity = 1;
  });

  dropdown.addEventListener('mouseleave', () => {
    dropdown.querySelector('.dropdown-content').style.opacity = 0;
  });
});


///
// Auto-play Carousel
let carouselImages = document.querySelectorAll('.image-carousel img');
let currentImageIndex = 0;

function changeImage() {
  carouselImages[currentImageIndex].style.opacity = 0; // Fade out
  currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
  carouselImages[currentImageIndex].style.opacity = 1; // Fade in
}

// Change image every 3 seconds
setInterval(changeImage, 3000);

// Initial state
carouselImages.forEach((img, index) => {
  img.style.opacity = index === 0 ? 1 : 0;
});
