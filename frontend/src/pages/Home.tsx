import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8">
        <div className="text-2xl font-bold">
          <span className="text-blue-400">Snap</span>Shot
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/signin")}
            className="px-6 py-2 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition-all duration-300 font-medium"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium shadow-lg"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-8 py-12 lg:py-20">
        {/* Left Content */}
        <div className="flex-1 lg:pr-12 mb-12 lg:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Organize Your Digital
            <span className="text-blue-400 block">Bookmarks</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Save, organize, and access your favorite websites instantly. Never
            lose track of important links again with SnapShot.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-xl"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="px-8 py-4 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 hover:text-white transition-all duration-300 font-semibold text-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Home;
