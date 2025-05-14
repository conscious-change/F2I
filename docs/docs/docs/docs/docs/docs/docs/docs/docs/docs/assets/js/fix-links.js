/**
 * Fix paths for both custom domain and GitHub Pages
 */
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on GitHub Pages or custom domain
  const isGitHubPages = window.location.hostname.includes('github.io');
  
  if (isGitHubPages) {
    // On GitHub Pages, ensure all paths have /F2I prefix
    document.querySelectorAll('a[href^="/pages/"]').forEach(function(link) {
      if (!link.getAttribute('href').startsWith('/F2I')) {
        link.setAttribute('href', '/F2I' + link.getAttribute('href'));
      }
    });
    
    document.querySelectorAll('a[href="/"]').forEach(function(link) {
      link.setAttribute('href', '/F2I/');
    });
    
    // Fix asset paths for GitHub Pages
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      if (link.getAttribute('href').startsWith('/assets/') && !link.getAttribute('href').startsWith('/F2I')) {
        link.setAttribute('href', '/F2I' + link.getAttribute('href'));
      }
    });
    
    document.querySelectorAll('script[src]').forEach(script => {
      if (script.getAttribute('src').startsWith('/assets/') && !script.getAttribute('src').startsWith('/F2I')) {
        script.setAttribute('src', '/F2I' + script.getAttribute('src'));
      }
    });
  } else {
    // On custom domain, REMOVE /F2I prefix from all paths
    document.querySelectorAll('a[href^="/F2I/"]').forEach(function(link) {
      link.setAttribute('href', link.getAttribute('href').replace('/F2I', ''));
    });
    
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      if (link.getAttribute('href').startsWith('/F2I/')) {
        link.setAttribute('href', link.getAttribute('href').replace('/F2I', ''));
      }
    });
    
    document.querySelectorAll('script[src]').forEach(script => {
      if (script.getAttribute('src').startsWith('/F2I/')) {
        script.setAttribute('src', script.getAttribute('src').replace('/F2I', ''));
      }
    });
  }
});
