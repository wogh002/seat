import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderContainer } from "./headerStyle";
import {
  RESERVATION_CANCEL_SEAT_REQUEST,
  USE_SPECIFIC_SEAT_REQUEST,
} from "../../reducers/seat";
import { SAVE_USER_NAME_REQUEST } from "../../reducers/user";
import { getStartTime, getEndTime } from "../../service/time";
import SeatSwtich from "../modal/seatSwtich";
const Header = () => {
  const { seatInfos } = useSelector(({ seat }) => seat);
  const { me } = useSelector(({ user }) => user);
  const [seatSwitchModal, setSeatSwitchModal] = useState(false);
  const [curSeatId, setCurSeatId] = useState(Number);

  //좌석 사용중인 유저 -> boolean id_1 : 철수 ,id_2 : 영희 ,id_3 : 바둑이
  let id_1 = false;
  let id_2 = false;
  let id_3 = false;
  const dispatch = useDispatch();

  const today = new Date();
  const h = today.getHours();
  const m = today.getMinutes();
  const usingSeats = seatInfos.filter((item) => item.user);

  // 좌석 사용중인 유저 추출
  usingSeats &&
    usingSeats.find(({ user }) => {
      switch (user.id) {
        case 1:
          id_1 = !id_1;
          break;
        case 2:
          id_2 = !id_2;
          break;
        default:
          id_3 = !id_3;
      }
    });
  const standbySeats = seatInfos.filter((item) => item.seatStatus === "대기");

  // 만석일 경우
  useEffect(() => {
    usingSeats.length !== 0 &&
      usingSeats.length === seatInfos.length &&
      alert("현재 만석입니다.");
  }, [usingSeats.length, seatInfos.length]);

  // 랜덤좌석번호 추출
  const getRandomSeatNumber = () => {
    let seat_id_1;
    let seat_id_2;
    let seat_id_3;
    while (true) {
      seat_id_1 =
        standbySeats[Math.floor(Math.random() * standbySeats.length)].id;
      seat_id_2 =
        standbySeats[Math.floor(Math.random() * standbySeats.length)].id;
      seat_id_3 =
        standbySeats[Math.floor(Math.random() * standbySeats.length)].id;
      if (
        seat_id_1 === seat_id_2 ||
        seat_id_1 === seat_id_3 ||
        seat_id_2 === seat_id_3
      ) {
        continue;
      } else {
        return {
          seat_id_1,
          seat_id_2,
          seat_id_3,
        };
      }
    }
  };
  // 전체 랜덤 배치
  const onClickAllUser = () => {
    const { seat_id_1, seat_id_2, seat_id_3 } = getRandomSeatNumber();
    !id_1 &&
      dispatch({
        type: USE_SPECIFIC_SEAT_REQUEST,
        data: {
          id: seat_id_1,
          user_id: 1,
          start_time: getStartTime(today, h, m),
          end_time: getEndTime(today, h, m),
        },
      });
    !id_2 &&
      dispatch({
        type: USE_SPECIFIC_SEAT_REQUEST,
        data: {
          id: seat_id_2,
          user_id: 2,
          start_time: getStartTime(today, h, m),
          end_time: getEndTime(today, h, m),
        },
      });
    !id_3 &&
      dispatch({
        type: USE_SPECIFIC_SEAT_REQUEST,
        data: {
          id: seat_id_3,
          user_id: 3,
          start_time: getStartTime(today, h, m),
          end_time: getEndTime(today, h, m),
        },
      });
  };
  // 유저 저장
  const onClickUser = useCallback(
    ({ target }) => {
      dispatch({
        type: SAVE_USER_NAME_REQUEST,
        data: target.textContent,
      });
    },
    [dispatch]
  );

  // 예약좌석 취소
  const cancelReservationSeat = (id) => {
    dispatch({
      type: RESERVATION_CANCEL_SEAT_REQUEST,
      data: id,
    });
  };

  // 좌석이동 클릭시 모달 on/
  const showSeatSwitchModal = (cur_seat_id) => {
    setCurSeatId(cur_seat_id);
    setSeatSwitchModal(true);
  };

  // 유저 랜덤 배치
  const onUserRandomSeat = (user_id) => {
    const { seat_id_1, seat_id_2, seat_id_3 } = getRandomSeatNumber();
    user_id === 1 &&
      !id_1 &&
      dispatch({
        type: USE_SPECIFIC_SEAT_REQUEST,
        data: {
          id: seat_id_1,
          user_id,
          start_time: getStartTime(today, h, m),
          end_time: getEndTime(today, h, m),
        },
      });
    user_id === 2 &&
      !id_2 &&
      dispatch({
        type: USE_SPECIFIC_SEAT_REQUEST,
        data: {
          id: seat_id_2,
          user_id,
          start_time: getStartTime(today, h, m),
          end_time: getEndTime(today, h, m),
        },
      });
    user_id === 3 &&
      !id_3 &&
      dispatch({
        type: USE_SPECIFIC_SEAT_REQUEST,
        data: {
          id: seat_id_3,
          user_id,
          start_time: getStartTime(today, h, m),
          end_time: getEndTime(today, h, m),
        },
      });
  };

  return (
    <HeaderContainer>
      <section>
        <div>
          <h3>좌석 정보</h3>
          <span>
            대기 좌석-
            {
              seatInfos.filter(({ user, reservation }) => !user && !reservation)
                .length
            }
          </span>
          <span>
            사용 좌석-
            {
              seatInfos.filter(({ user, reservation }) => user && !reservation)
                .length
            }
          </span>
          <span>
            예약 좌석-
            {
              seatInfos.filter(({ user, reservation }) => !user && reservation)
                .length
            }
          </span>
        </div>
        <div>
          {me ? <h1>{me}님 안녕하세요</h1> : <h1>사용자를 선택해주세요</h1>}
          {seatInfos.filter((item) => item.user).length < 3 && (
            <button onClick={onClickAllUser}>전체 랜덤 배치</button>
          )}
          <div>
            <h2 onClick={onClickUser}>철수</h2>
            {!id_1 && (
              <button
                onClick={() => {
                  onUserRandomSeat(1);
                }}
              >
                철수 랜덤 배치
              </button>
            )}

            <h3>
              {seatInfos.map(
                (item) =>
                  item.reservation &&
                  item.reservation.user.name === "철수" && (
                    <strong key={item.id}>
                      예약 좌석 번호({item.id})
                      <span> 시작 : {item.reservation.startTime} ~</span>
                      <span>{item.reservation.endTime}</span>
                      <button
                        onClick={() => {
                          cancelReservationSeat(item.reservation.id);
                        }}
                      >
                        예약 좌석 취소
                      </button>
                    </strong>
                  )
              )}
            </h3>
            {seatInfos.map(
              (item) =>
                item.user &&
                item.user.id === 1 && (
                  <React.Fragment key={item.user.id}>
                    <span>좌석 번호: {item.id} </span>
                    <span>
                      {item.startTime} ~ {item.endTime}
                    </span>
                    <button
                      onClick={() => {
                        showSeatSwitchModal(item.id);
                      }}
                    >
                      좌석 이동
                    </button>
                  </React.Fragment>
                )
            )}
          </div>
          <div>
            <h2 onClick={onClickUser}>영희</h2>
            {!id_2 && (
              <button
                onClick={() => {
                  onUserRandomSeat(2);
                }}
              >
                영희 랜덤 배치
              </button>
            )}
            <h3>
              {seatInfos.map(
                (item) =>
                  item.reservation &&
                  item.reservation.user.name === "영희" && (
                    <strong key={item.id}>
                      예약 좌석 번호({item.id})
                      <span> 시작 : {item.reservation.startTime} ~</span>
                      <span>{item.reservation.endTime}</span>
                      <button
                        onClick={() => {
                          cancelReservationSeat(item.reservation.id);
                        }}
                      >
                        예약 좌석 취소
                      </button>
                    </strong>
                  )
              )}
            </h3>
            {seatInfos.map(
              (item) =>
                item.user &&
                item.user.id === 2 && (
                  <React.Fragment key={item.user.id}>
                    <span>좌석 번호: {item.id} </span>
                    <span>
                      {item.startTime} ~ {item.endTime}
                    </span>
                    <button
                      onClick={() => {
                        showSeatSwitchModal(item.id);
                      }}
                    >
                      좌석 이동
                    </button>
                  </React.Fragment>
                )
            )}
          </div>
          <div>
            <h2 onClick={onClickUser}>바둑이</h2>
            {!id_3 && (
              <button
                onClick={() => {
                  onUserRandomSeat(3);
                }}
              >
                바둑이 랜덤 배치
              </button>
            )}
            <h3>
              {seatInfos.map(
                (item) =>
                  item.reservation &&
                  item.reservation.user.name === "바둑이" && (
                    <strong key={item.id}>
                      예약 좌석 번호({item.id})
                      <span> 시작 : {item.reservation.startTime} ~</span>
                      <span>{item.reservation.endTime}</span>
                      <button
                        onClick={() => {
                          cancelReservationSeat(item.reservation.id);
                        }}
                      >
                        예약 좌석 취소
                      </button>
                    </strong>
                  )
              )}
            </h3>
            {seatInfos.map(
              (item) =>
                item.user &&
                item.user.id === 3 && (
                  <React.Fragment key={item.user.id}>
                    <span>좌석 번호: {item.id} </span>
                    <span>
                      {item.startTime} ~ {item.endTime}
                    </span>
                    <button
                      onClick={() => {
                        showSeatSwitchModal(item.id);
                      }}
                    >
                      좌석 이동
                    </button>
                  </React.Fragment>
                )
            )}
          </div>
        </div>
      </section>
      {seatSwitchModal && (
        <SeatSwtich
          curSeatId={curSeatId}
          setSeatSwitchModal={setSeatSwitchModal}
          standbySeats={standbySeats}
        />
      )}
    </HeaderContainer>
  );
};
export default Header;
