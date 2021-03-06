import Santorini from './santor1';
import SantMove from './santmove';
import {useState} from 'react';
import './App.css';
function App() {
    const [loading,setLoading]=useState(false);
    const [game,setGame]=  useState({table:[0,0,0,0,0,
					     0,0,0,0,0,
					     0,0,0,0,0,
					     0,0,0,0,0,
					    0,0,0,0,0],
				     winner: null,
				     on_move: 'Red',
				      workers:[6,18, 8,16],
				      white_on_move: false});

    const[move,setMove] = useState({
	who:null,
	move:null,
	build:null
    });

    const onMoveClick = (move)=>{
	setMove(move);
	callApiOdigraj(game,move);
    };
    
    const callApi = (game)=> {
	setLoading(true);
    fetch('move',
	  {
	      headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
	      },
	      method: "POST",
	      body: JSON.stringify(game)
	  }
	 )
        .then(res => res.json())
            .then((data) => {
		setLoading(false);
		console.log(data);	
          setGame(data)
        })
        .catch(console.log);

    };
    const callApiOdigraj = (game,move)=> {
	setLoading(true);
	var odig = {game:game,
		move:move};
    fetch('play_move',
	  {
	      headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
	      },
	      method: "POST",
	      body: JSON.stringify(odig)
	  }
	 )
        .then(res => res.json())
            .then((data) => {
		setLoading(false);
		console.log(data);	
		setGame(data);
        })
        .catch(console.log);

    };


  return (
	  <div className="App">

	    <div className="Control">

	      <div className="PlayButton">
		{ !loading && !game.winner  ?
	            <button onClick={()=>callApi(game)}>
				PLAY
		    </button> :
			<span>{ loading && !game.winner  ?
			      'Thinking' :
			      ''}
			</span>}
	      </div>
	      
	      <div className="Winner">
                { !game.winner ? <span>No winner  </span>:<span>'Win'</span>}
		<div className={game.on_move=='Red' ? "SantMoveRed":"SantMoveBlue"}>
		  <span>On move : {game.on_move}</span>   
		  <span><SantMove onClick={onMoveClick} /></span>
		</div>
	        </div>
              </div>
	    <div className="Game"><Santorini game={game} /></div>
	  </div>
	  
  );
}

export default App;
