import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderContainer } from "./headerStyle";
import {
  LOAD_SPECIFIC_SEAT_INFO_REQUEST,
  RESERVATION_CANCEL_SEAT_REQUEST,
  CUR_SEAT_SWITCH_REQUEST,
  LOAD_ALL_SEATS_REQUEST,
} from "../../reducers/seat";
import { SAVE_USER_NAME_REQUEST } from "../../reducers/user";

const Header = ({ setShowModal }) => {
  const { seatInfos, specificSeatInfo } = useSelector(({ seat }) => seat);
  const { me } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  console.log(seatInfos);
  const onClickAllUser = useCallback(() => {
    //전체 랜덤 배치 -> 좌석,시간도 랜덤으로,
    // 철수,영희,바둑이
    // dispatch({
    //   type: LOAD_ALL_SEATS_REQUEST,
    // });

    // for (let i = 0; i < userInfo.length; i++) {}
    const randomSeatNum = getRandomNumber(1, seatInfos.length - 1);
    dispatch({
      type: LOAD_SPECIFIC_SEAT_INFO_REQUEST,
      data: { id: randomSeatNum },
    });
    setShowModal(true);
  }, [setShowModal, dispatch, seatInfos.length]);

  const onClickUser = useCallback(
    ({ target }) => {
      dispatch({
        type: SAVE_USER_NAME_REQUEST,
        data: target.textContent,
      });
    },
    [dispatch]
  );
  const cancelReservationSeat = (id) => {
    console.log(id);
    dispatch({
      type: RESERVATION_CANCEL_SEAT_REQUEST,
      data: id,
    });
  };
  const switchCurSeat = (id) => {
    console.log(id);
    dispatch({ type: CUR_SEAT_SWITCH_REQUEST, data: id });
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

          <button onClick={onClickAllUser}>전체 랜덤 배치</button>
          <div>
            <h2 onClick={onClickUser}>철수</h2>
            <h3>
              {seatInfos.map(
                (item) =>
                  item.reservation &&
                  item.reservation.user.name === "철수" && (
                    <strong key={item.id}>
                      예약좌석번호- {item.seatId ? item.seatId : item.id}
                      <span>시작: {item.reservation.startTime}</span>
                      <span>종료: {item.reservation.endTime}</span>
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
            <div></div>
            <span>
              좌석번호:
              {seatInfos.map(
                (item) => item.user && item.user.name === "철수" && item.id
              )}
            </span>
            {/* 사용 좌석이 있으면 랜덤배치 보이지 않게 */}
            <button onClick={switchCurSeat}>좌석 이동</button>
            <button>
              시작 :
              {seatInfos.map(
                (item) =>
                  item.user && item.user.name === "철수" && item.startTime
              )}
            </button>
            <button>
              종료 :
              {seatInfos.map(
                (item) => item.user && item.user.name === "철수" && item.endTime
              )}
            </button>
          </div>
          <div>
            <h2 onClick={onClickUser}>영희</h2>
            <h3>
              {seatInfos.map(
                (item) =>
                  item.reservation &&
                  item.reservation.user.name === "영희" && (
                    <strong key={item.id}>
                      예약좌석번호- {item.seatId ? item.seatId : item.id}
                      <span>시작: {item.reservation.startTime}</span>
                      <span>종료: {item.reservation.endTime}</span>
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

            <span>
              좌석번호:
              {seatInfos.map(
                (item) => item.user && item.user.name === "영희" && item.id
              )}
            </span>
            {seatInfos.map(
              (item) =>
                item.user &&
                item.user.name === "영희" && (
                  <button
                    onClick={() => {
                      switchCurSeat(item.id);
                    }}
                  >
                    좌석 이동
                  </button>
                )
            )}

            <button>
              시작 :
              {seatInfos.map(
                (item) =>
                  item.user && item.user.name === "영희" && item.startTime
              )}
            </button>
            <button>
              종료 :
              {seatInfos.map(
                (item) => item.user && item.user.name === "영희" && item.endTime
              )}
            </button>
          </div>
          <div>
            <h2 onClick={onClickUser}>바둑이</h2>
            <h3>
              {seatInfos.map(
                (item) =>
                  item.reservation &&
                  item.reservation.user.name === "바둑이" && (
                    <strong key={item.id}>
                      <span>
                        예약좌석번호- {item.seatId ? item.seatId : item.id}
                      </span>
                      <span>시작: {item.reservation.startTime}</span>
                      <span>종료: {item.reservation.endTime}</span>
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
            <span>
              좌석번호:
              {seatInfos.map(
                (item) => item.user && item.user.name === "바둑이" && item.id
              )}
            </span>
            <button>좌석 이동</button>

            <button>
              시작 :
              {seatInfos.map(
                (item) =>
                  item.user && item.user.name === "바둑이" && item.startTime
              )}
            </button>
            <button>
              종료 :
              {seatInfos.map(
                (item) =>
                  item.user && item.user.name === "바둑이" && item.endTime
              )}
            </button>
          </div>
        </div>
      </section>
    </HeaderContainer>
  );
};

export default Header;
