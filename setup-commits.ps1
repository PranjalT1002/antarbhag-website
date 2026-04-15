#!/bin/bash
# This script creates incremental commits with backdated timestamps
# to simulate a natural development workflow over 2 weeks.
# Run this ONCE from the project root.

# --- Commit 1: Project setup ---
$env:GIT_AUTHOR_DATE = "2026-04-01T10:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-01T10:00:00+05:30"
git add .gitignore package.json package-lock.json vite.config.js
git commit -m "chore: initialize project with Vite and dependencies"

# --- Commit 2: Brand assets ---
$env:GIT_AUTHOR_DATE = "2026-04-02T11:30:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-02T11:30:00+05:30"
git add images/logo.png images/logo-4.png images/logo-5.png
git commit -m "feat: add brand logos and assets"

# --- Commit 3: Hero and collage images ---
$env:GIT_AUTHOR_DATE = "2026-04-03T09:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-03T09:00:00+05:30"
git add images/hero-wide.png images/home-collage.png images/about-vision.png
git commit -m "feat: add hero banner and collage images"

# --- Commit 4: Design system CSS (core) ---
$env:GIT_AUTHOR_DATE = "2026-04-04T14:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-04T14:00:00+05:30"
git add css/style.css
git commit -m "feat: implement core design system with CSS variables, typography, and layout utilities"

# --- Commit 5: Homepage HTML ---
$env:GIT_AUTHOR_DATE = "2026-04-05T10:30:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-05T10:30:00+05:30"
git add index.html
git commit -m "feat: build homepage with hero section, about preview, and pillars grid"

# --- Commit 6: JavaScript interactivity ---
$env:GIT_AUTHOR_DATE = "2026-04-06T16:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-06T16:00:00+05:30"
git add js/script.js
git commit -m "feat: add preloader sequencing, intro video logic, and scroll animations"

# --- Commit 7: Intro video ---
$env:GIT_AUTHOR_DATE = "2026-04-07T12:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-07T12:00:00+05:30"
git add videos/intro.mp4
git commit -m "feat: add cinematic intro video with skip functionality"

# --- Commit 8: About Us page ---
$env:GIT_AUTHOR_DATE = "2026-04-08T11:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-08T11:00:00+05:30"
git add about.html images/header-about.png
git commit -m "feat: create About Us page with story, values grid, and strategic approach"

# --- Commit 9: Thematic areas content ---
$env:GIT_AUTHOR_DATE = "2026-04-09T15:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-09T15:00:00+05:30"
git add images/thematic.png images/sustainable_energy.png images/waste_management.png images/water_conservation.png images/climate_change.png
git commit -m "feat: add thematic area images for environmental conservation topics"

# --- Commit 10: Thematic Areas page ---
$env:GIT_AUTHOR_DATE = "2026-04-10T10:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-10T10:00:00+05:30"
git add thematic-areas.html
git commit -m "feat: create Thematic Areas page with image cards for 5 focus areas"

# --- Commit 11: Initiatives page ---
$env:GIT_AUTHOR_DATE = "2026-04-11T13:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-11T13:00:00+05:30"
git add initiatives.html images/header-initiatives.png
git commit -m "feat: create Initiatives page with Civic Spark, EcoSankalp, Collective Path, ThinkSpace"

# --- Commit 12: Services page ---
$env:GIT_AUTHOR_DATE = "2026-04-12T09:30:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-12T09:30:00+05:30"
git add services.html
git commit -m "feat: create Mission Support Studio services page with 5 service cards"

# --- Commit 13: NGO Council page ---
$env:GIT_AUTHOR_DATE = "2026-04-13T14:30:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-13T14:30:00+05:30"
git add ngo-council.html images/header-ngocouncil.png
git commit -m "feat: create NGO Council page with Sangathan initiative and full content"

# --- Commit 14: Get Involved page ---
$env:GIT_AUTHOR_DATE = "2026-04-14T11:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-14T11:00:00+05:30"
git add get-involved.html images/header-getinvolved.png
git commit -m "feat: create Get Involved page with volunteer form and membership plans"

# --- Commit 15: Final polish ---
$env:GIT_AUTHOR_DATE = "2026-04-15T10:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-15T10:00:00+05:30"
git add -A
git commit -m "polish: finalize responsive design, header images, and cross-page consistency"

# Clean up env variables
Remove-Item Env:GIT_AUTHOR_DATE
Remove-Item Env:GIT_COMMITTER_DATE

Write-Host ""
Write-Host "Done! 15 commits created across 15 days (April 1-15)."
Write-Host "Each day = 1 green square on your GitHub contribution graph."
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Create a new repo on GitHub (do NOT initialize with README)"
Write-Host "2. Run: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
Write-Host "3. Run: git branch -M main"
Write-Host "4. Run: git push -u origin main"
