import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "./context/globalContext";
import { GlobalStyle } from "./styles/GlobalStyle";
import { useWindowSize } from "./utils/useWindowSize";

function App() {
  const { width } = useWindowSize();

  const getFontSize = () => {
    if (width > 1200) return 18;
    if (width > 992) return 16;
    if (width > 768) return 14;
    return 12;
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <GlobalStyle fontSize={getFontSize()} />
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </GlobalProvider>
    </>
  );
}

export default App;
