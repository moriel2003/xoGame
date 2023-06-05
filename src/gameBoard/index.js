import React, { useState ,useEffect} from 'react';

function Square(props)
{
    return(<button className='square' onClick={props.click} disabled={props.disabled}>{props.place}</button>);
}

export default function GameBoard()
{
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState({symble:"X", turnNum:1});//X,O, no one : till 10
    const [winner,setWinner]=useState({win:false ,player:null});
   

    const restartGame = () => {
        setSquares(Array(9).fill(null));
        setTurn({ symble: "X", turnNum: 1 });
        setWinner({ win: false, player: null });
      }
      
                        

    const winnerCheck=()=>
    {
        const allSquares=squares.slice();
        const winningComboes=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6],[0,4,8]];
        let tempWinner={win:false,player:null};
        winningComboes.forEach(combo=>{
            const [a,b,c]=combo;
            if(!tempWinner.win)//no one already won
            {
            (allSquares[a] === "X" && allSquares[b] === "X" && allSquares[c] === "X")?tempWinner={win:true,player:"X"}:tempWinner=tempWinner;
            (allSquares[a] === "O" && allSquares[b] === "O" && allSquares[c] === "O")?tempWinner={win:true,player:"O"}:tempWinner=tempWinner;
           }}) 
       
        setWinner(tempWinner);
        if(turn.turnNum===10&&!tempWinner.win)
            setWinner({win:true,player:"no one"});
    }


    useEffect(() => {
        if (!winner.win) {
          winnerCheck();
        }
      }, [turn]);

  
      

    
    

    
 




    const squareClick=(index)=>
    {
       if(!winner.win){
        let newSquares=squares.slice();
        if(newSquares[index]!=null)
            alert("dont steal");
        else
        {
        newSquares[index]=turn.symble;
        setSquares(newSquares);
        let newTurn={...turn};
        newTurn.symble = turn.symble === "X" ? "O" : "X";
        newTurn.turnNum=turn.turnNum+1;
        setTurn(newTurn);
    }
        
    }
}
return(<>
    
    <h1 className='Winneris'>the winner is : {winner.player}</h1>
    <button className='restart' onClick={restartGame}>restart</button>
   
    <div className='row'>
        <Square place={squares[0]} click={()=>squareClick(0)} disabled={winner.win}></Square>
        <Square place={squares[1]} click={()=>squareClick(1)} disabled={winner.win}></Square>
        <Square place={squares[2]} click={()=>squareClick(2)} disabled={winner.win}></Square>
    </div>
    <div className='row'>
         <Square place={squares[3]} click={()=>squareClick(3)} disabled={winner.win}></Square>
         <Square place={squares[4]} click={()=>squareClick(4)} disabled={winner.win}></Square>
         <Square place={squares[5]} click={()=>squareClick(5)} disabled={winner.win}></Square>
    </div>
    <div className='row'>
        <Square place={squares[6]} click={()=>squareClick(6)} disabled={winner.win}></Square>
        <Square place={squares[7]} click={()=>squareClick(7)} disabled={winner.win}></Square>
        <Square place={squares[8]} click={()=>squareClick(8)} disabled={winner.win}></Square>
    </div>
    </>);
}