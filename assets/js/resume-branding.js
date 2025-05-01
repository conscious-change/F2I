document.addEventListener('DOMContentLoaded', function() {
  // Tabs functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Get the tab name and activate corresponding panel
      const tabName = button.getAttribute('data-tab');
      document.getElementById(tabName + '-panel').classList.add('active');
    });
  });

  // Accordion functionality
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    const toggle = item.querySelector('.accordion-toggle');

    if (header && content && toggle) {
      header.addEventListener('click', () => {
        item.classList.toggle('active');

        if (item.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
          toggle.textContent = '-';
        } else {
          content.style.maxHeight = '0';
          toggle.textContent = '+';
        }
      });
    }
  });

  // Checklist functionality removed

  // ===== MODAL FUNCTIONALITY =====

  // Achievement Builder Modal
  const achievementBuilderButton = document.getElementById('openAchievementBuilder');
  const achievementBuilderModal = document.getElementById('achievementBuilderModal');

  if (achievementBuilderButton && achievementBuilderModal) {
    achievementBuilderButton.onclick = function() {
      achievementBuilderModal.style.display = "block";
    }
  }



  // Value Proposition Worksheet Modal
  const valuePropositionButton = document.getElementById('openValuePropositionWorksheet');
  const valuePropositionModal = document.getElementById('valuePropositionModal');

  if (valuePropositionButton && valuePropositionModal) {
    valuePropositionButton.onclick = function() {
      valuePropositionModal.style.display = "block";
    }
  }

  // Close buttons for all modals
  const closeButtons = document.getElementsByClassName('close-modal');
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function() {
      const modal = this.closest('.modal');
      if (modal) {
        modal.style.display = "none";
      }
    }
  }

  // Close modal when clicking outside
  window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = "none";
    }
  }

  // Generate achievement statement
  const generateStatementButton = document.getElementById('generateStatement');
  if (generateStatementButton) {
    generateStatementButton.onclick = function() {
      const challenge = document.getElementById('challenge').value;
      const action = document.getElementById('action').value;
      const result = document.getElementById('result').value;
      const actionVerb = document.getElementById('actionVerb').value;

      if (!challenge || !action || !result || !actionVerb) {
        alert('Please fill in all fields to generate a statement.');
        return;
      }

      const statement = `${actionVerb} ${action} to address ${challenge}, resulting in ${result}.`;
      document.getElementById('statementResult').textContent = statement;
    }
  }

  // Copy statement to clipboard
  const copyStatementButton = document.getElementById('copyStatement');
  if (copyStatementButton) {
    copyStatementButton.onclick = function() {
      const statementResult = document.getElementById('statementResult');
      const statement = statementResult.textContent;

      if (!statement) {
        alert('Please generate a statement first.');
        return;
      }

      navigator.clipboard.writeText(statement).then(() => {
        alert('Statement copied to clipboard!');
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    }
  }



  // Generate value proposition
  const generateValuePropositionButton = document.getElementById('generateValueProposition');
  if (generateValuePropositionButton) {
    generateValuePropositionButton.onclick = function() {
      const target = document.getElementById('valuePropositionTarget').value;
      const problem = document.getElementById('valuePropositionProblem').value;
      const skills = document.getElementById('valuePropositionSkills').value;
      const benefits = document.getElementById('valuePropositionBenefits').value;

      if (!target || !problem || !skills || !benefits) {
        alert('Please complete all fields in the Value Proposition Statement section.');
        return;
      }

      const valueProposition = `I help ${target} to ${problem} by leveraging my ${skills}, which results in ${benefits}`;
      document.getElementById('valuePropositionResult').textContent = valueProposition;
    }
  }

  // Copy value proposition to clipboard
  const copyValuePropositionButton = document.getElementById('copyValueProposition');
  if (copyValuePropositionButton) {
    copyValuePropositionButton.onclick = function() {
      const valuePropositionResult = document.getElementById('valuePropositionResult');
      const valueProposition = valuePropositionResult.textContent;

      if (!valueProposition) {
        alert('Please generate a value proposition first.');
        return;
      }

      navigator.clipboard.writeText(valueProposition).then(() => {
        alert('Value proposition copied to clipboard!');
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    }
  }

  // Save value proposition to CSV
  const saveValuePropositionButton = document.getElementById('saveValueProposition');
  if (saveValuePropositionButton) {
    saveValuePropositionButton.onclick = function() {
      const valuePropositionResult = document.getElementById('valuePropositionResult');
      const valueProposition = valuePropositionResult.textContent;

      if (!valueProposition) {
        alert('Please generate a value proposition first.');
        return;
      }

      // Collect all worksheet data
      const worksheetData = {
        federalExpertise: document.getElementById('federalExpertise').value,
        federalPerspectives: document.getElementById('federalPerspectives').value,
        transferableSkills: document.getElementById('transferableSkills').value,
        strengths: document.getElementById('strengths').value,
        marketChallenges: document.getElementById('marketChallenges').value,
        uniqueSolutions: document.getElementById('uniqueSolutions').value,
        passions: document.getElementById('passions').value,
        desiredImpact: document.getElementById('desiredImpact').value,
        valueProposition: valueProposition
      };

      // In a real implementation, this would generate and download a CSV file
      // For now, we'll just show an alert
      alert('In a production environment, this would generate a CSV file with your value proposition and worksheet answers. For now, please copy your value proposition from the result box.');

      // Save worksheet data to localStorage for persistence
      localStorage.setItem('valuePropositionWorksheet', JSON.stringify(worksheetData));
    }
  }

  // Load saved worksheet data if available
  function loadValuePropositionWorksheet() {
    const savedData = localStorage.getItem('valuePropositionWorksheet');
    if (savedData) {
      const data = JSON.parse(savedData);

      // Populate form fields with saved data
      if (document.getElementById('federalExpertise')) document.getElementById('federalExpertise').value = data.federalExpertise || '';
      if (document.getElementById('federalPerspectives')) document.getElementById('federalPerspectives').value = data.federalPerspectives || '';
      if (document.getElementById('transferableSkills')) document.getElementById('transferableSkills').value = data.transferableSkills || '';
      if (document.getElementById('strengths')) document.getElementById('strengths').value = data.strengths || '';
      if (document.getElementById('marketChallenges')) document.getElementById('marketChallenges').value = data.marketChallenges || '';
      if (document.getElementById('uniqueSolutions')) document.getElementById('uniqueSolutions').value = data.uniqueSolutions || '';
      if (document.getElementById('passions')) document.getElementById('passions').value = data.passions || '';
      if (document.getElementById('desiredImpact')) document.getElementById('desiredImpact').value = data.desiredImpact || '';

      // Split the value proposition into its components if available
      if (data.valueProposition) {
        const vpResult = document.getElementById('valuePropositionResult');
        if (vpResult) vpResult.textContent = data.valueProposition;
      }
    }
  }

  // Load saved worksheet data when the modal is opened
  if (valuePropositionButton && valuePropositionModal) {
    valuePropositionButton.addEventListener('click', loadValuePropositionWorksheet);
  }

  // Open LinkedIn Profile Checklist modal
  const openLinkedInChecklistButton = document.getElementById('openLinkedInChecklist');
  const linkedinChecklistModal = document.getElementById('linkedinChecklistModal');

  if (openLinkedInChecklistButton && linkedinChecklistModal) {
    openLinkedInChecklistButton.onclick = function() {
      linkedinChecklistModal.style.display = "block";

      // Load saved LinkedIn checklist data
      loadLinkedInChecklistData();

      // Update progress bar
      updateLinkedInProgress();
    }
  }

  // LinkedIn Checklist functionality
  const linkedinCheckboxes = document.querySelectorAll('.linkedin-checkbox');
  const resetLinkedInChecklistButton = document.getElementById('resetLinkedInChecklist');
  const saveLinkedInChecklistButton = document.getElementById('saveLinkedInChecklist');
  const exportLinkedInChecklistButton = document.getElementById('exportLinkedInChecklist');

  // Add change event to all LinkedIn checkboxes
  linkedinCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      updateLinkedInProgress();
      saveLinkedInChecklistData();
    });
  });

  // Reset LinkedIn checklist
  if (resetLinkedInChecklistButton) {
    resetLinkedInChecklistButton.onclick = function() {
      if (confirm('Are you sure you want to reset the entire checklist?')) {
        linkedinCheckboxes.forEach(checkbox => {
          checkbox.checked = false;
        });
        updateLinkedInProgress();
        saveLinkedInChecklistData();
      }
    }
  }

  // Save LinkedIn checklist
  if (saveLinkedInChecklistButton) {
    saveLinkedInChecklistButton.onclick = function() {
      saveLinkedInChecklistData();
      alert('Your LinkedIn profile checklist progress has been saved!');
    }
  }

  // Export LinkedIn checklist as CSV
  if (exportLinkedInChecklistButton) {
    exportLinkedInChecklistButton.onclick = function() {
      // Create CSV content
      let csvContent = "LinkedIn Profile Checklist Item,Status\n";

      linkedinCheckboxes.forEach(checkbox => {
        const label = document.querySelector(`label[for="${checkbox.id}"]`).textContent;
        const status = checkbox.checked ? "Completed" : "Not Completed";
        csvContent += `"${label}","${status}"\n`;
      });

      // Create a blob and download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.setAttribute("href", url);
      link.setAttribute("download", "linkedin_profile_checklist.csv");
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Update LinkedIn progress bar
  function updateLinkedInProgress() {
    const totalCheckboxes = linkedinCheckboxes.length;
    let checkedCount = 0;

    linkedinCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        checkedCount++;
      }
    });

    const progressPercentage = totalCheckboxes > 0 ? Math.round((checkedCount / totalCheckboxes) * 100) : 0;

    const progressElement = document.getElementById('linkedinProgress');
    const progressBarElement = document.getElementById('linkedinProgressBar');

    if (progressElement) {
      progressElement.textContent = progressPercentage + '%';
    }

    if (progressBarElement) {
      progressBarElement.style.width = progressPercentage + '%';
    }
  }

  // Save LinkedIn checklist data
  function saveLinkedInChecklistData() {
    const checklistData = {};

    linkedinCheckboxes.forEach(checkbox => {
      checklistData[checkbox.id] = checkbox.checked;
    });

    localStorage.setItem('linkedinChecklist', JSON.stringify(checklistData));
  }

  // Load LinkedIn checklist data
  function loadLinkedInChecklistData() {
    const savedData = localStorage.getItem('linkedinChecklist');

    if (savedData) {
      const checklistData = JSON.parse(savedData);

      linkedinCheckboxes.forEach(checkbox => {
        if (checklistData[checkbox.id] !== undefined) {
          checkbox.checked = checklistData[checkbox.id];
        }
      });
    }
  }

  // Open elevator pitch builder modal
  const openElevatorPitchButton = document.getElementById('openElevatorPitchBuilder');
  const elevatorPitchModal = document.getElementById('elevatorPitchModal');

  if (openElevatorPitchButton && elevatorPitchModal) {
    openElevatorPitchButton.onclick = function() {
      elevatorPitchModal.style.display = "block";

      // Load saved elevator pitch data
      loadElevatorPitchData();
    }
  }

  // Function to load elevator pitch data
  function loadElevatorPitchData() {
    const savedData = localStorage.getItem('elevatorPitchData');
    if (savedData) {
      const data = JSON.parse(savedData);

      // Populate form fields with saved data
      if (document.getElementById('elevatorIntro')) document.getElementById('elevatorIntro').value = data.intro || '';
      if (document.getElementById('elevatorValue')) document.getElementById('elevatorValue').value = data.value || '';
      if (document.getElementById('elevatorProof')) document.getElementById('elevatorProof').value = data.proof || '';
      if (document.getElementById('elevatorAction')) document.getElementById('elevatorAction').value = data.action || '';

      // Populate the result if available
      if (data.pitch) {
        const pitchResult = document.getElementById('elevatorPitchResult');
        if (pitchResult) pitchResult.textContent = data.pitch;
      }
    }
  }

  // Generate elevator pitch
  const generateElevatorPitchButton = document.getElementById('generateElevatorPitch');
  if (generateElevatorPitchButton) {
    generateElevatorPitchButton.onclick = function() {
      const intro = document.getElementById('elevatorIntro').value;
      const value = document.getElementById('elevatorValue').value;
      const proof = document.getElementById('elevatorProof').value;
      const action = document.getElementById('elevatorAction').value;

      if (!intro || !value || !proof || !action) {
        alert('Please complete all fields to generate an elevator pitch.');
        return;
      }

      // Combine the elements into an elevator pitch
      const elevatorPitch = `${intro} ${value} ${proof} ${action}`;

      // Display the elevator pitch
      document.getElementById('elevatorPitchResult').textContent = elevatorPitch;

      // Save the elevator pitch data
      saveElevatorPitchData();
    }
  }



  // Copy elevator pitch to clipboard
  const copyElevatorPitchButton = document.getElementById('copyElevatorPitch');
  if (copyElevatorPitchButton) {
    copyElevatorPitchButton.onclick = function() {
      const elevatorPitchResult = document.getElementById('elevatorPitchResult');
      const elevatorPitch = elevatorPitchResult.textContent;

      if (!elevatorPitch) {
        alert('Please generate an elevator pitch first.');
        return;
      }

      navigator.clipboard.writeText(elevatorPitch).then(() => {
        alert('Elevator pitch copied to clipboard!');
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    }
  }

  // Practice elevator pitch with timer
  const practiceElevatorPitchButton = document.getElementById('practiceElevatorPitch');
  if (practiceElevatorPitchButton) {
    practiceElevatorPitchButton.onclick = function() {
      const elevatorPitchResult = document.getElementById('elevatorPitchResult');
      const elevatorPitch = elevatorPitchResult.textContent;

      if (!elevatorPitch) {
        alert('Please generate an elevator pitch first.');
        return;
      }

      // Create practice mode container if it doesn't exist
      let practiceMode = document.getElementById('practiceMode');
      if (!practiceMode) {
        practiceMode = document.createElement('div');
        practiceMode.id = 'practiceMode';
        practiceMode.className = 'practice-mode';
        practiceMode.innerHTML = `
          <h4>Practice Your Elevator Pitch</h4>
          <p>A good elevator pitch should take about 30 seconds to deliver. Use the timer below to practice.</p>
          <div class="practice-timer" id="practiceTimer">00:30</div>
          <div class="practice-controls">
            <button id="startPractice" class="btn btn-primary">Start Timer</button>
            <button id="resetPractice" class="btn btn-outline">Reset</button>
          </div>
          <div class="practice-tips">
            <p><strong>Tips:</strong> Speak clearly, maintain eye contact, and practice until it feels natural. Record yourself to review your delivery.</p>
          </div>
        `;

        // Add the practice mode after the elevator pitch result
        elevatorPitchResult.parentNode.after(practiceMode);

        // Add event listeners for the practice buttons
        document.getElementById('startPractice').addEventListener('click', startPracticeTimer);
        document.getElementById('resetPractice').addEventListener('click', resetPracticeTimer);
      } else {
        // If it already exists, just show it
        practiceMode.style.display = 'block';
      }

      // Scroll to the practice mode
      practiceMode.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Timer functionality for practice mode
  let practiceInterval;
  let practiceTimeLeft = 30;

  function startPracticeTimer() {
    // Clear any existing interval
    clearInterval(practiceInterval);

    // Disable the start button and enable the reset button
    document.getElementById('startPractice').disabled = true;
    document.getElementById('resetPractice').disabled = false;

    // Set the initial time
    practiceTimeLeft = 30;
    updatePracticeTimer();

    // Start the countdown
    practiceInterval = setInterval(function() {
      practiceTimeLeft--;
      updatePracticeTimer();

      if (practiceTimeLeft <= 0) {
        clearInterval(practiceInterval);
        document.getElementById('startPractice').disabled = false;
        alert('Time\'s up! How did you do?');
      }
    }, 1000);
  }

  function resetPracticeTimer() {
    clearInterval(practiceInterval);
    practiceTimeLeft = 30;
    updatePracticeTimer();
    document.getElementById('startPractice').disabled = false;
  }

  function updatePracticeTimer() {
    const timerElement = document.getElementById('practiceTimer');
    if (timerElement) {
      const seconds = practiceTimeLeft % 60;
      timerElement.textContent = `00:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }

  // Save elevator pitch data
  function saveElevatorPitchData() {
    const elevatorData = {
      intro: document.getElementById('elevatorIntro').value,
      value: document.getElementById('elevatorValue').value,
      proof: document.getElementById('elevatorProof').value,
      action: document.getElementById('elevatorAction').value,
      pitch: document.getElementById('elevatorPitchResult').textContent
    };

    localStorage.setItem('elevatorPitchData', JSON.stringify(elevatorData));
  }


});
