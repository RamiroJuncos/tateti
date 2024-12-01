import { useState } from "react";
import "./App.css";

function App() {
  const [filas, setFilas] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [turno, setTurno] = useState("X");
  const [ganador, setGanador] = useState(null); 
  
  // Verificación del ganador
  function verificarGanador(filas) {
    const winningConditions = [
      // Horizontal
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Vertical
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonal
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (
        filas[a[0]][a[1]] &&
        filas[a[0]][a[1]] === filas[b[0]][b[1]] &&
        filas[a[0]][a[1]] === filas[c[0]][c[1]]
      ) {
        return filas[a[0]][a[1]]; 
      }
    }
    return false;
  }


  function cellClick(event) {
    if (ganador) return; 
    
    const id = event.target.id;
    let nroFila = parseInt(id.split("")[0]);
    let nroCelda = parseInt(id.split("")[1]);
    
    if (filas[nroFila][nroCelda] === null) {
      let newFilas = [...filas];
      newFilas[nroFila][nroCelda] = turno;
      setFilas(newFilas);
      const newGanador = verificarGanador(newFilas);
      if (newGanador) {
        setGanador(newGanador); 
      } else {
        setTurno(turno === "X" ? "O" : "X");
      }
    }
  }

  function reiniciarJuego() {
    setFilas([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setTurno("X");
    setGanador(false);
  }

  return (
    <div>
      <div className="h-96 w-96  flex flex-col gap-2">
        {filas.map((fila, indiceFila) => {
          return (
            <div key={indiceFila} className="w-full h-1/3 flex gap-4 item-center justify-center">
              {fila.map((celda, indiceCelda) => {
                return (
                  <button
                    key={indiceFila + indiceCelda}
                    id={indiceFila + "" + indiceCelda}
                    onClick={cellClick}
                    className="active:bg-white h-full w-1/3 flex flex-col items-center justify-center border border-black"
                  >
                    {celda}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      
      {ganador && <div className="text-center text-xl my-4">¡El ganador es {ganador}!</div>}
      
      {!ganador && filas.every(fila => fila.every(celda => celda !== null)) && (
        <div className="text-center text-xl my-4">¡Es un empate!</div>
      )}

      <div className="text-center mt-4">
        <button
          onClick={reiniciarJuego}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Reiniciar Juego
        </button>
      </div>
    </div>
  );
}

export default App;
