document.addEventListener('DOMContentLoaded', function() {
  // Initialize the checklist
  initializeChecklist();
  
  // Load saved checklist state
  loadChecklistState();
  
  // Add event listener to reset button
  const resetButton = document.getElementById('reset-checklist');
  if (resetButton) {
    resetButton.addEventListener('click', function() {
      if (confirm('Are you sure you want to reset your progress?')) {
        resetChecklistState();
      }
    });
  }
});

function initializeChecklist() {
  const checkboxes = document.querySelectorAll('.action-step-checkbox');
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const stepId = this.getAttribute('data-step-id');
      const isChecked = this.checked;
      
      // Update the step's appearance
      updateStepAppearance(stepId, isChecked);
      
      // Save the state
      saveChecklistState();
    });
  });
}

function updateStepAppearance(stepId, isChecked) {
  const step = document.getElementById(`action-step-${stepId}`);
  if (step) {
    if (isChecked) {
      step.classList.add('completed');
    } else {
      step.classList.remove('completed');
    }
  }
}

function saveChecklistState() {
  const checkboxes = document.querySelectorAll('.action-step-checkbox');
  const state = {};
  
  checkboxes.forEach(checkbox => {
    const stepId = checkbox.getAttribute('data-step-id');
    state[stepId] = checkbox.checked;
  });
  
  localStorage.setItem('industryResearchChecklist', JSON.stringify(state));
  
  // Update progress indicator
  updateProgressIndicator();
}

function loadChecklistState() {
  const savedState = localStorage.getItem('industryResearchChecklist');
  
  if (savedState) {
    const state = JSON.parse(savedState);
    
    Object.keys(state).forEach(stepId => {
      const checkbox = document.querySelector(`.action-step-checkbox[data-step-id="${stepId}"]`);
      if (checkbox) {
        checkbox.checked = state[stepId];
        updateStepAppearance(stepId, state[stepId]);
      }
    });
    
    // Update progress indicator
    updateProgressIndicator();
  }
}

function resetChecklistState() {
  const checkboxes = document.querySelectorAll('.action-step-checkbox');
  
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
    const stepId = checkbox.getAttribute('data-step-id');
    updateStepAppearance(stepId, false);
  });
  
  localStorage.removeItem('industryResearchChecklist');
  
  // Update progress indicator
  updateProgressIndicator();
}

function updateProgressIndicator() {
  const checkboxes = document.querySelectorAll('.action-step-checkbox');
  const totalSteps = checkboxes.length;
  let completedSteps = 0;
  
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      completedSteps++;
    }
  });
  
  const progressPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  const progressBar = document.getElementById('checklist-progress-bar');
  const progressText = document.getElementById('checklist-progress-text');
  
  if (progressBar) {
    progressBar.style.width = `${progressPercentage}%`;
  }
  
  if (progressText) {
    progressText.textContent = `${completedSteps} of ${totalSteps} steps completed (${progressPercentage}%)`;
  }
}
