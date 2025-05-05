# Self Assessment Page Maintenance Guide

The Self Assessment page uses a separate CSS and JavaScript approach due to its complex interactive functionality. This document explains how to maintain this page without breaking its functionality.

## Why Special Handling?

Previous attempts to refactor the Self Assessment page resulted in broken functionality. The page has:
- Complex JavaScript that dynamically generates and manipulates content
- Specific CSS dependencies that the JavaScript relies on
- Multiple interactive elements (tabs, forms, dynamic content)

To preserve functionality while allowing the rest of the site to be refactored, we've isolated this page's CSS and JavaScript.

## CSS Structure

The Self Assessment page uses dedicated CSS files:
- `assessment-base.css`: Contains essential base styles (reset, typography, basic layout) and navigation/footer styles
- `assessment.css`: Contains page-specific styles for the assessment functionality

These files are located in a dedicated directory: `/assets/css/self-assessment/`

## JavaScript Dependencies

The page relies on specific CSS classes and DOM structure for its JavaScript functionality. Key dependencies include:
- Class names like `.assessment-section`, `.tab-button`, `.skill-grid`, etc.
- DOM structure with specific IDs for JavaScript targeting (e.g., `section1`, `coreTechnicalSkills`)
- Form elements with specific naming conventions

## How to Make Changes

When making changes to the Self Assessment page:
1. Test all functionality after any CSS changes
2. Preserve all class names used by the JavaScript
3. Keep the CSS isolated from the main site's CSS
4. Test the save/load functionality thoroughly
5. Test tab navigation and dynamic content generation

## Layout Structure

The Self Assessment page uses a dedicated layout:
- `assessment-base.html`: A custom layout that includes all necessary styles and scripts
- `assessment.html`: Extends the base layout and adds the assessment-specific content

This approach ensures that the Self Assessment page has all the styling it needs without depending on the main CSS files.

## Navigation and Footer

The navigation and footer styles are included directly in `assessment-base.css` to ensure they display correctly. The JavaScript for the navigation functionality is also included directly in the `assessment-base.html` layout.

## Integration with Main Site

The Self Assessment page is intentionally excluded from the main CSS refactoring to preserve its functionality. If you need to update the page's appearance to match site-wide changes:
1. Make targeted changes to `assessment-base.css`
2. Test thoroughly after each change
3. Do not attempt to merge it with the main CSS structure

## Future Considerations

Once the main site refactoring is complete, we may revisit the Self Assessment page to:
1. Gradually align it with the new CSS architecture
2. Refactor the JavaScript to be less dependent on specific CSS classes
3. Improve the modularity of the code

Any such changes should be made incrementally with thorough testing at each step.
