import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

type Props = {
  label: string;
  modeKey: string;
  placeholder: string;
  type?: string;
  name?: string;
  password?: boolean;
  showPassword?: boolean;
  setShowPassword?: (p: any) => void;
  value?: string | number;
  onChange?: (t: any) => void;
};

const TextInput = ({
  label,
  placeholder,
  type = "text",
  password = false,
  showPassword,
  setShowPassword,
  onChange,
  value,
  name,
  modeKey,
}: Props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={modeKey}
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: 200,
          transition: {
            ease: "easeOut",
            duration: 0.5,
            type: "tween",
          },
        }}
        transition={{
          delay: 0.25,
          ease: "easeOut",
          duration: 0.5,
          type: "spring",
        }}
        className="flex flex-col text-xs gap-2 w-full"
      >
        {password ? (
          <>
            <label
              htmlFor="
            "
              className="text-xs font-semibold"
            >
              {label}
            </label>
            <div className="border outline-none rounded-md flex w-full justify-between items-center overflow-hidden">
              <input
                type={showPassword ? type : "password"}
                className="outline-none transparent  p-3"
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                value={value}
                required
              />
              <div
                onClick={() =>
                  setShowPassword && setShowPassword((prev: any) => !prev)
                }
                className="w-10 h-10 flex justify-center items-center text-gray-500 cursor-pointer"
              >
                {showPassword ? (
                  <BsEye fontSize={20} />
                ) : (
                  <BsEyeSlash fontSize={20} />
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <label
              htmlFor="
       "
              className="text-xs font-semibold"
            >
              {label}
            </label>
            <input
              type={type}
              className="border outline-none p-3 rounded-md"
              placeholder={placeholder}
              onChange={onChange}
              name={name}
              value={value}
              required
            />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default TextInput;
