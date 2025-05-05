# Development Setup Guide

This guide explains how to set up the F2I website for local development and troubleshoot common issues.

## Prerequisites

- Ruby (version 2.7.0 or higher recommended)
- Bundler gem
- Git
- ImageMagick (for image processing)
- WebP tools (for WebP image generation)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fed-to-industry.git
   cd fed-to-industry
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Process responsive images:
   ```bash
   # Install required tools (macOS)
   brew install imagemagick webp
   
   # Make the script executable
   chmod +x scripts/process-images.sh
   
   # Process all images
   ./scripts/process-images.sh
   ```

4. Start the development server:
   ```bash
   bundle exec jekyll serve
   ```

5. Visit `http://localhost:4000` in your browser to view the site.

## Using the run_site.sh Script

For convenience, you can use the `run_site.sh` script which handles common setup tasks:

1. Make the script executable:
   ```bash
   chmod +x run_site.sh
   ```

2. Run the script:
   ```bash
   ./run_site.sh
   ```

The script will:
- Check for required dependencies
- Process responsive images
- Handle bundler version mismatches
- Start the Jekyll server

## Common Issues and Solutions

### Bundler Version Mismatches

If you see an error like:

```
Could not find 'bundler' (2.6.8) required by your Gemfile.lock.
```

The `run_site.sh` script automatically handles this by updating the Gemfile.lock to use your installed bundler version. If you need to fix this manually:

```bash
# Check your installed bundler version
gem list bundler

# Update Gemfile.lock to use your installed version
# Replace 2.6.8 with the version in your Gemfile.lock
# Replace 1.17.2 with your installed version
sed -i '' -e "s/BUNDLED WITH.*$/BUNDLED WITH/" -e "s/   2.6.8.*$/   1.17.2/" Gemfile.lock
```

### Missing ImageMagick or WebP Tools

If you see errors related to missing `convert` or `cwebp` commands:

```
Error: ImageMagick is not installed. Please install it first:
  brew install imagemagick
```

Install the required tools:

```bash
# On macOS
brew install imagemagick webp

# On Ubuntu/Debian
sudo apt-get install imagemagick webp
```

### Liquid Template Errors

If you see errors like:

```
Liquid Exception: Invalid syntax for include tag
```

Check that you're using the correct syntax for includes:

```liquid
{% include responsive-image.html path=page.image alt=page.title lazy=true %}
```

Not:

```liquid
{% include responsive-image.html 
  path=page.image 
  alt=page.title 
  lazy=true 
%}
```

### Permission Issues

If you encounter permission issues when installing gems:

```
You don't have write permissions for the /Library/Ruby/Gems/2.6.0 directory.
```

Consider using a Ruby version manager like rbenv or RVM, or use:

```bash
gem install bundler --user-install
```

## Building for Production

To build the site for production:

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

This will:
- Generate the site with production settings
- Output the built site to the `_site` directory

## Deployment

The site is configured to deploy automatically via GitHub Actions when changes are pushed to the main branch. The workflow:

1. Installs dependencies
2. Processes responsive images
3. Builds the site
4. Runs tests
5. Deploys to GitHub Pages

You can view the workflow configuration in `.github/workflows/jekyll-build.yml`.
