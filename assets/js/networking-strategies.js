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

  // LinkedIn Networking Guide Modal
  const openLinkedInGuideButton = document.getElementById('openLinkedInGuide');
  if (openLinkedInGuideButton) {
    openLinkedInGuideButton.onclick = function() {
      alert('LinkedIn Networking Guide would open here. This feature is coming soon!');
    }
  }

  // Informational Interview Guide Modal
  const openInterviewGuideButton = document.getElementById('openInterviewGuide');
  if (openInterviewGuideButton) {
    openInterviewGuideButton.onclick = function() {
      alert('Informational Interview Guide would open here. This feature is coming soon!');
    }
  }

  // Association Directory Modal
  const openAssociationDirectoryButton = document.getElementById('openAssociationDirectory');
  if (openAssociationDirectoryButton) {
    openAssociationDirectoryButton.onclick = function() {
      alert('Industry Association Directory would open here. This feature is coming soon!');
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
