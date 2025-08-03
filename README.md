# 🌐 ConnectSphere - Social Networking Platform

**ConnectSphere** is a modern social media web application built using the **MERN Stack**. Users can create profiles, connect with others, and interact in a clean, responsive UI inspired by platforms like LinkedIn.

## 🚀 Live Demo

🌍 **Live App**: [https://connectsphere-96s1.onrender.com/](https://connectsphere-96s1.onrender.com/)

🎥 **Demo Video**: [Watch on YouTube](https://www.youtube.com/watch?v=dummy-demo-link)

## 🧪 Test Credentials

You can log in using the following test credentials:

- **Email**: `shivam@gmail.com`  
- **Password**: `12345678`

---

## 🛠️ Local Setup Instructions

### ⚙️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Redux Toolkit, React Router
- **Backend**: Node.js, Express.js,Cloudinary ,Multer
- **Database**: MongoDB (Cloud - MongoDB Atlas)
- **State Management**: Redux Toolkit
- **Notifications**: React Hot Toast

---

### 📦 Prerequisites

- Node.js ≥ 14.x
- npm or yarn
- MongoDB Atlas or Local MongoDB instance

---

### 📁 Folder Structure

project-root/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ └── server.js
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── redux/
│ │ └── App.jsx
│ └── tailwind.config.js

yaml
Copy
Edit

---

## 🧑‍💻 Run the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/connectsphere.git
cd connectsphere
2. Setup Backend
bash
Copy
Edit
cd backend
npm install
🔐 Create .env file in /backend
env
Copy
Edit
PORT=5000
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your_jwt_secret_key
bash
Copy
Edit
npm start
Server will start on http://localhost:5000.

3. Setup Frontend
bash
Copy
Edit
cd ../frontend
npm install
📄 Environment Variables (Optional)
If using .env:

env
Copy
Edit
VITE_API_BASE_URL=http://localhost:5000/api
Then run:

bash
Copy
Edit
npm run dev
Frontend will run on http://localhost:5173.

📸 Screenshots
You can add images showing the UI for Home, Login, Profile, etc.

🧩 Features
✅ Login & Registration (JWT Auth)

✅ User Profile with Profile Picture

✅ Redux-based State Management

✅ Responsive Design (Mobile-Friendly)

✅ Tailwind CSS UI

🔜 Notifications, Jobs, and Chat (In development)

🙌 Acknowledgements
Icons from React Icons

Toast from React Hot Toast

Hosted on Netlify

📬 Contact
If you face any issues or have suggestions:

📧 Email: shivam@gmail.com

📝 License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

Let me know if you want to add custom sections like Contribution Guide, Deployment Notes, or GitHub Actions CI/CD instructions.







Ask ChatGPT
You said:
write every thing in README.md file 


ChatGPT said:
Sure! Below is the complete content for your README.md file. You can copy-paste this directly into your frontend/README.md or project root.

markdown
Copy
Edit
# 🌐 ConnectSphere - Social Networking Platform

**ConnectSphere** is a modern, responsive social media web application built with the **MERN Stack**. It allows users to register, log in, create posts, and view other users’ profiles, much like LinkedIn.

---

## 🚀 Live Demo

🔗 **Live App**: [https://connectsphere.netlify.app](https://connectsphere.netlify.app)

🎥 **Demo Video**: [Watch on YouTube](https://www.youtube.com/watch?v=dummy-demo-link)

---

## 🧪 Test Credentials

Use the following credentials to log in and explore the platform:

- **Email**: `shivam@gmail.com`  
- **Password**: `12345678`

---

## 🛠️ Tech Stack

### 🖥️ Frontend
- React.js (Vite)
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast

### 🔧 Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)

---

## 📦 Project Structure

connectsphere/
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── config/
│ └── server.js
│
├── frontend/
│ ├── public/
│ └── src/
│ ├── assets/
│ ├── components/
│ ├── pages/
│ ├── redux/
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css

yaml
Copy
Edit

---

## ⚙️ Installation and Setup (Run Locally)

### ✅ Prerequisites

- Node.js ≥ 14.x
- npm or yarn
- MongoDB Atlas or Local MongoDB

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/max925001/connectSphere.git

2️⃣ Setup Backend
bash
Copy
Edit
cd backend
npm install
➕ Create a .env file in /backend
env
Copy
Edit
PORT=5000
NODE_ENV=development
PORT=5001
MONGO_URI=mongourl
JWT_SECRET=jwt_secret
JWT_EXPIRY=7d

 FRONTEND_URL=FrontendURL

CLOUDINARY_CLOUD_NAME=cloudinarycloud_name
CLOUDINARY_API_KEY=CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=CLOUDINARY_API_SECRET


bash
Copy
Edit
npm run dev
It will run on http://localhost:5001.

3️⃣ Setup Frontend
bash
Copy
Edit
cd ../frontend
npm install
🧪 If using .env in frontend (optional):
env
Copy
Edit
▶️ Start the Frontend
bash
Copy
Edit
npm run dev
It will run on http://localhost:5173.

🔐 Features
✅ User authentication with JWT

✅ User profile with image

✅ Create and view posts

✅ View other users’ profiles

✅ Responsive design

✅ Tailwind CSS styling

🔜 Notifications, chats, and more

📸 Screenshots
(Add your app screenshots here)

📬 Contact
If you have any questions or feedback:

📧 Email: shivam@gmail.com

📄 License
This project is licensed under the MIT License.

🙏 Acknowledgements
Tailwind CSS

React Icons

React Hot Toast

Netlify

MongoDB Atlas

yaml
Copy
Edit

---

Would you like me to generate a markdown preview or add images (screenshots) or badges (e.g. Netlify deploy status)?






