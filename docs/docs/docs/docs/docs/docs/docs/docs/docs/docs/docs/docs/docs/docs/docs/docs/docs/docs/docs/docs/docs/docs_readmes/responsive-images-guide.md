# Responsive Images Guide

This guide explains how to work with images in the F2I website, including how to add new images and ensure they are optimized for all devices.

> **Note:** The site now uses a custom responsive image solution instead of the jekyll-responsive-image plugin. This makes the site more maintainable and easier to deploy.

## Overview

The F2I website uses a custom responsive image solution that:

1. Generates multiple sizes of each image for different screen sizes
2. Creates WebP versions for browsers that support this more efficient format
3. Implements proper lazy loading for images below the fold
4. Uses appropriate image attributes for optimal performance

## Adding New Images

### Step 1: Add the Original Image

Place your high-quality original image in the `assets/img/` directory. Use the following guidelines:

- Use descriptive filenames with hyphens (e.g., `federal-resume-example.jpg`)
- Start with high-quality source images (at least 1600px wide for full-width images)
- Use appropriate formats:
  - JPG for photographs and complex images with many colors
  - PNG for images with transparency or simple graphics with few colors
  - SVG for icons, logos, and simple illustrations

### Step 2: Generate Responsive Versions

Run the image processing script to generate responsive versions and WebP formats:

```bash
# Basic usage (processes all images in assets/img)
./scripts/process-images.sh

# Process images recursively (including subdirectories)
./scripts/process-images.sh --recursive

# Force regeneration of existing images
./scripts/process-images.sh --force

# Use custom sizes
./scripts/process-images.sh --sizes "300,600,900,1200"
```

This script will:
- Create WebP versions of the original images
- Generate multiple sizes of each image (default: 400, 800, 1200, 1600 pixels wide)
- Create WebP versions of each size

### Step 3: Use the Responsive Image Include

In your HTML/Liquid templates, use the responsive image include:

```liquid
{% include responsive-image.html
   path="/assets/img/your-image.jpg"
   alt="Description of image"
   lazy=true
   class="your-class" %}
```

Parameters:
- `path`: Path to the original image (required)
- `alt`: Alt text for accessibility (required)
- `lazy`: Whether to use lazy loading (true/false, default: false)
- `class`: CSS class for styling
- `id`: ID attribute
- `width`: Width attribute
- `height`: Height attribute
- `fetchpriority`: Priority for fetching the image (high/low/auto)
- `sizes`: Custom sizes attribute for responsive images
- `resize_options`: Custom resize options (comma-separated list of widths)

### Step 4: For Background Images

For background images, use the responsive background include:

```liquid
{% include responsive-background.html
   selector=".hero"
   path="/assets/img/hero-bg.jpg" %}
```

Parameters:
- `selector`: CSS selector for the element with the background (required)
- `path`: Path to the original image (required)

## Best Practices

### Performance Optimization

1. **Image Dimensions**
   - Don't use images larger than needed for their display size
   - Crop images to the required aspect ratio before adding them

2. **Lazy Loading**
   - Use `lazy=true` for images below the fold
   - Use `lazy=false` for critical above-the-fold images

3. **Image Compression**
   - Compress images before adding them to the site
   - Consider using tools like ImageOptim, TinyPNG, or Squoosh

### Accessibility

1. **Alt Text**
   - Always provide descriptive alt text for images
   - For decorative images, use an empty alt attribute (`alt=""`)

2. **Image Dimensions**
   - When possible, specify width and height attributes to prevent layout shifts

## Technical Details

### How It Works

The responsive image solution works by:

1. Using the `<picture>` element with multiple `<source>` elements
2. Providing WebP sources for browsers that support it
3. Providing a fallback image for browsers that don't support modern features
4. Using media queries for responsive background images

### Directory Structure

- `assets/img/`: Original images
- `assets/img/*.webp`: WebP versions of original images
- `assets/img/responsive/`: Responsive versions of images
- `_includes/responsive-image.html`: The responsive image include
- `_includes/responsive-background.html`: The responsive background include
- `scripts/process-images.sh`: Script to generate responsive images

## Troubleshooting

### Images Not Displaying Correctly

1. Check that you've run the image processing script
2. Verify the path to the image is correct
3. Make sure the image exists in the assets/img directory
4. Check for typos in the include parameters

### WebP Images Not Working

1. Make sure you have the WebP tools installed (`brew install webp`)
2. Run the image processing script with the `--force` flag
3. Check that the WebP detection script is loaded in the page head

### Performance Issues

If images are loading slowly:

1. Check image sizes and compress them further if needed
2. Make sure lazy loading is being used for below-the-fold images
3. Consider reducing the number of images on the page

### Bundler Version Mismatches

If you encounter bundler version mismatches when building the site:

1. The `run_site.sh` script automatically handles bundler version mismatches by updating the Gemfile.lock to use your installed bundler version
2. For GitHub Actions, we've added similar handling to ensure the build works regardless of the bundler version
3. If you still encounter issues, you can manually update the bundler version in Gemfile.lock:
   ```bash
   # Check your installed bundler version
   gem list bundler

   # Update Gemfile.lock to use your installed version
   # Replace 2.6.8 with the version in your Gemfile.lock
   # Replace 1.17.2 with your installed version
   sed -i '' -e "s/BUNDLED WITH.*$/BUNDLED WITH/" -e "s/   2.6.8.*$/   1.17.2/" Gemfile.lock
   ```
