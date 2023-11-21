"use client";
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image";
import {ToastContainer} from "react-toastify";

export default function PageWrapper({
  modeKey,
  children,
}: {
  modeKey: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={modeKey}
        initial={{opacity: 0, y: -25}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: -25}}
        transition={{delay: 0.25, ease: "easeOut", duration: 0.25}}
      >
        {children}
      </motion.div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        pauseOnHover
      />
    </AnimatePresence>
  );
}
