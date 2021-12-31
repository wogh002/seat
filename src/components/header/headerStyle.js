import styled from "styled-components";
export const HeaderContainer = styled.header`
  padding: 30px 0;
  h1 {
    text-align: center;
    color: red;
  }
  h2 {
    cursor: pointer;
    opacity: 0.5;
    &:hover {
      color: #0066ff;
    }
  }
  span {
    margin-right: 12px;
  }
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    div:first-child {
      margin-right: 80px;
      span {
        display: block;
        margin-bottom: 15px;
      }
    }
    div {
      button {
        background: inherit;
        border: 1px solid black;
        padding: 7px;
        box-shadow: none;
        border-radius: 10px;
        cursor: pointer;
        margin-right: 10px;
        transition: all 250ms ease-in-out;
        &:hover {
          color: white;
          background-color: black;
        }
      }
    }
  }
`;
