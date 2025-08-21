# SnapShot 📸
Welcome to **SnapShot**! 🚀 A powerful bookmark management and sharing platform that allows users to save, organize, and share their favorite web content, videos, and resources in one beautiful interface.

---

## ✨ Features  
- 🔒 Secure User Authentication & Authorization using JWT  
- 📝 Save and Organize Content (Links, Videos, Notes)  
- 🎥 Support for YouTube Videos and Web Links  
- 🔍 Search and Filter Your Saved Content  
- 🌐 Share Content Collections with Others  
- 📱 Responsive Design with Modern UI  
- 🏷️ Categorize Content with Tags  
- 🗂️ Intuitive Dashboard for Content Management  
- ⚡ Real-time Content Updates  

---

## 💻 Technology Stack  
- **Frontend**: React.js, TypeScript, Tailwind CSS, Vite  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT (JSON Web Tokens)  
- **Styling**: Tailwind CSS for responsive design  

---

## 🚀 Getting Started  

To start working with **SnapShot**, follow these simple steps:  

### 1. Clone the Repository  
Clone the SnapShot repository to your local system:  

```bash  
git clone https://github.com/yourusername/SnapShot.git
cd SnapShot
```

### 2. Set Environment Variables ⚙️
Navigate to the backend directory and create a `.env` file with the following variables:

```bash  
MONGO_URI = your-mongodb-connection-string
JWT_SECRET = your-jwt-secret-key
PORT = 3000
NODE_ENV = development
```

### 3. Install Dependencies 📦
Install dependencies in both frontend and backend folders:

```bash  
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
On new terminal
cd frontend
npm install
```

### 4. Start the Backend Server 🖥️
In the **backend** folder, start the development server:

```bash  
npm start
```
OR
```bash  
node index.js
```

### 5. Start the Frontend 🚀
In the **frontend** folder, start the React application:

```bash  
npm run dev
```

The application will be available at `http://localhost:5173` (frontend) and the API at `http://localhost:3000` (backend).

---

## 🏗️ Project Structure

```
SnapShot/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   ├── hooks/           # Custom React hooks
│   │   ├── icons/           # SVG icons
│   │   └── assets/          # Static assets
│   └── package.json
├── backend/                 # Node.js Express backend
│   ├── controllers/         # Request handlers
│   ├── models/             # Database schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── lib/                # Database connection
└── README.md
```

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login

### Content Management
- `GET /api/content` - Get user's content
- `POST /api/content` - Create new content
- `DELETE /api/content/:id` - Delete content
- `PUT /api/content/:id` - Update content

### Sharing
- `POST /api/share` - Create shareable link
- `GET /api/share/:shareId` - Access shared content

---

## 🎯 Key Features Explained

### Content Types 📋
- **Web Links**: Save and organize important web pages
- **YouTube Videos**: Bookmark and categorize video content  
- **Notes**: Create personal notes and thoughts
- **Images**: Store and share visual content

### Sharing System 🌐
SnapShot provides a robust sharing system that allows users to:
- Generate unique shareable links
- Control access permissions
- Share individual items or entire collections
- Track sharing analytics

---

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Encrypted password storage
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Cross-origin resource sharing configuration
- **Rate Limiting**: API rate limiting for security

---

## 🤝 Contributing

Contributions to SnapShot are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Icons provided by custom SVG components
- UI inspiration from modern content management platforms
- Built with love using React and Node.js

---

**Happy Content Managing!** 🚀📸

*Star ⭐ this repository if you find it helpful!*
