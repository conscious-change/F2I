#!/bin/bash

# Comprehensive script to generate responsive images and WebP versions
# Requires cwebp (from webp package) and ImageMagick to be installed
# To install on macOS: 
#   brew install webp
#   brew install imagemagick

# Display help message
show_help() {
  echo "Usage: $0 [OPTIONS]"
  echo ""
  echo "Generate responsive images and WebP versions for the F2I website."
  echo ""
  echo "Options:"
  echo "  -h, --help                 Show this help message"
  echo "  -s, --source-dir DIR       Source directory for images (default: assets/img)"
  echo "  -o, --output-dir DIR       Output directory for responsive images (default: assets/img/responsive)"
  echo "  -r, --recursive            Process images in subdirectories recursively"
  echo "  -f, --force                Force regeneration of existing images"
  echo "  -q, --quality NUM          JPEG/PNG quality (default: 85)"
  echo "  -w, --webp-quality NUM     WebP quality (default: 80)"
  echo "  -S, --sizes \"w1,w2,...\"    Comma-separated list of widths (default: \"400,800,1200,1600\")"
  echo ""
  echo "Examples:"
  echo "  $0                         # Process all images in assets/img"
  echo "  $0 -r                      # Process all images recursively"
  echo "  $0 -s custom/img -o custom/responsive  # Use custom directories"
  echo "  $0 -S \"300,600,900,1200\"   # Use custom sizes"
  echo ""
}

# Default configuration
SOURCE_DIR="assets/img"
OUTPUT_DIR="assets/img/responsive"
RECURSIVE=false
FORCE=false
QUALITY=85
WEBP_QUALITY=80
SIZES=(400 800 1200 1600)

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -h|--help)
      show_help
      exit 0
      ;;
    -s|--source-dir)
      SOURCE_DIR="$2"
      shift 2
      ;;
    -o|--output-dir)
      OUTPUT_DIR="$2"
      shift 2
      ;;
    -r|--recursive)
      RECURSIVE=true
      shift
      ;;
    -f|--force)
      FORCE=true
      shift
      ;;
    -q|--quality)
      QUALITY="$2"
      shift 2
      ;;
    -w|--webp-quality)
      WEBP_QUALITY="$2"
      shift 2
      ;;
    -S|--sizes)
      IFS=',' read -r -a SIZES <<< "$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      show_help
      exit 1
      ;;
  esac
done

# Check if required tools are installed
check_dependencies() {
  local missing_deps=false

  if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is not installed. Please install it first:"
    echo "  brew install imagemagick"
    missing_deps=true
  fi

  if ! command -v cwebp &> /dev/null; then
    echo "Error: WebP tools are not installed. Please install them first:"
    echo "  brew install webp"
    missing_deps=true
  fi

  if [ "$missing_deps" = true ]; then
    exit 1
  fi
}

# Create output directory if it doesn't exist
create_output_dirs() {
  mkdir -p "$OUTPUT_DIR"
  echo "Created output directory: $OUTPUT_DIR"
}

# Process a single image
process_image() {
  local img="$1"
  local rel_path="${img#$SOURCE_DIR/}"
  local dir_path=$(dirname "$rel_path")
  local filename=$(basename -- "$img")
  local extension="${filename##*.}"
  local name="${filename%.*}"
  local output_subdir="$OUTPUT_DIR/$dir_path"
  
  # Skip responsive directory
  if [[ "$img" == *"/responsive/"* ]]; then
    return
  fi
  
  # Skip non-image files
  if [[ ! "$extension" =~ ^(jpg|jpeg|png)$ ]]; then
    return
  fi
  
  # Create output subdirectory if needed
  if [ ! -d "$output_subdir" ]; then
    mkdir -p "$output_subdir"
  fi
  
  echo "Processing $img..."
  
  # Create WebP version of the original image
  if [ "$FORCE" = true ] || [ ! -f "${SOURCE_DIR}/${dir_path}/${name}.webp" ]; then
    cwebp -q $WEBP_QUALITY "$img" -o "${SOURCE_DIR}/${dir_path}/${name}.webp"
    echo "  Created WebP version of original"
  else
    echo "  WebP version of original already exists (use -f to force regeneration)"
  fi
  
  # Create responsive versions in original format and WebP
  for size in "${SIZES[@]}"; do
    # Create resized version in original format
    if [ "$FORCE" = true ] || [ ! -f "${output_subdir}/${name}-${size}.${extension}" ]; then
      convert "$img" -resize ${size}x -quality $QUALITY "${output_subdir}/${name}-${size}.${extension}"
      echo "  Created ${size}px version in ${extension} format"
    else
      echo "  ${size}px version in ${extension} format already exists (use -f to force regeneration)"
    fi
    
    # Create WebP version of the resized image
    if [ "$FORCE" = true ] || [ ! -f "${output_subdir}/${name}-${size}.webp" ]; then
      cwebp -q $WEBP_QUALITY "${output_subdir}/${name}-${size}.${extension}" -o "${output_subdir}/${name}-${size}.webp"
      echo "  Created ${size}px version in WebP format"
    else
      echo "  ${size}px version in WebP format already exists (use -f to force regeneration)"
    fi
  done
}

# Process all images in the source directory
process_all_images() {
  local find_cmd="find \"$SOURCE_DIR\""
  
  if [ "$RECURSIVE" = false ]; then
    find_cmd="$find_cmd -maxdepth 1"
  fi
  
  find_cmd="$find_cmd -type f \( -name \"*.jpg\" -o -name \"*.jpeg\" -o -name \"*.png\" \)"
  
  echo "Starting responsive image generation..."
  echo "----------------------------------------"
  echo "Source directory: $SOURCE_DIR"
  echo "Output directory: $OUTPUT_DIR"
  echo "Sizes: ${SIZES[*]}"
  echo "Quality: $QUALITY"
  echo "WebP quality: $WEBP_QUALITY"
  echo "Recursive: $RECURSIVE"
  echo "Force regeneration: $FORCE"
  echo "----------------------------------------"
  
  # Use eval to execute the constructed find command and pipe to while loop
  eval "$find_cmd" | while read img; do
    process_image "$img"
  done
  
  echo "----------------------------------------"
  echo "Responsive image generation complete!"
}

# Main execution
check_dependencies
create_output_dirs
process_all_images

echo ""
echo "Next steps:"
echo "1. Test the website on different devices and browsers"
echo "2. Make sure all images are using the responsive-image.html include"
