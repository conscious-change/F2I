/**
 * Image Optimizer Script
 * Adds native lazy loading to images that don't already have it
 * Adds fetchpriority="low" to images below the fold
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get all images on the page
  const images = document.querySelectorAll('img:not([loading])');
  
  // Function to check if an element is above the fold (in the viewport on page load)
  function isAboveTheFold(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight;
  }
  
  // Add loading="lazy" to images that don't have it already
  images.forEach(function(img) {
    // Skip images that already have loading attribute
    if (img.hasAttribute('loading')) {
      return;
    }
    
    // If image is above the fold, use eager loading, otherwise use lazy loading
    if (isAboveTheFold(img)) {
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');
    } else {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('fetchpriority', 'low');
    }
  });
  
  // Add decoding="async" to all images
  images.forEach(function(img) {
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
  });
});
