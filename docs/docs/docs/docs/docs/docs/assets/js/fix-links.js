/**
 * Fix links missing the baseurl
 */
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the custom domain
  const isCustomDomain = window.location.hostname === 'www.fed2industry.com';
  
  if (isCustomDomain) {
    // Fix all links that start with /pages/ but don't include the baseurl
    document.querySelectorAll('a[href^="/pages/"]').forEach(function(link) {
      if (!link.getAttribute('href').startsWith('/F2I')) {
        link.setAttribute('href', '/F2I' + link.getAttribute('href'));
      }
    });
    
    // Fix links to the home page
    document.querySelectorAll('a[href="/"]').forEach(function(link) {
      link.setAttribute('href', '/F2I/');
    });
    
    // Fix cdn-cgi links if needed
    document.querySelectorAll('a[href^="/cdn-cgi/"]').forEach(function(link) {
      // These are usually Cloudflare links, so we should keep them as is
      // But if they need to be fixed, uncomment the line below
      // link.setAttribute('href', '/F2I' + link.getAttribute('href'));
    });
    
    // Fix service worker path if it's registered inline
    if ('serviceWorker' in navigator) {
      // This will be handled by the updated service worker registration script
    }
  }
});
