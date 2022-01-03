import React, { useCallback } from "react";
import { CUR_SEAT_SWITCH_REQUEST } from "../../reducers/seat";
import { useDispatch } from "react-redux";
import { Article } from "./modalStyle";
const SeatSwtich = ({ curSeatId, setSeatSwitchModal, standbySeats }) => {
  const dispatch = useDispatch();
  const onSeatMove = useCallback(
    (curSeatId, moving_seat_id) => {
      dispatch({
        type: CUR_SEAT_SWITCH_REQUEST,
        data: { curSeatId, moving_seat_id },
      });
      setSeatSwitchModal((prev) => !prev);
    },
    [dispatch, setSeatSwitchModal]
  );
  return (
    <Article>
      <h4>이용중인 좌석 : {curSeatId} 번 입니다</h4>
      <h3>이동 가능 좌석</h3>
      {standbySeats.length !== 0 ? (
        standbySeats.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onSeatMove(curSeatId, item.id);
            }}
          >
            {item.id}번 좌석
          </button>
        ))
      ) : (
        <span>현재 이동 가능 좌석이 존재하지 않습니다</span>
      )}
      <button
        onClick={() => {
          setSeatSwitchModal((prev) => !prev);
        }}
      >
        닫기
      </button>
    </Article>
  );
};
export default SeatSwtich;
