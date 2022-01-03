import styled from "styled-components";
export const Article = styled.article`
  h1 {
    margin-right: 30px;
    font-size: 30px;
  }
  position: fixed;
  top: 0;
  left: 5%;
  width: 90%;
  height: 99%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 2px solid black;
  background-color: black;
  color: white;
  button {
    background: inherit;
    font-size: 19px;
    border: none;
    opacity: 0.8;
    padding: 7px;
    margin-bottom: 5px;
    box-shadow: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 250ms ease-in-out;
    color: white;
    &:hover {
      opacity: 1;
      font-size: 19px;
      color: green;
      background-color: black;
    }
  }
`;
export const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 10px;
  &:hover {
    color: #0066ff;
    background-color: black;
  }
`;
