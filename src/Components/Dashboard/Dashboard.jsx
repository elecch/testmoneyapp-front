import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { won } from "../../utils/Icons";

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1 className="dashboard-title">모든 거래내역</h1>
        <div className="stats-con">
          <div className="chart-con">
            <div className="amount-con">
              <div className="income">
                <h2>전체 수입</h2>
                <p>
                  {won} {totalIncome().toLocaleString()}
                </p>
              </div>
              <div className="expense">
                <h2>전체 지출</h2>
                <p>
                  {won} {totalExpenses().toLocaleString()}
                </p>
              </div>
              <div className="balance">
                <h2>총 잔액</h2>
                <p>
                  {won} {totalBalance().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History />
            <h2 className="salary-title">
              최소 <span>수입</span>최대
            </h2>
            <div className="salary-item">
              <p>
                ₩
                {Math.min(
                  ...incomes.map((item) => item.amount)
                ).toLocaleString()}
              </p>
              <p>
                ₩
                {Math.max(
                  ...incomes.map((item) => item.amount)
                ).toLocaleString()}
              </p>
            </div>
            <h2 className="salary-title">
              최소 <span>지출</span>최대
            </h2>
            <div className="salary-item">
              <p>
                ₩
                {Math.min(
                  ...expenses.map((item) => item.amount)
                ).toLocaleString()}
              </p>
              <p>
                ₩
                {Math.max(
                  ...expenses.map((item) => item.amount)
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .dashboard-title {
    text-align: center;
  }
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    .chart-con {
      grid-column: 1 / 4;
      height: 400px;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income,
        .expense {
          grid-column: span 2;
        }
        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          p {
            font-size: 2.5rem;
            font-weight: 700;
          }
        }

        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 3rem;
          }
        }
      }
    }

    .history-con {
      grid-column: 4 / -1;
      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

export default Dashboard;
