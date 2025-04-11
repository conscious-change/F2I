document.addEventListener('DOMContentLoaded', function() {
  // Network Mapping Template Modal
  const openNetworkMappingButton = document.getElementById('openNetworkMapping');
  const networkMappingModal = document.getElementById('networkMappingModal');

  if (openNetworkMappingButton && networkMappingModal) {
    openNetworkMappingButton.onclick = function() {
      networkMappingModal.style.display = "block";
      loadNetworkMapData();
    }
  }

  // Informational Interview Guide Modal
  const openInterviewGuideButton = document.getElementById('openInterviewGuide');
  const interviewGuideModal = document.getElementById('interviewGuideModal');

  if (openInterviewGuideButton && interviewGuideModal) {
    openInterviewGuideButton.onclick = function() {
      interviewGuideModal.style.display = "block";
    }
  }

  // Interview Tracker Functionality
  const interviewTableBody = document.getElementById('interviewTableBody');
  const contactNameInput = document.getElementById('contactName');
  const companyRoleInput = document.getElementById('companyRole');
  const interviewDateInput = document.getElementById('interviewDate');
  const nextContactDateInput = document.getElementById('nextContactDate');
  const keyInsightsInput = document.getElementById('keyInsights');
  const followupActionsInput = document.getElementById('followupActions');
  const addInterviewBtn = document.getElementById('addInterviewBtn');
  const clearFormBtn = document.getElementById('clearFormBtn');
  const exportInterviewsCSVBtn = document.getElementById('exportInterviewsCSV');
  const clearAllInterviewsBtn = document.getElementById('clearAllInterviewsBtn');

  // Load interviews from localStorage
  function loadInterviews() {
    const interviews = JSON.parse(localStorage.getItem('informationalInterviews')) || [];
    interviewTableBody.innerHTML = '';

    if (interviews.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = `<td colspan="7" class="no-interviews-message">No interviews recorded yet. Use the form below to add your first interview.</td>`;
      interviewTableBody.appendChild(emptyRow);
      return;
    }

    interviews.forEach((interview, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${interview.contactName}</td>
        <td>${interview.companyRole}</td>
        <td>${formatDate(interview.interviewDate)}</td>
        <td>${interview.keyInsights}</td>
        <td>${interview.followupActions}</td>
        <td>${formatDate(interview.nextContactDate)}</td>
        <td><button class="delete-interview" data-index="${index}">Delete</button></td>
      `;
      interviewTableBody.appendChild(row);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-interview').forEach(button => {
      button.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        deleteInterview(index);
      });
    });
  }

  // Format date for display
  function formatDate(dateString) {
    if (!dateString) return 'Not set';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Add a new interview
  function addInterview() {
    const contactName = contactNameInput.value.trim();
    const companyRole = companyRoleInput.value.trim();
    const interviewDate = interviewDateInput.value;
    const nextContactDate = nextContactDateInput.value;
    const keyInsights = keyInsightsInput.value.trim();
    const followupActions = followupActionsInput.value.trim();

    if (!contactName || !companyRole) {
      alert('Please enter at least the contact name and company/role.');
      return;
    }

    const newInterview = {
      contactName,
      companyRole,
      interviewDate,
      nextContactDate,
      keyInsights,
      followupActions,
      dateAdded: new Date().toISOString()
    };

    const interviews = JSON.parse(localStorage.getItem('informationalInterviews')) || [];
    interviews.push(newInterview);
    localStorage.setItem('informationalInterviews', JSON.stringify(interviews));

    clearForm();
    loadInterviews();
  }

  // Clear the form
  function clearForm() {
    contactNameInput.value = '';
    companyRoleInput.value = '';
    interviewDateInput.value = '';
    nextContactDateInput.value = '';
    keyInsightsInput.value = '';
    followupActionsInput.value = '';
  }

  // Delete an interview
  function deleteInterview(index) {
    if (confirm('Are you sure you want to delete this interview record?')) {
      const interviews = JSON.parse(localStorage.getItem('informationalInterviews')) || [];
      interviews.splice(index, 1);
      localStorage.setItem('informationalInterviews', JSON.stringify(interviews));
      loadInterviews();
    }
  }

  // Clear all interviews
  function clearAllInterviews() {
    if (confirm('Are you sure you want to delete ALL interview records? This cannot be undone.')) {
      localStorage.removeItem('informationalInterviews');
      loadInterviews();
    }
  }

  // Export interviews as CSV
  function exportInterviewsCSV() {
    const interviews = JSON.parse(localStorage.getItem('informationalInterviews')) || [];

    if (interviews.length === 0) {
      alert('No interviews to export. Add some interviews first.');
      return;
    }

    // CSV header
    let csvContent = 'Contact Name,Company/Role,Interview Date,Key Insights,Follow-up Actions,Next Contact Date\n';

    // Add each interview as a row
    interviews.forEach(interview => {
      const row = [
        `"${interview.contactName.replace(/"/g, '""')}"`,
        `"${interview.companyRole.replace(/"/g, '""')}"`,
        `"${interview.interviewDate || ''}"`,
        `"${interview.keyInsights.replace(/"/g, '""')}"`,
        `"${interview.followupActions.replace(/"/g, '""')}"`,
        `"${interview.nextContactDate || ''}"`
      ];
      csvContent += row.join(',') + '\n';
    });

    // Create a download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'informational_interviews.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Initialize the tracker
  if (interviewTableBody && addInterviewBtn) {
    // Load existing interviews
    loadInterviews();

    // Add event listeners
    addInterviewBtn.addEventListener('click', addInterview);
    clearFormBtn.addEventListener('click', clearForm);
    exportInterviewsCSVBtn.addEventListener('click', exportInterviewsCSV);
    clearAllInterviewsBtn.addEventListener('click', clearAllInterviews);
  }

  // Open Network Map from Guide
  const openNetworkMapFromGuideButton = document.getElementById('openNetworkMapFromGuide');
  if (openNetworkMapFromGuideButton && networkMappingModal) {
    openNetworkMapFromGuideButton.onclick = function(e) {
      e.preventDefault();
      interviewGuideModal.style.display = "none";
      networkMappingModal.style.display = "block";
      loadNetworkMapData();
    }
  }

  // Download Network Template
  const downloadNetworkTemplateButton = document.getElementById('downloadNetworkTemplate');
  if (downloadNetworkTemplateButton) {
    downloadNetworkTemplateButton.onclick = function() {
      alert('Network Tracking Template download would start here. This feature is coming soon!');
    }
  }

  // Download Interview Guide
  const downloadInterviewGuideButton = document.getElementById('downloadInterviewGuide');
  if (downloadInterviewGuideButton) {
    downloadInterviewGuideButton.onclick = function() {
      alert('Informational Interview Guide download would start here. This feature is coming soon!');
    }
  }

  // View Event Calendar
  const viewEventCalendarButton = document.getElementById('viewEventCalendar');
  if (viewEventCalendarButton) {
    viewEventCalendarButton.onclick = function() {
      alert('Industry Event Calendar would open here. This feature is coming soon!');
    }
  }

  // Close modals
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

  // Add Contact functionality
  const addContactButtons = document.querySelectorAll('.add-contact-btn');

  addContactButtons.forEach(button => {
    button.addEventListener('click', function() {
      const listId = this.getAttribute('data-list');
      const contactList = document.getElementById(listId);

      if (contactList) {
        const firstEntry = contactList.querySelector('.contact-entry');
        const newEntry = firstEntry.cloneNode(true);

        // Clear input values
        const inputs = newEntry.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          input.value = '';
        });

        // Add remove button if it doesn't exist
        if (!newEntry.querySelector('.remove-contact-btn')) {
          const table = newEntry.querySelector('.contact-table');
          const lastRow = table.insertRow(-1);
          const cell = lastRow.insertCell(0);
          cell.colSpan = 3;
          cell.className = 'input-cell';
          cell.style.textAlign = 'right';

          const removeButton = document.createElement('button');
          removeButton.className = 'remove-contact-btn';
          removeButton.textContent = '- Remove';
          removeButton.onclick = function() {
            this.closest('.contact-entry').remove();
            saveNetworkMapData();
          };

          cell.appendChild(removeButton);
        }

        contactList.appendChild(newEntry);
        saveNetworkMapData();
      }
    });
  });

  // Save Network Map
  const saveNetworkMapButton = document.getElementById('saveNetworkMap');
  if (saveNetworkMapButton) {
    saveNetworkMapButton.onclick = function() {
      saveNetworkMapData();
      alert('Your network map has been saved!');
    }
  }

  // Export Network Map as CSV
  const exportNetworkMapButton = document.getElementById('exportNetworkMap');
  if (exportNetworkMapButton) {
    exportNetworkMapButton.onclick = function() {
      // In a real implementation, this would generate a CSV file
      alert('In a production environment, this would generate a CSV file with your network mapping data. For now, your data is saved in your browser.');
    }
  }

  // Save Network Map Data
  function saveNetworkMapData() {
    const networkData = {
      colleagues: getContactsData('colleaguesList'),
      industry: getContactsData('industryList'),
      alumni: getContactsData('alumniList'),
      association: getContactsData('associationList'),
      actions: getContactsData('actionList')
    };

    localStorage.setItem('networkMapData', JSON.stringify(networkData));
  }

  // Get Contacts Data from a list
  function getContactsData(listId) {
    const contactList = document.getElementById(listId);
    if (!contactList) return [];

    const contacts = [];
    const contactEntries = contactList.querySelectorAll('.contact-entry');

    contactEntries.forEach(entry => {
      if (listId === 'actionList') {
        const contact = entry.querySelector('.action-contact')?.value || '';
        const type = entry.querySelector('.action-type')?.value || '';
        const date = entry.querySelector('.action-date')?.value || '';
        const notes = entry.querySelector('.action-notes')?.value || '';

        contacts.push({ contact, type, date, notes });
      } else {
        const name = entry.querySelector('.contact-name')?.value || '';
        const role = entry.querySelector('.contact-role')?.value || '';
        const info = entry.querySelector('.contact-info')?.value || '';
        const notes = entry.querySelector('.contact-notes')?.value || '';

        contacts.push({ name, role, info, notes });
      }
    });

    return contacts;
  }

  // Load Network Map Data
  function loadNetworkMapData() {
    const savedData = localStorage.getItem('networkMapData');
    if (!savedData) return;

    const networkData = JSON.parse(savedData);

    loadContactsData('colleaguesList', networkData.colleagues);
    loadContactsData('industryList', networkData.industry);
    loadContactsData('alumniList', networkData.alumni);
    loadContactsData('associationList', networkData.association);
    loadContactsData('actionList', networkData.actions);
  }

  // Load Contacts Data to a list
  function loadContactsData(listId, contactsData) {
    if (!contactsData || contactsData.length === 0) return;

    const contactList = document.getElementById(listId);
    if (!contactList) return;

    // Clear existing entries except the first one
    const existingEntries = contactList.querySelectorAll('.contact-entry');
    for (let i = 1; i < existingEntries.length; i++) {
      existingEntries[i].remove();
    }

    // Update the first entry with the first contact data
    updateContactEntry(existingEntries[0], contactsData[0], listId);

    // Add additional entries for the rest of the contacts
    for (let i = 1; i < contactsData.length; i++) {
      const firstEntry = contactList.querySelector('.contact-entry');
      const newEntry = firstEntry.cloneNode(true);

      // Add remove button if it doesn't exist
      if (!newEntry.querySelector('.remove-contact-btn')) {
        const table = newEntry.querySelector('.contact-table');
        const lastRow = table.insertRow(-1);
        const cell = lastRow.insertCell(0);
        cell.colSpan = 3;
        cell.className = 'input-cell';
        cell.style.textAlign = 'right';

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-contact-btn';
        removeButton.textContent = '- Remove';
        removeButton.onclick = function() {
          this.closest('.contact-entry').remove();
          saveNetworkMapData();
        };

        cell.appendChild(removeButton);
      }

      updateContactEntry(newEntry, contactsData[i], listId);
      contactList.appendChild(newEntry);
    }
  }

  // Update Contact Entry with data
  function updateContactEntry(entry, data, listId) {
    if (listId === 'actionList') {
      entry.querySelector('.action-contact').value = data.contact || '';
      entry.querySelector('.action-type').value = data.type || '';
      entry.querySelector('.action-date').value = data.date || '';
      entry.querySelector('.action-notes').value = data.notes || '';
    } else {
      entry.querySelector('.contact-name').value = data.name || '';
      entry.querySelector('.contact-role').value = data.role || '';
      entry.querySelector('.contact-info').value = data.info || '';
      entry.querySelector('.contact-notes').value = data.notes || '';
    }
  }
});
