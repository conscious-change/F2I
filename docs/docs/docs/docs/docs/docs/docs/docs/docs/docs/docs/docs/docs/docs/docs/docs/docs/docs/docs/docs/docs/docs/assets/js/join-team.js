/**
 * F2I Join Team Page JavaScript
 * Handles functionality specific to the Join Team page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get the Join Team button
  const joinTeamButton = document.querySelector('.contact-cta .btn-primary');
  
  if (joinTeamButton) {
    // Add click event listener
    joinTeamButton.addEventListener('click', function(event) {
      // Track the click event (this could be expanded with actual analytics)
      console.log('Join Team button clicked');
      
      // You could add Google Analytics or other tracking here
      if (typeof gtag === 'function') {
        gtag('event', 'click', {
          'event_category': 'engagement',
          'event_label': 'join_team_button'
        });
      }
      
      // Show a confirmation message after a short delay
      setTimeout(function() {
        // Create a confirmation message element
        const confirmationMessage = document.createElement('div');
        confirmationMessage.className = 'join-confirmation-message';
        confirmationMessage.innerHTML = `
          <div class="confirmation-content">
            <div class="confirmation-icon">✅</div>
            <h4>Email Template Ready!</h4>
            <p>Your email client should be opening with a pre-filled template. If it doesn't open automatically, please email us directly at <a href="mailto:contact@fed2industry.com">contact@fed2industry.com</a>.</p>
          </div>
        `;
        
        // Add the confirmation message to the page
        const contactCta = document.querySelector('.contact-cta');
        contactCta.appendChild(confirmationMessage);
        
        // Remove the confirmation message after 8 seconds
        setTimeout(function() {
          confirmationMessage.style.opacity = '0';
          setTimeout(function() {
            confirmationMessage.remove();
          }, 500);
        }, 8000);
      }, 500);
    });
  }
});
