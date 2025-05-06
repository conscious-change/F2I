/**
 * Progress Tracker Module
 * Tracks user progress through the transition roadmap
 */
const ProgressTracker = (function() {
  // Private variables
  const storageKey = 'f2i_progress';
  const steps = [
    'self-assessment',
    'industry-research',
    'skill-translation',
    'resume-branding',
    'networking',
    'job-search',
    'interview-prep',
    'compensation',
    'transition-checklist'
  ];
  
  // Private methods
  function getProgress() {
    try {
      const data = localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : initializeProgress();
    } catch (error) {
      console.error('Error retrieving progress data:', error);
      return initializeProgress();
    }
  }
  
  function saveProgress(progressData) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(progressData));
      return true;
    } catch (error) {
      console.error('Error saving progress data:', error);
      return false;
    }
  }
  
  function initializeProgress() {
    const initialProgress = {};
    steps.forEach(step => {
      initialProgress[step] = {
        visited: false,
        completed: false,
        lastVisited: null
      };
    });
    return initialProgress;
  }
  
  function updateUI() {
    const progress = getProgress();
    const progressBar = document.getElementById('roadmap-progress-bar');
    const progressSteps = document.querySelectorAll('.roadmap-step');
    
    if (!progressBar || !progressSteps.length) return;
    
    // Calculate overall progress percentage
    const completedSteps = steps.filter(step => progress[step].completed).length;
    const progressPercentage = Math.round((completedSteps / steps.length) * 100);
    
    // Update progress bar
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute('aria-valuenow', progressPercentage);
    
    // Update step indicators
    progressSteps.forEach(stepElement => {
      const stepId = stepElement.getAttribute('data-step');
      if (stepId && progress[stepId]) {
        if (progress[stepId].completed) {
          stepElement.classList.add('completed');
          stepElement.classList.remove('in-progress');
        } else if (progress[stepId].visited) {
          stepElement.classList.add('in-progress');
          stepElement.classList.remove('completed');
        }
      }
    });
  }
  
  // Public API
  return {
    initialize: function() {
      if (!localStorage.getItem(storageKey)) {
        saveProgress(initializeProgress());
      }
      updateUI();
    },
    
    markStepVisited: function(stepId) {
      if (!steps.includes(stepId)) return false;
      
      const progress = getProgress();
      progress[stepId].visited = true;
      progress[stepId].lastVisited = new Date().toISOString();
      
      const result = saveProgress(progress);
      updateUI();
      return result;
    },
    
    markStepCompleted: function(stepId) {
      if (!steps.includes(stepId)) return false;
      
      const progress = getProgress();
      progress[stepId].visited = true;
      progress[stepId].completed = true;
      progress[stepId].lastVisited = new Date().toISOString();
      
      const result = saveProgress(progress);
      updateUI();
      return result;
    },
    
    getStepStatus: function(stepId) {
      if (!steps.includes(stepId)) return null;
      
      const progress = getProgress();
      return progress[stepId];
    },
    
    getOverallProgress: function() {
      const progress = getProgress();
      const completedSteps = steps.filter(step => progress[step].completed).length;
      return {
        percentage: Math.round((completedSteps / steps.length) * 100),
        completedSteps: completedSteps,
        totalSteps: steps.length
      };
    },
    
    resetProgress: function() {
      const result = saveProgress(initializeProgress());
      updateUI();
      return result;
    }
  };
})();
