#!/bin/bash

# Script to run Lighthouse CI tests locally
# This script:
# 1. Builds the Jekyll site
# 2. Starts the Jekyll server in the background using run_site.sh
# 3. Runs Lighthouse CI using the configuration file
# 4. Stops the Jekyll server when testing is complete

set -e  # Exit on error

# Check if Lighthouse CI is installed
if ! command -v lhci &> /dev/null; then
    echo "Error: Lighthouse CI is not installed. Please install it first:"
    echo "  npm install -g @lhci/cli"
    exit 1
fi

# Check if run_site.sh is executable
if [ ! -x "./run_site.sh" ]; then
    echo "Error: run_site.sh is not executable. Making it executable..."
    chmod +x run_site.sh
fi

# First build the site
echo "Building Jekyll site..."
bundle exec jekyll build

# Start Jekyll server in the background using a modified approach
# We need to start run_site.sh but in a way that doesn't block
echo "Starting Jekyll server in the background using run_site.sh..."

# Create a temporary script that will run run_site.sh
cat > temp_run_jekyll.sh << 'EOF'
#!/bin/bash
# This is a temporary script to run Jekyll in the background
./run_site.sh > jekyll_server.log 2>&1
EOF

chmod +x temp_run_jekyll.sh
./temp_run_jekyll.sh &

# Store the background process PID
TEMP_SCRIPT_PID=$!

# Give Jekyll a moment to fully start
echo "Waiting for Jekyll server to be ready..."
sleep 10

# Check if Jekyll is running on port 4000
JEKYLL_PID=$(lsof -ti:4000)

if [ -z "$JEKYLL_PID" ]; then
    echo "Error: Failed to start Jekyll server or couldn't determine PID."
    echo "Check jekyll_server.log for details."
    # Kill the temp script process
    kill $TEMP_SCRIPT_PID 2>/dev/null
    exit 1
fi

echo "Jekyll server started with PID: $JEKYLL_PID"

echo "Running Lighthouse CI tests..."
lhci autorun

# Cleanup: Stop the Jekyll server and remove temp files
echo "Stopping Jekyll server (PID: $JEKYLL_PID)..."
kill $JEKYLL_PID
kill $TEMP_SCRIPT_PID 2>/dev/null
rm temp_run_jekyll.sh

echo "Lighthouse testing completed!"
