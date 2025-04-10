#!/bin/bash

# This script starts the Jekyll server.

# Check if bundle is installed
if ! command -v bundle &> /dev/null
then
    echo "Error: bundler is not installed. Please install it first:"
    echo "  gem install bundler"
    exit 1
fi

# Navigate to the Jekyll project directory (assuming the script is in the project root)
# If not, you might need to change the current directory:
# cd /path/to/your/jekyll/project

# Execute the jekyll serve command using bundle
echo "Starting Jekyll server..."
bundle exec jekyll serve

echo "Jekyll server started successfully. Press Ctrl+C to stop."
