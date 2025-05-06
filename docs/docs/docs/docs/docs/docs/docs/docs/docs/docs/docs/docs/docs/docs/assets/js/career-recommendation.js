/**
 * Career Recommendation Engine
 *
 * This script handles the functionality for the career recommendation page.
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

    // Get all skills data
    const topTechSkills = profile.getTopTechnicalSkills();
    const topSoftSkillsList = profile.getTopSoftSkills();
    const skillGapsList = profile.getSkillGaps();

    // Display skills using radar chart visualization
    displaySkillsRadarChart(topTechSkills, topSoftSkillsList, skillGapsList);

    // Display skill gaps in text format
    displaySkillGaps(skillGapsList);

    // Also create a tabular view for skills
    displaySkillTable(topTechSkills, topSoftSkillsList, skillGapsList);

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

  // Function to display skills using radar chart
  function displaySkillsRadarChart(techSkills, softSkills, gapSkills) {
    try {
      // Check if Chart.js is loaded
      if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded. Please check your internet connection or try a different browser.');
        document.getElementById('skillsRadarChart').innerHTML = `
          <div class="error-message">
            <p>Unable to load the chart library. Please check your internet connection or try a different browser.</p>
          </div>
        `;
        return;
      }

      // Get the canvas element
      const canvas = document.getElementById('radarChart');
      if (!canvas) {
        console.error('Radar chart canvas element not found');
        return;
      }

      const ctx = canvas.getContext('2d');

      // Handle case when there are no skills to display
      if (techSkills.length === 0 && softSkills.length === 0) {
        document.getElementById('skillsRadarChart').innerHTML = `
          <div class="no-skills-message">
            <p>No skills data available to display. Please load assessment data to see your skills radar chart.</p>
          </div>
        `;
        return;
      }

      // Prepare data for the radar chart
      const skillCategories = [
        { name: 'Technical', skills: techSkills, color: 'rgba(0, 86, 179, 0.7)', borderColor: 'rgb(0, 86, 179)' }, // Blue
        { name: 'Soft', skills: softSkills, color: 'rgba(40, 167, 69, 0.7)', borderColor: 'rgb(40, 167, 69)' }     // Green
      ];

      // Create datasets for the chart
      const datasets = [];
      const labels = [];
      const labelMap = {};

      // Process each skill category
      skillCategories.forEach(category => {
        if (category.skills.length === 0) return;

        const data = [];

        // Add top skills (up to 5) from each category to the chart
        category.skills.slice(0, 5).forEach(skill => {
          // Format skill name
          const formattedName = skill.name
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());

          // Add to labels if not already present
          if (!labelMap[formattedName]) {
            labels.push(formattedName);
            labelMap[formattedName] = labels.length - 1;
          }

          // Ensure data array has enough elements
          while (data.length < labels.length) {
            data.push(0);
          }

          // Set the skill rating in the data array
          data[labelMap[formattedName]] = skill.rating;
        });

        // Add dataset for this category
        datasets.push({
          label: category.name + ' Skills',
          data: data,
          backgroundColor: category.color,
          borderColor: category.borderColor,
          borderWidth: 2,
          pointBackgroundColor: category.borderColor,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: category.borderColor,
          pointRadius: 4,
          pointHoverRadius: 6
        });
      });

      // If no datasets were created, show a message
      if (datasets.length === 0 || labels.length === 0) {
        document.getElementById('skillsRadarChart').innerHTML = `
          <div class="no-skills-message">
            <p>No skills data available to display. Please load assessment data to see your skills radar chart.</p>
          </div>
        `;
        return;
      }

      // Fill in missing data points for all datasets
      datasets.forEach(dataset => {
        while (dataset.data.length < labels.length) {
          dataset.data.push(0);
        }
      });

      // Create the radar chart
      try {
        // Check if there's an existing chart and destroy it properly
        if (window.skillsRadarChart instanceof Chart) {
          window.skillsRadarChart.destroy();
        } else if (window.skillsRadarChart) {
          // If it exists but isn't a Chart instance, remove it
          delete window.skillsRadarChart;
        }
      } catch (e) {
        console.log('No previous chart to destroy or error destroying chart:', e);
        // Clear any existing canvas content
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // Create new chart - wrap in try/catch for extra safety
      try {
        window.skillsRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)'
              },
              suggestedMin: 0,
              suggestedMax: 5,
              ticks: {
                stepSize: 1,
                callback: function(value) {
                  return value;
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.raw + '/5';
                }
              }
            }
          }
        }
      });
      } catch (chartError) {
        console.error('Error creating chart:', chartError);
        // Provide a fallback display with text-based skill ratings
        const skillsContainer = document.getElementById('skillsRadarChart');
        if (skillsContainer) {
          let fallbackHTML = `
            <div class="fallback-skills">
              <div class="error-message">
                <p>Unable to display radar chart. Showing skills in text format instead.</p>
              </div>
              <div class="fallback-skills-container">
          `;

          // Add technical skills
          if (techSkills && techSkills.length > 0) {
            fallbackHTML += `
              <div class="fallback-skill-category">
                <h5>Technical Skills</h5>
                <ul class="fallback-skill-list">
                  ${techSkills.slice(0, 5).map(skill => {
                    const formattedName = skill.name
                      .replace(/_/g, ' ')
                      .replace(/\b\w/g, l => l.toUpperCase());
                    const stars = '★'.repeat(skill.rating) + '☆'.repeat(5 - skill.rating);
                    return `<li><span class="fallback-skill-name">${formattedName}</span> <span class="star-rating">${stars}</span></li>`;
                  }).join('')}
                </ul>
              </div>
            `;
          }

          // Add soft skills
          if (softSkills && softSkills.length > 0) {
            fallbackHTML += `
              <div class="fallback-skill-category">
                <h5>Soft Skills</h5>
                <ul class="fallback-skill-list">
                  ${softSkills.slice(0, 5).map(skill => {
                    const formattedName = skill.name
                      .replace(/_/g, ' ')
                      .replace(/\b\w/g, l => l.toUpperCase());
                    const stars = '★'.repeat(skill.rating) + '☆'.repeat(5 - skill.rating);
                    return `<li><span class="fallback-skill-name">${formattedName}</span> <span class="star-rating">${stars}</span></li>`;
                  }).join('')}
                </ul>
              </div>
            `;
          }

          fallbackHTML += `
              </div>
            </div>
          `;

          skillsContainer.innerHTML = fallbackHTML;
        }
        return; // Exit the function since we've provided a fallback
      }

      // Create custom legend
      const legendContainer = document.getElementById('radarChartLegend');
      if (legendContainer) {
        legendContainer.innerHTML = datasets.map(dataset => `
          <div class="legend-item">
            <div class="legend-color" style="background-color: ${dataset.borderColor}"></div>
            <div class="legend-label">${dataset.label}</div>
          </div>
        `).join('');
      }
    } catch (error) {
      console.error('Error creating radar chart:', error);
      // Provide a fallback display
      document.getElementById('skillsRadarChart').innerHTML = `
        <div class="error-message">
          <p>There was an error displaying the radar chart. Please try again or use a different browser.</p>
          <p class="error-details">Error: ${error.message}</p>
        </div>
      `;
    }
  }

  // Function to display skill gaps
  function displaySkillGaps(gapSkills) {
    try {
      if (!skillGapsElement) {
        console.error('Skill gaps element not found');
        return;
      }

      if (gapSkills && gapSkills.length > 0) {
        skillGapsElement.innerHTML = `
          <div class="skill-gaps-list">
            ${gapSkills.map(skill => {
              // Format skill name
              const formattedName = skill.name
                .replace(/_/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());

              // Determine severity class based on rating
              const severityClass = skill.rating <= 2 ? 'severe-gap' : 'moderate-gap';

              return `
                <div class="skill-gap-item ${severityClass}">
                  <div class="skill-gap-header">
                    <span class="skill-gap-name">${formattedName}</span>
                    <span class="skill-gap-rating">Current Level: ${skill.rating}/5</span>
                  </div>
                  <div class="skill-gap-note">${skill.gap || 'No specific gap information provided.'}</div>
                </div>
              `;
            }).join('')}
          </div>`;
      } else {
        skillGapsElement.innerHTML = `
          <div class="no-gaps-message">
            <p>No significant skill gaps identified. Load assessment data to see any skill gaps.</p>
          </div>`;
      }
    } catch (error) {
      console.error('Error displaying skill gaps:', error);
      if (skillGapsElement) {
        skillGapsElement.innerHTML = `
          <div class="error-message">
            <p>There was an error displaying skill gaps. Please try again.</p>
          </div>`;
      }
    }
  }

  // Function to display skills in a tabular format
  function displaySkillTable(techSkills, softSkills, gapSkills) {
    try {
      // Create a container for the skill table if it doesn't exist
      if (!document.getElementById('skillTableContainer')) {
        const skillsProfileSection = document.querySelector('.skills-profile-section');
        if (!skillsProfileSection) {
          console.error('Skills profile section not found');
          return;
        }

        const container = document.createElement('div');
        container.id = 'skillTableContainer';
        container.className = 'skill-table-container';
        container.innerHTML = `
          <h3>Skills Comparison Table</h3>
          <div class="table-controls">
            <button id="sortByName" class="btn btn-sm btn-outline-secondary">Sort by Name</button>
            <button id="sortByRating" class="btn btn-sm btn-outline-secondary">Sort by Rating</button>
            <button id="sortByCategory" class="btn btn-sm btn-outline-secondary">Sort by Category</button>
          </div>
          <div class="table-responsive">
            <table id="skillsTable" class="skills-table">
              <thead>
                <tr>
                  <th>Skill</th>
                  <th>Category</th>
                  <th>Rating</th>
                  <th>Gap Analysis</th>
                </tr>
              </thead>
              <tbody id="skillsTableBody">
              </tbody>
            </table>
          </div>
        `;

        // Add the table after the skills profile section
        skillsProfileSection.appendChild(container);

        // Add event listeners for sorting
        document.getElementById('sortByName').addEventListener('click', () => sortSkillTable('name'));
        document.getElementById('sortByRating').addEventListener('click', () => sortSkillTable('rating'));
        document.getElementById('sortByCategory').addEventListener('click', () => sortSkillTable('category'));
      }

      const tableBody = document.getElementById('skillsTableBody');
      if (!tableBody) {
        console.error('Skills table body not found');
        return;
      }

      // Check if we have any skills to display
      if ((!techSkills || techSkills.length === 0) &&
          (!softSkills || softSkills.length === 0) &&
          (!gapSkills || gapSkills.length === 0)) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="4" class="no-skills-message">
              No skills data available. Please load assessment data to see your skills comparison.
            </td>
          </tr>
        `;
        return;
      }

      // Combine all skills into one array with category information
      const allSkills = [
        ...(techSkills || []).map(skill => ({ ...skill, category: 'Technical', gap: null })),
        ...(softSkills || []).map(skill => ({ ...skill, category: 'Soft', gap: null })),
        ...(gapSkills || []).map(skill => ({ ...skill, category: 'Gap' }))
      ];

      // Generate table rows
      tableBody.innerHTML = allSkills.map(skill => {
        // Format skill name
        const formattedName = skill.name
          .replace(/_/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());

        // Create star rating
        const stars = '★'.repeat(skill.rating) + '☆'.repeat(5 - skill.rating);

        return `
          <tr data-name="${formattedName}" data-rating="${skill.rating}" data-category="${skill.category}">
            <td>${formattedName}</td>
            <td>${skill.category}</td>
            <td><span class="star-rating">${stars}</span> ${skill.rating}/5</td>
            <td>${skill.gap || 'N/A'}</td>
          </tr>
        `;
      }).join('');

      // Sort by rating by default
      sortSkillTable('rating');
    } catch (error) {
      console.error('Error displaying skill table:', error);
      const tableContainer = document.getElementById('skillTableContainer');
      if (tableContainer) {
        tableContainer.innerHTML = `
          <div class="error-message">
            <p>There was an error displaying the skills table. Please try again.</p>
          </div>
        `;
      }
    }
  }

  // Function to sort the skill table
  function sortSkillTable(sortBy) {
    try {
      const tableBody = document.getElementById('skillsTableBody');
      if (!tableBody) {
        console.error('Skills table body not found for sorting');
        return;
      }

      const rows = Array.from(tableBody.querySelectorAll('tr'));
      if (rows.length === 0) {
        // No rows to sort
        return;
      }

      // Highlight the active sort button
      const sortButton = document.getElementById(`sortBy${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}`);
      if (sortButton) {
        document.querySelectorAll('.table-controls button').forEach(btn => {
          btn.classList.remove('active');
        });
        sortButton.classList.add('active');
      }

      // Sort the rows
      rows.sort((a, b) => {
        if (sortBy === 'name') {
          return a.dataset.name.localeCompare(b.dataset.name);
        } else if (sortBy === 'rating') {
          return parseInt(b.dataset.rating) - parseInt(a.dataset.rating); // Descending
        } else if (sortBy === 'category') {
          return a.dataset.category.localeCompare(b.dataset.category);
        }
        return 0;
      });

      // Re-append rows in the new order
      rows.forEach(row => tableBody.appendChild(row));
    } catch (error) {
      console.error('Error sorting skill table:', error);
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

  // Check if we have data in localStorage on page load
  const storedData = localStorage.getItem('assessmentData');
  if (storedData) {
    try {
      console.log('Found assessment data in localStorage on page load');
      const assessmentData = JSON.parse(storedData);
      const profile = new UserAssessmentProfile();
      profile.populateFromSelfAssessment(assessmentData);
      displayProfileData(profile);
    } catch (error) {
      console.error('Error processing stored assessment data on page load:', error);
    }
  }
});
