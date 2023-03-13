import './ScoreBoard.css'

//crear el componente
//utilizamos parentesis en lugar de llaves para devolver directamente el componente
const ScoreBoard = ({scoreX, scoreO}) =>(
    <div className='score-board'>
        <div>{scoreX}</div>
        <div>{scoreO}</div>
    </div>
)

export default ScoreBoard;