#!/bin/bash

# MusicCoach - Quick Website Deployment Script
# This script helps you deploy the marketing website to Netlify

echo "🌐 MusicCoach Website Deployment"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -d "website" ]; then
    echo "❌ Error: website/ directory not found"
    echo "Please run this script from the musiccoach-repo root directory"
    exit 1
fi

cd website

echo "📁 Current directory: $(pwd)"
echo ""

# Check if netlify-cli is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Netlify CLI not found. Installing..."
    npm install -g netlify-cli
    echo "✅ Netlify CLI installed!"
    echo ""
fi

echo "🚀 Deployment Options:"
echo ""
echo "1. Deploy to Netlify (Recommended - Free, Custom Domain)"
echo "2. Test locally first (http://localhost:8000)"
echo "3. Exit"
echo ""
read -p "Choose option (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Deploying to Netlify..."
        echo ""
        echo "Note: You'll need to:"
        echo "  1. Authorize Netlify in your browser"
        echo "  2. Choose 'Create & configure a new site'"
        echo "  3. Accept all defaults"
        echo ""
        read -p "Press Enter to continue..."
        
        netlify deploy --prod
        
        echo ""
        echo "✅ Deployment complete!"
        echo ""
        echo "📝 Next steps:"
        echo "  1. Replace images in website/images/ with real screenshots"
        echo "  2. Update App Store links in index.html"
        echo "  3. Set up email collection service (see WEBSITE_GUIDE.md)"
        echo "  4. Add Google Analytics (optional)"
        echo ""
        ;;
    
    2)
        echo ""
        echo "🧪 Starting local server..."
        echo "Visit: http://localhost:8000"
        echo "Press Ctrl+C to stop"
        echo ""
        
        # Try python3 first, then python
        if command -v python3 &> /dev/null; then
            python3 -m http.server 8000
        elif command -v python &> /dev/null; then
            python -m http.server 8000
        else
            echo "❌ Python not found. Install Python or use: npx serve ."
            exit 1
        fi
        ;;
    
    3)
        echo "👋 Goodbye!"
        exit 0
        ;;
    
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac
