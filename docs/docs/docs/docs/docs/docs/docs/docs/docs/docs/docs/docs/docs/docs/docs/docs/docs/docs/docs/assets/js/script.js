document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.navbar .nav-links');
  const navGroups = document.querySelectorAll('.nav-group');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent click from bubbling to document
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Handle dropdown menus
    navGroups.forEach(group => {
      const groupTitle = group.querySelector('.nav-group-title');

      if (groupTitle) {
        groupTitle.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();

          // Close other dropdowns
          navGroups.forEach(otherGroup => {
            if (otherGroup !== group) {
              otherGroup.classList.remove('active');
            }
          });

          // Toggle current dropdown
          group.classList.toggle('active');
        });
      }
    });

    // Close menu when clicking a regular link (not dropdown toggles)
    document.querySelectorAll('.navbar .nav-links a:not(.nav-group-title)').forEach(link => {
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

        // Also close any open dropdowns
        navGroups.forEach(group => {
          group.classList.remove('active');
        });
      }
    });
  }

  // Testimonial slider functionality
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dot');

  if (testimonials.length > 0 && dots.length > 0) {
    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
      if (index !== 0) {
        testimonial.style.display = 'none';
      }
    });

    // Add click event to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
          testimonial.style.display = 'none';
        });

        // Show the selected testimonial
        testimonials[index].style.display = 'block';

        // Update active dot
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });

    // Auto-rotate testimonials every 5 seconds
    let currentIndex = 0;
    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;

      // Hide all testimonials
      testimonials.forEach(testimonial => {
        testimonial.style.display = 'none';
      });

      // Show the current testimonial
      testimonials[currentIndex].style.display = 'block';

      // Update active dot
      dots.forEach(d => d.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    }, 5000);
  }

  // FAQ accordion functionality
  const faqQuestions = document.querySelectorAll('.faq-question');

  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.style.maxHeight;

        // Close all other answers
        document.querySelectorAll('.faq-answer').forEach(a => {
          a.style.maxHeight = null;
        });

        // Toggle the clicked answer
        if (!isOpen) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }
});
