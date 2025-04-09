document.addEventListener('DOMContentLoaded', function() {
  // Core technical skills data
  const coreTechnicalSkillsList = [
    { name: "Data Analysis", id: "dataAnalysis" },
    { name: "Project Management", id: "projectManagement" },
    { name: "Budget Management", id: "budgetManagement" },
    { name: "Procurement", id: "procurement" },
    { name: "IT Systems", id: "itSystems" },
    { name: "Policy Development", id: "policyDevelopment" },
    { name: "Compliance/Regulatory", id: "compliance" },
    { name: "Research Methods", id: "researchMethods" },
    { name: "Technical Writing", id: "technicalWriting" },
    { name: "Program Evaluation", id: "programEvaluation" }
  ];

  // Initialize the assessment
  initializeAssessment();

  // Tab navigation
  setupTabNavigation();

  // Add event listeners for buttons
  setupButtonListeners();

  // Initialize the assessment
  function initializeAssessment() {
    console.log('Initializing assessment...');
    // Generate core technical skills grid
    generateCoreSkillsGrid();

    // Load saved data if available
    loadSavedData();

    // Update progress
    updateProgress();
  }

  // Setup tab navigation
  function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section');
        showSection(sectionId);
      });
    });
  }

  // Setup button listeners
  function setupButtonListeners() {
    // Add skill buttons
    const addAgencySkillBtn = document.getElementById('addAgencySkill');
    if (addAgencySkillBtn) {
      addAgencySkillBtn.addEventListener('click', addAgencySkill);
    } else {
      console.error('Add Agency Skill button not found');
    }

    const addSoftwareToolBtn = document.getElementById('addSoftwareTool');
    if (addSoftwareToolBtn) {
      addSoftwareToolBtn.addEventListener('click', addSoftwareTool);
    } else {
      console.error('Add Software Tool button not found');
    }

    // Save and load buttons
    const saveAssessmentBtn = document.getElementById('saveAssessment');
    if (saveAssessmentBtn) {
      saveAssessmentBtn.addEventListener('click', saveAssessmentToFile);
    } else {
      console.error('Save Assessment button not found');
    }

    const loadAssessmentBtn = document.getElementById('loadAssessment');
    if (loadAssessmentBtn) {
      loadAssessmentBtn.addEventListener('click', function() {
        const fileInput = document.getElementById('loadAssessmentFile');
        if (fileInput) {
          fileInput.click();
        } else {
          console.error('Load Assessment File input not found');
        }
      });
    } else {
      console.error('Load Assessment button not found');
    }

    const loadAssessmentFileInput = document.getElementById('loadAssessmentFile');
    if (loadAssessmentFileInput) {
      loadAssessmentFileInput.addEventListener('change', loadAssessmentFromFile);
    } else {
      console.error('Load Assessment File input not found');
    }
  }

  // Generate the core technical skills grid
  function generateCoreSkillsGrid() {
    console.log('Generating core skills grid...');
    const container = document.getElementById('coreTechnicalSkills');

    if (!container) {
      console.error('Core Technical Skills container not found');
      return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Create skill items
    coreTechnicalSkillsList.forEach(skill => {
      const skillItem = document.createElement('div');
      skillItem.className = 'skill-item';

      const label = document.createElement('label');
      label.textContent = skill.name;

      const select = document.createElement('select');
      select.className = 'form-control';
      select.id = skill.id;
      select.name = skill.id;

      // Add options
      select.innerHTML = `
        <option value="">Select rating</option>
        <option value="1">1 = Basic</option>
        <option value="2">2 = Intermediate</option>
        <option value="3">3 = Proficient</option>
        <option value="4">4 = Advanced</option>
        <option value="5">5 = Expert</option>
      `;

      // Add change event listener to save data
      select.addEventListener('change', function() {
        saveData();
      });

      skillItem.appendChild(label);
      skillItem.appendChild(select);
      container.appendChild(skillItem);
    });
  }

  // Add a new agency-specific skill
  function addAgencySkill() {
    console.log('Adding agency skill...');
    const container = document.getElementById('agencySkills');

    if (!container) {
      console.error('Agency Skills container not found');
      return;
    }

    const skillEntry = document.createElement('div');
    skillEntry.className = 'skill-entry';

    skillEntry.innerHTML = `
      <input type="text" class="form-control skill-name" placeholder="Skill name">
      <select class="form-control skill-rating">
        <option value="">Select rating</option>
        <option value="1">1 = Basic</option>
        <option value="2">2 = Intermediate</option>
        <option value="3">3 = Proficient</option>
        <option value="4">4 = Advanced</option>
        <option value="5">5 = Expert</option>
      </select>
      <textarea class="form-control skill-notes compact-textarea" placeholder="How this skill transfers to industry"></textarea>
    `;

    // Add event listeners to save data
    const inputs = skillEntry.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('change', saveData);
    });

    container.appendChild(skillEntry);
    saveData();
  }

  // Add a new software tool
  function addSoftwareTool() {
    console.log('Adding software tool...');
    const container = document.getElementById('softwareTools');

    if (!container) {
      console.error('Software Tools container not found');
      return;
    }

    const toolEntry = document.createElement('div');
    toolEntry.className = 'tool-entry';

    toolEntry.innerHTML = `
      <input type="text" class="form-control tool-name" placeholder="Tool/Software name">
      <select class="form-control tool-rating">
        <option value="">Select rating</option>
        <option value="1">1 = Basic</option>
        <option value="2">2 = Intermediate</option>
        <option value="3">3 = Proficient</option>
        <option value="4">4 = Advanced</option>
        <option value="5">5 = Expert</option>
      </select>
      <input type="text" class="form-control tool-equivalent" placeholder="Industry equivalent (if different)">
    `;

    // Add event listeners to save data
    const inputs = toolEntry.querySelectorAll('input, select');
    inputs.forEach(input => {
      input.addEventListener('change', saveData);
    });

    container.appendChild(toolEntry);
    saveData();
  }

  // Show a specific section
  function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    // Hide all sections
    const sections = document.querySelectorAll('.assessment-section');
    sections.forEach(section => {
      section.classList.remove('active');
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
      selectedSection.classList.add('active');
    } else {
      console.error('Section not found:', sectionId);
    }

    // Update active tab
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.classList.remove('active');
      if (button.getAttribute('data-section') === sectionId) {
        button.classList.add('active');
      }
    });

    // Save current section to localStorage
    localStorage.setItem('currentSection', sectionId);

    // Update progress
    updateProgress();
  }

  // Save assessment data to localStorage
  function saveData() {
    console.log('Saving data...');
    const data = collectData();
    localStorage.setItem('assessmentData', JSON.stringify(data));
    updateProgress();
  }

  // Load saved data from localStorage
  function loadSavedData() {
    console.log('Loading saved data...');
    const savedData = localStorage.getItem('assessmentData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        populateData(data);
        console.log('Data loaded successfully');
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    } else {
      console.log('No saved data found');
    }

    // Load current section
    const currentSection = localStorage.getItem('currentSection');
    if (currentSection) {
      showSection(currentSection);
    }
  }

  // Collect all assessment data
  function collectData() {
    console.log('Collecting data...');
    const data = {
      coreTechnicalSkills: {},
      agencySkills: [],
      softwareTools: []
    };

    // Collect core technical skills
    coreTechnicalSkillsList.forEach(skill => {
      const select = document.getElementById(skill.id);
      if (select) {
        data.coreTechnicalSkills[skill.id] = select.value;
      }
    });

    // Collect agency-specific skills
    const agencySkillEntries = document.querySelectorAll('#agencySkills .skill-entry');
    agencySkillEntries.forEach(entry => {
      const skillName = entry.querySelector('.skill-name')?.value || '';
      const skillRating = entry.querySelector('.skill-rating')?.value || '';
      const skillNotes = entry.querySelector('.skill-notes')?.value || '';

      if (skillName || skillRating || skillNotes) {
        data.agencySkills.push({
          name: skillName,
          rating: skillRating,
          notes: skillNotes
        });
      }
    });

    // Collect software tools
    const toolEntries = document.querySelectorAll('#softwareTools .tool-entry');
    toolEntries.forEach(entry => {
      const toolName = entry.querySelector('.tool-name')?.value || '';
      const toolRating = entry.querySelector('.tool-rating')?.value || '';
      const toolEquivalent = entry.querySelector('.tool-equivalent')?.value || '';

      if (toolName || toolRating || toolEquivalent) {
        data.softwareTools.push({
          name: toolName,
          rating: toolRating,
          equivalent: toolEquivalent
        });
      }
    });

    return data;
  }

  // Populate form with saved data
  function populateData(data) {
    console.log('Populating data...');
    // Populate core technical skills
    if (data.coreTechnicalSkills) {
      coreTechnicalSkillsList.forEach(skill => {
        const select = document.getElementById(skill.id);
        if (select && data.coreTechnicalSkills[skill.id]) {
          select.value = data.coreTechnicalSkills[skill.id];
        }
      });
    }

    // Populate agency-specific skills
    if (data.agencySkills && data.agencySkills.length > 0) {
      const container = document.getElementById('agencySkills');
      if (container) {
        container.innerHTML = ''; // Clear existing entries

        data.agencySkills.forEach(skill => {
          const skillEntry = document.createElement('div');
          skillEntry.className = 'skill-entry';

          skillEntry.innerHTML = `
            <input type="text" class="form-control skill-name" placeholder="Skill name" value="${skill.name || ''}">
            <select class="form-control skill-rating">
              <option value="">Select rating</option>
              <option value="1" ${skill.rating === '1' ? 'selected' : ''}>1 = Basic</option>
              <option value="2" ${skill.rating === '2' ? 'selected' : ''}>2 = Intermediate</option>
              <option value="3" ${skill.rating === '3' ? 'selected' : ''}>3 = Proficient</option>
              <option value="4" ${skill.rating === '4' ? 'selected' : ''}>4 = Advanced</option>
              <option value="5" ${skill.rating === '5' ? 'selected' : ''}>5 = Expert</option>
            </select>
            <textarea class="form-control skill-notes compact-textarea" placeholder="How this skill transfers to industry">${skill.notes || ''}</textarea>
          `;

          // Add event listeners to save data
          const inputs = skillEntry.querySelectorAll('input, select, textarea');
          inputs.forEach(input => {
            input.addEventListener('change', saveData);
          });

          container.appendChild(skillEntry);
        });
      }
    }

    // Populate software tools
    if (data.softwareTools && data.softwareTools.length > 0) {
      const container = document.getElementById('softwareTools');
      if (container) {
        container.innerHTML = ''; // Clear existing entries

        data.softwareTools.forEach(tool => {
          const toolEntry = document.createElement('div');
          toolEntry.className = 'tool-entry';

          toolEntry.innerHTML = `
            <input type="text" class="form-control tool-name" placeholder="Tool/Software name" value="${tool.name || ''}">
            <select class="form-control tool-rating">
              <option value="">Select rating</option>
              <option value="1" ${tool.rating === '1' ? 'selected' : ''}>1 = Basic</option>
              <option value="2" ${tool.rating === '2' ? 'selected' : ''}>2 = Intermediate</option>
              <option value="3" ${tool.rating === '3' ? 'selected' : ''}>3 = Proficient</option>
              <option value="4" ${tool.rating === '4' ? 'selected' : ''}>4 = Advanced</option>
              <option value="5" ${tool.rating === '5' ? 'selected' : ''}>5 = Expert</option>
            </select>
            <input type="text" class="form-control tool-equivalent" placeholder="Industry equivalent (if different)" value="${tool.equivalent || ''}">
          `;

          // Add event listeners to save data
          const inputs = toolEntry.querySelectorAll('input, select');
          inputs.forEach(input => {
            input.addEventListener('change', saveData);
          });

          container.appendChild(toolEntry);
        });
      }
    }
  }

  // Save assessment data to a file
  function saveAssessmentToFile() {
    console.log('Saving assessment to file...');
    const data = collectData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = 'f2i-skills-assessment.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  // Load assessment data from a file
  function loadAssessmentFromFile(event) {
    console.log('Loading assessment from file...');
    const file = event.target.files[0];
    if (!file) {
      console.log('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        populateData(data);
        localStorage.setItem('assessmentData', JSON.stringify(data));
        updateProgress();
        alert('Assessment data loaded successfully!');
      } catch (error) {
        console.error('Error loading assessment data:', error);
        alert('Error loading assessment data. Please make sure the file is valid JSON.');
      }
    };
    reader.readAsText(file);

    // Reset the file input
    event.target.value = '';
  }

  // Update progress indicator
  function updateProgress() {
    console.log('Updating progress...');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    if (!progressFill || !progressText) {
      console.error('Progress elements not found');
      return;
    }

    // Simple implementation - count filled fields in the first section
    const totalFields = coreTechnicalSkillsList.length +
                        document.querySelectorAll('#agencySkills input, #agencySkills select, #agencySkills textarea').length +
                        document.querySelectorAll('#softwareTools input, #softwareTools select').length;

    let filledFields = 0;

    // Count filled core technical skills
    coreTechnicalSkillsList.forEach(skill => {
      const select = document.getElementById(skill.id);
      if (select && select.value) {
        filledFields++;
      }
    });

    // Count filled agency skills
    document.querySelectorAll('#agencySkills input, #agencySkills select, #agencySkills textarea').forEach(field => {
      if (field.value) {
        filledFields++;
      }
    });

    // Count filled software tools
    document.querySelectorAll('#softwareTools input, #softwareTools select').forEach(field => {
      if (field.value) {
        filledFields++;
      }
    });

    // Calculate progress percentage
    let progressPercentage = 0;
    if (totalFields > 0) {
      progressPercentage = Math.round((filledFields / totalFields) * 100);
    }

    // Update progress bar
    progressFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `${progressPercentage}% Complete`;
  }
});
