import React, { useContext, useState } from "react";
import axios from "axios";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [results, setResults] = useState([]);
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

  //지출 계산
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

  //이미지 기능
  const createImage = async (query) => {
    const url = `http://localhost:3000/search?query=${encodeURIComponent(
      query
    )}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setResults(data.items);
        return data.items;
      } else {
        console.error("Error:", response.status, response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error:", error);
      return [];
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
        results,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
