/**
 * Created by Administrator on 3/3/2017.
 */

function Particle(x, y, sc){
    this.center1 = new THREE.Vector2(x - 500, -y + 500);
    this.center2 = new THREE.Vector2();
    this.pos = new THREE.Vector2();
    this.center2.set(this.center1.x, this.center1.y);
    this.radius1 = 1.5 + Math.random() * 4;
    this.radius2 = 2.0 + Math.random() * 4;
    this.steps = 15 + Math.random() * 15;
    this.angleStep = Math.PI / this.steps;
    this.posAngle = Math.PI * Math.random();
    this.status = 1; // 1-free, 2-involved
    this.filled = false;

    var rr = Math.random();
    var gg = Math.random();
    var bb = Math.random();
    this.velocity = rr * 0.2 + gg * 0.3 + bb * 0.5;
    if(Math.random() > 0.6) this.filled = true;

    this.color = new THREE.Color(0.1 + rr * 0.5, 0.1 + gg * 0.5, 0.1 + bb * 0.5);

    var circleShape = new THREE.Shape();
    circleShape.moveTo( 0, this.radius1 );
    circleShape.quadraticCurveTo( this.radius1, this.radius1, this.radius1, 0 );
    circleShape.quadraticCurveTo( this.radius1, -this.radius1, 0, -this.radius1 );
    circleShape.quadraticCurveTo( -this.radius1, -this.radius1, -this.radius1, 0 );
    circleShape.quadraticCurveTo( -this.radius1, this.radius1, 0, this.radius1 );

    if(this.filled){
        var geometry = new THREE.ShapeBufferGeometry( circleShape );
        this.object = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: this.color, side: THREE.DoubleSide } ) );
        sc.add( this.object );
    }else{
        var points = circleShape.createPointsGeometry();

        this.object = new THREE.Line( points, new THREE.LineBasicMaterial( { color: this.color, linewidth: 3 } ) );
        //line.position.set( x, y, z - 25 );
        //this.object.rotation.set( 0, 1.0, 1.0 );
        //line.scale.set( s, s, s );
        sc.add( this.object );
    }


    this.updatePos = function(){
        var distThres = 40;
        var mousePos = new THREE.Vector2(mouseX, mouseY);
        var dist = mousePos.distanceTo(this.pos);
        if(dist <= distThres){
            this.status = 2;
        }else{
            this.status = 1;
        }
        var center;
        var moveStep = 4;
        if(this.status == 1){
            var dist2 = this.pos.distanceTo(this.center1);
            if(dist2 > this.radius2 + this.velocity){
                var dx = (this.center1.x - this.pos.x) * this.velocity / moveStep; //* this.velocity / dist2;
                var dy = (this.center1.y - this.pos.y) * this.velocity / moveStep; // * this.velocity / dist2;
                this.center2.x += dx;
                this.center2.y += dy;
            }

        }else if(this.status == 2){
            var dist2 = this.pos.distanceTo(mousePos);
            if(dist2 > this.radius2 + this.velocity){
                var dx = (mousePos.x - this.pos.x) * this.velocity / moveStep; // * this.velocity / dist2;
                var dy = (mousePos.y - this.pos.y) * this.velocity / moveStep; // * this.velocity / dist2;
                this.center2.x += dx;
                this.center2.y += dy;
            }
        }

        this.posAngle += this.angleStep;
        this.pos.x = this.center2.x + this.radius2 * Math.cos(this.posAngle);
        this.pos.y = this.center2.y + this.radius2 * Math.sin(this.posAngle);

        this.object.position.set(this.pos.x, this.pos.y, 0);

    };



}