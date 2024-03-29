import React, { useState } from "react";
import axios from "axios";
import { handleError } from "../utils/handleError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
axios.defaults.withCredentials = true;

const defaultValues = {
  email: "",
  username: "",
  password: "",
  picture: "",
};

export default function Signup() {
  const [signupInput, setSignupInput] = useState(defaultValues);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/user/signup", {
        email: signupInput.email,
        password: signupInput.password,
        username: signupInput.username,
        picture: signupInput.picture,
      });
      navigate("/");
      toast.success("가입 완료!");
    } catch (error) {
      handleError(error);
    }
  };

  //handle on change event function
  const handleOnChange = (e) => {
    setSignupInput((prevVal) => ({
      ...prevVal,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Header />
      <div className="__signup w-full h-[calc(100dvh-60px)] bg-slate-800 text-white flex justify-center items-center flex-col gap-3">
        <h1 className="text-3xl">회원가입 페이지</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            className="text-black outline-none p-2 rounded"
            type="text"
            placeholder="닉네임"
            required
            name="username"
            value={signupInput.username}
            onChange={handleOnChange}
          />
          <input
            className="text-black outline-none p-2 rounded"
            type="email"
            placeholder="이메일"
            required
            name="email"
            value={signupInput.email}
            onChange={handleOnChange}
          />
          <input
            className="text-black outline-none p-2 rounded"
            type="password"
            placeholder="비밀번호"
            required
            name="password"
            value={signupInput.password}
            onChange={handleOnChange}
          />
          <button className="primary-btn" type="submit">
            가입하기
          </button>
        </form>
      </div>
    </>
  );
}
