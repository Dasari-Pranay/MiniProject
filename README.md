InterviewIQ.AI – Practice Interviews with Artificial Intelligence
  InterviewIQ.AI is a next-generation AI-powered interview platform designed to help users practice technical and HR interviews in a realistic, timed environment. 
It uses AI-driven speech-to-text technology and resume analysis to deliver personalized feedback on Technical Correctness, Communication Clarity, and Answer Confidence.
This platform is perfect for job seekers, students, and professionals who want to improve their interview performance and understand their strengths and weaknesses before the real interview.

Key Features
🎙️ AI Voice-Based Interviewing
    Speech-to-Text (STT): Capture real-time verbal responses for a hands-free, immersive interview experience.
    Dynamic Questioning: AI generates context-aware questions with different difficulty levels:
      Questions 1 & 2 → Easy
      Questions 3 & 4 → Medium
      Question 5 → Hard
      Timed Questions: Each question has a time limit to simulate real interview conditions.
      Confidence Scoring: AI analyzes your speech to measure how confidently you answer.

📄 Resume Analysis
    Automated Resume Parsing: Upload your resume, and the system extracts:
        Skills
        Projects
        Roles & Experience

Customized Questioning: 
  The platform generates interview questions based on your resume content.
Skill-Based Feedback: 
  Provides insights into strengths and areas for improvement relevant to your resume.

📊 Advanced Analytics & Feedback
    Performance Metrics: Scores for Technical Correctness, Communication Clarity, and Answer Confidence.
    Detailed Feedback: AI provides a complete evaluation with tips for improvement.
    Visual Dashboards: Progress bars and charts to track performance.
    Downloadable Reports: PDF summaries of your practice interviews, including scores and feedback.

💳 Credit & Monetization System
    Usage Credits: Limit interview attempts based on user plan.
    Razorpay Integration: Secure payment gateway for plan upgrades and credit purchases.

🔐 Enterprise-Grade Security
    Hybrid Authentication: Firebase Auth + custom JWT backend verification.
    Protected Routes: Middleware ensures sensitive APIs are secure.
    Data Security: User data encrypted and validated for safe operations.

🛠️ Tech Stack
Layer	Technologies
Frontend	React 19, Vite, Tailwind CSS 4, Redux Toolkit, Framer Motion
Backend	Node.js (ES Modules), Express 5, Multer, BcryptJS
Database	MongoDB (via Mongoose 9)
Integrations	OpenRouter AI, Razorpay, Firebase Auth, jsPDF, jspdf-autotable, @napi-rs/canvas

Project Structure:

MINIPROJECT/
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AuthModel.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Step1SetUp.jsx
│   │   │   ├── Step2Interview.jsx
│   │   │   ├── Step3Report.jsx
│   │   │   └── Timer.jsx
│   │   ├── pages/
│   │   │   ├── Auth.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── InterviewHistory.jsx
│   │   │   ├── InterviewPage.jsx
│   │   │   ├── InterviewReport.jsx
│   │   │   └── Pricing.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── usersSlice.js
│   │   ├── utils/
│   │   │   └── firebase.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
└── server/
    ├── config/
    │   ├── connectDB.js
    │   └── token.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── interview.controller.js
    │   ├── payment.contoller.js
    │   └── user.controller.js
    ├── middlewares/
    │   ├── isAuth.js
    │   └── multer.js
    ├── models/
    │   ├── interview.model.js
    │   ├── payment.model.js
    │   └── user_model.js
    ├── node_modules/
    ├── public/
    ├── routes/
    │   ├── auth.route.js
    │   ├── interview.route.js
    │   ├── payment.route.js
    │   └── user.route.js
    ├── services/
    │   ├── openRouter.service.js
    │   └── razorpay.service.js
    ├── .env
    ├── .gitignore
    ├── index.js
    ├── package-lock.json
    └── package.json
    
Installation & Setup:
  1. Clone & Install
     git clone <your-repo-url>
     cd InterviewIQ.AI
     # Install server dependencies
     cd server && npm install
     # Install client dependencies
     cd ../client && npm install
2. Configure Environment Variables
   Create a .env file in server/:
     PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    RAZORPAY_KEY_ID=your_key_id
    RAZORPAY_KEY_SECRET=your_key_secret
    OPENROUTER_API_KEY=your_openrouter_key
3.Start the Application
  Server:
    cd server
    npm run dev
  Client:
    cd client
    npm run dev

API Endpoints

POST	/api/auth/register	User signup & Firebase sync
POST	/api/auth/login	User login & JWT issuance
POST	/api/interview/analyze	STT processing & AI scoring for 5-question flow
POST	/api/resume/analyze	Upload resume & extract skills, projects, roles, and experience
GET	/api/user/credits	Fetch remaining interview credits
POST	/api/payment/verify	Razorpay signature verification


Developer Notes
  Resume-Based Questioning: AI generates interview questions aligned with resume content.
  Difficulty Levels: 5-question flow: Easy → Easy → Medium → Medium → Hard.
  Scoring System: Evaluates Technical Correctness, Communication Clarity, and Confidence.
  Feedback System: Detailed tips on improvements based on AI evaluation.
  Performance: Vite-powered frontend ensures fast hot reload.
  Security: Hybrid Firebase-JWT authentication with middleware route protection.

Future Improvements
  Multi-language AI interview support.
  Personalized interview schedules based on user skill gaps.
  Video analysis and facial expression scoring.
  Smart question recommendation engine based on previous scores.
  Integration with LinkedIn or GitHub for automated resume import.
