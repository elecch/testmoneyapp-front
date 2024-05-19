// src/components/CategoryPieChart.js
import React from "react";
import { ResponsivePie } from "@nivo/pie";

const CategoryPieChart = ({ data, type }) => {
  const categoryMap = {
    salary: "급여",
    freelancing: "외주 수입",
    investments: "금융 투자",
    stocks: "주식",
    bitcoin: "비트코인",
    bank: "계좌 송금",
    youtube: "유튜브",
    other: "기타",
    education: "교육",
    groceries: "식료품",
    health: "의료",
    subscriptions: "구독료",
    takeaways: "배달음식",
    clothing: "품위유지비",
    travelling: "여행비",
    fixed_expense: "고정 지출",
    fixed_income: "고정 수입",
  };

  const transformedData = data.map((item) => ({
    ...item,
    id: categoryMap[item.id] || item.id,
    label: categoryMap[item.label] || item.label,
  }));

  return (
    <div style={{ height: "500px" }}>
      <h2>{type === "income" ? "수입 카테고리" : "지출 카테고리"}</h2>
      <ResponsivePie
        data={transformedData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: "color" }}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={2}
        radialLabelsLinkOffset={4}
        sliceLabel={(d) => d.value.toLocaleString()} // Add comma separators
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default CategoryPieChart;
