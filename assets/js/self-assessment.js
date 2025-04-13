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

  // Leadership skills data
  const leadershipSkillsList = [
    { name: "Team Leadership", id: "teamLeadership" },
    { name: "Strategic Planning", id: "strategicPlanning" },
    { name: "Decision Making", id: "decisionMaking" },
    { name: "Delegation", id: "delegation" },
    { name: "Performance Management", id: "performanceManagement" },
    { name: "Conflict Resolution", id: "conflictResolution" },
    { name: "Change Management", id: "changeManagement" },
    { name: "Mentoring/Coaching", id: "mentoring" },
    { name: "Resource Allocation", id: "resourceAllocation" },
    { name: "Stakeholder Management", id: "stakeholderManagement" }
  ];

  // Problem-solving skills data
  const problemSolvingSkillsList = [
    { name: "Critical Thinking", id: "criticalThinking" },
    { name: "Analytical Reasoning", id: "analyticalReasoning" },
    { name: "Root Cause Analysis", id: "rootCauseAnalysis" },
    { name: "Creative Problem Solving", id: "creativeProblemSolving" },
    { name: "Decision Analysis", id: "decisionAnalysis" },
    { name: "Systems Thinking", id: "systemsThinking" },
    { name: "Risk Assessment", id: "riskAssessment" },
    { name: "Process Improvement", id: "processImprovement" },
    { name: "Research & Investigation", id: "research" },
    { name: "Adaptability", id: "adaptability" }
  ];

  // Communication skills data
  const communicationSkillsList = [
    { name: "Written Communication", id: "writtenCommunication" },
    { name: "Verbal Communication", id: "verbalCommunication" },
    { name: "Presentation Skills", id: "presentationSkills" },
    { name: "Active Listening", id: "activeListening" },
    { name: "Negotiation", id: "negotiation" },
    { name: "Persuasion & Influence", id: "persuasion" },
    { name: "Cross-functional Communication", id: "crossFunctionalComm" },
    { name: "Client/Customer Communication", id: "clientCommunication" },
    { name: "Feedback Delivery", id: "feedbackDelivery" },
    { name: "Digital Communication", id: "digitalCommunication" }
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
    // Generate skills grids
    generateCoreSkillsGrid();
    generateLeadershipSkillsGrid();
    generateProblemSolvingSkillsGrid();
    generateCommunicationSkillsGrid();

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

    const addIndustrySkillBtn = document.getElementById('addIndustrySkill');
    if (addIndustrySkillBtn) {
      addIndustrySkillBtn.addEventListener('click', addIndustrySkill);
    } else {
      console.error('Add Industry Skill button not found');
    }

    const addTerminologyBtn = document.getElementById('addTerminology');
    if (addTerminologyBtn) {
      addTerminologyBtn.addEventListener('click', addTerminology);
    } else {
      console.error('Add Terminology button not found');
    }

    const addAchievementBtn = document.getElementById('addAchievement');
    if (addAchievementBtn) {
      addAchievementBtn.addEventListener('click', addAchievement);
    } else {
      console.error('Add Achievement button not found');
    }

    const addStarStoryBtn = document.getElementById('addStarStory');
    if (addStarStoryBtn) {
      addStarStoryBtn.addEventListener('click', addStarStory);
    } else {
      console.error('Add STAR Story button not found');
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

    // Download and print buttons
    const downloadResultsBtn = document.getElementById('downloadResults');
    if (downloadResultsBtn) {
      downloadResultsBtn.addEventListener('click', downloadResultsAsCSV);
    } else {
      console.error('Download Results button not found');
    }

    const printResultsBtn = document.getElementById('printResults');
    if (printResultsBtn) {
      printResultsBtn.addEventListener('click', printAssessment);
    } else {
      console.error('Print Assessment button not found');
    }
  }

  // Generate the core technical skills grid
  function generateCoreSkillsGrid() {
    console.log('Generating core skills grid...');
    generateSkillsGrid('coreTechnicalSkills', coreTechnicalSkillsList);
  }

  // Generate the leadership skills grid
  function generateLeadershipSkillsGrid() {
    console.log('Generating leadership skills grid...');
    generateSkillsGrid('leadershipSkills', leadershipSkillsList);
  }

  // Generate the problem-solving skills grid
  function generateProblemSolvingSkillsGrid() {
    console.log('Generating problem-solving skills grid...');
    generateSkillsGrid('problemSolvingSkills', problemSolvingSkillsList);
  }

  // Generate the communication skills grid
  function generateCommunicationSkillsGrid() {
    console.log('Generating communication skills grid...');
    generateSkillsGrid('communicationSkills', communicationSkillsList);
  }

  // Generic function to generate a skills grid
  function generateSkillsGrid(containerId, skillsList) {
    const container = document.getElementById(containerId);

    if (!container) {
      console.error(`Skills container '${containerId}' not found`);
      return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Create skill items
    skillsList.forEach(skill => {
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

  // Add a new industry skill
  function addIndustrySkill() {
    console.log('Adding industry skill...');
    const container = document.getElementById('industrySkills');

    if (!container) {
      console.error('Industry Skills container not found');
      return;
    }

    const skillEntry = document.createElement('div');
    skillEntry.className = 'industry-skill-entry';

    skillEntry.innerHTML = `
      <input type="text" class="form-control industry-skill-name" placeholder="Required industry skill">
      <select class="form-control industry-skill-rating">
        <option value="">Your current level</option>
        <option value="1">1 = Basic</option>
        <option value="2">2 = Intermediate</option>
        <option value="3">3 = Proficient</option>
        <option value="4">4 = Advanced</option>
        <option value="5">5 = Expert</option>
      </select>
      <textarea class="form-control industry-skill-gap compact-textarea" placeholder="How to close the gap"></textarea>
    `;

    // Add event listeners to save data
    const inputs = skillEntry.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('change', saveData);
    });

    container.appendChild(skillEntry);
    saveData();
  }

  // Add a new terminology entry
  function addTerminology() {
    console.log('Adding terminology entry...');
    const container = document.getElementById('terminologyTranslation');

    if (!container) {
      console.error('Terminology Translation container not found');
      return;
    }

    const termEntry = document.createElement('div');
    termEntry.className = 'terminology-entry';

    termEntry.innerHTML = `
      <input type="text" class="form-control federal-term" placeholder="Federal term/concept">
      <input type="text" class="form-control industry-term" placeholder="Industry equivalent">
      <input type="text" class="form-control term-context" placeholder="Context for usage">
    `;

    // Add event listeners to save data
    const inputs = termEntry.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('change', saveData);
    });

    container.appendChild(termEntry);
    saveData();
  }

  // Add a new achievement entry
  function addAchievement() {
    console.log('Adding achievement...');
    const container = document.getElementById('keyAchievements');

    if (!container) {
      console.error('Key Achievements container not found');
      return;
    }

    const achievementEntry = document.createElement('div');
    achievementEntry.className = 'achievement-entry';

    achievementEntry.innerHTML = `
      <input type="text" class="form-control achievement-title" placeholder="Achievement title">
      <textarea class="form-control achievement-description compact-textarea" placeholder="Brief description of the achievement"></textarea>
      <textarea class="form-control achievement-impact compact-textarea" placeholder="Quantifiable impact (numbers, percentages, etc.)"></textarea>
      <textarea class="form-control achievement-skills compact-textarea" placeholder="Skills demonstrated"></textarea>
    `;

    // Add event listeners to save data
    const inputs = achievementEntry.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('change', saveData);
    });

    container.appendChild(achievementEntry);
    saveData();
  }

  // Add a new STAR story
  function addStarStory() {
    console.log('Adding STAR story...');
    const container = document.getElementById('starStories');

    if (!container) {
      console.error('STAR Stories container not found');
      return;
    }

    // Count existing stories to determine the new story number
    const existingStories = container.querySelectorAll('.star-story');
    const storyNumber = existingStories.length + 1;

    const starStory = document.createElement('div');
    starStory.className = 'star-story';

    starStory.innerHTML = `
      <h4>STAR Story ${storyNumber}</h4>
      <div class="star-fields">
        <div class="star-field">
          <label>Situation:</label>
          <textarea class="form-control compact-textarea" name="situation_${storyNumber}" placeholder="Describe the situation"></textarea>
        </div>
        <div class="star-field">
          <label>Task:</label>
          <textarea class="form-control compact-textarea" name="task_${storyNumber}" placeholder="What was your task or responsibility?"></textarea>
        </div>
        <div class="star-field">
          <label>Action:</label>
          <textarea class="form-control compact-textarea" name="action_${storyNumber}" placeholder="What actions did you take?"></textarea>
        </div>
        <div class="star-field">
          <label>Result:</label>
          <textarea class="form-control compact-textarea" name="result_${storyNumber}" placeholder="What was the outcome? Include metrics if possible"></textarea>
        </div>
        <div class="star-field">
          <label>Skills Demonstrated:</label>
          <textarea class="form-control compact-textarea" name="skills_${storyNumber}" placeholder="What skills did you demonstrate in this story?"></textarea>
        </div>
      </div>
    `;

    // Add event listeners to save data
    const inputs = starStory.querySelectorAll('textarea');
    inputs.forEach(input => {
      input.addEventListener('change', saveData);
    });

    container.appendChild(starStory);
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

      // If showing the summary section, populate it with data from other sections
      if (sectionId === 'section5') {
        populateSummaryTab();
      }
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
      softwareTools: [],
      leadershipSkills: {},
      problemSolvingSkills: {},
      communicationSkills: {},
      achievements: [],
      starStories: [],
      industrySkills: [],
      terminology: [],
      industryAnalysis: {}
    };

    // Collect core technical skills
    coreTechnicalSkillsList.forEach(skill => {
      const select = document.getElementById(skill.id);
      if (select) {
        data.coreTechnicalSkills[skill.id] = select.value;
      }
    });

    // Collect leadership skills
    leadershipSkillsList.forEach(skill => {
      const select = document.getElementById(skill.id);
      if (select) {
        data.leadershipSkills[skill.id] = select.value;
      }
    });

    // Collect problem-solving skills
    problemSolvingSkillsList.forEach(skill => {
      const select = document.getElementById(skill.id);
      if (select) {
        data.problemSolvingSkills[skill.id] = select.value;
      }
    });

    // Collect communication skills
    communicationSkillsList.forEach(skill => {
      const select = document.getElementById(skill.id);
      if (select) {
        data.communicationSkills[skill.id] = select.value;
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

    // Collect achievements
    const achievementEntries = document.querySelectorAll('#keyAchievements .achievement-entry');
    achievementEntries.forEach(entry => {
      const achievementTitle = entry.querySelector('.achievement-title')?.value || '';
      const achievementDescription = entry.querySelector('.achievement-description')?.value || '';
      const achievementImpact = entry.querySelector('.achievement-impact')?.value || '';
      const achievementSkills = entry.querySelector('.achievement-skills')?.value || '';

      if (achievementTitle || achievementDescription || achievementImpact || achievementSkills) {
        data.achievements.push({
          title: achievementTitle,
          description: achievementDescription,
          impact: achievementImpact,
          skills: achievementSkills
        });
      }
    });

    // Collect STAR stories
    data.starStories = [];
    const starStories = document.querySelectorAll('#starStories .star-story');
    starStories.forEach((story, index) => {
      const storyNumber = index + 1;
      const situation = story.querySelector(`[name="situation_${storyNumber}"]`)?.value || '';
      const task = story.querySelector(`[name="task_${storyNumber}"]`)?.value || '';
      const action = story.querySelector(`[name="action_${storyNumber}"]`)?.value || '';
      const result = story.querySelector(`[name="result_${storyNumber}"]`)?.value || '';
      const skills = story.querySelector(`[name="skills_${storyNumber}"]`)?.value || '';

      if (situation || task || action || result || skills) {
        data.starStories.push({
          situation: situation,
          task: task,
          action: action,
          result: result,
          skills: skills
        });
      }
    });

    // Collect industry skills
    data.industrySkills = [];
    const industrySkillEntries = document.querySelectorAll('#industrySkills .industry-skill-entry');
    industrySkillEntries.forEach(entry => {
      const skillName = entry.querySelector('.industry-skill-name')?.value || '';
      const skillRating = entry.querySelector('.industry-skill-rating')?.value || '';
      const skillGap = entry.querySelector('.industry-skill-gap')?.value || '';

      if (skillName || skillRating || skillGap) {
        data.industrySkills.push({
          name: skillName,
          rating: skillRating,
          gap: skillGap
        });
      }
    });

    // Collect terminology translations
    data.terminology = [];
    const terminologyEntries = document.querySelectorAll('#terminologyTranslation .terminology-entry');
    terminologyEntries.forEach(entry => {
      const federalTerm = entry.querySelector('.federal-term')?.value || '';
      const industryTerm = entry.querySelector('.industry-term')?.value || '';
      const termContext = entry.querySelector('.term-context')?.value || '';

      if (federalTerm || industryTerm || termContext) {
        data.terminology.push({
          federal: federalTerm,
          industry: industryTerm,
          context: termContext
        });
      }
    });

    // Collect industry analysis
    const industryInputs = document.querySelectorAll('#industryAnalysis input, #industryAnalysis textarea');
    industryInputs.forEach(input => {
      if (input.name && input.value) {
        data.industryAnalysis[input.name] = input.value;
      }
    });

    // Collect summary data
    data.valueProposition = document.getElementById('valueProposition')?.value || '';

    // Collect top skills
    const topSkillInputs = document.querySelectorAll('#topSkills input');
    topSkillInputs.forEach((input, index) => {
      if (input.value) {
        data[`topSkill${index + 1}`] = input.value;
      }
    });

    // Collect skills to develop
    const developSkillInputs = document.querySelectorAll('#skillsToDevelop input');
    developSkillInputs.forEach((input, index) => {
      if (input.value) {
        data[`developSkill${index + 1}`] = input.value;
      }
    });

    // Collect next steps
    const nextStepInputs = document.querySelectorAll('#nextSteps input');
    nextStepInputs.forEach((input, index) => {
      if (input.value) {
        data[`nextStep${index + 1}`] = input.value;
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

    // Populate leadership skills
    if (data.leadershipSkills) {
      leadershipSkillsList.forEach(skill => {
        const select = document.getElementById(skill.id);
        if (select && data.leadershipSkills[skill.id]) {
          select.value = data.leadershipSkills[skill.id];
        }
      });
    }

    // Populate problem-solving skills
    if (data.problemSolvingSkills) {
      problemSolvingSkillsList.forEach(skill => {
        const select = document.getElementById(skill.id);
        if (select && data.problemSolvingSkills[skill.id]) {
          select.value = data.problemSolvingSkills[skill.id];
        }
      });
    }

    // Populate communication skills
    if (data.communicationSkills) {
      communicationSkillsList.forEach(skill => {
        const select = document.getElementById(skill.id);
        if (select && data.communicationSkills[skill.id]) {
          select.value = data.communicationSkills[skill.id];
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

    const exportFileDefaultName = 'f2i-self-assessment.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  // Download assessment results as CSV
  function downloadResultsAsCSV() {
    console.log('Downloading assessment results as CSV...');
    const data = collectData();
    const csvContent = convertDataToCSV(data);
    const dataUri = 'data:text/csv;charset=utf-8,'+ encodeURIComponent(csvContent);

    const exportFileDefaultName = 'f2i-self-assessment-results.csv';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  // Print assessment
  function printAssessment() {
    console.log('Printing assessment...');
    const data = collectData();
    const csvContent = convertDataToCSV(data);

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Fed 2 Industry Self-Assessment Results</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 20px;
            }
            h1 {
              text-align: center;
              margin-bottom: 20px;
            }
            pre {
              white-space: pre-wrap;
              background-color: #f8f9fa;
              padding: 15px;
              border-radius: 5px;
              font-family: monospace;
            }
            @media print {
              body {
                margin: 0.5in;
              }
            }
          </style>
        </head>
        <body>
          <h1>Fed 2 Industry Self-Assessment Results</h1>
          <pre>${csvContent}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();

    // Wait for content to load before printing
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  }

  // Convert assessment data to CSV format
  function convertDataToCSV(data) {
    let csvContent = 'Fed 2 Industry Self-Assessment Results\n\n';

    // Technical Skills
    csvContent += 'TECHNICAL SKILLS\n';
    csvContent += 'Core Technical Skills:\n';
    csvContent += 'Skill,Rating\n';

    // Core Technical Skills
    for (const skillId in data.coreTechnicalSkills) {
      if (data.coreTechnicalSkills[skillId]) {
        const skillName = coreTechnicalSkillsList.find(s => s.id === skillId)?.name || skillId;
        csvContent += `"${skillName}","${data.coreTechnicalSkills[skillId]}"\n`;
      }
    }

    csvContent += '\nAgency-Specific Technical Skills:\n';
    csvContent += 'Skill,Rating,Notes\n';

    // Agency-Specific Skills
    data.agencySkills.forEach(skill => {
      if (skill.name) {
        csvContent += `"${skill.name}","${skill.rating}","${skill.notes}"\n`;
      }
    });

    csvContent += '\nSoftware & Digital Tools:\n';
    csvContent += 'Tool,Rating,Industry Equivalent\n';

    // Software Tools
    data.softwareTools.forEach(tool => {
      if (tool.name) {
        csvContent += `"${tool.name}","${tool.rating}","${tool.equivalent}"\n`;
      }
    });

    // Transferable Skills
    csvContent += '\nTRANSFERABLE SKILLS\n';
    csvContent += 'Leadership Skills:\n';
    csvContent += 'Skill,Rating\n';

    // Leadership Skills
    for (const skillId in data.leadershipSkills) {
      if (data.leadershipSkills[skillId]) {
        const skillName = leadershipSkillsList.find(s => s.id === skillId)?.name || skillId;
        csvContent += `"${skillName}","${data.leadershipSkills[skillId]}"\n`;
      }
    }

    csvContent += '\nProblem-Solving Skills:\n';
    csvContent += 'Skill,Rating\n';

    // Problem-Solving Skills
    for (const skillId in data.problemSolvingSkills) {
      if (data.problemSolvingSkills[skillId]) {
        const skillName = problemSolvingSkillsList.find(s => s.id === skillId)?.name || skillId;
        csvContent += `"${skillName}","${data.problemSolvingSkills[skillId]}"\n`;
      }
    }

    csvContent += '\nCommunication Skills:\n';
    csvContent += 'Skill,Rating\n';

    // Communication Skills
    for (const skillId in data.communicationSkills) {
      if (data.communicationSkills[skillId]) {
        const skillName = communicationSkillsList.find(s => s.id === skillId)?.name || skillId;
        csvContent += `"${skillName}","${data.communicationSkills[skillId]}"\n`;
      }
    }

    // Achievements
    csvContent += '\nACHIEVEMENTS & IMPACT\n';
    csvContent += 'Key Achievements:\n';
    csvContent += 'Title,Description,Impact,Skills Demonstrated\n';

    data.achievements.forEach(achievement => {
      if (achievement.title || achievement.description) {
        csvContent += `"${achievement.title}","${achievement.description}","${achievement.impact}","${achievement.skills}"\n`;
      }
    });

    // STAR Stories
    csvContent += '\nSTAR Stories:\n';

    data.starStories.forEach((story, index) => {
      csvContent += `\nSTAR Story ${index + 1}:\n`;
      csvContent += `Situation: ${story.situation}\n`;
      csvContent += `Task: ${story.task}\n`;
      csvContent += `Action: ${story.action}\n`;
      csvContent += `Result: ${story.result}\n`;
      csvContent += `Skills Demonstrated: ${story.skills}\n`;
    });

    // Industry Analysis
    csvContent += '\nINDUSTRY ANALYSIS\n';
    csvContent += 'Target Industries:\n';

    if (data.industryAnalysis.targetIndustry1) {
      csvContent += `1. ${data.industryAnalysis.targetIndustry1}\n`;
    }
    if (data.industryAnalysis.targetIndustry2) {
      csvContent += `2. ${data.industryAnalysis.targetIndustry2}\n`;
    }
    if (data.industryAnalysis.targetIndustry3) {
      csvContent += `3. ${data.industryAnalysis.targetIndustry3}\n`;
    }

    csvContent += '\nTarget Industry Skills:\n';
    csvContent += 'Skill,Current Level,Gap Closure Plan\n';

    data.industrySkills.forEach(skill => {
      if (skill.name) {
        csvContent += `"${skill.name}","${skill.rating}","${skill.gap}"\n`;
      }
    });

    csvContent += '\nTerminology Translation:\n';
    csvContent += 'Federal Term,Industry Equivalent,Context\n';

    data.terminology.forEach(term => {
      if (term.federal || term.industry) {
        csvContent += `"${term.federal}","${term.industry}","${term.context}"\n`;
      }
    });

    // Summary
    csvContent += '\nSUMMARY\n';
    csvContent += `Value Proposition: ${data.valueProposition || ''}\n\n`;

    csvContent += 'Top Skills:\n';
    for (let i = 1; i <= 5; i++) {
      const skillValue = data[`topSkill${i}`] || '';
      if (skillValue) {
        csvContent += `${i}. ${skillValue}\n`;
      }
    }

    csvContent += '\nSkills to Develop:\n';
    for (let i = 1; i <= 3; i++) {
      const skillValue = data[`developSkill${i}`] || '';
      if (skillValue) {
        csvContent += `${i}. ${skillValue}\n`;
      }
    }

    csvContent += '\nNext Steps:\n';
    for (let i = 1; i <= 3; i++) {
      const stepValue = data[`nextStep${i}`] || '';
      if (stepValue) {
        csvContent += `${i}. ${stepValue}\n`;
      }
    }

    return csvContent;
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

    // Count filled fields in all sections
    const totalFields = coreTechnicalSkillsList.length +
                        document.querySelectorAll('#agencySkills input, #agencySkills select, #agencySkills textarea').length +
                        document.querySelectorAll('#softwareTools input, #softwareTools select').length +
                        leadershipSkillsList.length +
                        problemSolvingSkillsList.length +
                        communicationSkillsList.length;

    let filledFields = 0;

    // Count filled core technical skills
    coreTechnicalSkillsList.forEach(skill => {
      const select = document.getElementById(skill.id);
      if (select && select.value) {
        filledFields++;
      }
    });

    // Count filled leadership skills
    leadershipSkillsList.forEach(skill => {
      const select = document.getElementById(skill.id);
      if (select && select.value) {
        filledFields++;
      }
    });

    // Count filled problem-solving skills
    problemSolvingSkillsList.forEach(skill => {
      const select = document.getElementById(skill.id);
      if (select && select.value) {
        filledFields++;
      }
    });

    // Count filled communication skills
    communicationSkillsList.forEach(skill => {
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

  // Populate summary tab with data from other sections
  function populateSummaryTab() {
    console.log('Populating summary tab...');
    const data = collectData();

    // Get top skills based on ratings
    const allSkills = [];

    // Add technical skills
    for (const skillId in data.coreTechnicalSkills) {
      const rating = parseInt(data.coreTechnicalSkills[skillId]);
      if (rating >= 4) { // Only include skills rated 4 or 5
        const skillName = coreTechnicalSkillsList.find(s => s.id === skillId)?.name;
        if (skillName) {
          allSkills.push({ name: skillName, rating: rating });
        }
      }
    }

    // Add leadership skills
    for (const skillId in data.leadershipSkills) {
      const rating = parseInt(data.leadershipSkills[skillId]);
      if (rating >= 4) { // Only include skills rated 4 or 5
        const skillName = leadershipSkillsList.find(s => s.id === skillId)?.name;
        if (skillName) {
          allSkills.push({ name: skillName, rating: rating });
        }
      }
    }

    // Add problem-solving skills
    for (const skillId in data.problemSolvingSkills) {
      const rating = parseInt(data.problemSolvingSkills[skillId]);
      if (rating >= 4) { // Only include skills rated 4 or 5
        const skillName = problemSolvingSkillsList.find(s => s.id === skillId)?.name;
        if (skillName) {
          allSkills.push({ name: skillName, rating: rating });
        }
      }
    }

    // Add communication skills
    for (const skillId in data.communicationSkills) {
      const rating = parseInt(data.communicationSkills[skillId]);
      if (rating >= 4) { // Only include skills rated 4 or 5
        const skillName = communicationSkillsList.find(s => s.id === skillId)?.name;
        if (skillName) {
          allSkills.push({ name: skillName, rating: rating });
        }
      }
    }

    // Add agency-specific skills
    data.agencySkills.forEach(skill => {
      const rating = parseInt(skill.rating);
      if (rating >= 4) { // Only include skills rated 4 or 5
        allSkills.push({ name: skill.name, rating: rating });
      }
    });

    // Sort skills by rating (highest first)
    allSkills.sort((a, b) => b.rating - a.rating);

    // Populate top skills fields
    const topSkillInputs = document.querySelectorAll('#topSkills input');
    for (let i = 0; i < Math.min(topSkillInputs.length, allSkills.length); i++) {
      topSkillInputs[i].value = allSkills[i].name;
    }

    // Get skills to develop (lowest rated skills)
    const skillsToDevelop = [];

    // Add all skills with ratings 1-3
    const lowRatedSkills = [];

    // Technical skills
    for (const skillId in data.coreTechnicalSkills) {
      const rating = parseInt(data.coreTechnicalSkills[skillId]);
      if (rating > 0 && rating <= 3) { // Only include skills rated 1-3
        const skillName = coreTechnicalSkillsList.find(s => s.id === skillId)?.name;
        if (skillName) {
          lowRatedSkills.push({ name: skillName, rating: rating });
        }
      }
    }

    // Leadership skills
    for (const skillId in data.leadershipSkills) {
      const rating = parseInt(data.leadershipSkills[skillId]);
      if (rating > 0 && rating <= 3) { // Only include skills rated 1-3
        const skillName = leadershipSkillsList.find(s => s.id === skillId)?.name;
        if (skillName) {
          lowRatedSkills.push({ name: skillName, rating: rating });
        }
      }
    }

    // Sort by rating (lowest first)
    lowRatedSkills.sort((a, b) => a.rating - b.rating);

    // Populate skills to develop fields
    const developSkillInputs = document.querySelectorAll('#skillsToDevelop input');
    for (let i = 0; i < Math.min(developSkillInputs.length, lowRatedSkills.length); i++) {
      developSkillInputs[i].value = lowRatedSkills[i].name;
    }

    // Create value proposition based on top skills and achievements
    const valueProposition = document.getElementById('valueProposition');
    if (valueProposition && allSkills.length > 0) {
      // Only auto-generate if the field is empty
      if (!valueProposition.value.trim()) {
        const topThreeSkills = allSkills.slice(0, 3).map(skill => skill.name).join(', ');

        // Get a significant achievement if available
        let achievementPhrase = '';
        if (data.achievements && data.achievements.length > 0) {
          // Find an achievement with title and description
          const significantAchievement = data.achievements.find(a => a.title && a.description);
          if (significantAchievement) {
            achievementPhrase = ` with demonstrated success in ${significantAchievement.title}`;
          }
        }

        valueProposition.value = `Experienced federal professional with expertise in ${topThreeSkills}${achievementPhrase}. Bringing a unique perspective from government service with a proven track record of delivering results in complex regulatory environments.`;
      }
    }

    // Suggest next steps based on assessment data
    const nextStepInputs = document.querySelectorAll('#nextSteps input');

    // First step is always about the resume
    if (nextStepInputs[0] && !nextStepInputs[0].value.trim()) {
      nextStepInputs[0].value = "Update resume to highlight transferable skills";
    }

    // Second step depends on industry analysis
    if (nextStepInputs[1] && !nextStepInputs[1].value.trim()) {
      if (data.industryAnalysis && data.industryAnalysis.targetIndustry1) {
        nextStepInputs[1].value = `Research companies in the ${data.industryAnalysis.targetIndustry1} industry`;
      } else {
        nextStepInputs[1].value = "Research target companies in preferred industries";
      }
    }

    // Third step is about networking
    if (nextStepInputs[2] && !nextStepInputs[2].value.trim()) {
      // If they have skills to develop, suggest that
      if (lowRatedSkills.length > 0) {
        nextStepInputs[2].value = `Develop skills in ${lowRatedSkills[0].name}`;
      } else {
        nextStepInputs[2].value = "Connect with industry professionals for informational interviews";
      }
    }
  }
});
