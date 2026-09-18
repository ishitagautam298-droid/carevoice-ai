import os, json

base = '/Users/ishitagautam/.gemini/antigravity/scratch/carevoice-ai'

# 1. Update package.json
pkg_path = f'{base}/package.json'
with open(pkg_path, 'r') as f:
    pkg = json.load(f)

pkg['scripts']['start'] = 'node server.cjs'
pkg['scripts']['serve'] = 'node server.cjs'
pkg['dependencies']['express'] = '^4.21.2'

with open(pkg_path, 'w') as f:
    json.dump(pkg, f, indent=2)

# 2. server.cjs for Render Deployment
with open(f'{base}/server.cjs', 'w') as f:
    f.write("""const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5173;

// Serve static assets from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint for Render
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'CareVoice AI',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Fallback to index.html for React SPA client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CareVoice AI production server listening on port ${PORT}`);
});
""")

# 3. render.yaml configuration
with open(f'{base}/render.yaml', 'w') as f:
    f.write("""services:
  - type: web
    name: carevoice-ai
    env: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_VERSION
        value: 20.11.0
      - key: PORT
        value: 10000
    healthCheckPath: /api/health
""")

# 4. DEPLOY_TO_RENDER.md Guide
with open(f'{base}/DEPLOY_TO_RENDER.md', 'w') as f:
    f.write("""# 🚀 How to Deploy CareVoice AI to Render (Free & Fast)

This project is 100% pre-configured for **Render** deployment with automated build and production serving.

---

## Option 1: Deploy as a Web Service (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "CareVoice AI - Geriatric Healthcare Voice Companion"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/carevoice-ai.git
   git push -u origin main
   ```

2. **Go to Render Dashboard** ([https://dashboard.render.com](https://dashboard.render.com)):
   - Click **"New +"** and select **"Web Service"**.
   - Connect your GitHub repository `carevoice-ai`.

3. **Configure the Service Settings**:
   - **Name**: `carevoice-ai`
   - **Region**: Oregon (US West) or closest region
   - **Branch**: `main`
   - **Root Directory**: leave blank (or `./`)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

4. **Click "Create Web Service"**:
   - Render will run `npm install`, compile the Vite production build (`dist/`), and start `server.cjs`.
   - In 1-2 minutes, you will get a live URL: `https://carevoice-ai-xxxx.onrender.com`!

---

## Option 2: Deploy as a Static Site (Alternative)

1. On Render, click **"New +"** -> **"Static Site"**.
2. Connect your GitHub repository.
3. Set:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add Rewrite Rule:
   - Source: `/*` -> Destination: `/index.html` (Action: `Rewrite`)
5. Click **"Create Static Site"**.

---

## Verification After Deployment
- Test voice interaction in Chrome / Safari / Edge.
- Verify microphone permissions.
- Test PDF report download and Clinician SOAP export!
""")

print("Render configurations and deployment guide written successfully!")
