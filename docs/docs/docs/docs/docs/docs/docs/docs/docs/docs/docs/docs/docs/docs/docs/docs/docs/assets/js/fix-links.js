/**
 * Fix links missing the baseurl
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get the baseurl from a meta tag or define it directly
  const baseurl = '/F2I';
  
  // Fix all links that start with /pages/ but don't include the baseurl
  document.querySelectorAll('a[href^="/pages/"]').forEach(function(link) {
    if (!link.getAttribute('href').startsWith(baseurl)) {
      link.setAttribute('href', baseurl + link.getAttribute('href'));
    }
  });
  
  // Fix links to the home page
  document.querySelectorAll('a[href="/"]').forEach(function(link) {
    link.setAttribute('href', baseurl + '/');
  });
});