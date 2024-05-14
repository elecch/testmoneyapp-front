import React from "react";
import styled from "styled-components";

const Results = ({ results }) => {
  return (
    <ResultsStyled>
      {results.map((item, index) => (
        <img
          key={index}
          src={item.link}
          alt={item.title}
          onError={(e) => (e.target.style.display = "none")}
        />
      ))}
    </ResultsStyled>
  );
};

const ResultsStyled = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  img {
    border-radius: 10px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
    width: 200px;
    height: auto;
  }
`;

export default Results;
