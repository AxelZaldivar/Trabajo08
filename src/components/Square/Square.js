/*este código será cada uno de los cuadrados del gato*/

import './Square.css';

/*instalamos la libreria classnames con npm i --save classnames para cambiar las clases
de los componentes de forma dinámica y la importamos*/
import classNames from 'classnames';

const checkValue = (value) =>{
    console.log(value);
}

const Square = ({value, onClick, turn, winner, size}) =>{

    const handleClick = () =>{
        //si es el turno de alguien y el square no tiene valor (no es 'X' ni 'O') ejecuta la función onClick()
        (turn !== null && value === null) && onClick();
    }

    //cambia la clase del square según sea el valor
    let squareClass = classNames({
        square: true,
        [`square--${value}`]: value!== null,
        winner: winner,
        [`square--${size}`]: size,
    });

    checkValue(value);
    return(
        <div className={squareClass} onClick={() => handleClick()}></div>
    )
}

export default Square;