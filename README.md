InterviewIQ.AIElevate Your Career with AI-Powered Mock InterviewsInterviewIQ.AI is a next-generation interview preparation platform that bridges the gap between preparation and performance. By leveraging Speech-to-Text (STT), Resume Parsing, and Large Language Models (LLMs), it provides job seekers with a realistic, timed environment to practice both Technical and Behavioral interviews.🚀 Core Features🎙️ AI Voice-Based InterviewingSpeech-to-Text (STT): Immersive, hands-free experience using real-time verbal response capture.Dynamic Difficulty Scaling: The AI adjusts question complexity based on a 5-step flow:Q1 & Q2: Easy (Fundamentals)Q3 & Q4: Medium (Scenario-based)Q5: Hard (System Design / Advanced Logic)Timed Pressure: Integrated timers simulate real-world interview constraints.📄 Intelligent Resume AnalysisAutomated Parsing: Extracts skills, projects, and roles from uploaded PDFs.Tailored Content: Generates unique interview questions based specifically on your background.Skill-Gap Analysis: Provides feedback mapped directly to your listed expertise.📊 Advanced AnalyticsScoring Engine: Instant metrics for Technical Correctness, Clarity, and Confidence.Visual Dashboards: Progress tracking via charts and performance bars.Exportable Reports: Professional PDF summaries generated via jsPDF.🛠️ Tech Stack & Cloud ServicesFrontend & UIReact 19 & Vite: For lightning-fast rendering and modern state management.Tailwind CSS 4: Ultra-responsive, utility-first styling.Framer Motion: For smooth, high-end UI transitions.Redux Toolkit: Centralized state for user sessions and interview data.Backend & LogicNode.js & Express 5: High-performance, scalable API architecture.Firebase Auth: Secure social and email authentication.Custom JWT: Secure backend route protection and session persistence.Cloud Integrations & APIs☁️ MongoDB Atlas: Managed cloud database for user profiles and interview history.🤖 OpenRouter API: Access to elite LLMs (GPT-4, Claude) for sophisticated feedback.💳 Razorpay API: Secure, integrated payment gateway for credit top-ups.🚀 Render: Fully automated deployment for both Client and Server.📂 Project StructurePlaintextMINIPROJECT/
├── client/                # React 19 Frontend
│   ├── src/
│   │   ├── components/    # UI Building Blocks (Navbar, Timer, etc.)
│   │   ├── pages/         # Full Views (InterviewPage, Dashboard)
│   │   ├── redux/         # Store and Slices (usersSlice.js)
│   │   └── utils/         # Firebase & Helper Configs
│   └── vite.config.js
└── server/                # Node.js Backend
    ├── config/            # DB (MongoDB Atlas) & Token Logic
    ├── controllers/       # Business Logic (Interview/Payment/User)
    ├── models/            # Mongoose Schemas (User, Interview, Payment)
    ├── routes/            # API Endpoints
    ├── services/          # External API Wrappers (OpenRouter, Razorpay)
    └── index.js           # Server Entry Point
⚙️ Installation & Setup1. Clone the RepositoryBashgit clone https://github.com/your-username/InterviewIQ.AI.git
cd InterviewIQ.AI
2. Configure Environment VariablesCreate a .env file in the server/ directory:Code snippetPORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
OPENROUTER_API_KEY=your_openrouter_api_key
3. Install & RunServer:Bashcd server
npm install
npm run dev
Client:Bashcd ../client
npm install
npm run dev
🌐 API EndpointsMethodEndpointDescriptionPOST/api/auth/registerUser signup & Firebase syncPOST/api/interview/analyzeAI scoring & STT processingPOST/api/resume/analyzeResume parsing & skill extractionPOST/api/payment/verifyRazorpay signature verification🔮 Future RoadmapVideo Analysis: Facial expression and eye-contact scoring via @napi-rs/canvas.Multi-Language Support: Practice interviews in non-English languages.LinkedIn Import: Direct profile sync for automated resume building.
