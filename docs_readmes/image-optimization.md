# Image Optimization Guide

This document outlines the image optimization strategy for the F2I website.

## Current Implementation

The website has been set up with the foundation for comprehensive image optimization:

1. **Basic Responsive Images**
   - All images use the `responsive-image.html` include
   - Images below the fold use lazy loading
   - Critical images use eager loading with high priority

2. **Basic WebP Support**
   - WebP detection script added to detect browser support
   - Basic WebP conversion script available

## Full Implementation Steps

To fully implement the advanced image optimization:

1. **Install Required Tools**
   ```bash
   # Install WebP tools
   brew install webp

   # Install ImageMagick
   brew install imagemagick
   ```

2. **Generate Basic WebP Versions**
   ```bash
   # Make the script executable
   chmod +x scripts/generate-webp.sh

   # Run the basic WebP conversion
   ./scripts/generate-webp.sh
   ```

3. **Create Full Responsive Images**
   To implement full responsive images with multiple sizes:

   a. Create the responsive image directory:
   ```bash
   mkdir -p assets/img/responsive
   ```

   b. For each image, create multiple sizes:
   ```bash
   # Example for hero-bg.jpg
   convert assets/img/hero-bg.jpg -resize 400x -quality 85 assets/img/responsive/hero-bg-400.jpg
   convert assets/img/hero-bg.jpg -resize 800x -quality 85 assets/img/responsive/hero-bg-800.jpg
   convert assets/img/hero-bg.jpg -resize 1200x -quality 85 assets/img/responsive/hero-bg-1200.jpg
   convert assets/img/hero-bg.jpg -resize 1600x -quality 85 assets/img/responsive/hero-bg-1600.jpg

   # Create WebP versions
   cwebp -q 80 assets/img/responsive/hero-bg-400.jpg -o assets/img/responsive/hero-bg-400.webp
   cwebp -q 80 assets/img/responsive/hero-bg-800.jpg -o assets/img/responsive/hero-bg-800.webp
   cwebp -q 80 assets/img/responsive/hero-bg-1200.jpg -o assets/img/responsive/hero-bg-1200.webp
   cwebp -q 80 assets/img/responsive/hero-bg-1600.jpg -o assets/img/responsive/hero-bg-1600.webp
   ```

4. **Enable Advanced Features**
   Once you have generated all the responsive images:

   a. Edit `_includes/responsive-image.html` to uncomment the advanced picture element code
   b. Edit `_includes/responsive-background.html` to uncomment the responsive background code

## How to Add New Images

1. Place your original high-quality image in the `assets/img/` directory
2. Run the WebP generation script:
   ```
   bash scripts/generate-webp.sh
   ```
3. Use the responsive image include in your HTML:
   ```
   {% include responsive-image.html
      path="/assets/img/your-image.jpg"
      alt="Description of image"
      lazy=true
      class="your-class" %}
   ```
4. For background images, use the responsive background include:
   ```
   {% include responsive-background.html
      selector=".your-class"
      path="/assets/img/your-image.jpg" %}
   ```

## Image Optimization Best Practices

1. **Image Dimensions**
   - Start with high-quality source images (at least 1600px wide for full-width images)
   - Don't use images larger than needed for their display size

2. **Image Format Selection**
   - Use JPG for photographs and complex images with many colors
   - Use PNG for images with transparency or simple graphics with few colors
   - Use SVG for icons, logos, and simple illustrations

3. **Image Compression**
   - Compress all images before adding them to the site
   - Aim for a balance between quality and file size
   - Consider using tools like ImageOptim, TinyPNG, or Squoosh

4. **Lazy Loading**
   - Always use lazy loading for images below the fold
   - Don't use lazy loading for critical above-the-fold images

5. **Art Direction**
   - For images that need different crops at different screen sizes, use multiple `<source>` elements with media queries

## Tools Used

- **cwebp**: For WebP conversion
- **ImageMagick**: For resizing and optimizing images
- **responsive-image.html**: Custom Jekyll include for responsive images
- **responsive-background.html**: Custom Jekyll include for responsive background images
- **webp-detection.js**: JavaScript for WebP support detection
