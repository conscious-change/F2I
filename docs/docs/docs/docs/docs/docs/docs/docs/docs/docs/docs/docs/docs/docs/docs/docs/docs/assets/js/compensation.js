/**
 * Compensation & Benefits JavaScript
 * Handles accordion and tabs functionality for the Compensation & Benefits page
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

  // Tabs functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Get the tab ID and activate corresponding panel
      const tabId = button.getAttribute('data-tab');
      const panel = document.getElementById(`${tabId}-panel`);
      if (panel) {
        panel.classList.add('active');
      }
    });
  });

  console.log('Compensation & Benefits JS initialized');
});
