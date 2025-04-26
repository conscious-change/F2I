# Fed 2 Industry (F2I)

A comprehensive resource website designed to help federal employees successfully transition to private sector careers.

## Overview

Fed 2 Industry (F2I) is a Jekyll-based static website that provides resources, tools, and guidance for federal employees looking to transition to the private sector. The site includes a structured roadmap, self-assessment tools, and industry-specific resources.

## Features

- **Transition Roadmap**: A 9-step process guiding users through their federal-to-industry transition
- **Self-Assessment Tools**: Interactive tools to help users identify their skills and areas for development
- **Skill Translation Resources**: Guidance on translating federal experience to private sector terminology
- **Resume Building Tools**: Templates and guidance for creating industry-focused resumes
- **Industry Research Resources**: Information on target industries for federal employees
- **Success Stories**: Real-world examples of successful transitions

## Technology Stack

- **Static Site Generator**: Jekyll 4.4.1
- **CSS**: Custom CSS with responsive design
- **JavaScript**: Vanilla JavaScript with modular organization
- **Hosting**: Compatible with GitHub Pages or any static hosting service
- **Dependencies**: Ruby, Bundler (see Gemfile for details)

## Getting Started

### Prerequisites

- Ruby (version 2.7.0 or higher recommended)
- Bundler gem
- Git

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/fed-to-industry.git
   cd fed-to-industry
   ```

2. Install dependencies:
   ```
   bundle install
   ```

3. Start the development server:
   ```
   bundle exec jekyll serve
   ```

4. Visit `http://localhost:4000` in your browser to view the site.

### Alternative: Using the run_site.sh Script

1. Make the script executable:
   ```
   chmod +x run_site.sh
   ```

2. Run the script:
   ```
   ./run_site.sh
   ```

## Project Structure

- `_config.yml`: Jekyll configuration
- `_layouts/`: HTML layouts
- `_includes/`: Reusable HTML components
- `_posts/`: Blog posts
- `_resources/`: Resource content
- `_guides/`: Transition guides
- `_success_stories/`: User success stories
- `assets/`: CSS, JavaScript, and images
- `pages/`: Main site pages

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- All contributors to the F2I project
- Federal employees who shared their transition experiences
- Open source community for tools and libraries used in this project