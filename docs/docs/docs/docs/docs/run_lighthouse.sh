#!/bin/bash

# run_lighthouse.sh - Comprehensive script for running Lighthouse CI tests on Jekyll site
# This script handles:
# 1. Checking for required dependencies (Chrome, npm, lhci)
# 2. Starting the Jekyll server in the background
# 3. Running Lighthouse CI tests
# 4. Cleaning up processes when done

# Text formatting
BOLD="\033[1m"
RED="\033[31m"
GREEN="\033[32m"
YELLOW="\033[33m"
RESET="\033[0m"

# Function to check if a command exists
command_exists() {
  command -v "$1" &> /dev/null
}

# Function to print error message and exit
error_exit() {
  echo -e "${RED}${BOLD}ERROR:${RESET} $1" >&2
  exit 1
}

# Function to print warning message
warning() {
  echo -e "${YELLOW}${BOLD}WARNING:${RESET} $1" >&2
}

# Function to print success message
success() {
  echo -e "${GREEN}${BOLD}SUCCESS:${RESET} $1"
}

# Function to check dependencies
check_dependencies() {
  echo "Checking dependencies..."

  # Check for Chrome
  if command_exists "google-chrome"; then
    CHROME_PATH="google-chrome"
  elif command_exists "chrome"; then
    CHROME_PATH="chrome"
  elif [ -f "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]; then
    CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  else
    error_exit "Chrome is not installed or not found. Please install Google Chrome and try again."
  fi
  echo "Chrome found at: $CHROME_PATH"

  # Check for npm
  if ! command_exists "npm"; then
    error_exit "npm is not installed. Please install Node.js and npm, then try again."
  fi

  # Check for Lighthouse CI
  if ! command_exists "lhci"; then
    echo "Lighthouse CI not found. Installing..."
    npm install -g @lhci/cli
    if ! command_exists "lhci"; then
      error_exit "Failed to install Lighthouse CI. Please install it manually with: npm install -g @lhci/cli"
    fi
  fi

  # Check for Jekyll
  if ! command_exists "bundle"; then
    error_exit "Bundler is not installed. Please install it with: gem install bundler"
  fi

  success "All dependencies are installed!"
}

# Function to update lighthouserc.json with Chrome path
update_lighthouse_config() {
  echo "Creating Lighthouse configuration..."

  # Create a new configuration file from scratch
  cat > lighthouserc.json << EOF
{
  "ci": {
    "collect": {
      "chromePath": "$CHROME_PATH",
      "numberOfRuns": 3,
      "startServerCommand": "./run_site.sh",
      "url": [
        "http://localhost:4000/",
        "http://localhost:4000/pages/about.html",
        "http://localhost:4000/pages/transition-roadmap.html"
      ]
    },
    "upload": {
      "target": "temporary-public-storage"
    },
    "assert": {
      "preset": "lighthouse:recommended"
    }
  }
}
EOF

  success "Lighthouse configuration created with Chrome path!"
}

# Function to start Jekyll server in the background
start_jekyll_server() {
  echo "Starting Jekyll server in the background using run_site.sh..."

  # Modify run_site.sh to run in the background if needed
  if [ -f "run_site.sh" ]; then
    # Make sure the script is executable
    chmod +x run_site.sh

    # Start Jekyll server in the background
    ./run_site.sh > jekyll_server.log 2>&1 &
    JEKYLL_PID=$!

    echo "Waiting for Jekyll server to be ready..."

    # Wait for Jekyll server to start (look for "Server running" message in log)
    COUNTER=0
    MAX_WAIT=60  # Maximum wait time in seconds

    while [ $COUNTER -lt $MAX_WAIT ]; do
      if grep -q "Server running" jekyll_server.log || grep -q "Server address:" jekyll_server.log; then
        break
      fi
      sleep 1
      COUNTER=$((COUNTER + 1))
    done

    if [ $COUNTER -eq $MAX_WAIT ]; then
      warning "Jekyll server might not be fully started. Continuing anyway..."
    else
      success "Jekyll server started with PID: $JEKYLL_PID"
    fi
  else
    error_exit "run_site.sh script not found!"
  fi
}

# Function to run Lighthouse CI
run_lighthouse() {
  echo "Running Lighthouse CI tests..."

  # Run Lighthouse CI
  lhci autorun

  # Check if Lighthouse CI was successful
  if [ $? -eq 0 ]; then
    success "Lighthouse CI tests completed successfully!"
  else
    warning "Lighthouse CI tests completed with issues. Check the output above for details."
  fi
}

# Function to clean up processes
cleanup() {
  echo "Cleaning up..."

  # Kill Jekyll server if it's running
  if [ ! -z "$JEKYLL_PID" ]; then
    echo "Stopping Jekyll server (PID: $JEKYLL_PID)..."
    kill $JEKYLL_PID
    wait $JEKYLL_PID 2>/dev/null
  fi

  # Remove temporary log file
  if [ -f "jekyll_server.log" ]; then
    rm jekyll_server.log
  fi

  echo "Cleanup complete!"
}

# Set up trap to ensure cleanup on exit
trap cleanup EXIT INT TERM

# Main execution
echo "=== Lighthouse CI Test Runner ==="
check_dependencies
update_lighthouse_config
start_jekyll_server
run_lighthouse

echo "=== Lighthouse CI Test Runner Complete ==="
