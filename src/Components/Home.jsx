import React, { useEffect, useState, useMemo } from "react";
import Orb from "./Orb/Orb";
import Navigation from "./Navigation/Navigation";
import Dashboard from "./Dashboard/Dashboard";
import Income from "./Income/Income";
import Expenses from "./Expenses/Expenses";
import { useGlobalContext } from "../context/globalContext";
import { handleError } from "../utils/handleError";
import axios from "axios";
import styled from "styled-components";
import bg from "../img/bg.png";
import { MainLayout } from "../styles/Layouts";
import Chart from "../Components/Chart/Chart";

axios.defaults.withCredentials = true;

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [active, setActive] = useState(1);

  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Chart />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user/my-details");
      setIsLoggedIn(true);
      setUserData(response.data.user);
    } catch (error) {
      if (error.response.status === 401) {
        setIsLoggedIn(false);
      }
      handleError(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <AppStyled bg={bg} className="App">
            {orbMemo}
            <MainLayout>
              <Navigation
                username={userData.username}
                active={active}
                setActive={setActive}
              />
              <main>{displayData()}</main>
            </MainLayout>
          </AppStyled>
        </>
      ) : (
        "로그인에 실패하셨습니다. 다시 확인해주세요"
      )}
    </div>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(230, 240, 255, 0.6);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;
