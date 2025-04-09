console.log('Test script loaded successfully');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
  
  // Test if we can access elements
  const container = document.getElementById('coreTechnicalSkills');
  console.log('Core technical skills container:', container);
  
  const addAgencySkillBtn = document.getElementById('addAgencySkill');
  console.log('Add agency skill button:', addAgencySkillBtn);
  
  const addSoftwareToolBtn = document.getElementById('addSoftwareTool');
  console.log('Add software tool button:', addSoftwareToolBtn);
});
