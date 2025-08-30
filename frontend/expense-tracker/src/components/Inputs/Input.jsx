import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, onChange, placeholder, label, type, className }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-[13px] text-slate-800 font-semibold">{label}</label>
      <div className={`input-box relative ${className}`}>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none pr-10"
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer bg-slate-100 rounded-md p-1"
          >
            {showPassword ? (
              <FaRegEye size={22} className="text-slate-400" />
            ) : (
              <FaRegEyeSlash size={22} className="text-slate-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
