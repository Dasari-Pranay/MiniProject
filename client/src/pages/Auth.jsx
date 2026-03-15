import React, { useState } from "react";
import { BsRobot } from "react-icons/bs";
import { IoSparklesOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { auth, provider } from "../utils/firebase.js";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { ServerUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

function Auth({ isModel = false, onClose }) {

  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {

      const url = isLogin
        ? `${ServerUrl}/api/auth/login`
        : `${ServerUrl}/api/auth/register`;

      const result = await axios.post(
        url,
        formData,
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));

      if (onClose) {
        onClose();
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {

      const response = await signInWithPopup(auth, provider);
      const User = response.user;

      const result = await axios.post(
        `${ServerUrl}/api/auth/google`,
        {
          name: User.displayName,
          email: User.email,
          photo: User.photoURL
        },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));

      if (onClose) {
        onClose();
      }

    } catch (error) {
      console.log(error);
      dispatch(setUserData(null));
    }
  };

  return (
    <div className={`bg-white w-full ${
      isModel ? "max-w-md p-8 rounded-3xl shadow-lg" : "max-w-lg p-12 rounded-4xl shadow-xl"
    }`}>

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-black text-white p-2 rounded-lg">
            <BsRobot size={18}/>
          </div>
          <h2 className="font-semibold text-lg">InterviewIQ.AI</h2>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-center leading-snug mb-4">
          Continue with{" "}
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2">
            <IoSparklesOutline size={16}/> AI Smart Interview
          </span>
        </h1>

        <p className="text-gray-500 text-center text-sm md:text-base mb-8">
          Sign in to start your AI-powered mock interview preparation journey.
        </p>

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full mb-3 px-4 py-3 border rounded-lg"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 px-4 py-3 border rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-5 px-4 py-3 border rounded-lg"
        />

        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-black text-white py-3 rounded-full mb-4"
        >
          {isLogin ? "Login" : "Register"}
        </motion.button>

        <motion.button
          onClick={handleGoogleSignIn}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-3 py-3 bg-gray-100 rounded-full"
        >
          <FcGoogle size={20}/>
          Continue with Google
        </motion.button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-center text-sm text-gray-500 mt-6 cursor-pointer"
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>

      </motion.div>
    </div>
  );
}

export default Auth;