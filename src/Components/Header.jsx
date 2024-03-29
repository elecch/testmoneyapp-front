import React from "react";
import { useNavigate } from "react-router-dom";
import { handleError } from "../utils/handleError";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function Header({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // 로그아웃 확인하는 메시지
    const isConfirmed = window.confirm("정말 로그아웃 하시겠습니까?");

    // 사용자가 '확인'을 클릭한 경우, 로그아웃 과정을 진행
    if (isConfirmed) {
      try {
        await axios.post("http://localhost:3000/user/logout");
        navigate("/");
        toast.success("로그아웃 완료!");
      } catch (error) {
        handleError(error);
      }
    }
  };
  return (
    <nav className="h-[60px] flex w-full bg-slate-900 text-white p-3 justify-between items-center">
      <h2
        onClick={() => navigate(0)}
        className="font-bold text-xl text-white cursor-pointer select-none"
      >
        예산관리 앱은? 땡그랑
      </h2>

      <ul className="flex gap-1">
        {isLoggedIn ? (
          <>
            <li>
              <button onClick={handleLogout} className="danger-btn">
                로그아웃
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={() => navigate("/")} className="primary-btn">
                로그인
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/signup")}
                className="primary-btn"
              >
                회원가입
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
