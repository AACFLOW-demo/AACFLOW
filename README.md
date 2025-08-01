# AACFLOW Demo Website

This is an anonymous academic research demonstration website for the AACFLOW project.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional academic website layout
- **Audio Samples**: 45 audio placeholders organized in 3 columns (15 each)
- **Image Gallery**: 6 image placeholders for research visuals
- **Interactive Elements**: Smooth scrolling, hover effects, and animations

## Structure

- `index.html` - Main webpage
- `styles.css` - Styling and responsive design
- `script.js` - Interactive functionality
- `README.md` - This documentation

## Deployment to GitHub Pages

### Method 1: Using GitHub Web Interface

1. Create a new repository on GitHub
2. Upload all files (`index.html`, `styles.css`, `script.js`) to the repository
3. Go to repository Settings → Pages
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"
7. Your site will be available at `https://yourusername.github.io/repositoryname`

### Method 2: Using Git Commands

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: AACFLOW demo website"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/repositoryname.git

# Push to GitHub
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository settings
```

## Content Placeholders

### Audio Section
- **Column 1**: Original Samples (15 placeholders)
- **Column 2**: AACFLOW Processed (15 placeholders)
- **Column 3**: Baseline Comparison (15 placeholders)

### Image Gallery
- 6 image placeholders for:
  - System Architecture
  - Algorithm Workflow
  - Performance Metrics
  - Comparison Results
  - Technical Diagrams
  - Research Findings

### Abstract Section
- Project overview placeholder
- Research objectives placeholder
- Technical features placeholder
- Technical architecture placeholder

## Customization

To customize the content:

1. **Replace placeholders** in `index.html` with actual content
2. **Add real images** to replace image placeholders
3. **Add audio files** and update audio player functionality
4. **Modify colors/styling** in `styles.css` if needed
5. **Update interactive features** in `script.js` as required

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## License

This is an academic research demonstration. All rights reserved.