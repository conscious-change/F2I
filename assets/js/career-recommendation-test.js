/**
 * Career Recommendation Test
 *
 * This script handles the functionality for the career recommendation test page.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check if FileReader is available
  if (typeof FileReader === 'undefined') {
    console.error('FileReader API is not available in this browser');

    // Create a simple polyfill for FileReader
    window.FileReader = function() {
      this.readAsText = function(file) {
        const reader = this;

        // Use XMLHttpRequest as a fallback
        const xhr = new XMLHttpRequest();
        xhr.open('GET', URL.createObjectURL(file), true);
        xhr.onload = function() {
          if (xhr.status === 200) {
            if (reader.onload) {
              reader.result = xhr.responseText;
              reader.onload({ target: reader });
            }
          } else {
            if (reader.onerror) {
              reader.onerror(new Error('Failed to load file'));
            }
          }
        };
        xhr.onerror = function() {
          if (reader.onerror) {
            reader.onerror(new Error('Failed to load file'));
          }
        };
        xhr.send();
      };
    };

    console.log('FileReader polyfill has been added');
  } else {
    console.log('FileReader API is available');
  }

  // DOM elements
  const loadSampleDataBtn = document.getElementById('loadSampleData');
  const loadFromAssessmentBtn = document.getElementById('loadFromAssessment');
  const assessmentFileInput = document.getElementById('assessmentFileInput');
  const topTechnicalSkillsElement = document.getElementById('topTechnicalSkills');
  const topSoftSkillsElement = document.getElementById('topSoftSkills');
  const skillGapsElement = document.getElementById('skillGaps');
  const careerMatchesElement = document.getElementById('careerMatches');
  const careerDetailsElement = document.getElementById('careerDetails');

  // Current user profile and selected career
  let currentProfile = null;
  let selectedCareer = null;

  // Sample data for testing
  const sampleData = {
    coreTechnicalSkills: {
      "data_analysis": 5,
      "project_management": 4,
      "regulatory_compliance": 3,
      "budget_management": 4,
      "policy_development": 2
    },
    agencySkills: [
      { name: "Federal Acquisition", rating: "5", notes: "Led procurement teams" },
      { name: "Grant Management", rating: "4", notes: "Managed federal grants" },
      { name: "Legislative Analysis", rating: "3", notes: "Reviewed policy impacts" }
    ],
    softwareTools: [
      { name: "Microsoft Excel", rating: "5", equivalent: "Advanced data analysis" },
      { name: "Tableau", rating: "3", equivalent: "Data visualization" },
      { name: "SharePoint", rating: "4", equivalent: "Content management" }
    ],
    industrySkills: [
      { name: "Agile Methodology", rating: "2", gap: "Need formal training" },
      { name: "Cloud Computing", rating: "1", gap: "Require AWS certification" },
      { name: "Product Management", rating: "3", gap: "Need private sector experience" }
    ],
    leadershipSkills: {
      "team_leadership": 4,
      "strategic_planning": 5,
      "change_management": 3,
      "mentoring": 4
    },
    problemSolvingSkills: {
      "critical_thinking": 5,
      "decision_making": 4,
      "risk_assessment": 5,
      "process_improvement": 3
    },
    communicationSkills: {
      "written_communication": 5,
      "presentation": 4,
      "stakeholder_management": 4,
      "negotiation": 3
    },
    industryAnalysis: {
      targetIndustry1: "Technology",
      targetIndustry2: "Consulting",
      targetIndustry3: "Healthcare"
    },
    achievements: [
      {
        title: "Process Improvement Initiative",
        description: "Led agency-wide process improvement",
        impact: "Reduced processing time by 30%",
        skills: "Leadership, Process Analysis"
      },
      {
        title: "Budget Optimization",
        description: "Identified cost-saving opportunities",
        impact: "Saved $2.5M annually",
        skills: "Financial Analysis, Strategic Planning"
      }
    ],
    starStories: [
      {
        situation: "Agency faced compliance deadline",
        task: "Needed to coordinate cross-functional team",
        action: "Developed project plan and led daily standups",
        result: "Completed project 2 weeks ahead of schedule",
        skills: "Project Management, Leadership"
      }
    ],
    developSkill1: "Cloud Computing",
    developSkill2: "Agile Project Management",
    developSkill3: "Data Science",
    nextStep1: "Apply for role as a Product Manager in tech company",
    nextStep2: "Complete AWS certification",
    nextStep3: "Expand professional network in target industry"
  };

  // Function to calculate career match score (0-100)
  function calculateMatchScore(profile, career) {
    let score = 0;
    let maxScore = 0;

    // Technical skills match
    const topTechSkills = profile.getTopTechnicalSkills();
    topTechSkills.forEach(skill => {
      const normalizedSkillName = skill.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const careerSkillRating = career.requiredSkills.technical[normalizedSkillName] || 0;

      if (careerSkillRating > 0) {
        // Weight by importance to the career
        score += (skill.rating * careerSkillRating) / 5;
        maxScore += careerSkillRating;
      }
    });

    // Soft skills match
    const topSoftSkills = profile.getTopSoftSkills();
    topSoftSkills.forEach(skill => {
      const normalizedSkillName = skill.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const careerSkillRating = career.requiredSkills.soft[normalizedSkillName] || 0;

      if (careerSkillRating > 0) {
        // Weight by importance to the career
        score += (skill.rating * careerSkillRating) / 5;
        maxScore += careerSkillRating;
      }
    });

    // Industry interest match
    if (profile.professionalInterests.targetIndustries.length > 0) {
      const industries = profile.professionalInterests.targetIndustries.map(i => i.toLowerCase());
      const careerIndustries = career.relatedInterests.map(i => i.toLowerCase());

      // Check for overlapping interests
      const overlappingInterests = industries.filter(i => careerIndustries.includes(i));
      if (overlappingInterests.length > 0) {
        score += 10 * (overlappingInterests.length / careerIndustries.length);
        maxScore += 10;
      }
    }

    // Calculate final percentage score
    const finalScore = maxScore > 0 ? Math.round((score / maxScore) * 100) : 50;

    // Adjust score based on skill gaps
    const skillGaps = profile.getSkillGaps();
    const criticalGaps = skillGaps.filter(gap => {
      const normalizedSkillName = gap.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
      return career.requiredSkills.technical[normalizedSkillName] >= 4;
    });

    // Penalize for critical skill gaps
    if (criticalGaps.length > 0) {
      return Math.max(finalScore - (criticalGaps.length * 10), 30);
    }

    return finalScore;
  }

  // Function to display profile data and career matches
  function displayProfileData(profile) {
    currentProfile = profile;

    // Display top technical skills
    const topTechSkills = profile.getTopTechnicalSkills();
    if (topTechSkills.length > 0) {
      topTechnicalSkillsElement.innerHTML = topTechSkills.map(skill =>
        `<div class="skill-item">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-rating">Rating: ${skill.rating}/5</span>
        </div>`
      ).join('');
    } else {
      topTechnicalSkillsElement.textContent = "No top technical skills identified.";
    }

    // Display top soft skills
    const topSoftSkillsList = profile.getTopSoftSkills();
    if (topSoftSkillsList.length > 0) {
      topSoftSkillsElement.innerHTML = topSoftSkillsList.map(skill =>
        `<div class="skill-item">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-rating">Rating: ${skill.rating}/5</span>
        </div>`
      ).join('');
    } else {
      topSoftSkillsElement.textContent = "No top soft skills identified.";
    }

    // Display skill gaps
    const skillGapsList = profile.getSkillGaps();
    if (skillGapsList.length > 0) {
      skillGapsElement.innerHTML = skillGapsList.map(skill =>
        `<div class="skill-item">
          <div>
            <span class="skill-name">${skill.name}</span>
            <div class="skill-gap-note">Gap: ${skill.gap || 'Not specified'}</div>
          </div>
          <span class="skill-rating">Current Level: ${skill.rating}/5</span>
        </div>`
      ).join('');
    } else {
      skillGapsElement.textContent = "No significant skill gaps identified.";
    }

    // Calculate and display career matches
    const careerMatches = careerDatabase.map(career => {
      const matchScore = calculateMatchScore(profile, career);
      return {
        career: career,
        score: matchScore
      };
    }).sort((a, b) => b.score - a.score);

    if (careerMatches.length > 0) {
      careerMatchesElement.innerHTML = careerMatches.map(match =>
        `<div class="career-match-item" data-career-id="${match.career.id}">
          <div class="match-score">${match.score}% Match</div>
          <div class="career-title">${match.career.title}</div>
          <div class="career-description">${match.career.description}</div>
        </div>`
      ).join('');

      // Add event listeners to career match items
      document.querySelectorAll('.career-match-item').forEach(item => {
        item.addEventListener('click', function() {
          const careerId = this.getAttribute('data-career-id');
          const career = careerDatabase.find(c => c.id === careerId);

          // Update selected state
          document.querySelectorAll('.career-match-item').forEach(el => {
            el.classList.remove('selected');
          });
          this.classList.add('selected');

          // Display career details
          displayCareerDetails(career);
        });
      });

      // Select the first career by default
      if (careerMatches.length > 0) {
        const firstCareer = careerMatches[0].career;
        document.querySelector('.career-match-item').classList.add('selected');
        displayCareerDetails(firstCareer);
      }
    } else {
      careerMatchesElement.innerHTML = "<p>No career matches found.</p>";
      careerDetailsElement.innerHTML = "<p>No career details available.</p>";
    }
  }

  // Function to display career details
  function displayCareerDetails(career) {
    selectedCareer = career;

    // Create HTML for career details
    let html = `
      <div class="career-details-header">
        <div class="career-details-title">${career.title}</div>
        <div class="career-details-salary">${career.careerInfo.medianSalary}</div>
      </div>

      <p>${career.description}</p>
      <p><strong>Federal Transition:</strong> ${career.federalTransition}</p>

      <h4>Required Technical Skills</h4>
      <ul class="skills-list">
    `;

    // Add technical skills
    const technicalSkills = Object.entries(career.requiredSkills.technical)
      .filter(([_, rating]) => rating >= 3)
      .sort((a, b) => b[1] - a[1]);

    if (technicalSkills.length > 0) {
      technicalSkills.forEach(([skill, rating]) => {
        const formattedSkill = skill.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        html += `<li>${formattedSkill} <span class="skill-rating">Importance: ${rating}/5</span></li>`;
      });
    } else {
      html += `<li>No specific technical skills listed.</li>`;
    }

    html += `
      </ul>

      <h4>Required Soft Skills</h4>
      <ul class="skills-list">
    `;

    // Add soft skills
    const softSkills = Object.entries(career.requiredSkills.soft)
      .filter(([_, rating]) => rating >= 3)
      .sort((a, b) => b[1] - a[1]);

    if (softSkills.length > 0) {
      softSkills.forEach(([skill, rating]) => {
        const formattedSkill = skill.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        html += `<li>${formattedSkill} <span class="skill-rating">Importance: ${rating}/5</span></li>`;
      });
    } else {
      html += `<li>No specific soft skills listed.</li>`;
    }

    html += `
      </ul>

      <h4>Relevant Tools & Technologies</h4>
      <ul class="tools-list">
    `;

    // Add relevant tools
    if (career.relevantTools && career.relevantTools.length > 0) {
      career.relevantTools.forEach(tool => {
        html += `<li>${tool}</li>`;
      });
    } else {
      html += `<li>No specific tools listed.</li>`;
    }

    html += `
      </ul>

      <h4>Career Information</h4>
      <div class="career-info-grid">
        <div class="career-info-item">
          <div class="career-info-label">Salary Range</div>
          <div class="career-info-value">${career.careerInfo.salaryRange}</div>
        </div>

        <div class="career-info-item">
          <div class="career-info-label">Job Outlook</div>
          <div class="career-info-value">${career.careerInfo.outlook}</div>
        </div>

        <div class="career-info-item">
          <div class="career-info-label">Work Environment</div>
          <div class="career-info-value">${career.careerInfo.workEnvironment}</div>
        </div>

        <div class="career-info-item">
          <div class="career-info-label">Career Advancement</div>
          <div class="career-info-value">${career.careerInfo.advancement}</div>
        </div>

        <div class="career-info-item">
          <div class="career-info-label">Entry Requirements</div>
          <div class="career-info-value">${career.careerInfo.entryRequirements}</div>
        </div>
      </div>

      <h4>Federal-to-Private Transition Tips</h4>
      <ul class="tips-list">
    `;

    // Add transition tips
    if (career.transitionTips && career.transitionTips.length > 0) {
      career.transitionTips.forEach(tip => {
        html += `<li>${tip}</li>`;
      });
    } else {
      html += `<li>No specific transition tips available.</li>`;
    }

    html += `
      </ul>
    `;

    careerDetailsElement.innerHTML = html;
  }

  // Load sample data
  loadSampleDataBtn.addEventListener('click', function() {
    console.log('Loading sample data...');

    // Use XMLHttpRequest to load the sample file
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/assets/data/f2i-self-assessment-template.json', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log('Sample data loaded successfully');
        const assessmentData = JSON.parse(xhr.responseText);
        const profile = new UserAssessmentProfile();
        profile.populateFromSelfAssessment(assessmentData);
        displayProfileData(profile);
      } else {
        console.error('Error loading sample data:', xhr.statusText);
        // Try the fallback file if the template doesn't exist
        console.log('Trying fallback location...');
        const fallbackXhr = new XMLHttpRequest();
        fallbackXhr.open('GET', '/changes_logs/extra/f2i-self-assessment-template.json', true);
        fallbackXhr.onload = function() {
          if (fallbackXhr.status === 200) {
            console.log('Fallback sample data loaded successfully');
            const assessmentData = JSON.parse(fallbackXhr.responseText);
            const profile = new UserAssessmentProfile();
            profile.populateFromSelfAssessment(assessmentData);
            displayProfileData(profile);
          } else {
            console.error('Error loading fallback sample data:', fallbackXhr.statusText);
            // Try the original file as a last resort
            console.log('Trying original file as last resort...');
            const lastResortXhr = new XMLHttpRequest();
            lastResortXhr.open('GET', '/changes_logs/extra/f2i-self-assessment-filled.json', true);
            lastResortXhr.onload = function() {
              if (lastResortXhr.status === 200) {
                console.log('Last resort sample data loaded successfully');
                const assessmentData = JSON.parse(lastResortXhr.responseText);
                const profile = new UserAssessmentProfile();
                profile.populateFromSelfAssessment(assessmentData);
                displayProfileData(profile);
              } else {
                console.error('Error loading last resort sample data:', lastResortXhr.statusText);
                alert('Error loading sample data. Please try again later.');
              }
            };
            lastResortXhr.onerror = function() {
              console.error('Error loading last resort sample data');
              alert('Error loading sample data. Please try again later.');
            };
            lastResortXhr.send();
          }
        };
        fallbackXhr.onerror = function() {
          console.error('Error loading fallback sample data');
          alert('Error loading sample data. Please try again later.');
        };
        fallbackXhr.send();
      }
    };
    xhr.onerror = function() {
      console.error('Error loading sample data');
      alert('Error loading sample data. Please try again later.');
    };
    xhr.send();
  });

  // Load from self-assessment file
  loadFromAssessmentBtn.addEventListener('click', function() {
    // First try to get data from localStorage (if user is coming from self-assessment page)
    const storedData = localStorage.getItem('assessmentData');
    if (storedData) {
      try {
        console.log('Found assessment data in localStorage');
        const assessmentData = JSON.parse(storedData);
        const profile = new UserAssessmentProfile();
        profile.populateFromSelfAssessment(assessmentData);
        displayProfileData(profile);
        return;
      } catch (error) {
        console.error('Error processing stored assessment data:', error);
        // Continue to file input if localStorage approach fails
      }
    }

    // If no data in localStorage or processing failed, use file input
    assessmentFileInput.click();
  });

  // Handle file selection
  assessmentFileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    console.log('File selected:', file.name);

    // Safari-compatible approach for reading files
    try {
      console.log('Reading file using direct FileReader approach...');
      const reader = new FileReader();

      reader.onload = function(e) {
        console.log('File loaded successfully');
        try {
          const assessmentData = JSON.parse(e.target.result);
          console.log('JSON parsed successfully');
          const profile = new UserAssessmentProfile();
          console.log('Profile created');
          profile.populateFromSelfAssessment(assessmentData);
          console.log('Profile populated');
          displayProfileData(profile);
          console.log('Profile data displayed');
        } catch (error) {
          console.error('Error processing assessment data:', error);
          alert('Error processing assessment data: ' + error.message);
        }
      };

      reader.onerror = function(e) {
        console.error('Error reading file:', e);

        // Try alternative approach for Safari
        console.log('Trying alternative approach for Safari...');
        try {
          // Create a form and FormData object
          const formData = new FormData();
          formData.append('file', file);

          // Use fetch API instead of XMLHttpRequest
          fetch('/process-assessment-file', {
            method: 'POST',
            body: formData
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('File processed via server');
            const profile = new UserAssessmentProfile();
            profile.populateFromSelfAssessment(data);
            displayProfileData(profile);
          })
          .catch(error => {
            console.error('Error with server approach:', error);

            // Final fallback - prompt user to use Firefox or Chrome
            alert('Your browser (Safari) has stricter security settings that prevent direct file loading. Please try using Firefox or Chrome, or use the "Load Sample Data" button instead.');
          });
        } catch (fallbackError) {
          console.error('Error with fallback approach:', fallbackError);
          alert('Unable to load file in this browser. Please try using Firefox or Chrome, or use the "Load Sample Data" button instead.');
        }
      };

      // Direct file reading - works in most browsers
      console.log('Reading file as text...');
      reader.readAsText(file);
    } catch (error) {
      console.error('Error with FileReader:', error);
      alert('Error with file processing: ' + error.message + '\n\nPlease try using Firefox or Chrome, or use the "Load Sample Data" button instead.');
    }
  });
});
