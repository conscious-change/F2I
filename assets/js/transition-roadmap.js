document.addEventListener('DOMContentLoaded', function() {
  // Get the roadmap image and print button
  const roadmapImage = document.getElementById('roadmapImage');
  const printRoadmap = document.getElementById('printRoadmap');

  // Function to print the roadmap
  function printRoadmapImage() {
    // Get the image source - use the actual image source if available
    const imgSrc = roadmapImage && roadmapImage.src ? roadmapImage.src :
                  (window.location.origin + '/F2I/assets/img/transition-roadmap.jpg');

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Fed 2 Industry Transition Roadmap</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              text-align: center;
              font-family: Arial, sans-serif;
            }
            h1 {
              color: #0056b3;
              margin-bottom: 20px;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            @media print {
              h1 {
                margin-top: 0;
              }
            }
          </style>
        </head>
        <body>
          <h1>Fed 2 Industry Transition Roadmap</h1>
          <img src="${imgSrc}" alt="Fed 2 Industry Transition Roadmap">
        </body>
      </html>
    `);
    printWindow.document.close();

    // Wait for content to load before printing
    setTimeout(() => {
      printWindow.print();
      // Don't close the window automatically to allow the user to interact with the print dialog
    }, 500);
  }

  // Add event listener to the print button
  if (printRoadmap) {
    printRoadmap.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent triggering the image click event
      printRoadmapImage();
    });
  }

  // Remove the click event from the image
  if (roadmapImage) {
    roadmapImage.style.cursor = 'default';
  }
});
