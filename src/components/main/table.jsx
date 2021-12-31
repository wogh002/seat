import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_SPECIFIC_SEAT_INFO_REQUEST } from "../../reducers/seat";
const Main = styled.main`
  ol {
    list-style: none;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
  li {
    border: 1px solid black;
    text-align: center;
    border-radius: 5px;
    font-size: 17px;
    width: 25%;
    padding: 25px 8px;
    margin: 15px;
    span {
      display: block;
    }
    cursor: pointer;
    &:hover {
      color: white;
      background-color: black;
    }
    transition: all 250ms ease-in-out;
  }
`;
const Table = ({ setShowModal, showModal }) => {
  const { me } = useSelector(({ user }) => user);
  const { seatInfos } = useSelector(({ seat }) => seat);
  console.log(seatInfos);
  const dispatch = useDispatch();
  const onShowModal = (id) => {
    setShowModal((prev) => !prev);
    // 특정 좌석 정보 요청.
    dispatch({
      type: LOAD_SPECIFIC_SEAT_INFO_REQUEST,
      data: { id },
    });
  };
  return (
    <Main>
      {me && (
        <ol>
          {seatInfos.map((item) => (
            <li
              key={item.id}
              style={
                item.seatStatus === "대기"
                  ? { color: "green", borderColor: "green" }
                  : { color: "white", background: "#FF0000" }
              }
              onClick={() => onShowModal(item.id)}
            >
              <span>좌석번호 {item.id}</span>
              <span>{item.seatStatus} 좌석</span>
            </li>
          ))}
        </ol>
      )}

      {showModal && <Modal setShowModal={setShowModal} />}
    </Main>
  );
};
export default Table;
