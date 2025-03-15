"use client";
import React, { useState } from "react";
import ButtonTimerPlayer from "./_components/button";

export default function Timer() {
  const startTimer: TypeTimer = {
    min: 10,
    sec: 10,
    mil: 10,
  };

  const [timerPlayer1, setTimerPlayer1] = useState<TypeTimer>(startTimer);
  const [timerPlayer2, setTimerPlayer2] = useState<TypeTimer>(startTimer);
  const [statusPlayer, setStatusPlayer] = useState<{
    player1: boolean;
    player2: boolean;
  }>({ player1: false, player2: false });

  return (
    <div
      id="home-container"
      className="w-screen h-screen flex flex-col justify-center items-center p-2 box-border"
    >
      <ButtonTimerPlayer
        key={"player1"}
        timer={timerPlayer1}
        setTimer={setTimerPlayer1}
        id="player1"
        status={statusPlayer}
        setStatus={setStatusPlayer}
        />
      <ButtonTimerPlayer
        key={"player2"}
        timer={timerPlayer2}
        setTimer={setTimerPlayer2}
        id="player2"
        status={statusPlayer}
        setStatus={setStatusPlayer}
      />
    </div>
  );
}
