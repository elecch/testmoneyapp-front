import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";
import { dateFormat } from "../../utils/dateFormat";

function Form() {
  const { addIncome, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    let value = e.target.value;

    // 금액 입력 필드에 콤마 추가
    if (name === "amount") {
      value = value.replace(/,/g, "");
      if (!isNaN(value) && value !== "") {
        value = parseFloat(value).toLocaleString();
      }
    }

    setInputState({ ...inputState, [name]: value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 콤마 제거 후 숫자로 변환
    const numericAmount = parseFloat(amount.replace(/,/g, ""));
    const formattedDate = date ? dateFormat(date) : "";

    const payload = {
      ...inputState,
      amount: numericAmount,
      date: formattedDate,
    };

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("금액은 양수이며 숫자여야 합니다!");
      return;
    }

    addIncome(payload);

    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          value={title}
          name={"title"}
          placeholder="급여 명칭"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          value={amount}
          type="text"
          name={"amount"}
          placeholder="급여 양"
          onChange={handleInput("amount")}
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="날짜 입력"
          selected={date}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
        />
      </div>
      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput("category")}
        >
          <option value="" disabled>
            옵션 선택
          </option>
          <option value="salary">급여</option>
          <option value="freelancing">외주 수입</option>
          <option value="investments">금융 투자</option>
          <option value="stocks">주식</option>
          <option value="bitcoin">비트 코인</option>
          <option value="bank">계좌 송금</option>
          <option value="youtube">구독</option>
          <option value="fixed_income">월 고정수입</option>
          <option value="other">기타</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="추가 내용"
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput("description")}
        ></textarea>
      </div>
      <div className="submit-btn">
        <Button
          name={"수입 추가하기"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent)"}
          color={"#fff"}
        />
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

export default Form;
