# F2I Website Standardization Plan

## Overview
This plan outlines the approach to standardize the look and feel across all pages of the F2I website while preserving functionality. The goal is to create a consistent user experience without breaking any existing JavaScript functionality.

## Implementation Steps

### 1. Add Standardization CSS
- Add the new `standardization.css` file to the site
- Include it in the site's head after the main CSS file
- This approach allows us to override inconsistent styles without modifying the original CSS

### 2. Apply Standard Classes to Elements
- Update HTML templates to use standardized class names
- Apply consistent class naming conventions across pages
- Preserve existing class names needed for JavaScript functionality

### 3. Page-by-Page Updates

#### Networking Strategies Page
- Update strategy cards to use `.strategy-card` class
- Standardize header colors to use the blue color scheme
- Ensure consistent spacing between sections

#### Skill Translation Hub Page
- Keep the benefit cards as a model for other pages
- Ensure accordion styling is consistent with other pages
- Standardize section spacing

#### Interview Preparation Page
- Update benefit cards to match the Skill Translation Hub
- Standardize accordion styling
- Ensure consistent button styling

#### Job Search Resources Page
- Update card layout from 3-to-1 to 2-to-2 for better symmetry
- Standardize header fonts to match other pages
- Apply consistent card styling

#### Compensation Page
- Update card layout to 2-to-2 grid
- Standardize header fonts
- Apply consistent card styling

#### Transition Checklist Page
- Update to wider cards as per user preference
- Standardize header fonts
- Ensure consistent spacing

### 4. Common Elements to Standardize

#### Headers
- All page headers should use the same font size and color
- Section headers (h2) should consistently use the blue color (#0056b3)
- Subheaders (h3) should have consistent styling across pages

#### Cards
- Standardize card styling with consistent shadows, borders, and hover effects
- Use 2-column grid layouts for better symmetry on most pages
- Ensure consistent padding and margins

#### Buttons
- Apply consistent button styling across all pages
- Standardize hover effects
- Ensure proper spacing around buttons

#### Accordions & Tabs
- Standardize accordion styling across pages
- Ensure consistent tab styling
- Preserve JavaScript functionality for interactive elements

## Testing Plan
- Test each page after updates to ensure JavaScript functionality is preserved
- Verify responsive behavior on mobile, tablet, and desktop views
- Check for any visual inconsistencies or layout issues

## Notes
- This implementation preserves all existing functionality
- The approach uses class-based styling to avoid breaking JavaScript
- The standardization focuses on visual consistency while maintaining the unique content of each page
