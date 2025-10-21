# AI InterviewPrez 

**A human-centered, AI-powered interview companion to help you prepare smarter, speak confidently, and land your dream job.**

---

##  Overview

**AI InterviewPrez** is your personal AI interviewer and allows you to practice and anayse your Resume.
It listens, responds, and adapts to the way you talk — helping you practice real interviews in a safe, intelligent, and interactive environment.

You can:

* Speak naturally and get realistic follow-up questions.
* Receive instant feedback on your answers and communication.
* Upload your resume for personalized, AI-powered analysis.
* Track your improvement across sessions.

Our goal is simple — to make interview preparation feel less intimidating and more human.

---

## What You Can Do

### 1. AI Mock Interviews

* Talk with an **AI interviewer** that behaves like a real hiring manager.
* Practice for roles in **software, data science, and product management**.
* Get **real-time insights** into your answers and tone.
* See your **progress** with performance reports after each session.

### 2. Resume Analysis

* Get your resume analyzed for **ATS compatibility** and clarity.
* Receive **feedback on content, structure, and role alignment**.
* Discover **keyword suggestions** based on job descriptions.
* Use tailored templates to improve presentation and readability.
  
### 3. Real-time Practice Sessions

* Speak freely — your voice is transcribed, understood, and answered in real time.
* Hear **natural AI voice responses** for a more engaging conversation.
* Review your **recorded sessions** to reflect on your performance.

---

## ⚙️ Getting Started

### Requirements

* React.js 
* npm or yarn
* Hugging Face API key
* Google gemini API

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/ai-interviewprez.git
cd ai-interviewprez
```

2. **Install dependencies**

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

3. **Set up environment variables**

```bash
# Create .env in /server
GOOGLE_GEMINI_KEY=your_gemini_key
HF_API_KEY=your_huggingface_api_key
PORT=5000
CLIENT_URL=http://localhost:3000
```

4. **Run the app**

```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm start
```

Access it at:

* Frontend → [http://localhost:3001](http://localhost:3001)
* Backend → [http://localhost:5000](http://localhost:5000)

---

## 💡 Tech Stack

### Frontend

* **React 18** — component-based, fast, and interactive
* **Tailwind CSS** — clean and responsive UI
* **Framer Motion** — smooth transitions and animations
* **Socket.io Client** — real-time updates
* **React Router** — seamless navigation

### Backend

* **Node.js + Express** — lightweight server setup
* **Socket.io** — two-way, low-latency communication
* **Hugging Face Inference API** — AI-driven responses and transcription

### AI Integration

* **Speech-to-Text** — converts spoken answers into text
* **Text Generation** — crafts human-like interviewer responses
* **Text-to-Speech** — converts AI replies back into natural audio

---

## Architecture

```
ai-interviewprez/
├── frontend/                 # React frontend
│   ├── components/         # Reusable UI elements
│   ├── pages/              # Major routes (Interview, Resume, etc.)
│   ├── stores/             # Global state (Zustand / Redux)
│   └── utils/              # Helpers and configuration
├── backend/                 # Express + Socket backend
│   ├── server.js           # Core logic and socket handling
│   ├── routes/             # API endpoints
│   ├── uploads/            # Temporary audio storage
│   └── controllers/        # Request and response handlers
└── README.md
```

---

## API & Socket Events

**Socket Communication**

* `user-audio` → Send user’s recorded audio
* `user-text` → Send manually typed input
* `ai-text` → Receive AI-generated response
* `ai-audio` → Receive voice output for playback
* `end-interview` → Close session gracefully


## 🧩 Core UI Pages

* **Home** — Platform overview and call to action
* **Interview Practice** — Voice-based interview simulation
* **Resume Analyser** — Resume feedback and improvement
* **Dashboard** — Track your sessions and progress
* **Community** — Connect with peers and mentors

---

## ❤️ Vision

AI InterviewPrez is built to **humanize interview preparation**.
Instead of memorizing answers, you can **train to think and speak clearly**, just like in a real conversation.

Whether you’re an entry-level developer or an experienced engineer — this platform helps you **find your confidence before the real interview begins.**

---
