import React, { useState } from "react";
import { Article, CloseBtn } from "./modalStyle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESERVATION_SPECIFIC_SEAT_REQUEST } from "../../reducers/seat";
import { getFormatDate } from "../../service/time";

//클릭시 보여지는 modal.
const Modal = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const { specificSeatInfo, specificSeatInfoDone } = useSelector(
    ({ seat }) => seat
  );
  const today = new Date();
  const h = today.getHours();
  const m = today.getMinutes();
  const { me } = useSelector(({ user }) => user);
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // 20220101 yyyymmdd 생성
  getFormatDate(today);
  const times = [
    { id: 1, startTime: "09:00", endTime: "10:00" },
    { id: 2, startTime: "10:00", endTime: "11:00" },
    { id: 3, startTime: "11:00", endTime: "12:00" },
    { id: 4, startTime: "12:00", endTime: "13:00" },
    { id: 5, startTime: "13:00", endTime: "14:00" },
    { id: 6, startTime: "14:00", endTime: "15:00" },
    { id: 7, startTime: "15:00", endTime: "16:00" },
    { id: 8, startTime: "16:00", endTime: "17:00" },
    { id: 9, startTime: "17:00", endTime: "18:00" },
  ];

  const onHideModal = () => {
    setShowModal((prev) => !prev);
  };

  // modal 안에 yyyymmdd mm:dd 클릭 하였을 경우,
  const saveTime = ({ startTime, endTime }) => {
    setStartTime(getFormatDate(today) + " " + startTime);
    setEndTime(getFormatDate(today) + " " + endTime);
  };
  // 좌석 예약.
  const onReservationSeat = () => {
    let user_id;
    if (startTime) {
      if (me === "철수") {
        user_id = 1;
      } else if (me === "영희") {
        user_id = 2;
      } else {
        user_id = 3;
      }
      dispatch({
        type: RESERVATION_SPECIFIC_SEAT_REQUEST,
        data: {
          seat_id: specificSeatInfo.id,
          user_id,
          start_time: startTime,
          end_time: endTime,
        },
      });
      navigate("/");
      setShowModal((prev) => !prev);
    } else {
      alert("시간을 선택해주세요");
    }
  };
  return (
    <Article>
      <h1> {specificSeatInfo && specificSeatInfo.id}번 좌석</h1>
      <span>{me}님 안녕하세요</span>
      {startTime && endTime && <span>{startTime} 선택하셨습니다</span>}
      {times.map((item) => (
        <button
          key={item.id}
          onClick={() => saveTime(item)}
          style={
            specificSeatInfoDone && specificSeatInfo.reservation
              ? specificSeatInfo.reservation.startTime ===
                getFormatDate(today) + " " + item.startTime
                ? { color: "red" }
                : { color: "#8f8" }
              : { color: "#8f8" }
          }
        >
          {getFormatDate(today) + " " + item.startTime + "~" + item.endTime}
        </button>
      ))}
      <div>
        <button onClick={onReservationSeat}>좌석 예약</button>
      </div>
      <CloseBtn onClick={onHideModal}>닫기</CloseBtn>
    </Article>
  );
};

export default Modal;
