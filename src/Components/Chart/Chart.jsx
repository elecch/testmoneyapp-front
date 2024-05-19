import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/dateFormat";
import { ResponsiveLine } from "@nivo/line";
import CategoryPieChart from "./CategoryPieChart";

function Chart() {
  const { incomes, expenses } = useGlobalContext();
  const [oneMonthLineData, setOneMonthLineData] = useState([]);
  const [sixMonthsLineData, setSixMonthsLineData] = useState([]);
  const [incomePieData, setIncomePieData] = useState([]);
  const [expensePieData, setExpensePieData] = useState([]);

  const calculateSumsByDate = (data) => {
    const sums = {};

    data.forEach((item) => {
      const formattedDate = dateFormat(item.date);
      if (!sums[formattedDate]) {
        sums[formattedDate] = 0;
      }
      sums[formattedDate] += item.amount;
    });

    return sums;
  };

  const filterDataByDateRange = (data, months) => {
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setMonth(currentDate.getMonth() - months);

    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= pastDate && itemDate <= currentDate;
    });
  };

  useEffect(() => {
    const oneMonthIncomes = filterDataByDateRange(incomes, 1);
    const oneMonthExpenses = filterDataByDateRange(expenses, 1);

    const sixMonthsIncomes = filterDataByDateRange(incomes, 6);
    const sixMonthsExpenses = filterDataByDateRange(expenses, 6);

    const incomeSumsOneMonth = calculateSumsByDate(oneMonthIncomes);
    const expenseSumsOneMonth = calculateSumsByDate(oneMonthExpenses);

    const incomeSumsSixMonths = calculateSumsByDate(sixMonthsIncomes);
    const expenseSumsSixMonths = calculateSumsByDate(sixMonthsExpenses);

    const labelsOneMonth = Object.keys({
      ...incomeSumsOneMonth,
      ...expenseSumsOneMonth,
    }).sort();
    const incomeDataOneMonth = labelsOneMonth.map((label) => ({
      x: label,
      y: incomeSumsOneMonth[label] || 0,
    }));
    const expenseDataOneMonth = labelsOneMonth.map((label) => ({
      x: label,
      y: expenseSumsOneMonth[label] || 0,
    }));

    const labelsSixMonths = Object.keys({
      ...incomeSumsSixMonths,
      ...expenseSumsSixMonths,
    }).sort();
    const incomeDataSixMonths = labelsSixMonths.map((label) => ({
      x: label,
      y: incomeSumsSixMonths[label] || 0,
    }));
    const expenseDataSixMonths = labelsSixMonths.map((label) => ({
      x: label,
      y: expenseSumsSixMonths[label] || 0,
    }));

    setOneMonthLineData([
      {
        id: "수입 (1개월)",
        color: "hsl(88, 70%, 50%)",
        data: incomeDataOneMonth,
      },
      {
        id: "지출 (1개월)",
        color: "hsl(348, 70%, 50%)",
        data: expenseDataOneMonth,
      },
    ]);

    setSixMonthsLineData([
      {
        id: "수입 (6개월)",
        color: "hsl(120, 70%, 50%)",
        data: incomeDataSixMonths,
      },
      {
        id: "지출 (6개월)",
        color: "hsl(0, 70%, 50%)",
        data: expenseDataSixMonths,
      },
    ]);

    const calculateCategorySums = (data) => {
      const categorySums = {};

      data.forEach((item) => {
        if (!categorySums[item.category]) {
          categorySums[item.category] = 0;
        }
        categorySums[item.category] += item.amount;
      });

      return Object.keys(categorySums).map((category) => ({
        id: category,
        label: category,
        value: categorySums[category],
      }));
    };

    const incomeCategoryData = calculateCategorySums(sixMonthsIncomes);
    const expenseCategoryData = calculateCategorySums(sixMonthsExpenses);
    setIncomePieData(incomeCategoryData);
    setExpensePieData(expenseCategoryData);
  }, [incomes, expenses]);

  return (
    <>
      <ChartContainer>
        <h2>최근 1개월 그래프</h2>
        <ChartStyled>
          <ResponsiveLine
            data={oneMonthLineData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "날짜",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendOffset: -40,
              legendPosition: "middle",
              format: (value) => `${value.toLocaleString()}`,
            }}
            colors={{ scheme: "nivo" }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </ChartStyled>
      </ChartContainer>
      <ChartContainer>
        <h2>최근 6개월 라인 그래프</h2>
        <ChartStyled>
          <ResponsiveLine
            data={sixMonthsLineData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "날짜",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendOffset: -40,
              legendPosition: "middle",
              format: (value) => `${value.toLocaleString()}`,
            }}
            colors={{ scheme: "nivo" }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </ChartStyled>
      </ChartContainer>
      <ChartContainer>
        <h2>최근 6개월 파이 차트</h2>
        <PieChartStyled>
          <CategoryPieChart data={incomePieData} type="income" />
        </PieChartStyled>
        <PieChartStyled>
          <CategoryPieChart data={expensePieData} type="expense" />
        </PieChartStyled>
      </ChartContainer>
    </>
  );
}

const ChartContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
`;

const ChartStyled = styled.div`
  height: 500px;
`;

const PieChartStyled = styled.div`
  height: 500px;
`;

export default Chart;
