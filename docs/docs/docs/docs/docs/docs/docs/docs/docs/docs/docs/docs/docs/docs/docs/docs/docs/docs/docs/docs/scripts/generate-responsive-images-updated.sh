#!/bin/bash

# Comprehensive script to generate responsive images and WebP versions
# Requires cwebp (from webp package) and ImageMagick to be installed
# To install on macOS: 
#   brew install webp
#   brew install imagemagick

# Configuration
SIZES=(400 800 1200 1600)
QUALITY=85
WEBP_QUALITY=80
SOURCE_DIR="../assets/img"
OUTPUT_DIR="../assets/img/responsive"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Function to process an image
process_image() {
  local img="$1"
  local filename=$(basename -- "$img")
  local extension="${filename##*.}"
  local name="${filename%.*}"
  
  echo "Processing $img..."
  
  # Create WebP version of the original image
  cwebp -q $WEBP_QUALITY "$img" -o "${SOURCE_DIR}/${name}.webp"
  
  # Create responsive versions in original format and WebP
  for size in "${SIZES[@]}"; do
    # Create resized version in original format
    magick "$img" -resize ${size}x -quality $QUALITY "${OUTPUT_DIR}/${name}-${size}.${extension}"
    
    # Create WebP version of the resized image
    cwebp -q $WEBP_QUALITY "${OUTPUT_DIR}/${name}-${size}.${extension}" -o "${OUTPUT_DIR}/${name}-${size}.webp"
    
    echo "  Created ${size}px version in ${extension} and WebP formats"
  done
}

# Process all JPG and PNG images in the source directory
echo "Starting responsive image generation..."
echo "----------------------------------------"

# Find all JPG and PNG files in the source directory (excluding the responsive directory)
find "$SOURCE_DIR" -maxdepth 1 -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read img; do
  process_image "$img"
done

echo "----------------------------------------"
echo "Responsive image generation complete!"
echo ""
echo "Next steps:"
echo "1. Test the website on different devices and browsers"
