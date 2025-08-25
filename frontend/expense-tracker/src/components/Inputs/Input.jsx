import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-[13px] text-slate-800 font-semibold">{label}</label>
      <div className="input-box relative">
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
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FaRegEye size={22} />
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
