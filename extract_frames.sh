#!/bin/bash

# YouTube Video Frame Extractor for Squares TV Remote Presentation Tips
# This script downloads the video and extracts still frames at key timestamps

VIDEO_URL="https://www.youtube.com/watch?v=dBgqJMwK1MU"
VIDEO_ID="dBgqJMwK1MU"
OUTPUT_DIR="frames"

echo "📺 Squares TV Video Frame Extractor"
echo "=================================="

# Check if required tools are installed
check_dependencies() {
    echo "🔍 Checking dependencies..."
    
    if ! command -v yt-dlp &> /dev/null; then
        echo "❌ yt-dlp not found. Installing..."
        # For macOS with Homebrew
        if command -v brew &> /dev/null; then
            brew install yt-dlp
        else
            echo "Please install yt-dlp: pip install yt-dlp"
            exit 1
        fi
    fi
    
    if ! command -v ffmpeg &> /dev/null && [ ! -f "./ffmpeg" ]; then
        echo "❌ ffmpeg not found. Installing..."
        # For macOS with Homebrew
        if command -v brew &> /dev/null; then
            brew install ffmpeg
        else
            echo "Please install ffmpeg"
            exit 1
        fi
    elif [ -f "./ffmpeg" ]; then
        echo "✅ Using local ffmpeg binary"
        FFMPEG_CMD="./ffmpeg"
    else
        FFMPEG_CMD="ffmpeg"
    fi
    
    echo "✅ Dependencies check complete"
}

# Create output directory
setup_directories() {
    echo "📁 Setting up directories..."
    mkdir -p "$OUTPUT_DIR"
    echo "✅ Output directory created: $OUTPUT_DIR"
}

# Download the video
download_video() {
    echo "⬇️ Downloading video..."
    
    if [ ! -f "${VIDEO_ID}.mp4" ]; then
        yt-dlp -f "best[height<=720]" -o "${VIDEO_ID}.%(ext)s" "$VIDEO_URL"
        echo "✅ Video downloaded successfully"
    else
        echo "✅ Video already exists, skipping download"
    fi
}

# Extract frames at specific timestamps
extract_frames() {
    echo "🖼️ Extracting frames at key timestamps..."
    
    # Define timestamps for each segment (in seconds)
    declare -A timestamps=(
        [1]=0      # Introduction: Transforming Digital Agency Pitches
        [2]=222    # The Power of Teleprompters for Remote Pitches
        [3]=329    # CueCam's Video Cue System
        [4]=459    # Case Study: Digitas LBI Pitch Deck Analysis
        [5]=633    # Eliminating Cover Slides and Intro Cards
        [6]=765    # Branding Without Logo Overlays
        [7]=946    # Animation for Impact: From Space to Time
        [8]=1092   # Breaking Down Complex Slides
        [9]=1552   # Text Readability and Mobile Considerations
        [10]=1622  # Pan and Zoom Techniques
        [11]=1776  # Speaker Notes vs. On-Screen Text
        [12]=1949  # Interactive Demos Over Static Images
        [13]=2027  # Handling Complex Timelines and Budgets
        [14]=2130  # Natural Conversation Over Formal Endings
        [15]=2176  # Real Branding vs. Logo Obsession
        [16]=2226  # CueCam Philosophy and Wrap-up
    )
    
    # Find the video file
    VIDEO_FILE=$(ls ${VIDEO_ID}.* | head -1)
    
    if [ -z "$VIDEO_FILE" ]; then
        echo "❌ Video file not found!"
        exit 1
    fi
    
    echo "📹 Using video file: $VIDEO_FILE"
    
    # Extract frames for each segment
    for segment_id in "${!timestamps[@]}"; do
        timestamp=${timestamps[$segment_id]}
        output_file="$OUTPUT_DIR/frame_${segment_id}.jpg"
        
        echo "🎯 Extracting frame $segment_id at ${timestamp}s..."
        
        # Extract frame at timestamp + 5 seconds to get a more engaging moment
        actual_timestamp=$((timestamp + 5))
        
        ${FFMPEG_CMD:-ffmpeg} -ss "$actual_timestamp" -i "$VIDEO_FILE" -vframes 1 -q:v 2 -y "$output_file" 2>/dev/null
        
        if [ -f "$output_file" ]; then
            echo "✅ Frame $segment_id extracted successfully"
        else
            echo "⚠️ Failed to extract frame $segment_id"
        fi
    done
}

# Optimize images for web
optimize_images() {
    echo "🔧 Optimizing images for web..."
    
    for img in "$OUTPUT_DIR"/*.jpg; do
        if [ -f "$img" ]; then
            # Resize to max width of 600px and compress
            ${FFMPEG_CMD:-ffmpeg} -i "$img" -vf "scale='min(600,iw)':'-1'" -q:v 5 -y "${img%.jpg}_optimized.jpg" 2>/dev/null
            mv "${img%.jpg}_optimized.jpg" "$img"
            echo "✅ Optimized $(basename "$img")"
        fi
    done
}

# Generate a report
generate_report() {
    echo "📊 Generating extraction report..."
    
    echo "Frame Extraction Report" > "$OUTPUT_DIR/report.txt"
    echo "======================" >> "$OUTPUT_DIR/report.txt"
    echo "Video: $VIDEO_URL" >> "$OUTPUT_DIR/report.txt"
    echo "Date: $(date)" >> "$OUTPUT_DIR/report.txt"
    echo "" >> "$OUTPUT_DIR/report.txt"
    echo "Extracted Frames:" >> "$OUTPUT_DIR/report.txt"
    
    for img in "$OUTPUT_DIR"/*.jpg; do
        if [ -f "$img" ]; then
            size=$(wc -c < "$img")
            echo "- $(basename "$img"): ${size} bytes" >> "$OUTPUT_DIR/report.txt"
        fi
    done
    
    echo "✅ Report generated: $OUTPUT_DIR/report.txt"
}

# Update JavaScript file with frame availability
update_javascript() {
    echo "🔗 Updating JavaScript to use extracted frames..."
    
    # Create a simple update to the script.js file
    cat >> script.js << 'EOF'

// Update frame loading function
function loadVideoFrames() {
    videoSegments.forEach(segment => {
        const frameImg = document.getElementById(`frame-${segment.id}`);
        const framePath = `frames/frame_${segment.id}.jpg`;
        
        // Check if frame exists and load it
        const img = new Image();
        img.onload = function() {
            frameImg.src = framePath;
            frameImg.style.display = 'block';
            frameImg.parentElement.querySelector('div').style.display = 'none';
        };
        img.onerror = function() {
            console.log(`Frame ${segment.id} not available, keeping icon`);
        };
        img.src = framePath;
    });
}
EOF
    
    echo "✅ JavaScript updated to load extracted frames"
}

# Main execution
main() {
    echo "🚀 Starting frame extraction process..."
    echo ""
    
    check_dependencies
    setup_directories
    download_video
    extract_frames
    optimize_images
    generate_report
    update_javascript
    
    echo ""
    echo "🎉 Frame extraction complete!"
    echo "📁 Frames saved in: $OUTPUT_DIR/"
    echo "🌐 Open index.html to view the interactive web app"
}

# Run the script
main