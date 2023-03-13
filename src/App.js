/*Este componente será el manejador general de la aplicación */

//useState se usa para crear el estado de la aplicación
import {useState} from 'react';

//importar hojas de estilos
import './App.css';

//importar componentes
import Board from './components/Board/Board';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import Next from './components/Next/Next';

//posibles combinaciones ganadoras del gato
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {

/*useState va a devolver una variable para saber de quien es turno y una función
para modificar el turno, además estamos incializando la variable turno como 'X'*/
const[turn,setTurn] = useState('X');

/*en este caso, useState va a devolver el estado de cada cuadradito (hay 9) para 
saber quien gano o si hay empate. Fill rellena todo el array*/
const[squares,setSquares] = useState(Array(9).fill(null));

//almacena la posicion ganadora (se inicializa vacía porque aun no hay ganador)
const[winningSquares,setWinningSquares] = useState([]);

//estado para controlar el marcador (ambas se inicializan en 0 pues nadie ha ganado)
const[score,setScore] = useState({
  X: 0,
  O: 0,
});

//función para reiniciar el juego
const reset = () =>{
  setTurn('X');
  setSquares(Array(9).fill(null));
  setWinningSquares([]);
}

const checkForWinner = newSquares =>{
  //para i=0 hasta la longitud de las posiciones ganadoras
  for(let i=0; i<winningPositions.length; i++){
    const[a,b,c] = winningPositions[i];
    //si el valor de 'a' es diferente de nulo y si el valor de 'a' es igual al de 'b' y 'c'
    if(newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]){
      //hay un ganador
      //le pasamos el valor ganador ('X' o 'O') y la posicion ganadora
      endGame(newSquares[a], winningPositions[i])
      return
    }
  }

  //si todos los cuadrados ya tienen estado y no hubo ganador
  if(!newSquares.includes(null)){
    //hay un empate
    //le pasamos un array con las 9 llaves de los 9 cuadrados para animarlos a todos
    endGame(null,Array.from(Array(9).keys()));
    return
  }

  //si no hay ganador ni empate, pasa al siguiente turno
  setTurn(turn === 'X' ? 'O' : 'X');
}

//funcion que se llama cuando el juego termina (sea por ganador o por empate)
const endGame = (result, winningPositions) =>{
  setTurn(null);
  if(result != null){
    //no debemos modificar el estado directamente por lo que se tiene que hacer lo siguiente
    setScore({
      ...score,
      [result]: score[result] +1,
    })
  }
  setWinningSquares(winningPositions);
  //reiniciar el juego 3000 milisegundos después que termina
  setTimeout(() => {
    reset();
  }, 3000);
}

//evento que se activa cuando el usuario da clic sobre algun elemento
const handleClick = square =>{
  //hacer una copia primero de nustros squares para modificarlos
  let newSquares = [...squares];
  //splice(índice del cuadrado a modificar, cantidad de elementos a modificar, modificar)
  //turn = si le toca a 'X' pone 'X' pero si le toca a 'O' pone 'O'
  newSquares.splice(square,1,turn);
  //asignar los cambios de los squares a la variable original
  setSquares(newSquares);
  //invovar función para saber si alguien ganó
  checkForWinner(newSquares);
}

  return (
    //utilizar los componentes que creamos
    <div className='container'>
      <Next turn={turn}/>
      <Board winningSquares={winningSquares} turn={turn} squares={squares} onClick={handleClick}/>
      <ScoreBoard scoreO={score.O} scoreX={score.X}/>
    </div>
)}

export default App;
