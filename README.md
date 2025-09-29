📝 inQuis Job Portal

A full-stack job portal designed to seamlessly connect job seekers and employers.
Job seekers can apply for jobs, upload resumes, and receive a resume match score based on job descriptions using Sentence Transformers, along with email notifications for application status updates.
Employers can pay a small fee via an integrated payment system to post jobs, manage postings, view applicants, and accept or reject applications.



🚀 Features





🧑‍💼 Candidate Features:





User registration, login, and profile management



💼 Recruiter Features:





Job creation, management, and application tracking



📄 Resume Handling:





Resume upload with AI-powered assessment



💳 Payment Integration:





Stripe-powered job posting payments



📧 Notifications:





Email updates via Brevo



🌐 Media Storage:





Cloudinary for storing media assets



🔐 Security:





Authentication and authorization using JWT



📊 Dashboard:





Centralized management for jobs and applications



🛠 Tech Stack





Frontend:





React



Tailwind CSS



TanStack Query



Lucide Icons



Backend:





Node.js



Express



JWT (authentication)



Stripe (payments)



Brevo (email service)



Cloudinary (media storage)



Database:





MongoDB



Python Module:





NLP-based resume analysis using PyPDF2 and Sentence Transformers



Deployment:





Render (backend)



Vercel (frontend)



Hugging Face (Python module)



📂 Project Structure

inQuis-Job-Portal/
├── backend/                  # Express API
│   ├── controllers/          # API logic
│   ├── models/              # Database schemas
│   ├── routes/              # API routes
│   ├── middlewares/         # Custom middleware
│   └── server.js            # Entry point
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   └── services/        # API service functions
│   └── package.json
├── python/                   # NLP and resume assessment
│   └── main.py              # Resume analysis script
├── assets/                   # Screenshots and demo images
│   └── screenshots/
│       ├── homepage.png
│       ├── dashboard.png
│       └── job-application.png
└── README.md



⚙️ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/your-username/inQuis-Job-Portal.git
cd inQuis-Job-Portal

2️⃣ Install Dependencies

Backend:

cd backend
npm install

Frontend:

cd ../frontend
npm install

Python Module:

cd ../python
pip install -r requirements.txt

3️⃣ Configure Environment Variables

Create .env files in the backend/ and frontend/ directories using the provided .env.example as a reference.

Example .env (backend):

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloud_api_key
CLOUDINARY_API_SECRET=your_cloud_api_secret
BREVO_API_KEY=your_brevo_api_key

4️⃣ Run the Project Locally

Backend:

cd backend
npm run dev

Frontend:

cd frontend
npm run dev

Python Resume Assessment:

cd python
python main.py



🧪 Running Tests

Backend Tests:

cd backend
npm run test

Frontend Tests:

cd frontend
npm run test



📦 Deployment





Frontend: Vercel



Backend: Render



Python Module: Hugging Face



🤝 Contributing





Fork the repository



Create a feature branch:

git checkout -b feature/your-feature



Commit your changes:

git commit -m "Add new feature"



Push to the branch:

git push origin feature/your-feature



Open a Pull Request



📜 License

This project is licensed under the MIT License. See the LICENSE file for details.



🙌 Acknowledgements





React Docs



Express Docs



MongoDB Docs



PyPDF2



Sentence Transformers



Cloudinary Docs



Stripe Docs



Brevo API
