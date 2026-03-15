import React from "react";
import { motion } from "framer-motion";
import { BsRobot, BsGithub, BsLinkedin, BsTwitter, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-[#f3f3f3] px-6 pt-20 pb-16 relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-125 h-75 bg-green-300 opacity-30 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.footer
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-md px-10 md:px-16 py-14"
      >

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <motion.div whileHover={{ y: -4 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-black text-white p-2 rounded-lg">
                <BsRobot size={18} />
              </div>

              <h2 className="font-semibold text-lg">
                InterviewIQ.AI
              </h2>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              AI powered interview preparation platform helping you
              practice smarter with adaptive questions, feedback and
              performance analytics.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 text-gray-500">
              {[BsGithub, BsLinkedin, BsTwitter, BsInstagram].map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2, color: "#16a34a" }}
                  transition={{ duration: 0.2 }}
                  className="cursor-pointer"
                >
                  <Icon size={18} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Platform */}
          <motion.div whileHover={{ y: -4 }}>
            <h3 className="font-semibold mb-4">
              Platform
            </h3>

            <ul className="space-y-3 text-gray-500 text-sm">
              {["AI Interview", "Resume Analysis", "Performance Reports", "Interview History"].map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5, color: "#16a34a" }}
                  className="cursor-pointer transition"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div whileHover={{ y: -4 }}>
            <h3 className="font-semibold mb-4">
              Resources
            </h3>

            <ul className="space-y-3 text-gray-500 text-sm">
              {["Interview Guide", "Blog", "Documentation", "Help Center"].map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5, color: "#16a34a" }}
                  className="cursor-pointer transition"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div whileHover={{ y: -4 }}>
            <h3 className="font-semibold mb-4">
              Company
            </h3>

            <ul className="space-y-3 text-gray-500 text-sm">
              {["About", "Contact", "Privacy Policy", "Terms & Conditions"].map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5, color: "#16a34a" }}
                  className="cursor-pointer transition"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

          <p>
            © 2026 InterviewIQ.AI
          </p>

          <p>
            Built with AI to help you succeed in interviews
          </p>

        </div>

      </motion.footer>

      {/* Large Brand Text */}
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center font-extrabold text-[clamp(3rem,10vw,10rem)] text-gray-200 leading-none mt-10 select-none"
      >
        InterviewIQ
      </motion.h1>

    </div>
  );
};

export default Footer;