# Codex Test Web Application

This project is a minimal JavaScript single-page application scaffolded with npm and webpack. It renders a full-screen canvas wit
h a softly glowing disc that alternates between red and green every second, and it includes a Jest suite that exercises the core
 pulse logic.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```
   The app is served at http://localhost:8080/.

3. Build the production bundle:
   ```bash
   npm run build
   ```
   The output is placed in the `dist/` folder. The build script automatically copies the root HTML template.

4. Run tests:
   ```bash
   npm test
   ```

## Continuous Deployment

This repository ships with a GitHub Actions workflow located at `.github/workflows/ci.yml`. The workflow runs on every push and
 pull request to the `main` branch and does the following:

1. Installs project dependencies with Node.js 20.
2. Executes the Jest unit tests.
3. Builds the production bundle and uploads the `dist/` directory as an artifact for GitHub Pages.
4. Deploys the artifact to GitHub Pages when the commit lands on `main`.

### Enable GitHub Pages

1. Open the repository settings in GitHub and navigate to **Pages**.
2. Set the **Source** to **GitHub Actions**. This allows the workflow to publish the site automatically.
3. Merge a change into `main`. GitHub Actions will build the site and deploy it. The workflow summary shows the published URL o
nce the deployment job finishes.

## Project Structure

```
├── index.html          # Static HTML shell served in dev and copied on build
├── scripts
│   └── copy-static.js   # Copies static assets to the dist folder after builds
├── src
│   ├── index.js         # Application entry point wired up by webpack
│   ├── pulse.js         # Pure pulse state machine used by the canvas renderer
│   └── pulse.test.js    # Jest tests for the pulse logic
├── .gitignore
├── package.json
├── .github
│   └── workflows
│       └── ci.yml      # CI build, test, and GitHub Pages deployment workflow
├── README.md
└── webpack.config.js
```

## Notes

- The configuration keeps dependencies to a minimum: webpack for bundling, `webpack-dev-server` for local development, and Jest
 for unit testing.
- Static assets (currently just `index.html`) live at the repository root so they can be served directly during development and
 copied during builds without additional plugins.
- The build process runs a lightweight Node script to copy over static assets after bundling, avoiding extra webpack plugins.
