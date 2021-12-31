import React, { useEffect, useState } from "react";
import Header from "./components/header/header.jsx";
import Table from "./components/main/table";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_ALL_SEATS_REQUEST } from "./reducers/seat";
function App() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {
    reservationMessage,
    reservationSeatCancelMessage,
    useSpecificSeatInfoMessage,
  } = useSelector(({ seat }) => seat);
  useEffect(() => {
    dispatch({ type: LOAD_ALL_SEATS_REQUEST });
  }, [dispatch]);
  useEffect(() => {
    reservationMessage && alert(reservationMessage);
  }, [reservationMessage]);
  useEffect(() => {
    useSpecificSeatInfoMessage && alert(useSpecificSeatInfoMessage);
  }, [useSpecificSeatInfoMessage]);
  useEffect(() => {
    reservationSeatCancelMessage && alert(reservationSeatCancelMessage);
  }, [reservationSeatCancelMessage]);

  return (
    <>
      <Header setShowModal={setShowModal} />
      <Table setShowModal={setShowModal} showModal={showModal} />
    </>
  );
}
export default App;
