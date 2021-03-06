import * as THREE from "three";
import React from "react";



var rotWorldMatrix;
function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);                // pre-multiply

    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
}


var rotObjectMatrix;
function rotateAroundObjectAxis(object, axis, radians) {
    rotObjectMatrix = new THREE.Matrix4();
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);
    object.matrix.multiply(rotObjectMatrix);
    object.rotation.setFromRotationMatrix(object.matrix);
}


export default class Santorini extends React.Component {

    constructor(props){
	super(props);
	console.log(this.props);
	this.lightColor= 0xfdf3c6;

	this.levelheight=[0.2,0.6,0.7,0.8];


	this.scene = new THREE.Scene();
	this.loader = new THREE.TextureLoader();
	this.light = new THREE.PointLight( this.lightColor );
	this.light.position.set( 3,1, 3 );
	this.scene.add( this.light );	
	
	this.camera = new THREE.PerspectiveCamera( 75,
						  window.innerWidth/window.innerHeight, 0.1, 1000 );
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	this.tablegeo =  new THREE.BoxGeometry( 5, 5, 0.2 );

	

	this.tablemat = new THREE.MeshLambertMaterial(
	    {
	    	map: this.loader.load('Table.jpeg')
	    });


/*	this.tablemat = new THREE.MeshBasicMaterial(
	    {
	    	map: this.loader.load('Table.jpeg')
	    });

*/
	this.group = new THREE.Group();


	this.pawngeo = new THREE.CylinderGeometry( 0.2, 0.2, 0.3, 32 );

	this.pawn1mat = new THREE.MeshLambertMaterial(
	    {
	    	map: this.loader.load('Pawn1.jpg')
	    });
	this.pawn2mat = new THREE.MeshLambertMaterial(
	    {
	    	map: this.loader.load('Pawn2.jpg')
	    });
	this.pawn3mat = new THREE.MeshLambertMaterial(
	    {
	    	map: this.loader.load('Pawn3.jpg')
	    });
	this.pawn4mat = new THREE.MeshLambertMaterial(
	    {
	    	map: this.loader.load('Pawn4.jpg')
	    });

	this.pawnbluemat = new THREE.MeshBasicMaterial( {color: 'blue'  } );
	this.pawnredmat = new THREE.MeshBasicMaterial( {color: 'red'  } );
	
	this.pawn1 = new THREE.Mesh( this.pawngeo, this.pawn1mat);
	this.pawn1.rotation.x = Math.PI/2;

	this.pawn2 = new THREE.Mesh( this.pawngeo, this.pawn2mat);
	this.pawn2.rotation.x = Math.PI/2;
	

	this.pawn3 = new THREE.Mesh( this.pawngeo, this.pawn3mat);
	this.pawn3.rotation.x = Math.PI/2;
	
	this.pawn4 = new THREE.Mesh( this.pawngeo, this.pawn4mat);
	this.pawn4.rotation.x = Math.PI/2;
	
	
	
	this.pawn1.position.z = this.levelheight[this.props.game.table[this.props.game.workers[0]]];
	this.pawn1.position.x = -2 + ( this.props.game.workers[0] )%5;
	this.pawn1.position.y = -2 + Math.floor((this.props.game.workers[0])/5);

	this.pawn2.position.z = this.levelheight[this.props.game.table[this.props.game.workers[1]]];
	this.pawn2.position.x = -2 + ( this.props.game.workers[1] )%5;
	this.pawn2.position.y = -2 + Math.floor((this.props.game.workers[1])/5);

	this.pawn3.position.z = this.levelheight[this.props.game.table[this.props.game.workers[2]]];
	this.pawn3.position.x = -2 + ( this.props.game.workers[2] )%5;
	this.pawn3.position.y = -2 + Math.floor((this.props.game.workers[2])/5);

	this.pawn4.position.z = this.levelheight[this.props.game.table[this.props.game.workers[3]]];
	this.pawn4.position.x = -2 + ( this.props.game.workers[3] )%5;
	this.pawn4.position.y = -2 + Math.floor((this.props.game.workers[3])/5);



	this.table = new THREE.Mesh( this.tablegeo, this.tablemat );
	
	this.lvl1geo = new THREE.BoxGeometry(0.8,0.8,0.4);
	this.lvl1mat = new THREE.MeshLambertMaterial(
	    {
		map: this.loader.load('lvl0.jpeg')

	    });


	this.lvl2geo = new THREE.BoxGeometry(0.6,0.6,0.3);
	this.lvl2mat = new THREE.MeshLambertMaterial(
	    {
		map: this.loader.load('lvl1.jpg')

	    });
	
	this.lvl3geo = new THREE.BoxGeometry(0.4,0.4,0.3);
	this.lvl3mat = new THREE.MeshLambertMaterial(
	    {
		map: this.loader.load('lvl2.jpg')

	    });

	this.lvl4geo = new THREE.ConeGeometry( 0.2, 0.3, 32 );
	this.lvl4mat = new THREE.MeshLambertMaterial( {color:'silver'} );




	this.group.add(this.table);
	this.group.add(this.pawn1);
	this.group.add(this.pawn2);
	this.group.add(this.pawn3);
	this.group.add(this.pawn4);
	
	this.props.game.table.map((field,i)=>{
	    var k;
	    if ( field >= 1){
		k = new THREE.Mesh(this.lvl1geo,this.lvl1mat);
		k.position.z = 0.2;
		k.position.x = -2 + (i)%5;
		k.position.y = -2 + Math.floor((i)/5)  ;

		this.group.add(k);
	    }
	    if ( field >= 2){
		k = new THREE.Mesh(this.lvl2geo,this.lvl2mat);
		k.position.z = 0.4;
		k.position.x = -2 + (i)%5;
		k.position.y = -2 + Math.floor((i)/5)  ;

		this.group.add(k);
	    }
	    if ( field >= 3){
		k = new THREE.Mesh(this.lvl3geo,this.lvl3mat);
		k.position.z = 0.6;
		k.position.x = -2 + (i)%5;
		k.position.y = -2 + Math.floor((i)/5)  ;

		this.group.add(k);
	    }
	    if ( field >= 4){
		k = new THREE.Mesh(this.lvl4geo,this.lvl4mat);
		k.position.z = 0.9;
		k.position.x = -2 + (i)%5;
		k.rotation.x = Math.PI/2;
		k.position.y = -2 + Math.floor((i)/5)  ;

		this.group.add(k);
	    }

	});

    }
    update(){
	this.light = new THREE.PointLight( this.lightColor, 1 );
	this.light.position.set( 0,0, 0 );
	this.scene.add( this.light );	

	this.pawn1.position.z = this.levelheight[this.props.game.table[this.props.game.workers[0]]];
	this.pawn1.position.x = -2 + ( this.props.game.workers[0] )%5;
	this.pawn1.position.y = -2 + Math.floor((this.props.game.workers[0])/5);

	this.pawn2.position.z = this.levelheight[this.props.game.table[this.props.game.workers[1]]];
	this.pawn2.position.x = -2 + ( this.props.game.workers[1] )%5;
	this.pawn2.position.y = -2 + Math.floor((this.props.game.workers[1])/5);

	this.pawn3.position.z = this.levelheight[this.props.game.table[this.props.game.workers[2]]];
	this.pawn3.position.x = -2 + ( this.props.game.workers[2] )%5;
	this.pawn3.position.y = -2 + Math.floor((this.props.game.workers[2])/5);

	this.pawn4.position.z = this.levelheight[this.props.game.table[this.props.game.workers[3]]];
	this.pawn4.position.x = -2 + ( this.props.game.workers[3] )%5;
	this.pawn4.position.y = -2 + Math.floor((this.props.game.workers[3])/5);

	this.props.game.table.map((field,i)=>{
	    var k;
	    if ( field >= 1){
		k = new THREE.Mesh(this.lvl1geo,this.lvl1mat);
		k.position.z = 0.2;
		k.position.x = -2 + (i)%5;
		k.position.y = -2 + Math.floor((i)/5)  ;

		this.group.add(k);
	    }
	    if ( field >= 2){
		k = new THREE.Mesh(this.lvl2geo,this.lvl2mat);
		k.position.z = 0.4;
		k.position.x = -2 + (i)%5;
		k.position.y = -2 + Math.floor((i)/5)  ;

		this.group.add(k);
	    }
	    if ( field >= 3){
		k = new THREE.Mesh(this.lvl3geo,this.lvl3mat);
		k.position.z = 0.6;
		k.position.x = -2 + (i)%5;
		k.position.y = -2 + Math.floor((i)/5)  ;

		this.group.add(k);
	    }
	    if ( field >= 4){
		k = new THREE.Mesh(this.lvl4geo,this.lvl4mat);
		k.position.z = 0.9;
		k.position.x = -2 + (i)%5;
		k.rotation.x = Math.PI/2;
		k.position.y = -2 + Math.floor((i)/5)  ;

		this.group.add(k);
	    }
	})
    }

		
		
					 
    componentDidMount() {

	
	this.mount.appendChild( this.renderer.domElement );
	this.scene.add( this.group );


	this.camera.position.z = 8;
	/* main for table */
	var rotAxis = new THREE.Vector3(-1,-0.5,-2);
	rotateAroundObjectAxis(this.group,rotAxis,Math.PI/2);
	/* main end table angle */
	
	var that= this;
	var animate = function () {
	    requestAnimationFrame( animate );

	    var rotAxis = new THREE.Vector3(0,0.1,0.1);
	    
	    rotateAroundWorldAxis(that.group,rotAxis,Math.PI/570);
	    that.renderer.render( that.scene, that.camera );
	};
	animate();
    }
    render(){
	this.update();
	return <div ref={ref => (this.mount = ref)} />
    }
}

