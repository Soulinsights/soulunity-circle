# 🌿 SoulUnity — Circle of Souls

Welcome to the **Circle of Souls** — an open reflection wall for sharing soul messages, visions, or inner truths. This project is built with HTML, Netlify Functions, and Git, and deployed via Netlify.

## 📁 Project Structure

```
├── index.html                # Main website file
├── netlify.toml              # Netlify build settings
├── data/
│   └── submissions.json      # Stores submitted entries
└── netlify/
    └── functions/
        ├── save-entry.js     # Saves new messages to JSON
        └── get-entries.js    # Serves existing messages
```

## 🚀 How It Works

- Visitors submit their reflections using a simple form
- The form calls a Netlify Function (`save-entry`) to store the message
- The frontend loads messages dynamically using `get-entries`

## ⚙️ Setup Instructions

### 1. Local Setup
```bash
git clone https://github.com/YOUR_NAME/soulunity-circle.git
cd soulunity-circle
npm install # if you want to locally test Netlify functions
```

### 2. Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **Add new site → Import from GitHub**
3. Select your repository
4. Use the default settings:
   - **Build command**: (leave empty)
   - **Publish directory**: `/`
   - Netlify will detect functions via `netlify.toml`

### 3. Done ✅
- Form entries are stored in `/data/submissions.json`
- You can see live entries on your site after refreshing

## 📄 License
This project is open-source and part of the SoulUnity initiative.

---
🕊 May your words ripple like light into the hearts of others.
