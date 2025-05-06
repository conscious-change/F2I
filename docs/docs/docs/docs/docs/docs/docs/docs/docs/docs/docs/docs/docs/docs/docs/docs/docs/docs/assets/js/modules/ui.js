/**
 * F2I UI Module
 * Handles common UI components and interactions
 */
const F2IUI = (function() {
  'use strict';
  
  // Dependencies
  const utils = F2IUtils;
  
  /**
   * Initialize mobile navigation
   */
  function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.navbar .nav-links');
    const navGroups = document.querySelectorAll('.nav-group');
    
    if (hamburger && navLinks) {
      utils.addEvent(hamburger, 'click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
      });
      
      // Handle dropdown menus
      navGroups.forEach(group => {
        const groupTitle = group.querySelector('.nav-group-title');
        
        if (groupTitle) {
          utils.addEvent(groupTitle, 'click', function(e) {
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
      
      // Close menu when clicking a regular link
      document.querySelectorAll('.navbar .nav-links a:not(.nav-group-title)').forEach(link => {
        utils.addEvent(link, 'click', () => {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
        });
      });
      
      // Close menu when clicking outside
      utils.addEvent(document, 'click', function(e) {
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
  }
  
  /**
   * Initialize testimonial slider
   */
  function initTestimonialSlider() {
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
        utils.addEvent(dot, 'click', () => {
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
      const rotateInterval = setInterval(() => {
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
      
      // Clear interval when page is not visible
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          clearInterval(rotateInterval);
        } else {
          // Resume rotation
          rotateInterval = setInterval(() => {
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
      });
    }
  }
  
  /**
   * Initialize FAQ accordion
   */
  function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
      faqQuestions.forEach(question => {
        utils.addEvent(question, 'click', () => {
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
  }
  
  /**
   * Initialize form validation
   * @param {string} formId - ID of the form to validate
   * @param {Function} [submitCallback] - Callback to run on successful submission
   */
  function initFormValidation(formId, submitCallback) {
    const form = utils.getElement(formId);
    
    if (!form) return;
    
    utils.addEvent(form, 'submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const formData = {};
      
      // Validate required fields
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          // Add error message if it doesn't exist
          let errorMsg = field.nextElementSibling;
          if (!errorMsg || !errorMsg.classList.contains('error-message')) {
            errorMsg = utils.createElement('div', {
              className: 'error-message'
            }, 'This field is required');
            
            field.parentNode.insertBefore(errorMsg, field.nextElementSibling);
          }
        } else {
          field.classList.remove('error');
          
          // Remove error message if it exists
          const errorMsg = field.nextElementSibling;
          if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.remove();
          }
          
          // Add to form data
          formData[field.name] = field.value;
        }
      });
      
      // Validate email fields
      form.querySelectorAll('input[type="email"]').forEach(field => {
        if (field.value.trim() && !utils.isValidEmail(field.value)) {
          isValid = false;
          field.classList.add('error');
          
          // Add error message if it doesn't exist
          let errorMsg = field.nextElementSibling;
          if (!errorMsg || !errorMsg.classList.contains('error-message')) {
            errorMsg = utils.createElement('div', {
              className: 'error-message'
            }, 'Please enter a valid email address');
            
            field.parentNode.insertBefore(errorMsg, field.nextElementSibling);
          }
        }
      });
      
      // If form is valid, call the submit callback
      if (isValid && typeof submitCallback === 'function') {
        submitCallback(formData);
      }
    });
    
    // Clear error state on input
    form.querySelectorAll('input, textarea, select').forEach(field => {
      utils.addEvent(field, 'input', function() {
        field.classList.remove('error');
        
        // Remove error message if it exists
        const errorMsg = field.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
          errorMsg.remove();
        }
      });
    });
  }
  
  /**
   * Show a notification message
   * @param {string} message - Message to display
   * @param {string} [type='info'] - Message type ('info', 'success', 'warning', 'error')
   * @param {number} [duration=3000] - Duration in milliseconds
   */
  function showNotification(message, type = 'info', duration = 3000) {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.f2i-notification');
    existingNotifications.forEach(notification => {
      notification.remove();
    });
    
    // Create notification element
    const notification = utils.createElement('div', {
      className: `f2i-notification ${type}`
    }, message);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Hide and remove after duration
    setTimeout(() => {
      notification.classList.remove('show');
      
      // Remove from DOM after animation
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, duration);
  }
  
  /**
   * Initialize all UI components
   */
  function init() {
    initMobileNav();
    initTestimonialSlider();
    initFaqAccordion();
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
      .f2i-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 4px;
        background-color: #f8f9fa;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s, transform 0.3s;
        max-width: 300px;
      }
      
      .f2i-notification.show {
        opacity: 1;
        transform: translateY(0);
      }
      
      .f2i-notification.info {
        background-color: #cce5ff;
        border-left: 4px solid #0056b3;
      }
      
      .f2i-notification.success {
        background-color: #d4edda;
        border-left: 4px solid #28a745;
      }
      
      .f2i-notification.warning {
        background-color: #fff3cd;
        border-left: 4px solid #ffc107;
      }
      
      .f2i-notification.error {
        background-color: #f8d7da;
        border-left: 4px solid #dc3545;
      }
      
      .error-message {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 4px;
      }
      
      .error {
        border-color: #dc3545 !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Public API
  return {
    init,
    initFormValidation,
    showNotification
  };
})();
