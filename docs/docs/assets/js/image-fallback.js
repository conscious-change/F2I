/**
 * Image fallback script
 * Attempts to load hero background image if CSS background fails
 */
document.addEventListener('DOMContentLoaded', function() {
  const heroElement = document.querySelector('.hero');
  if (heroElement) {
    // Check if the background image is loaded
    const bgImage = window.getComputedStyle(heroElement).backgroundImage;
    
    // If no background image or it's just the color, try to load the image
    if (!bgImage || bgImage === 'none' || bgImage.includes('linear-gradient') || bgImage.includes('rgb')) {
      // Check if browser supports WebP
      if (document.documentElement.classList.contains('webp')) {
        heroElement.style.backgroundImage = 'url("/F2I/assets/img/hero-bg.webp")';
      } else {
        heroElement.style.backgroundImage = 'url("/F2I/assets/img/hero-bg.jpg")';
      }
    }
  }
});