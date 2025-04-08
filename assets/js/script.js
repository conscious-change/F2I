document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.navbar .nav-links');

  hamburger.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent click from bubbling to document
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.navbar .nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    // If the click is outside the navbar and the menu is active
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
});
