document.addEventListener('DOMContentLoaded', function() {
  // Get the lightbox elements
  const roadmapImage = document.getElementById('roadmapImage');
  const expandRoadmap = document.getElementById('expandRoadmap');
  const roadmapLightbox = document.getElementById('roadmapLightbox');
  const expandedRoadmap = document.getElementById('expandedRoadmap');
  const closeLightbox = document.querySelector('.close-lightbox');
  
  // Function to open the lightbox
  function openLightbox() {
    if (roadmapImage && expandedRoadmap) {
      expandedRoadmap.src = roadmapImage.src;
      roadmapLightbox.style.display = 'block';
    }
  }
  
  // Function to close the lightbox
  function closeLightboxFn() {
    roadmapLightbox.style.display = 'none';
  }
  
  // Add event listeners
  if (roadmapImage) {
    roadmapImage.addEventListener('click', openLightbox);
  }
  
  if (expandRoadmap) {
    expandRoadmap.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent triggering the image click event
      openLightbox();
    });
  }
  
  if (closeLightbox) {
    closeLightbox.addEventListener('click', closeLightboxFn);
  }
  
  // Close lightbox when clicking outside the image
  if (roadmapLightbox) {
    roadmapLightbox.addEventListener('click', function(e) {
      if (e.target === roadmapLightbox) {
        closeLightboxFn();
      }
    });
  }
  
  // Close lightbox with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && roadmapLightbox.style.display === 'block') {
      closeLightboxFn();
    }
  });
});
