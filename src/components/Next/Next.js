import Square from "../Square/Square";
import './Next.css';

const Next = ({turn}) =>{
    var txt = "Turno de: "
    if(!turn){
        turn = 'end';
        txt = "Fin de la partida";
    }

    return(
        <div className="next">
            <h1>{txt}</h1>
            <Square value={turn} size={1}/>
        </div>
    );
}

export default Next;