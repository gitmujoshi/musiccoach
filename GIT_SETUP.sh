#!/bin/bash

# MusicCoach - Git Repository Setup
# This script guides you through setting up the GitHub remote

echo "🎵 MusicCoach - Git Setup"
echo "========================="
echo ""

# Check current status
echo "Current branch: $(git branch --show-current)"
echo "Commits: $(git log --oneline | wc -l) commits"
echo ""

# Check if origin exists
if git remote get-url origin &> /dev/null; then
    echo "✅ Remote 'origin' is already configured:"
    git remote get-url origin
    echo ""
    echo "To push your changes:"
    echo "  git push -u origin $(git branch --show-current)"
else
    echo "📝 Setting up GitHub remote..."
    echo ""
    echo "STEP 1: Create a GitHub repository"
    echo "  Go to: https://github.com/new"
    echo "  Repository name: musiccoach"
    echo "  Public or Private: Your choice"
    echo "  DO NOT initialize with README, .gitignore, or license"
    echo "  Click 'Create repository'"
    echo ""
    echo "STEP 2: Copy your repository URL"
    echo "  It will look like: https://github.com/YOUR_USERNAME/musiccoach.git"
    echo ""
    read -p "Enter your GitHub repository URL: " repo_url
    
    if [ -z "$repo_url" ]; then
        echo "❌ No URL provided. Exiting."
        exit 1
    fi
    
    echo ""
    echo "Adding remote origin: $repo_url"
    git remote add origin "$repo_url"
    
    echo ""
    echo "✅ Remote added successfully!"
    echo ""
    echo "STEP 3: Push your code"
    echo "  Running: git push -u origin $(git branch --show-current)"
    echo ""
    read -p "Press Enter to push, or Ctrl+C to cancel..."
    
    git push -u origin $(git branch --show-current)
    
    echo ""
    echo "🎉 Success! Your code is on GitHub!"
    echo ""
    echo "View it at: ${repo_url%.git}"
fi

echo ""
echo "📊 Repository Summary:"
echo "  Branch: $(git branch --show-current)"
echo "  Files: $(git ls-files | wc -l) tracked files"
echo "  Latest commit: $(git log -1 --pretty=format:'%s')"
echo ""
