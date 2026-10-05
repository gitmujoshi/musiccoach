#!/bin/bash

# MusicCoach Repository Setup Script
# This script helps you push the MusicCoach project to a new GitHub repository

echo "🎵 MusicCoach Repository Setup"
echo "================================"
echo ""
echo "The repository is ready at: /workspace/musiccoach-repo"
echo ""
echo "To create and push to a new GitHub repository, follow these steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   - Go to: https://github.com/new"
echo "   - Repository name: musiccoach"
echo "   - Description: A web-based music practice application with real-time pitch feedback"
echo "   - Make it Public"
echo "   - DO NOT initialize with README, .gitignore, or license"
echo "   - Click 'Create repository'"
echo ""
echo "2. Once created, GitHub will show you the remote URL. It will look like:"
echo "   https://github.com/YOUR_USERNAME/musiccoach.git"
echo ""
echo "3. Run these commands with YOUR repository URL:"
echo ""
echo "   cd /workspace/musiccoach-repo"
echo "   git remote add origin https://github.com/YOUR_USERNAME/musiccoach.git"
echo "   git push -u origin main"
echo ""
echo "================================"
echo ""
echo "Repository contents:"
cd /workspace/musiccoach-repo
ls -lah

echo ""
echo "Git status:"
git log --oneline -1
git status
