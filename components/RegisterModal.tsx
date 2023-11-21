"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  isModal: boolean;
  closeModal: any;
};

const RegisterModal = ({ isModal, closeModal }: Props) => {
  const modalRef: any = useRef(null);
  const modalOverlayRef: any = useRef(null);

  const [otp, setOtp] = useState("");
  const handleClickOutside = (event: any) => {
    if (
      modalRef.current &&
      modalOverlayRef.current &&
      modalOverlayRef.current.contains(event.target) &&
      !modalRef.current.contains(event.target)
    ) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <AnimatePresence key={"register modal"}>
      {isModal && (
        <motion.section
          ref={modalOverlayRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -10,
            transition: {
              delay: 0.2,
            },
          }}
          className={`h-screen z-40 top-0 left-0 w-full fixed bg-[#00000055] backdrop-blur-[1px] flex justify-center items-center `}
        >
          <motion.aside
            ref={modalRef}
            initial={{ opacity: 0, y: -1000 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              // opacity: 0,
              y: -1000,
              transition: {
                delay: 0,
                duration: 0.15,
              },
            }}
            transition={{ ease: "easeOut", duration: 0.25 }}
            className={`text-black w-64 relative left-0 bg-white p-4 px-6 pb-8 min-w-[22rem] rounded-md  transition-all duration-500  flex flex-col gap-6 justify-center items-center`}
          ></motion.aside>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default RegisterModal;
