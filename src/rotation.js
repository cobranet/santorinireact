import {useState} from 'react';

function Rotation(props){
    const [angle,setAngle]=useState({x:0,y:0,z:0}}

    const handleChange = (e) =>{
	setAngle({...smove,[e.target.name]:Number(e.target.value)});
    };
    
    return (
	    <div className="Angle">
	    Who
	    <input name="x"
	value={smove.who} onChange={e => handleChange(e)} />
	    Move
	    <input name="y"
	value={smove.move} onChange={e => handleChange(e)} />
	    Build
	    <input name="z"
	value={smove.build} onChange={e => handleChange(e)} />
	    	    <button onClick={()=>props.onClick(smove)}>Odigraj</button>
	    </div>

    )



}
