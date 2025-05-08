/**
 * Horizontal Progress Bar for 9-Step Journey
 * Shows progress through the journey with a horizontal bar in the navigation
 */
document.addEventListener('DOMContentLoaded', function() {
  // Detect baseurl from the current path or meta tag
  function detectBaseurl() {
    // Try to get baseurl from meta tag
    const metaBaseurl = document.querySelector('meta[name="baseurl"]');
    if (metaBaseurl) {
      return metaBaseurl.getAttribute('content');
    }

    // Try to detect from script paths
    const scripts = document.querySelectorAll('script[src*="/assets/js/"]');
    for (const script of scripts) {
      const src = script.getAttribute('src');
      const match = src.match(/^(\/[^\/]+)?\/assets\/js\//);
      if (match && match[1]) {
        return match[1];
      }
    }

    // Default baseurl for GitHub Pages
    return '/F2I';
  }

  const baseurl = detectBaseurl();
  console.log('Detected baseurl:', baseurl);

  // Define the step pages and their numbers with baseurl
  const STEP_PAGES = [
    { url: baseurl + '/pages/self-assessment.html', step: 1 },
    { url: baseurl + '/pages/industry-research.html', step: 2 },
    { url: baseurl + '/pages/skill-translation-hub.html', step: 3 },
    { url: baseurl + '/pages/resume-personal-branding.html', step: 4 },
    { url: baseurl + '/pages/networking-strategies.html', step: 5 },
    { url: baseurl + '/pages/job-search-resources.html', step: 6 },
    { url: baseurl + '/pages/interview-preparation.html', step: 7 },
    { url: baseurl + '/pages/compensation-benefits.html', step: 8 },
    { url: baseurl + '/pages/transition-checklist.html', step: 9 }
  ];

  // Step names for tooltips
  const STEP_NAMES = [
    'Self-Assessment',
    'Industry Research',
    'Skill Translation',
    'Resume & Branding',
    'Networking',
    'Job Search',
    'Interview Prep',
    'Compensation',
    'Transition Checklist'
  ];

  // Get progress bar elements
  const progressFill = document.getElementById('nav-progress-fill');
  const currentStepElement = document.getElementById('current-step');
  const progressBar = document.getElementById('nav-progress-bar');

  if (!progressFill || !currentStepElement || !progressBar) {
    console.error('Progress bar elements not found');
    return;
  }

  // Get current page URL and determine current step
  const currentPath = window.location.pathname;
  console.log('Current path:', currentPath);

  // Check if the current path matches any step page, with or without baseurl
  let currentPageData = STEP_PAGES.find(page => page.url === currentPath);

  // If not found with baseurl, try without baseurl (for local development)
  if (!currentPageData && baseurl) {
    const pathWithoutBaseurl = currentPath.replace(baseurl, '');
    currentPageData = STEP_PAGES.find(page => page.url === baseurl + pathWithoutBaseurl);

    // If still not found, try matching just the page name
    if (!currentPageData) {
      const pageName = currentPath.split('/').pop();
      currentPageData = STEP_PAGES.find(page => page.url.endsWith('/' + pageName));
    }
  }

  const currentStep = currentPageData ? currentPageData.step : 0;
  console.log('Current step:', currentStep);

  // If we're on a step page, save progress
  if (currentStep > 0) {
    localStorage.setItem('currentStep', currentStep);
    console.log('Saved current step:', currentStep);
  }

  // Get the step to display (either current page or last saved step)
  const displayStep = currentStep || parseInt(localStorage.getItem('currentStep')) || 0;
  console.log('Display step:', displayStep);

  // Update progress bar
  if (displayStep > 0) {
    // Calculate percentage (steps are 1-9, so we need to convert to 0-100%)
    const progressPercentage = ((displayStep - 1) / (STEP_PAGES.length - 1)) * 100;

    // Update fill width
    progressFill.style.width = `${progressPercentage}%`;

    // Update step text
    currentStepElement.textContent = displayStep;

    // Make progress bar clickable to go to roadmap
    progressBar.style.cursor = 'pointer';
    progressBar.title = 'View Transition Roadmap';
    progressBar.addEventListener('click', function() {
      window.location.href = baseurl + '/pages/transition-roadmap.html';
    });

    // Show the progress bar wrapper
    const progressWrapper = document.querySelector('.nav-progress-wrapper');
    if (progressWrapper) {
      progressWrapper.style.display = 'flex';
      console.log('Progress bar wrapper displayed');
    }
  } else {
    // Hide progress bar if no step is active
    const progressWrapper = document.querySelector('.nav-progress-wrapper');
    if (progressWrapper) {
      progressWrapper.style.display = 'none';
      console.log('Progress bar wrapper hidden');
    }
  }
});
