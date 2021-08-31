APP.webGL = {
  _this : this,
  statsEnabled:false,
  models:[],
  textures:[],
  featuredTextures:[],
  objects:[],
  mouse : new THREE.Vector2(),
  windowHalfX : window.innerWidth/2,
  windowHalfY : window.innerHeight/2,
  raycaster : new THREE.Raycaster(),
  draggingObject : null,
  clock : new THREE.Clock(),
  backgroundPlane:null,

  // shader vars
  BackgroundFragShader:null,
  BackgroundVertShader:null,

  backgroundPaused:true,
  infoBackgroundPaused:true,
  paused:false,
  intensity:1.0,

  init : function(){

        // set up background scene
        this.canvas= document.getElementById("webgl");
        this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );

        this.camera.position.set(0,0,50);
        //this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.scene = new THREE.Scene();
        //this.scene.fog = new THREE.FogExp2( 0x000000, 0.0008 );
        //this.scene.background = new THREE.Color(0x00ff00);
        // switch to false anatialis and transparent as needed
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: false, alpha:false});
        //this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.renderer.debug.checkShaderErrors=false;

       


         // default camera target object
        this.target = new THREE.Object3D();
        this.target.position.set(0,0,0);
        this.scene.add(this.target);
        
        // STATS
        if ( this.statsEnabled ) {
          this.stats = new Stats();
          $("body").append( this.stats.dom );
        }

        // loading manager
        this.manager = new THREE.LoadingManager();
        this.manager.onProgress = function ( item, loaded, total ) {
          APP.loader.update(loaded/total);
        };

        this.manager.onLoad = function ( ) {
          // add objects to scene and set initial 3D states
          APP.webGL.initObjects();
          
          // load backgorund shader 
          if(APP.data.BackgroundFragmentShader && APP.data.BackgroundVertexShader){
              ShaderLoader(APP.data.BackgroundVertexShader,APP.data.BackgroundFragmentShader,APP.webGL.createBackgroundShader);
          }

        };

        // load models
        /*
        var loader = new THREE.FBXLoader(this.manager);
        $.each(APP.data.models,function(i,m){
          loader.load( m.file, function (object) {
                APP.webGL.models[m.name] = object;
          });
        });
        */

        // load textures
      
        var loader = new THREE.TextureLoader(this.manager);
        $.each(APP.data.textures,function(i,t){
          loader.load( t.file, function (object) {
                APP.webGL.textures[t.name] = object;
              });
        });

        /*
        var loader = new THREE.TextureLoader(this.manager);
        $.each(APP.data.work.list,function(i,t){
          if(i<=3){
          loader.load( t.thumb, function (object) {
                //APP.webGL.textures[t.name] = object;
          });
        }
        });

        var loader = new THREE.TextureLoader(this.manager);
        $.each(APP.data.press.list,function(i,t){
          if(i<=3){
          loader.load( t.thumb, function (object) {
                //APP.webGL.textures[t.name] = object;
          });
        }
        });


        var loader = new THREE.TextureLoader(this.manager);
        $.each(APP.data.art.list,function(i,t){
          if(i<=3){
          loader.load( t.thumb, function (object) {
                //APP.webGL.textures[t.name] = object;
          });
        }
        });


        var loader = new THREE.TextureLoader(this.manager);
        $.each(APP.data.prototypes.list,function(i,t){
          if(i<=3){
          loader.load( t.thumb, function (object) {
                //APP.webGL.textures[t.name] = object;
          });
        }
        });
*/
/*
        var loader = new THREE.TextureLoader(this.manager);
        $.each(APP.data.prototypes.list,function(i,t){
          loader.load( t.thumb, function (object) {
                //APP.webGL.textures[t.name] = object;
          });
        });

        var loader = new THREE.TextureLoader(this.manager);
        $.each(APP.data.press.list,function(i,t){
          loader.load( t.thumb, function (object) {
                //APP.webGL.textures[t.name] = object;
          });
        });

        var loader = new THREE.TextureLoader(this.manager);
        $.each(APP.data.art.list,function(i,t){
          loader.load( t.thumb, function (object) {
                //APP.webGL.textures[t.name] = object;
          });
        });
        */

        window.onresize = this.resize;
        
        
  },

  onMouseDownWebGL : function (e){
    console.log("mouse down on webgl");
    _this = APP.webGL;
    event.preventDefault();
    _this.mouse.x = ( event.clientX / _this.renderer.domElement.clientWidth ) * 2 - 1;
    _this.mouse.y = - ( event.clientY / _this.renderer.domElement.clientHeight ) * 2 + 1;
    _this.raycaster.setFromCamera( _this.mouse, _this.camera );

    var intersects = _this.raycaster.intersectObjects( _this.objects , true);
    if ( intersects.length > 0 ) {
        var obj = intersects[0].object.data
        if("link" in obj){
          APP.go(obj.link,true);
        }
    }
  },



  onMouseDownLanding : function(e){
      console.log("home mouse down");
      // start increasing intensity 
      _this = APP.webGL;
      APP.loader.show();
      
      window.intensityTimer = setInterval(function(){ 
          APP.webGL.intensity+=.002; 
          APP.loader.update(APP.webGL.intensity-1.0);
          if(APP.webGL.intensity>=2.00) { 
            APP.showReel(); 
            APP.webGL.canvas.removeEventListener('mousedown',APP.webGL.onMouseDownLanding); 
            APP.webGL.onMouseUpLanding(null); 
          } 
        },10 );
      APP.sounds['dance'].play();
      _this.canvas.addEventListener('mouseup', APP.webGL.onMouseUpLanding, false);
  },

  onMouseUpLanding : function(e){
        console.log("landing mouse up");
        _this = APP.webGL;
        clearInterval(window.intensityTimer);
        _this.intensity = 1.0;
        APP.sounds['dance'].stop();
        APP.loader.update(0);
        _this.canvas.removeEventListener('mouseup', APP.webGL.onMouseUpLanding, false);
        APP.loader.hide();
  },



  resize : function(){

    _this = APP.webGL;
    var width = window.innerWidth;
    var height = window.innerHeight;
    _this.camera.aspect = width / height;
    _this.camera.updateProjectionMatrix();
    _this.renderer.setSize( width, height );
    _this.windowHalfX = width/2;
    _this.windowHalfY = height/2;
    _this.backgroundPlane.scale.set(110*_this.camera.aspect, 110, 1 );
    //_this.composer.setSize( width, height );
    _this.backgroundUniforms.iResolution.value.x = width;
    _this.backgroundUniforms.iResolution.value.y = height;
     _this.backgroundUniforms.adj.value = .2 - window.innerHeight/window.innerWidth;

    console.log("resize");  
  },

  createBackgroundShader : function(v,f){
    console.log("background shader loaded");
     _this = APP.webGL;
    _this.BackgroundVertexShader = v;
    _this.BackgroundFragmentShader = f;

    // create a bakgorund shader plane
    _this.backgroundUniforms = {
          iTime: { type: "f", value: 100.0 },
          iResolution: { type: "v2", value: new THREE.Vector2() },
          iMouse: { type: "v2", value: new THREE.Vector2() },
          audio1:{ type:"f",value:0.0 },
          adj:{ type:"f",value:0.0 },
          orbOpacity:{ type:"f",value:1.0 },
          intensity:{ type:"f",value:1.0 },
          iChannel0:  { type: 't', value: _this.textures['tex1'] }
    };
    _this.backgroundUniforms.iResolution.value.x = window.innerWidth;
    _this.backgroundUniforms.iResolution.value.y = window.innerHeight;
    
    _this.backgroundUniforms.adj.value = .2 - window.innerHeight/window.innerWidth;

    

    // create custom shader material
    material = new THREE.ShaderMaterial( {
         uniforms:  _this.backgroundUniforms,
         vertexShader: _this.BackgroundVertexShader,
         fragmentShader: _this.BackgroundFragmentShader

    }); 

    //material = new THREE.MeshNormalMaterial();

    // create object mesh, set size so it fills screen
    // base this on resolution from above
    var aspect = window.innerWidth / window.innerHeight;  
    _this.backgroundPlane = new THREE.Mesh( geometry, material );
   //_this.backgroundPlane.scale.set(110*aspect, 110, 1 );
  

    var geometry = new THREE.PlaneGeometry( 1, 1 );
    _this.backgroundPlane = new THREE.Mesh( geometry, material );
    _this.backgroundPlane.scale.set(110*aspect, 110, 1 );
    _this.scene.add(_this.backgroundPlane);
           

            APP.modelsLoaded = true;
          APP.checkPreloadComplete();
  },
      
  showHome : function(){
        console.log("show home page webgl");
        _this = APP.webGL;
        _this.backgroundPaused = false;
        TweenMax.to(_this.backgroundUniforms.orbOpacity,2.0,{value:1.0,ease:Circ.easeInOut});
        // move camra to home position
        //TweenMax.to(_this.target.position,1,{x:0,y:0,z:0,ease:Expo.easeIn});
        _this.canvas.addEventListener('mousedown', APP.webGL.onMouseDownLanding, false);
        APP.loader.update(0);
  },
    
  hideHome: function(){
    console.log("hide home page webgl");
    APP.webGL.backgroundPaused = false;
    APP.webGL.canvas.removeEventListener('mousedown', APP.webGL.onMouseDownLanding, false);

  },

  showWork : function(){
    console.log("show work page webgl");
    _this = APP.webGL;
    _this.backgroundPaused = false;
    TweenMax.to(_this.backgroundUniforms.orbOpacity,1.0,{value:0.3});
    //TweenMax.to(_this.target.position,1,{x:0,y:-5,z:0,ease:Expo.easeOut,delay:.2});
  },

  hideWork : function(){
    console.log("hide work page webgl");
    _this = APP.webGL;
    _this.backgroundPaused = false;
  },

  showWorkDetail : function(){
    console.log("show work detail page webgl");
    _this = APP.webGL;
    _this.backgroundPaused = false;
    TweenMax.to(_this.backgroundUniforms.orbOpacity,1.0,{value:0.3});
    //TweenMax.to(_this.target.position,1,{x:0,y:-5,z:0,ease:Expo.easeOut,delay:.2});
  },

  hideWorkDetail : function(){
    console.log("hide work detail page webgl");
    _this = APP.webGL;
    _this.backgroundPaused = false;
  },

  showArt : function(){
    console.log("show art page webgl");
    _this = APP.webGL;
    _this.backgroundPaused = false;
    TweenMax.to(_this.backgroundUniforms.orbOpacity,1.0,{value:0.3});
    //TweenMax.to(_this.target.position,1,{x:0,y:-5,z:0,ease:Expo.easeOut,delay:.2});
  },

  hideArt : function(){
    console.log("hide art page webgl");
    _this = APP.webGL;
    _this.backgroundPaused = false;
  },

  showArtDetail : function(){
    console.log("show art detail page webgl");
    _this = APP.webGL;
    _this.backgroundPaused = false;
    TweenMax.to(_this.backgroundUniforms.orbOpacity,1.0,{value:0.3});
    //TweenMax.to(_this.target.position,1,{x:0,y:-5,z:0,ease:Expo.easeOut,delay:.2});
  },

  showInfo : function(){
    console.log("show info page webgl");
    _this = APP.webGL;
    _this.backgroundPaused = false;
    TweenMax.to(_this.backgroundUniforms.orbOpacity,1.0,{value:.4});
    //TweenMax.to(_this.target.position,1,{x:0,y:-5,z:0,ease:Expo.easeOut,delay:.2});
  },

  hideInfo : function(){
    console.log("hide info page webgl");
    _this = APP.webGL;
    _this.backgroundPaused = false;
  },

  showPrototypes : function(){
    console.log("show prototypes page webgl");
    _this = APP.webGL;
    _this.backgroundPaused = false;
    TweenMax.to(_this.backgroundUniforms.orbOpacity,1.0,{value:0.5});
    //TweenMax.to(_this.target.position,1,{x:0,y:-5,z:0,ease:Expo.easeOut,delay:.2});
  },

  hidePrototypes : function(){
    console.log("hide prototypes page webgl");
    _this = APP.webGL;
    _this.backgroundPaused = false;
  },

  showPrototypesDetail : function(){
    console.log("show prototypes detail page webgl");
    _this = APP.webGL;
    _this.backgroundPaused = false;
    TweenMax.to(_this.backgroundUniforms.orbOpacity,1.0,{value:0.5});
    setTimeout(function(){_this.backgroundPaused = true;},2000);
    //TweenMax.to(_this.target.position,1,{x:0,y:-5,z:0,ease:Expo.easeOut,delay:.2});
  },


  showPress : function(){
    console.log("show press page webgl");
    _this = APP.webGL;
    _this.backgroundPaused = false;
    TweenMax.to(_this.backgroundUniforms.orbOpacity,1.0,{value:0.3});
    //TweenMax.to(_this.target.position,1,{x:0,y:-5,z:0,ease:Expo.easeOut,delay:.2});
  },

  hidePress: function(){
    console.log("hide press page webgl");
    _this = APP.webGL;
    _this.backgroundPaused = false;
  },

  showPressDetail : function(){
    console.log("show press detail page webgl");
    _this = APP.webGL;
    _this.backgroundPaused = false;
    TweenMax.to(_this.backgroundUniforms.orbOpacity,1.0,{value:0.3});
    //TweenMax.to(_this.target.position,1,{x:0,y:-5,z:0,ease:Expo.easeOut,delay:.2});
  },

  render : function(){
    _this = APP.webGL;
    var scene = _this.scene;
    var camera = _this.camera;
    var target = _this.target;
    var renderer = _this.renderer;
    var d = _this.clock.getDelta();

    if( scene &&  camera && !_this.backgroundPaused && !_this.paused) {  
      if(_this.backgroundUniforms){
        _this.backgroundUniforms.iTime.value += d;
        _this.backgroundUniforms.audio1.value=128.0/48.0+Math.random()*.1;
        _this.backgroundUniforms.iMouse.value = APP.mouse;
        _this.backgroundUniforms.intensity.value = APP.webGL.intensity;
        //console.log("render",_this.backgroundUniforms.iTime.value);
        if(!APP.isMobile){
          for ( var i = 0; i < _this.scene.children.length; i ++ ) {
              var object = scene.children[ i ];
              if ( object instanceof THREE.Points ) {
                //object.rotation.y = .01*_this.backgroundUniforms.iTime.value * ( i < 4 ? i + 1 : - ( i + 1 ) );
                object.rotation.z =  -.03*_this.backgroundUniforms.iTime.value * ( i < 4 ? i + 1 : - ( i + 1 ) );
              }
          }
        }
      }
      if(!APP.isMobile){
        _this.camera.position.x += (-APP.mouse.x*.01 - _this.camera.position.x) * .05;
        _this.camera.position.y += (APP.mouse.y*.01 - _this.camera.position.y) * .05;
        //_this.camera.position.z = _this.camera.position.z + (.02*_this.camera.position.y);
      }
      //camera.lookAt(target.position);
      //console.log("rendering webgl");
      renderer.render(scene,camera ); 

    }

    if ( _this.statsEnabled ) { _this.stats.update(); }
    requestAnimationFrame(_this.render); 
  },

      


  initObjects : function(){
      console.log("init webgl objects");
      _this = APP.webGL;
      //console.log(_this.textures['sprite1']);

      // ambient sprites
      if(!APP.isMobile) {
        var geometry = new THREE.BufferGeometry();
        var vertices = [];
        var materials = [], parameters;
        for ( var i = 0; i < 350; i ++ ) {
          var x = Math.random() * 60 - 30;
          var y = Math.random() * 60 - 30;
          var z = Math.random() * 60 - 30;
          vertices.push( x, y, z );
        }
        geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        parameters = [
          [[ 0.3, 0.7, 0.9 ], _this.textures['sprite1'], .3 ],
          [[ 0.3, 0.3, 0.8 ], _this.textures['sprite2'], .3 ]
        ];
        for ( var i = 0; i < parameters.length; i ++ ) {
          var color = parameters[ i ][ 0 ];
          var sprite = parameters[ i ][ 1 ];
          var size = parameters[ i ][ 2 ];
          materials[ i ] = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true, opacity:.35} );
          materials[ i ].color.setRGB( color[ 0 ], color[ 1 ], color[ 2 ] );
          var particles = new THREE.Points( geometry, materials[ i ] );
          particles.rotation.x = Math.random() * 6;
          particles.rotation.y = Math.random() * 6;
          particles.rotation.z = Math.random() * 6;
          _this.scene.add( particles );
        }
      }

      /*
      if(APP.isMobile){
        //console.log("mobile video");
        //$(".background-video").attr("src","assets/videos/reel.mp4");
      } else {
        //$(".background-video").attr("src","assets/videos/reel.mp4")
      }
      _this.video = $(".background-video")[0];

      var geo = new THREE.PlaneBufferGeometry(1.920*2, 1.080*2,1,1);
      var geo2 = new THREE.PlaneBufferGeometry(2.052*2, 1.209*2,1,1);
      var geo3 = new THREE.PlaneBufferGeometry(2.052*2, 1.209*2,1,1);
      
      var texture = new THREE.VideoTexture( _this.video );
      texture.format = THREE.RGBAFormat;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      
      
      
      var mat = new THREE.MeshBasicMaterial({map:texture,transparent:true,opacity:.5, color:0xffcc00});

      var texture2 = new THREE.TextureLoader().load("assets/images/videoFrame1.png");
      var mat2 = new THREE.MeshBasicMaterial({map:texture2,transparent:true,opacity:.8});
      //mat = new THREE.MeshNormalMaterial();
      
      */
      // test plane

      //var geo = new THREE.PlaneBufferGeometry(2.052*4, 1.209*4,1,1);
      //var mat = new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load("assets/images/home_placeholder.jpg")}); 
      //var mesh = new THREE.Mesh(geo,mat);
      //_this.scene.add(mesh);
      //mesh.data = { name: "work", link : "work"}
      //_this.objects.push(mesh);
      
     /*
      var canvasText = document.createElement("canvas");
      
      function updateCanvas(){
        
        canvasText.height=1080; canvasText.width=1920;
        var ctx = canvasText.getContext('2d');
        var text = (_this.clock.elapsedTime).toFixed(2);
        ctx.font = '30px Arial';
        ctx.fillStyle = 'orange';
        var x = 1920 - 210;
        var y = 105;
        ctx.fillText(text, x, y);
        texture3.needsUpdate=true;
      }
      */
      //setInterval(updateCanvas,100);

      //document.body.appendChild(canvasText);

      //var texture3 = new THREE.Texture(canvasText);
      //texture3.needsUpdate=true;
      //var mat3 = new THREE.MeshBasicMaterial({map:texture3,transparent:true,opacity:.5});

      /*
      var videoObject = new THREE.Object3D();
      var videoPlane = new THREE.Mesh(geo,mat);
      videoObject.add(videoPlane);
      
      var videoFrame1 = new THREE.Mesh(geo2,mat2);
      videoFrame1.position.z=.0;
      videoObject.add(videoFrame1);

      var videoFrame2 = new THREE.Mesh(geo2,mat2);
      videoFrame2.position.z=-.02;
      //videoObject.add(videoFrame2);

      //var videoFrameText = new THREE.Mesh(geo3,mat3);
      //videoFrameText.position.z=.02;
      //videoObject.add(videoFrameText);

      _this.scene.add(videoObject);
      //_this.videoPlayerObjects.push()
      //videoObject.scale.y=0.001;
    
      //_this.video.play();


      videoObject.scale.y=0;

      TweenMax.to(videoObject.scale,.5,{y:1.0,ease:Elastic.easeInOut,delay:1})
      */

      // some boxes
      /*
      var mat = new THREE.MeshLambertMaterial({color:0x33ddff,transparent:true,opacity:.6});
      
      var model = new THREE.Object3D();
      var r =2.0;
      var a = Math.PI/180 * (360/100);
      var a2 = Math.PI/180 * (720/100);

      for(i=0;i<100;i++){
        var geo = new THREE.BoxBufferGeometry(Math.random()*1.7,Math.random()*.4,Math.random()*.5);
        var box = new THREE.Mesh(geo,mat);

        box.position.x = r * Math.cos(a*i) * Math.sin(a2*i) + 0;
        box.position.y = r * Math.sin(a*i) * Math.sin(a2*i) + 0;
        box.position.z = r * Math.cos(a2*i) + 0;
        
        box.lookAt(new THREE.Vector3(0, 0, 0));

        var wireframe = new THREE.WireframeGeometry( geo );
        var line = new THREE.LineSegments( wireframe );
        line.material.color = new THREE.Color(0xccddff);
        line.material.depthTest = false;
        line.material.opacity = 0.25;
        line.material.transparent = true;
        //box.add(line)

        //model.add(box);
      }
      */
      //box.add(line);
      //_this.scene.add(model);

      /*
      TweenMax.to(model.rotation, 100, {z:Math.PI/180*360,x:-Math.PI/180*360,ease:Linear.easeNone, repeat:-1});
      */

      //var light = new THREE.DirectionalLight( 0xaaccff );
      //light.position.set( 0.5, 1, 2 ).normalize();
      //_this.scene.add( light );
      
      /*
      object = _this.models["fighter"];
      object.traverse( function ( child ) {

                if ( child instanceof THREE.Mesh ){
                  material = new THREE.MeshBasicMaterial({wireframe:true, color:0xffcc00});
                  child.material = material;
                  material.needsUpdate=true;
                  //child.material.wireframe = true;
                  //child.material.color = new THREE.Color(   );
                }
                
      })
      

      //_this.models["fighter"].rotation.x=Math.PI/180*45;
      //_this.models["fighter"].scale.set(.025,.025,.025);
      _this.models["fighter"].scale.set(.01,.01,.01);
      //_this.models["fighter"].position.y = -1.5;
      //_this.scene.add(_this.models["fighter"]);
      */
      // start animating
      _this.render();
      
  },



  go : function(state) {
    // handle the state specific aniamtions in the 3D scene
    _this = APP.webGL;
    var camera  = _this.camera;
    var target = _this.target;
    
    //show the webgl canvas
    $(_this.canvas).addClass("show");

    switch ( state ){
      case "home":
        _this.showHome();
        break;
      case "work":
        _this.showWork();
        break;
      case "workDetail":
        _this.showWorkDetail();
        break;
      case "prototypes":
        _this.showPrototypes();
        break;
      case "prototypesDetail":
        _this.showPrototypesDetail();
        break;
      case "art":
        _this.showArt();
        break;
      case "artDetail":
        _this.showArtDetail();
        break;
      case "press":
        _this.showPress();
        break;
      case "pressDetail":
        _this.showPressDetail();
        break;
      case "info":
        _this.showInfo();
        break;

    } 
  },

  get2DPosition : function(obj){
    var obj = app.webGL.models[obj];
    var pos = projectToScreenXY(obj,app.webGL.camera);
    return pos;
  }
}

// Asyncronous shader loader for THREE.js.
// written by Richard Mattka - Render51 Studios.
function ShaderLoader(vertex_url, fragment_url, onLoad, onProgress, onError) {
    var vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager);
    vertex_loader.setResponseType('text');
    vertex_loader.load(vertex_url, function (vertex_text) {
        var fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager);
        fragment_loader.setResponseType('text');
        fragment_loader.load(fragment_url, function (fragment_text) {
            onLoad(vertex_text, fragment_text);
        });
    }, onProgress, onError);
}

