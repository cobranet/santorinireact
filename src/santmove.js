import {useState} from 'react';

export default function SantMove(props){
    const [smove,setSMove]=useState({who:'',
				   move:'',
				   build:''
				  });
    const handleChange = (e) =>{
	setSMove({...smove,[e.target.name]:e.target.value});
    };
    
    return (
	    <div className="Move">
	    Who
	    <input name="who"
	value={smove.who} onChange={e => handleChange(e)} />
	    Move
	    <input name="move"
	value={smove.move} onChange={e => handleChange(e)} />
	    Build
	    <input name="build"
	value={smove.build} onChange={e => handleChange(e)} />
	    	    <button onClick={()=>props.onClick(smove)}>Odigraj</button>
	    </div>

    )

}
