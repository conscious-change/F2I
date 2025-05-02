#!/bin/bash

# This script processes responsive images and starts the Jekyll server.

# Check if bundle is installed
if ! command -v bundle &> /dev/null
then
    echo "Error: bundler is not installed. Please install it first:"
    echo "  gem install bundler"
    exit 1
fi

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null
then
    echo "Warning: ImageMagick is not installed. Responsive images may not work correctly."
    echo "To install ImageMagick:"
    echo "  brew install imagemagick"
    read -p "Continue without ImageMagick? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]
    then
        exit 1
    fi
fi

# Check if WebP tools are installed
if ! command -v cwebp &> /dev/null
then
    echo "Warning: WebP tools are not installed. WebP images will not be generated."
    echo "To install WebP tools:"
    echo "  brew install webp"
    read -p "Continue without WebP tools? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]
    then
        exit 1
    fi
fi

# Process responsive images if the script exists and is executable
if [ -x "scripts/process-images.sh" ]; then
    echo "Processing responsive images..."
    ./scripts/process-images.sh
else
    echo "Warning: Responsive image processing script not found or not executable."
    echo "To make it executable:"
    echo "  chmod +x scripts/process-images.sh"
fi

# Execute the jekyll serve command
echo "Starting Jekyll server..."

# Check if we need to update bundler
if grep -q "BUNDLED WITH" Gemfile.lock; then
    bundled_with_version=$(grep -A 1 "BUNDLED WITH" Gemfile.lock | tail -n 1 | tr -d ' ')
    installed_bundler_version=$(gem list bundler | grep -o "[0-9.]*" | head -n 1)

    echo "Gemfile.lock requires Bundler $bundled_with_version, you have $installed_bundler_version"

    if [ "$bundled_with_version" != "$installed_bundler_version" ]; then
        echo "Updating Gemfile.lock to use Bundler $installed_bundler_version..."
        sed -i '' -e "s/BUNDLED WITH.*$/BUNDLED WITH/" -e "s/   $bundled_with_version.*$/   $installed_bundler_version/" Gemfile.lock
    fi
fi

# Run Jekyll
bundle exec jekyll serve

echo "Jekyll server started successfully. Press Ctrl+C to stop."
