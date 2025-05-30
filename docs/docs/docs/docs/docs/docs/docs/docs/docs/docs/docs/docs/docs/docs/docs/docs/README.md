# Fed 2 Industry (F2I)

A comprehensive resource platform dedicated to empowering federal employees with the knowledge, tools, and community support needed to successfully transition to rewarding careers in the private sector.

## Our Mission

Fed 2 Industry (F2I) was created to address the unique challenges faced by federal employees transitioning to the private sector. Many government professionals possess valuable skills and experience that are highly sought after in industry but struggle with:

- Translating government experience into language that resonates with private sector employers
- Understanding differences in workplace culture and expectations
- Navigating the private sector job search and interview process
- Building professional networks outside of government
- Negotiating competitive compensation packages

F2I provides a clear, structured pathway to help federal employees overcome these challenges and leverage their valuable public service experience for successful private sector careers.

## Our Impact

The F2I platform aims to make a significant impact on both individual careers and the broader workforce ecosystem:

- **For Federal Employees**: Providing the tools, resources, and community support needed to successfully navigate the transition to rewarding private sector careers
- **For Industry**: Facilitating access to a valuable talent pool of experienced professionals with unique public sector perspectives
- **For Society**: Enabling the cross-pollination of ideas and approaches between public and private sectors, leading to more innovative and effective solutions to complex challenges

Our goal is to help thousands of federal employees successfully transition to the private sector, with measurable improvements in transition time, job satisfaction, and compensation outcomes.

## Key Features

- **Comprehensive Transition Roadmap**: A structured 9-step process guiding users through every aspect of their federal-to-industry transition journey
- **Interactive Self-Assessment Tools**: Tools to help users identify transferable skills, strengths, and areas for development
- **Skill Translation Framework**: Practical guidance on translating federal experience and terminology into language that resonates with private sector employers
- **Resume & Personal Branding Resources**: Templates, examples, and guidance for creating compelling industry-focused resumes and building a strong professional brand
- **Networking Strategies**: Actionable advice for building professional connections outside of government
- **Interview Preparation**: Comprehensive resources to help prepare for private sector interviews, including common questions and effective response strategies
- **Compensation Guidance**: Tools and information to help evaluate and negotiate competitive compensation packages
- **Community Support**: A platform for connecting with others who have successfully made the transition from federal service to the private sector

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

3. Process responsive images (requires ImageMagick and WebP tools):
   ```
   # Install required tools (macOS)
   brew install imagemagick webp

   # Make the script executable
   chmod +x scripts/process-images.sh

   # Process all images
   ./scripts/process-images.sh
   ```

4. Start the development server:
   ```
   bundle exec jekyll serve
   ```

5. Visit `http://localhost:4000` in your browser to view the site.

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
  - `responsive-image.html`: Custom responsive image solution
  - `responsive-background.html`: Custom responsive background image solution
- `_posts/`: Blog posts
- `_resources/`: Resource content
- `_guides/`: Transition guides
- `_success_stories/`: User success stories
- `assets/`: CSS, JavaScript, and images
  - `assets/img/`: Original images
  - `assets/img/responsive/`: Responsive image variants
- `pages/`: Main site pages
- `scripts/`: Utility scripts
  - `process-images.sh`: Script to generate responsive images
- `docs/`: Documentation
  - `responsive-images-guide.md`: Guide for working with images

## Contributing

### Branch Structure

We use a structured branching strategy to manage development and releases:

```
main (production)
  ↑
staging
  ↑
development
  ↑
feature/[feature-name] (e.g., feature/header-redesign)
bugfix/[bug-name] (e.g., bugfix/mobile-nav)
cleanup/[cleanup-name] (e.g., cleanup/css-optimization)
```

#### Branch Purposes

1. **`main`**: Production branch
   - Contains only stable, tested code
   - Deployed to production environment
   - Protected from direct pushes (require pull requests)

2. **`staging`**: Pre-production testing environment
   - Mirrors the production environment
   - Used for final QA before deploying to production
   - Merged to `main` when ready for production

3. **`development`**: Integration branch
   - Contains the latest development work
   - May be less stable than `staging`
   - Used for developer testing and integration

4. **Feature branches**
   - Branch from `development`
   - Used for new features
   - Naming convention: `feature/[feature-name]`

5. **Bugfix branches**
   - Branch from `development` or directly from `staging` for urgent fixes
   - Used for bug fixes
   - Naming convention: `bugfix/[bug-name]`

6. **Cleanup branches**
   - Branch from `development`
   - Used for refactoring, optimization, and technical debt
   - Naming convention: `cleanup/[cleanup-name]`

### Development Workflow

1. Start a new feature:
   ```bash
   git checkout development
   git pull
   git checkout -b feature/new-feature-name
   # Work on feature
   git push -u origin feature/new-feature-name
   ```

2. Create a pull request to merge into `development`

3. After testing in `development`, create a pull request to merge into `staging`

4. After testing in `staging`, create a pull request to merge `staging` into `main`

### Pull Request Process

1. Fork the repository
2. Create your feature branch following the naming convention above
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## About the F2I Initiative

The Fed 2 Industry initiative was born from a recognition of the challenges facing public servants amid changes in the federal workforce and the valuable perspectives they can bring to the private sector. To meet today's complex challenges, industry needs professionals who bring federal service backgrounds and their unique insights into areas such as:

- Ethical implementation of emerging technologies like GenAI in the public sector
- AI governance frameworks and regulatory considerations
- Public-private partnerships and collaboration
- Navigating complex regulatory environments
- Building resilient and secure systems

F2I aims to bridge the gap between federal service and industry, helping both federal employees find rewarding new careers and helping the private sector benefit from their unique expertise and perspectives.

## Join Our Mission

**We're actively seeking volunteers!** The F2I initiative is growing and we need passionate individuals who want to make a difference in the lives of transitioning federal employees.

### How You Can Help

We're looking for volunteers with skills in:
- Technical writing and content creation
- Web development and design
- AI governance and ethics
- Career coaching and mentoring
- GenAI experience and implementation
- And many other areas!

If you're interested in contributing to this important mission, please email us at [contact@fed2industry.com](mailto:contact@fed2industry.com) with information about:
- Your background and experience
- Skills and expertise you can contribute
- How you'd like to help
- Your availability

Together, we can make a meaningful difference in the lives of federal employees navigating their transition to the private sector.

## Acknowledgments

- All contributors to the F2I project
- Federal employees who have shared their transition experiences and insights
- Open source community for tools and libraries used in this project