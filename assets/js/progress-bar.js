/**
 * Horizontal Progress Bar for 9-Step Journey
 * Shows progress through the journey with a horizontal bar in the navigation
 */
document.addEventListener('DOMContentLoaded', function() {
  // Define the step pages and their numbers
  const STEP_PAGES = [
    { url: '/pages/self-assessment.html', step: 1 },
    { url: '/pages/industry-research.html', step: 2 },
    { url: '/pages/skill-translation-hub.html', step: 3 },
    { url: '/pages/resume-personal-branding.html', step: 4 },
    { url: '/pages/networking-strategies.html', step: 5 },
    { url: '/pages/job-search-resources.html', step: 6 },
    { url: '/pages/interview-preparation.html', step: 7 },
    { url: '/pages/compensation-benefits.html', step: 8 },
    { url: '/pages/transition-checklist.html', step: 9 }
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
  const currentPageData = STEP_PAGES.find(page => page.url === currentPath);
  const currentStep = currentPageData ? currentPageData.step : 0;
  
  // If we're on a step page, save progress
  if (currentStep > 0) {
    localStorage.setItem('currentStep', currentStep);
    console.log('Current step:', currentStep);
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
      window.location.href = '/pages/transition-roadmap.html';
    });
    
    // Show the progress bar wrapper
    const progressWrapper = document.querySelector('.nav-progress-wrapper');
    if (progressWrapper) {
      progressWrapper.style.display = 'flex';
    }
  } else {
    // Hide progress bar if no step is active
    const progressWrapper = document.querySelector('.nav-progress-wrapper');
    if (progressWrapper) {
      progressWrapper.style.display = 'none';
    }
  }
});
