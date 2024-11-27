import { useState } from "react";
import "./App.css";

function App() {
  const [filas, setFilas] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [turno, setTurno] = useState("X");

  function cellClick(event) {
    const id = event.target.id;
    let nroFila = parseInt(id.split("")[0]);
    let nroCelda = parseInt(id.split("")[1]);
    const btn = event.target;

    if (turno === "X" && filas[nroFila][nroCelda] === null) {
      let newFilas = [...filas];
      newFilas[nroFila][nroCelda] = turno;
      setFilas(newFilas);
      setTurno("O");
    } else if (turno === "O" && filas[nroFila][nroCelda] === null) {
      let newFilas = [...filas];
      newFilas[nroFila][nroCelda] = turno;
      setFilas(newFilas);
      setTurno("X");
    }
    console.log(filas);
  }

  function verificarGanador(filas, jugador) {
    const winningConditions = [
      //Horizontal winning conditions
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      //Vertical winning conditions
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      //Diagonal winning conditions
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (
        filas[Math.floor(a / 3)][a % 3] === jugador &&
        filas[
          Math.floor(b / 3)[b % 3] === jugador &&
            filas[Math.floor(c / 3)[c % 3] === jugador]
        ]
      ) {
        console.log("win");
        return true
      }
    }
    return false 
  }
      verificarGanador(filas, turno)

  return (
    <>
      <div className="h-96 w-96 bg-cyan-700 flex flex-col gap-2">
        {filas.map((fila, indiceFila) => {
          return (
            <div key={indiceFila} className="w-full h-1/3 flex gap-4">
              {fila.map((celda, indiceCelda) => {
                return (
                  <button
                    key={indiceFila + indiceCelda}
                    id={indiceFila + "" + indiceCelda}
                    onClick={cellClick}
                    className=" active:bg-white  h-full w-1/3 flex flex-col items-center justify-center border border-black"
                  >
                    {celda}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
