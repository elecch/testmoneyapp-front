import React, { useEffect, useState } from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/dateFormat";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();
  const [chartData, setChartData] = useState({ datasets: [] });

  // 날짜별로 데이터의 합계를 계산하는 함수를 여기에 정의
  const calculateSumsByDate = (data) => {
    const sums = {}; // 날짜별 합계 저장을 위한 객체

    data.forEach((item) => {
      const formattedDate = dateFormat(item.date); // 날짜 포매팅
      if (!sums[formattedDate]) {
        sums[formattedDate] = 0; // 초기화
      }
      sums[formattedDate] += item.amount; // 금액 합산
    });

    return sums;
  };

  useEffect(() => {
    const incomeSums = calculateSumsByDate(incomes);
    const expenseSums = calculateSumsByDate(expenses);

    // 차트에 사용할 레이블과 데이터 생성
    const labels = Object.keys({ ...incomeSums, ...expenseSums }).sort();
    const incomeData = labels.map((label) => incomeSums[label] || 0);
    const expenseData = labels.map((label) => expenseSums[label] || 0);

    setChartData({
      labels,
      datasets: [
        {
          label: "수입",
          data: incomeData,
          backgroundColor: "rgba(0, 255, 0, 0.5)",
          borderColor: "green",
          tension: 0.2,
        },
        {
          label: "지출",
          data: expenseData,
          backgroundColor: "rgba(255, 0, 0, 0.5)",
          borderColor: "red",
          tension: 0.2,
        },
      ],
    });
  }, [incomes, expenses]); // incomes와 expenses에 대한 의존성 추가

  return (
    <>
      <ChartStyled>
        <Line
          data={chartData}
          options={{ scales: { y: { beginAtZero: true } } }}
        />
      </ChartStyled>
    </>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default Chart;
