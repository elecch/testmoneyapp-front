import React, { useState } from "react";
import axios from "axios";
import { handleError } from "../utils/handleError";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

const defaultValues = {
  email: "",
  password: "",
};

export default function Login() {
  const [loginInput, setLoginInput] = useState(defaultValues);
  const navigate = useNavigate();

  //로그인 form 전송
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/user/login", {
        email: loginInput.email,
        password: loginInput.password,
      });
      navigate("/");
      toast.success("로그인 완료!");
    } catch (error) {
      handleError(error);
    }
  };

  //handle on change event function
  const handleOnChange = (e) => {
    setLoginInput((prevVal) => ({
      ...prevVal,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="__login w-full h-[calc(100dvh-60px)] bg-slate-800 text-white flex justify-center items-center flex-col gap-3">
      <h1 className="text-3xl">로그인 페이지</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="text-black outline-none p-2 rounded"
          type="email"
          placeholder="이메일"
          required
          name="email"
          value={loginInput.email}
          onChange={handleOnChange}
        />
        <input
          className="text-black outline-none p-2 rounded"
          type="password"
          placeholder="비밀번호"
          required
          name="password"
          value={loginInput.password}
          onChange={handleOnChange}
        />
        <button className="primary-btn" type="submit">
          로그인
        </button>
      </form>
    </div>
  );
}
