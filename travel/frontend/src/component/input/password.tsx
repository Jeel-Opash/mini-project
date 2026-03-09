import React, { useState } from "react";
import "./password.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface PasswordProps {
  value: string;
  onChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const Password: React.FC<PasswordProps> = ({ value, onChanges, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="loginpassword">
      <input type={isShowPassword ? "text" : "password"}
        value={value} onChange={onChanges}
        placeholder={placeholder || "Password"} className="classpassword"
      />

      <span className="eyeicon" onClick={toggleShowPassword}>
        {isShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
      </span>
    </div>
  );
};