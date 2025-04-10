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
  });
  
  // Checklist functionality
  const checklistItems = document.querySelectorAll('.checklist-checkbox');
  const resetButton = document.getElementById('resetChecklist');
  const saveButton = document.getElementById('saveChecklist');
  
  // Load saved checklist state from localStorage
  loadChecklistState();
  
  checklistItems.forEach(checkbox => {
    checkbox.addEventListener('change', saveChecklistState);
  });
  
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      checklistItems.forEach(checkbox => {
        checkbox.checked = false;
      });
      saveChecklistState();
    });
  }
  
  if (saveButton) {
    saveButton.addEventListener('click', () => {
      saveChecklistState();
      alert('Checklist progress saved!');
    });
  }
  
  function saveChecklistState() {
    const state = {};
    checklistItems.forEach(checkbox => {
      state[checkbox.id] = checkbox.checked;
    });
    localStorage.setItem('resumeChecklist', JSON.stringify(state));
  }
  
  function loadChecklistState() {
    const savedState = localStorage.getItem('resumeChecklist');
    if (savedState) {
      const state = JSON.parse(savedState);
      checklistItems.forEach(checkbox => {
        if (state[checkbox.id] !== undefined) {
          checkbox.checked = state[checkbox.id];
        }
      });
    }
  }
  
  // Achievement Statement Builder functionality
  const achievementBuilderButton = document.getElementById('openAchievementBuilder');
  const achievementBuilderModal = document.getElementById('achievementBuilderModal');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  const generateStatementButton = document.getElementById('generateStatement');
  const copyStatementButton = document.getElementById('copyStatement');
  
  if (achievementBuilderButton && achievementBuilderModal) {
    achievementBuilderButton.addEventListener('click', () => {
      achievementBuilderModal.style.display = 'block';
    });
  }
  
  // Term Translator functionality
  const termTranslatorButton = document.getElementById('openTermTranslator');
  const termTranslatorModal = document.getElementById('termTranslatorModal');
  const translateTermButton = document.getElementById('translateTerm');
  
  if (termTranslatorButton && termTranslatorModal) {
    termTranslatorButton.addEventListener('click', () => {
      termTranslatorModal.style.display = 'block';
    });
  }
  
  // Close modals
  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      modal.style.display = 'none';
    });
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  });
  
  // Generate achievement statement
  if (generateStatementButton) {
    generateStatementButton.addEventListener('click', () => {
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
    });
  }
  
  // Copy statement to clipboard
  if (copyStatementButton) {
    copyStatementButton.addEventListener('click', () => {
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
    });
  }
  
  // Translate federal term
  if (translateTermButton) {
    translateTermButton.addEventListener('click', () => {
      const federalTerm = document.getElementById('federalTerm').value;
      
      if (!federalTerm) {
        alert('Please enter a federal term to translate.');
        return;
      }
      
      // Simple translation dictionary
      const translations = {
        'GS-14 Supervisory Program Analyst': 'Senior Program Manager',
        'GS-15': 'Director / Senior Director',
        'GS-14': 'Senior Manager',
        'GS-13': 'Manager',
        'GS-12': 'Team Lead / Senior Specialist',
        'GS-11': 'Specialist / Analyst',
        'GS-9': 'Associate / Junior Specialist',
        'Contracting Officer\'s Representative (COR)': 'Contract/Vendor Manager',
        'Program Management Office (PMO)': 'Project Management Office',
        'Subject Matter Expert (SME)': 'Domain Expert / Specialist',
        'Decision Memorandum': 'Executive Brief / Recommendation',
        'Federal Acquisition Regulation (FAR)': 'Procurement Policy / Purchasing Guidelines'
      };
      
      let translation = 'No direct translation found. Consider consulting with a career coach for a customized translation.';
      
      // Check for exact matches
      if (translations[federalTerm]) {
        translation = translations[federalTerm];
      } else {
        // Check for partial matches
        for (const [key, value] of Object.entries(translations)) {
          if (federalTerm.includes(key)) {
            translation = `Consider using: ${value}`;
            break;
          }
        }
      }
      
      document.getElementById('translationResult').textContent = translation;
    });
  }
});
