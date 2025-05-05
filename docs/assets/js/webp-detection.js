// WebP format detection script
(function() {
  // Check for WebP support
  function checkWebpSupport(callback) {
    var img = new Image();
    img.onload = function() {
      var result = (img.width > 0) && (img.height > 0);
      callback(result);
    };
    img.onerror = function() {
      callback(false);
    };
    img.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
  }

  // Add webp class to HTML element if supported
  checkWebpSupport(function(support) {
    if (support) {
      document.documentElement.classList.add('webp');
    } else {
      document.documentElement.classList.add('no-webp');
    }
  });
})();
