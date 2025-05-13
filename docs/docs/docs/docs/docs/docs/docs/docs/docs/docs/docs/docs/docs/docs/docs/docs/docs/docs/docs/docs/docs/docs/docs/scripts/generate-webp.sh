#!/bin/bash

# Script to generate WebP versions of images
# Requires cwebp (from webp package) to be installed
# To install on macOS: brew install webp

# Process each image in the assets/img directory
for img in assets/img/*.jpg assets/img/*.png; do
  if [ -f "$img" ]; then
    filename=$(basename -- "$img")
    extension="${filename##*.}"
    filename="${filename%.*}"

    echo "Processing $img..."

    # Create WebP version of the original image
    cwebp -q 80 "$img" -o "assets/img/${filename}.webp"
  fi
done

echo "Basic WebP conversion complete!"
echo ""
echo "For full responsive image support, you'll need to:"
echo "1. Install ImageMagick: brew install imagemagick"
echo "2. Uncomment the advanced responsive image code in _includes/responsive-image.html"
echo "3. Uncomment the responsive background code in _includes/responsive-background.html"
echo "4. Run the full responsive image generation script"
