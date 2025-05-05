/**
 * Interview Preparation JavaScript
 * Handles accordion functionality for the Interview Preparation page
 */
document.addEventListener('DOMContentLoaded', function() {
  // Accordion functionality
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    const toggle = item.querySelector('.accordion-toggle');

    if (header && content && toggle) {
      header.addEventListener('click', () => {
        // Toggle active class
        item.classList.toggle('active');

        // Update content height and toggle button
        if (item.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
          toggle.textContent = '-';
        } else {
          content.style.maxHeight = '0';
          toggle.textContent = '+';
        }
      });
    }
  });

  console.log('Interview Preparation JS initialized');
});
