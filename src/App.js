import React, { useEffect, useState } from "react";
import Header from "./components/header/header";
import Table from "./components/main/table";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_ALL_SEATS_REQUEST } from "./reducers/seat";
function App() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {
    reservationMessage,
    useSpecificSeatInfoMessage,
    curSeatSwitchMessage,
    reservationSeatCancelMessage,
    useSpecificSeatInfoError,
    reservationSeatError,
  } = useSelector(({ seat }) => seat);
  // TODO : 주석 뎁스 will find
  useEffect(() => {
    dispatch({ type: LOAD_ALL_SEATS_REQUEST });
  }, [dispatch]);

  useEffect(() => {
    reservationSeatError && alert(reservationSeatError);
  }, [reservationSeatError]);
  useEffect(() => {
    useSpecificSeatInfoError && alert(useSpecificSeatInfoError);
  }, [useSpecificSeatInfoError]);
  useEffect(() => {
    reservationMessage && alert(reservationMessage.message);
  }, [reservationMessage]);
  useEffect(() => {
    useSpecificSeatInfoMessage && alert(useSpecificSeatInfoMessage.message);
  }, [useSpecificSeatInfoMessage]);
  useEffect(() => {
    curSeatSwitchMessage && alert(curSeatSwitchMessage.message);
  }, [curSeatSwitchMessage]);
  useEffect(() => {
    reservationSeatCancelMessage && alert(reservationSeatCancelMessage.message);
  }, [reservationSeatCancelMessage]);

  return (
    <>
      <Header />
      <Table setShowModal={setShowModal} showModal={showModal} />
    </>
  );
}
export default App;
