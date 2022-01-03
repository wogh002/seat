import React from "react";
import styled from "styled-components";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_SPECIFIC_SEAT_INFO_REQUEST,
  USE_SPECIFIC_SEAT_REQUEST,
} from "../../reducers/seat";
import { getFormatDate, getStartTime, getEndTime } from "../../service/time";
const Main = styled.main`
  ol {
    list-style: none;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  ol button {
    border: none;
    cursor: pointer;
    color: white;
    background: black;
    padding: 20px;
    width: 25%;
    border-radius: 10px;
    &:hover {
      background: white;
      color: black;
    }
    transition: all 250ms ease-in-out;
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
// 좌석
const Table = ({ setShowModal, showModal }) => {
  const { me } = useSelector(({ user }) => user);
  const { seatInfos } = useSelector(({ seat }) => seat);
  const dispatch = useDispatch();

  // modal /on
  const onShowModal = (id) => {
    setShowModal((prev) => !prev);
    // 특정 좌석 정보 요청.
    dispatch({
      type: LOAD_SPECIFIC_SEAT_INFO_REQUEST,
      data: { id },
    });
  };
  const today = new Date();
  const h = today.getHours();
  const m = today.getMinutes();
  // 20220101 yyyymmdd 생성
  getFormatDate(today);

  // 좌석 사용
  const onUseSeat = (item) => {
    let user_id;
    if (me === "철수") {
      user_id = 1;
    } else if (me === "영희") {
      user_id = 2;
    } else {
      user_id = 3;
    }
    dispatch({
      type: USE_SPECIFIC_SEAT_REQUEST,
      data: {
        id: item.id,
        user_id,
        start_time: getStartTime(today, h, m),
        end_time: getEndTime(today, h, m),
      },
    });
  };

  return (
    <Main>
      {me && (
        <ol>
          {seatInfos.map((item) => (
            <React.Fragment key={item.id}>
              {item.seatStatus === "대기" && (
                <button
                  onClick={() => {
                    onUseSeat(item);
                  }}
                >
                  {item.id}번 좌석 사용
                </button>
              )}
              <li
                key={item.id}
                style={
                  item.seatStatus === "대기"
                    ? { color: "green", borderColor: "green" }
                    : { color: "white", background: "#FF0000" }
                }
                onClick={() =>
                  item.seatStatus !== "사용" && onShowModal(item.id)
                }
              >
                <span>좌석번호 {item.id}</span>
                <span>{item.seatStatus} 좌석</span>
              </li>
            </React.Fragment>
          ))}
        </ol>
      )}
      {showModal && <Modal setShowModal={setShowModal} />}
    </Main>
  );
};
export default Table;
