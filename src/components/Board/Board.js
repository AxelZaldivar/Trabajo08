/*La idea de react es crear componentes reutilizables basados en nuestro UI
para hacer la aplicacion bien moduralizada y bien estructurada*/

import Square from "../Square/Square";
import './Board.css';

//({}) son los parámetros a recibir
const Board = ({squares, onClick, turn, winningSquares}) =>{

    /*Para renderizar multiples componentes creados dinámicamente lo mejor es mapear la variable 
    con la que vamos a crear los componentes a elementos HTML*/
    const createSquares = values =>(
        /*El mapeo lo que hace es tomar todos los elementos de un array y devolver a los
        elementos modificados de alguna manera */
        values.map(value => (
            <Square
                //si un square es ganador es porque en winningSquares se incluye su valor
                winner={winningSquares.includes(value)}
                //envía el turno (si continua o se detiene)
                turn={turn}
                onClick={() => onClick(value)}
                value={squares[value]}
                //cada elemento debe tener su propia key única
                //las comillas invertidas sirven para interpolar texto
                //https://latteandcode.medium.com/javascript-como-funcionan-las-comillas-invertidas-88c7fb209e9e
                key={`square_${value}`}
                //modifica el tamaño
                size={0}
            />
        ))
    );

    return(
        //en react en lugar de class es className
        <div className="board">
            <div className="row">
                {createSquares([0,1,2])}
            </div>
            <div className="row">
                {createSquares([3,4,5])}
            </div>
            <div className="row">
                {createSquares([6,7,8])}
            </div>
        </div>
    );
}

export default Board;