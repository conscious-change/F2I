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
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
    });
  });

  // Add event listeners for the first section
  document.getElementById('addAgencySkill').addEventListener('click', addAgencySkill);
  document.getElementById('addSoftwareTool').addEventListener('click', addSoftwareTool);
  
  // Save and load functionality
  document.getElementById('saveAssessment').addEventListener('click', saveAssessmentToFile);
  document.getElementById('loadAssessment').addEventListener('click', function() {
    document.getElementById('loadAssessmentFile').click();
  });
  document.getElementById('loadAssessmentFile').addEventListener('change', loadAssessmentFromFile);

  // Initialize the assessment
  function initializeAssessment() {
    // Generate core technical skills grid
    generateCoreSkillsGrid();
    
    // Load saved data if available
    loadSavedData();
    
    // Update progress
    updateProgress();
  }

  // Generate the core technical skills grid
  function generateCoreSkillsGrid() {
    const container = document.getElementById('coreTechnicalSkills');
    
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
        <option value="1">1 - Basic</option>
        <option value="2">2 - Intermediate</option>
        <option value="3">3 - Proficient</option>
        <option value="4">4 - Advanced</option>
        <option value="5">5 - Expert</option>
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
    const container = document.getElementById('agencySkills');
    
    const skillEntry = document.createElement('div');
    skillEntry.className = 'skill-entry';
    
    skillEntry.innerHTML = `
      <input type="text" class="form-control skill-name" placeholder="Skill name">
      <select class="form-control skill-rating">
        <option value="">Select rating</option>
        <option value="1">1 - Basic</option>
        <option value="2">2 - Intermediate</option>
        <option value="3">3 - Proficient</option>
        <option value="4">4 - Advanced</option>
        <option value="5">5 - Expert</option>
      </select>
      <textarea class="form-control skill-notes" placeholder="How this skill transfers to industry"></textarea>
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
    const container = document.getElementById('softwareTools');
    
    const toolEntry = document.createElement('div');
    toolEntry.className = 'tool-entry';
    
    toolEntry.innerHTML = `
      <input type="text" class="form-control tool-name" placeholder="Tool/Software name">
      <select class="form-control tool-rating">
        <option value="">Select rating</option>
        <option value="1">1 - Basic</option>
        <option value="2">2 - Intermediate</option>
        <option value="3">3 - Proficient</option>
        <option value="4">4 - Advanced</option>
        <option value="5">5 - Expert</option>
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
    // Hide all sections
    const sections = document.querySelectorAll('.assessment-section');
    sections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update active tab
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
    const data = collectData();
    localStorage.setItem('assessmentData', JSON.stringify(data));
    updateProgress();
  }

  // Load saved data from localStorage
  function loadSavedData() {
    const savedData = localStorage.getItem('assessmentData');
    if (savedData) {
      const data = JSON.parse(savedData);
      populateData(data);
    }
    
    // Load current section
    const currentSection = localStorage.getItem('currentSection');
    if (currentSection) {
      showSection(currentSection);
    }
  }

  // Collect all assessment data
  function collectData() {
    const data = {
      coreTechnicalSkills: {},
      agencySkills: [],
      softwareTools: []
    };
    
    // Collect core technical skills
    coreTechnicalSkillsList.forEach(skill => {
      const select = document.getElementById(skill.id);
      data.coreTechnicalSkills[skill.id] = select.value;
    });
    
    // Collect agency-specific skills
    const agencySkillEntries = document.querySelectorAll('#agencySkills .skill-entry');
    agencySkillEntries.forEach(entry => {
      const skillName = entry.querySelector('.skill-name').value;
      const skillRating = entry.querySelector('.skill-rating').value;
      const skillNotes = entry.querySelector('.skill-notes').value;
      
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
      const toolName = entry.querySelector('.tool-name').value;
      const toolRating = entry.querySelector('.tool-rating').value;
      const toolEquivalent = entry.querySelector('.tool-equivalent').value;
      
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
      container.innerHTML = ''; // Clear existing entries
      
      data.agencySkills.forEach(skill => {
        const skillEntry = document.createElement('div');
        skillEntry.className = 'skill-entry';
        
        skillEntry.innerHTML = `
          <input type="text" class="form-control skill-name" placeholder="Skill name" value="${skill.name || ''}">
          <select class="form-control skill-rating">
            <option value="">Select rating</option>
            <option value="1" ${skill.rating === '1' ? 'selected' : ''}>1 - Basic</option>
            <option value="2" ${skill.rating === '2' ? 'selected' : ''}>2 - Intermediate</option>
            <option value="3" ${skill.rating === '3' ? 'selected' : ''}>3 - Proficient</option>
            <option value="4" ${skill.rating === '4' ? 'selected' : ''}>4 - Advanced</option>
            <option value="5" ${skill.rating === '5' ? 'selected' : ''}>5 - Expert</option>
          </select>
          <textarea class="form-control skill-notes" placeholder="How this skill transfers to industry">${skill.notes || ''}</textarea>
        `;
        
        // Add event listeners to save data
        const inputs = skillEntry.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
          input.addEventListener('change', saveData);
        });
        
        container.appendChild(skillEntry);
      });
    }
    
    // Populate software tools
    if (data.softwareTools && data.softwareTools.length > 0) {
      const container = document.getElementById('softwareTools');
      container.innerHTML = ''; // Clear existing entries
      
      data.softwareTools.forEach(tool => {
        const toolEntry = document.createElement('div');
        toolEntry.className = 'tool-entry';
        
        toolEntry.innerHTML = `
          <input type="text" class="form-control tool-name" placeholder="Tool/Software name" value="${tool.name || ''}">
          <select class="form-control tool-rating">
            <option value="">Select rating</option>
            <option value="1" ${tool.rating === '1' ? 'selected' : ''}>1 - Basic</option>
            <option value="2" ${tool.rating === '2' ? 'selected' : ''}>2 - Intermediate</option>
            <option value="3" ${tool.rating === '3' ? 'selected' : ''}>3 - Proficient</option>
            <option value="4" ${tool.rating === '4' ? 'selected' : ''}>4 - Advanced</option>
            <option value="5" ${tool.rating === '5' ? 'selected' : ''}>5 - Expert</option>
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

  // Save assessment data to a file
  function saveAssessmentToFile() {
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
    const file = event.target.files[0];
    if (!file) return;
    
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
    document.getElementById('progressFill').style.width = `${progressPercentage}%`;
    document.getElementById('progressText').textContent = `${progressPercentage}% Complete`;
  }

  // Add event listeners to all form fields in the first section
  function addFormFieldListeners() {
    const formFields = document.querySelectorAll('#section1 input, #section1 select, #section1 textarea');
    formFields.forEach(field => {
      field.addEventListener('change', saveData);
    });
  }

  // Call this function after generating the form
  addFormFieldListeners();
});
