import React, { useContext, useState } from "react";
import axios from "axios";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  //수입 계산
  const addIncome = async (income) => {
    const response = await axios
      .post("http://localhost:3000/user/add-income", income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get("http://localhost:3000/user/get-incomes");
    setIncomes(response.data);
    console.log(response.data);
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(
      `http://localhost:3000/user/delete-income/${id}`
    );
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  //수입 계산
  const addExpense = async (income) => {
    const response = await axios
      .post("http://localhost:3000/user/add-expense", income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get("http://localhost:3000/user/get-expenses");
    setExpenses(response.data);
    console.log(response.data);
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(
      `http://localhost:3000/user/delete-expense/${id}`
    );
    getExpenses();
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 4);
  };
  const createImage = async (id) => {
    try {
      // 특정 수입 또는 지출 항목을 찾아내기
      const item = [...incomes, ...expenses].find((item) => item._id === id);
      if (!item) {
        throw new Error("Item not found");
      }

      // DALL-E 3 API를 사용하여 이미지 생성 요청
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: `${item.title} ${item.description}`,
          n: 1, // 생성할 이미지 수
          size: "1024x1024", // 이미지 크기
        },
        {
          headers: {
            Authorization: `Bearer YOUR_API_KEY`, // 실제 API 키로 대체
          },
        }
      );

      // 이미지 URL을 받아옴
      const imageUrl = response.data.data[0].url;

      // 데이터베이스에 이미지 URL 저장 (예시 URL)
      await axios.post("http://localhost:3000/user/add-image", {
        itemId: id,
        imageUrl: imageUrl,
      });

      // 컨텍스트 상태 업데이트
      setIncomes(
        incomes.map((income) =>
          income._id === id ? { ...income, imageUrl: imageUrl } : income
        )
      );
      setExpenses(
        expenses.map((expense) =>
          expense._id === id ? { ...expense, imageUrl: imageUrl } : expense
        )
      );
    } catch (error) {
      console.error("Failed to create image", error);
      setError(error.message || "An error occurred during image creation.");
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        createImage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
