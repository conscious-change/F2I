# Career Recommendation Engine Maintenance Guide

The Career Recommendation Engine page uses a separate CSS and JavaScript approach due to its complex interactive functionality. This document explains how to maintain this page without breaking its functionality.

## Why Special Handling?

Similar to the Self Assessment page, the Career Recommendation Engine has complex JavaScript functionality that could be broken during CSS refactoring:
- It processes data from the Self Assessment page
- It dynamically generates career matches based on skills
- It creates interactive visualizations (radar charts)
- It has complex DOM manipulation for displaying career details

To preserve functionality while allowing the rest of the site to be refactored, we've isolated this page's CSS and JavaScript.

## CSS Structure

The Career Recommendation page uses dedicated CSS files:
- `career-recommendation-base.css`: Contains essential base styles (reset, typography, basic layout) and navigation/footer styles
- `career-recommendation.css`: Contains page-specific styles for the career recommendation functionality

These files are located in a dedicated directory: `/assets/css/career-recommendation/`

## JavaScript Structure

The Career Recommendation page uses dedicated JavaScript files:
- `career-recommendation.js`: Main JavaScript file for the page
- `career-database.js`: Contains the database of career profiles
- `career-recommendation-engine.js`: Contains the engine for matching skills to careers

These files are located in a dedicated directory: `/assets/js/career-recommendation/`

## Layout Structure

The Career Recommendation page uses a dedicated layout:
- `career-recommendation-base.html`: A custom layout that includes all necessary styles and scripts
- `career-recommendation.html`: Extends the base layout and adds the career recommendation-specific content

This approach ensures that the Career Recommendation page has all the styling it needs without depending on the main CSS files.

## Navigation and Footer

The navigation and footer styles are included directly in `career-recommendation-base.css` to ensure they display correctly. The JavaScript for the navigation functionality is also included directly in the `career-recommendation-base.html` layout.

## Integration with Self Assessment

The Career Recommendation Engine is integrated with the Self Assessment page:
- The Self Assessment page has a "View Career Recommendations" button that saves the assessment data to localStorage
- The Career Recommendation page loads this data from localStorage when the "Load from Self-Assessment" button is clicked

## How to Make Changes

When making changes to the Career Recommendation page:
1. Test all functionality after any CSS changes
2. Preserve all class names used by the JavaScript
3. Keep the CSS isolated from the main site's CSS
4. Test the integration with the Self Assessment page

## Integration with Main Site

The Career Recommendation page is intentionally excluded from the main CSS refactoring to preserve its functionality. If you need to update the page's appearance to match site-wide changes:
1. Make targeted changes to `career-recommendation-base.css`
2. Test thoroughly after each change
3. Do not attempt to merge it with the main CSS structure

## Future Considerations

Once the main site refactoring is complete, we may revisit the Career Recommendation page to:
1. Gradually align it with the new CSS architecture
2. Refactor the JavaScript to be less dependent on specific CSS classes
3. Improve the modularity of the code

Any such changes should be made incrementally with thorough testing at each step.
