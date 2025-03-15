'use client'
import React, { useEffect } from "react";

// Definição do tipo para o estado dos jogadores
type PlayerStatus = { player1: boolean; player2: boolean };

interface TypeTimer {
  min: number;
  sec: number;
  mil: number;
}

interface Props {
  id: "player1" | "player2";
  timer: TypeTimer;
  status: PlayerStatus;
  setStatus: React.Dispatch<React.SetStateAction<PlayerStatus>>;
  setTimer: React.Dispatch<React.SetStateAction<TypeTimer>>;
}

export default function ButtonTimerPlayer({ timer, setTimer, setStatus, status, id }: Props) {
    
    const handleClick = () => {
        console.log("status", status);
        const newStatus = {
            player1: id !== "player1",
            player2: id !== "player2"
        };
        setStatus(newStatus);
    };

    useEffect(() => {
        if (!status[id]) return; // Sai se o cronômetro estiver pausado

        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer.min === 0 && prevTimer.sec === 0 && prevTimer.mil === 0) {
                    clearInterval(interval); // Para o cronômetro ao chegar em zero
                    setStatus({ player1: false, player2: false });
                    return prevTimer; // Mantém o tempo em zero
                }

                let { min, sec, mil } = prevTimer;

                if (mil > 0) {
                    mil -= 10; // Decrementa milissegundos de 10 em 10
                } else {
                    if (sec > 0) {
                        sec -= 1;
                        mil = 990; // Reseta os milissegundos para 990
                    } else if (min > 0) {
                        min -= 1;
                        sec = 59;
                        mil = 990;
                    }
                }

                return { min, sec, mil }; // Retorna o novo estado
            });
        }, 10); // Atualiza a cada 10ms

        return () => clearInterval(interval); // Cleanup do intervalo ao desmontar ou alterar o status
    }, [status, id, setTimer, setStatus]);

    const color={
        ability:timer.sec>=10?"bg-green-500 border-9 border-green-600":"bg-red-500 border-6 border-red-600",
        disability:timer.sec>=10?"bg-green-200":"bg-red-200"
    }
    return (
        <button
            onClick={handleClick}
            disabled={(status.player1 || status.player2) && !status[id]}  
            className={`w-full h-[30%] px-6 text-6xl py-3 ${
                status[id]? color.ability : color.disability
            } text-white font-semibold rounded-2xl shadow-md hover:shadow-lg active:shadow-sm active:scale-95 transition-all duration-200`}
        >
            {`${timer.min.toString().padStart(2, "0")}:${timer.sec.toString().padStart(2, "0")}:${Math.floor(timer.mil / 10).toString().padStart(2, "0")}`}
        </button>
    );
}
