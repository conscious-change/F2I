/**
 * F2I Utilities Module
 * Common utility functions used across the site
 */
const F2IUtils = (function() {
  'use strict';
  
  /**
   * Safely get an element by ID with error handling
   * @param {string} id - The element ID
   * @returns {HTMLElement|null} - The element or null if not found
   */
  function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with ID "${id}" not found`);
    }
    return element;
  }
  
  /**
   * Safely query elements with error handling
   * @param {string} selector - CSS selector
   * @param {HTMLElement} [parent=document] - Parent element to query within
   * @returns {NodeList} - The matching elements
   */
  function queryElements(selector, parent = document) {
    try {
      return parent.querySelectorAll(selector);
    } catch (error) {
      console.error(`Error querying "${selector}":`, error);
      return [];
    }
  }
  
  /**
   * Add event listener with error handling
   * @param {HTMLElement} element - Element to attach listener to
   * @param {string} eventType - Event type (e.g., 'click')
   * @param {Function} handler - Event handler function
   * @param {Object} [options] - Event listener options
   */
  function addEvent(element, eventType, handler, options) {
    if (!element) {
      console.warn('Cannot add event to null element');
      return;
    }
    
    try {
      element.addEventListener(eventType, handler, options);
    } catch (error) {
      console.error(`Error adding ${eventType} event:`, error);
    }
  }
  
  /**
   * Debounce function to limit how often a function can be called
   * @param {Function} func - Function to debounce
   * @param {number} wait - Milliseconds to wait
   * @returns {Function} - Debounced function
   */
  function debounce(func, wait) {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  /**
   * Format a date string
   * @param {string|Date} date - Date to format
   * @param {string} [format='long'] - Format type ('long', 'short', 'relative')
   * @returns {string} - Formatted date string
   */
  function formatDate(date, format = 'long') {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date');
      }
      
      if (format === 'short') {
        return dateObj.toLocaleDateString();
      } else if (format === 'relative') {
        const now = new Date();
        const diffMs = now - dateObj;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
      }
      
      // Default to long format
      return dateObj.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  }
  
  /**
   * Validate an email address
   * @param {string} email - Email to validate
   * @returns {boolean} - Whether the email is valid
   */
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  /**
   * Create an element with attributes and content
   * @param {string} tag - HTML tag name
   * @param {Object} [attrs] - Attributes to set
   * @param {string|HTMLElement} [content] - Inner content or child element
   * @returns {HTMLElement} - The created element
   */
  function createElement(tag, attrs = {}, content = '') {
    try {
      const element = document.createElement(tag);
      
      // Set attributes
      Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'className') {
          element.className = value;
        } else {
          element.setAttribute(key, value);
        }
      });
      
      // Set content
      if (content) {
        if (typeof content === 'string') {
          element.innerHTML = content;
        } else {
          element.appendChild(content);
        }
      }
      
      return element;
    } catch (error) {
      console.error(`Error creating ${tag} element:`, error);
      return document.createElement('div');
    }
  }
  
  // Public API
  return {
    getElement,
    queryElements,
    addEvent,
    debounce,
    formatDate,
    isValidEmail,
    createElement
  };
})();
