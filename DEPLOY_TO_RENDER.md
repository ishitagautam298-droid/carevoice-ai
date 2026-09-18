# 🚀 How to Deploy CareVoice AI to Render (Free & Fast)

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
