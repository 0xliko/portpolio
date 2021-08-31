APP.loader = { 
	_this : this,
	show : function(){
		console.log("show loader");
		$(".loader").addClass("show");
	},
	hide: function(){
		console.log("hide loader");
		$(".loader").removeClass("show");
	},
	update: function(value){
		// *80 so it fills 80% of screen at max 100%
		// change for how much it fills at max
		value = Math.round(value * 100) / 100
		$(".loader").css({"width":value*80+"%"});
		console.log("loader progress: ",value*100+"%");
	}

}

APP.header = { 
	_this : this,
	init : function(){
		console.log("init header");
		$(".header-title").html(APP.data.header.title);


		$(".logo").click(function(){
			APP.sounds["click"].play();
			APP.go("home", true);
		});


		// listen for scrolling and have header react to it
		$(window).scroll(function(){
	        var ScrollTop = parseInt($(this).scrollTop());
	        //console.log(ScrollTop);

	        if (ScrollTop > 30) {
	            $(".header").addClass("shade");
	        } else {
	        	$(".header").removeClass("shade");
	        }
	    });



		
	},
	show : function(){
		console.log("show header");
		$(".header").addClass("show");
	},
	hide: function(){
		console.log("hide header");
		$(".header").removeClass("show");
	}
}


APP.footer = { 
	_this : this,
	init : function(){
		console.log("init footer");
		//$(".header-title").html(APP.data.header.title);

		/*
		$(".loaded-icon").click(function(){
			APP.go("home", true);
		});
		*/
	},
	show : function(){
		console.log("show footer");
		$(".footer").addClass("show");
	},
	hide: function(){
		console.log("hide footer");
		$(".footer").removeClass("show");
	}
}




APP.menu = { 
	_this : this,
	init : function(){
		console.log("init menu");
		str = "";
		str2 = "";
		str3 = "";
		$.each(APP.data.menu,function(i,m){
			console.log();
			if(i){p=" | ";} else {p="";}
			str+='<li class="menu-item menu-' + m.link + '" data-link="'+ m.link +'">' + p + m.title + '</li>';
			if(m.link!="home"){
				if(i>1){p="";} else {p="";}
				str2+='<li class="menu-item menu-' + m.link + '" data-link="'+ m.link +'">' + p + m.title + '</li>';
			}
			
			if(i>1){p="";} else {p="";}
			str3+='<li class="menu-item menu-' + m.link + '" data-link="'+ m.link +'">' + p + m.title + '</li>';
		});
		//console.log(str);
		$(".menu .menu-items").html(str3);
		$(".header-menu .menu-items").html(str);
		$(".footer-menu .menu-items").html(str2);

		$(".menu-item").click(function(){
			APP.sounds["click"].play();
			var link = $(this).attr("data-link");
			console.log("menu-item clicked : " + link);
			if(link=="reel"){
				APP.go("home", true);
				APP.showReel();
			} else {
				APP.go(link, true);
			}
			
		});


		$(".menu-button").click(function(){
			APP.sounds["click"].play();
			if($(this).hasClass("active")){
				// hide menu
				APP.menu.hide();
				//$(".page-title").html(APP.tmpTitle);
			} else {
				// show menu 
				APP.menu.show();
				// store tmp title value
				//APP.tmpTitle = $(".page-title").html();
				//$(".page-title").html("Menu /");
				
				$(".menu .menu-item").removeClass("active");
				try{$(".menu .menu-item.menu-"+APP.state).addClass("active");}catch(e){}

			}
		});
	},
	show : function(){
		console.log("show menu");
		$(".menu").addClass("show");
		$(".menu-button").addClass("active");

	},
	hide: function(){
		console.log("hide menu");
		$(".menu").removeClass("show");
		$(".menu-button").removeClass("active");
	}
}





APP.home = { 
	_this : this,
	init : function(){
		console.log("init home");
		$(".home .page-title").html(APP.data.home.title);
		$(".home .page-subtitle").html(APP.data.home.subtitle);

		// make the feature title follow the mouse
		
		$(document).on('mousemove', function(e){
		    /*
		    $(".home .titles").css({
		       left:  (e.pageX- window.innerWidth/2)*.1 + window.innerWidth/2,
		       top:   (e.pageY-window.innerHeight/2)*.1 + window.innerHeight/2,
		    });
		    */

		    // reset timer
		    /*
		    APP.home.hide();
		    clearTimeout(APP.homeTimer);
		    APP.homeTimer = setTimeout(function(){
		    	APP.home.show();
		    },2000);
		    */
		});
		

		/*
		$(".home").click(function(){
			// go to current active feature
			var c = Math.floor(($(".background-video")[0].currentTime+1.0) / ($(".background-video")[0].duration/APP.data.featured.length ) );
	        //console.log(c);
	        if(c> (APP.data.featured.length-1) ) { c= 0;}
	        if(!c){c=0;}
	        APP.go(APP.data.featured[c].link,true);
		});
		*/
	},
	show : function( dir ){
		console.log("show home");
		APP.showPage($(".home"));
		
		
	},
	hide: function( dir){
		APP.hidePage($(".home"));
		console.log("hide home");
		
	}
}



APP.work = { 
	_this : this,
	init : function(){
		var data = APP.data.work;
		var list = data.list;
		
		$(".work .page-title").html(data.title);		
		$(".work .page-subtitle").html(data.subtitle);
		$(".work .page-content").html(data.content);

		//iterate the art and build list
		var l = "", a = 0;
		$.each(list,function(i,p){
			if(a % 2 == 0) { align = "right";} else { align=""; }
			

			if(a<=12){
				l+="<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='1000' data-aos-delay='0' class='list-item work-item "+align+"' data-link='"+p.link+"'><div class='tilt'><img src='"+p.thumb+"' /><div class='titles'><div class='subtitle'>"+p.subtitle+"</div><div class='title'>"+p.title+"</div></div></div></div>";
			} else {
				l+="<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='1000' data-aos-delay='0' class='list-item work-item "+align+"' data-link='"+p.link+"'><div class='tilt'><img class='lazy' data-src='"+p.thumb+"' /><div class='titles'><div class='subtitle'>"+p.subtitle+"</div><div class='title'>"+p.title+"</div></div></div></div>";
			}

			a++;
		});

		// update page
		$(".work .list").html(l);

		// assign click handlers
		$(".work .work-item").click(function(){
			APP.sounds["click"].play();
			var link = $(this).attr("data-link");
			console.log("work-item clicked : " + link);
			APP.go(link, true);
		});
	},
	show : function(dir){
		console.log("show work");
		APP.showPage($(".work"));
		$(".work .page-title").removeClass("aos-animate");
		$(".work .page-subtitle").removeClass("aos-animate");
		setTimeout(function(){$(".work .page-title").addClass("aos-animate");},500);
		setTimeout(function(){$(".work .page-subtitle").addClass("aos-animate");},500);

		
	},
	hide: function(dir){
		console.log("hide work");
		APP.hidePage($(".work"));
		$(".work .page-title").removeClass("aos-animate");
		$(".work .page-subtitle").removeClass("aos-animate");	
		
	}
}



APP.press = { 
	_this : this,
	init : function(){
		var data = APP.data.press;
		var list = data.list;
		
		$(".press .page-title").html(data.title);		
		$(".press .page-subtitle").html(data.subtitle);
		$(".press .page-content").html(data.content);

		//iterate the press and build list
		var l = "", a = 0;
		$.each(list,function(i,o){
			if(a % 2 == 0) { align = "right";} else { align=""; }
			


			if(a<=30){
				l+="<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='500' data-aos-delay='0'><div class='list-item press-item "+align+"' data-link='"+o.link+"'><img src='"+o.thumb+"' /><div class='titles'><div class='title'>"+o.title+"</div><div class='subtitle'>"+o.subtitle+"</div></div></div></div>";
			} else {
				l+="<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='500' data-aos-delay='0'><div class='list-item press-item "+align+"' data-link='"+o.link+"'><img class='lazy' data-src='"+o.thumb+"' /><div class='titles'><div class='title'>"+o.title+"</div><div class='subtitle'>"+o.subtitle+"</div></div></div></div>";
			}
			a++;
		});
		


		// update page
		$(".press .press-title").html("[ features | tutorials | articles ]");
		$(".press .list").html(l);

		//iterate the interviews and build list
		var l = "", a = 0; var list = data.interviews;
		$.each(list,function(i,o){
			if(a % 2 == 0) { align = "right";} else { align=""; }
			l+="<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='1000' data-aos-delay='0'><div class='list-item press-item "+align+"' data-link='"+o.link+"'><img src='"+o.thumb+"' /><div class='titles'><div class='title'>"+o.title+"</div><div class='subtitle'>"+o.subtitle+"</div></div></div></div>";
			a++;
		});

		// update page
		$(".press .interviews-title").html("[ interviews | speaking | features ]");
		$(".press .interviews-list").html(l);


		// assign click handlers
		$(".press .press-item").click(function(){
			APP.sounds["click"].play();
			var link = $(this).attr("data-link");
			console.log("press-item clicked : " + link);
			if(link.includes("http")){
				window.open(link, '_blank');
			} else {
				APP.go(link, true);
			}
			
		});
	},
	show : function(dir){
		console.log("show press",dir);
		APP.showPage($(".press"),dir);
		$(".press .page-title").removeClass("aos-animate");
		$(".press .page-subtitle").removeClass("aos-animate");
		setTimeout(function(){$(".press .page-title").addClass("aos-animate");},500);
		setTimeout(function(){$(".press .page-subtitle").addClass("aos-animate");},500);
	},
	hide: function(dir){
		console.log("hide press",dir);
		APP.hidePage($(".press"),dir);
		$(".press .page-title").removeClass("aos-animate");
		$(".press .page-subtitle").removeClass("aos-animate");
	}
}

APP.prototypes = { 
	_this : this,
	init : function(){
		var data = APP.data.prototypes;
		var list = data.list;

		$(".prototypes .page-title").html(data.title);		
		$(".prototypes .page-subtitle").html(data.subtitle);
		$(".prototypes .page-content").html(data.content);
		//iterate the  prototypes and build list
		var l = "", a = 0;
		$.each(list,function(i,p){
			if(a % 2 == 0) { align = "right";} else { align="left"; }
			if(a<=10){
				l+="<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='1000' data-aos-delay='0' class='list-item prototypes-item "+align+"' data-link='"+p.link+"'><div class='tilt'><img src='"+p.thumb+"' /><div class='titles'><div class='subtitle'>"+p.subtitle+"</div><div class='title'>"+p.title+"</div></div></div></div>";
			} else {
				l+="<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='1000' data-aos-delay='0' class='list-item prototypes-item "+align+"' data-link='"+p.link+"'><div class='tilt'><img class='lazy' data-src='"+p.thumb+"' /><div class='titles'><div class='subtitle'>"+p.subtitle+"</div><div class='title'>"+p.title+"</div></div></div></div>";
			}

			a++;
		});


		

		// update page
		$(".prototypes .list").html(l);


		// assign click handlers
		$(".prototypes .prototypes-item").click(function(){
			APP.sounds["click"].play();
			var link = $(this).attr("data-link");
			console.log("prototypes-item clicked : " + link);
			APP.go(link, true);
		});
	},
	show : function(dir){
		console.log("show prototypes",dir);
		APP.showPage($(".prototypes"),dir);
		$(".prototypes .page-title").removeClass("aos-animate");
		$(".prototypes .page-subtitle").removeClass("aos-animate");	
		setTimeout(function(){$(".prototypes .page-title").addClass("aos-animate");},500);
		setTimeout(function(){$(".prototypes .page-subtitle").addClass("aos-animate");},500);
	},
	hide: function(dir){
		console.log("hide prototypes",dir);
		APP.hidePage($(".prototypes"),dir);
		$(".prototypes .page-title").removeClass("aos-animate");
		$(".prototypes .page-subtitle").removeClass("aos-animate");	
	}
}



APP.art = { 
	_this : this,
	init : function(){
		
		var data  = APP.data.art;
		var list = data.list;

		$(".art .page-title").html(data.title);		
		$(".art .page-subtitle").html(data.subtitle);
		$(".art .page-content").html(data.content);

		//iterate the art and build list
		var l = "", a = 0;
		$.each(list,function(i,p){
			if(a % 2 == 0) { align = "right";} else { align="left"; }

			if(a<=12){
				l+="<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='1000' data-aos-delay='0' class='list-item art-item "+align+"' data-link='"+p.link+"'><div class='tilt'><img src='"+p.thumb+"' /><div class='titles'><div class='subtitle'>"+p.subtitle+"</div><div class='title'>"+p.title+"</div></div></div></div>";
			} else {
				l+="<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='1000' data-aos-delay='0' class='list-item art-item "+align+"' data-link='"+p.link+"'><div class='tilt'><img class='lazy' data-src='"+p.thumb+"' /><div class='titles'><div class='subtitle'>"+p.subtitle+"</div><div class='title'>"+p.title+"</div></div></div></div>";
			}
			a++;
		});

		// update page
		$(".art .list").html(l);


		// assign click handlers
		$(".art .art-item").click(function(){
			var link = $(this).attr("data-link");
			console.log("art-item clicked : " + link);
			APP.go(link, true);
		});

	},
	show : function(dir){
		console.log("show art",dir);
		APP.showPage($(".art"),dir);
		$(".art .page-title").removeClass("aos-animate");
		$(".art .page-subtitle").removeClass("aos-animate");	
		setTimeout(function(){$(".art .page-title").addClass("aos-animate");},500);
		setTimeout(function(){$(".art .page-subtitle").addClass("aos-animate");},500);

	},
	hide: function(dir){
		console.log("hide art",dir);
		APP.hidePage($(".art"),dir);
		$(".art .page-title").removeClass("aos-animate");
		$(".art .page-subtitle").removeClass("aos-animate");	
		
	}
}



APP.info = { 
	_this : this,
	init : function(){
		console.log("init info");
		var data = APP.data.info;
		var list = data.list;
		
		$(".info .page-title").html(data.title);		
		$(".info .page-subtitle").html(data.subtitle);
		$(".info .page-content").html(data.content);

		// feature media

		switch(data.feature.type){
			case "video":
				str = "<div class='feature-video' id='feature-video'></div>";
				$(".work-detail .feature-content").html(str);
				if(data.feature.source=='vimeo'){
					var options = {
				        id: data.feature.id,
				        api:true,
				        responsive:true,
				        loop: false,
				        autoplay:false,
				        byline:false,
				        title:false
				    };

				    var player = new Vimeo.Player('feature-video', options);

				    // TODO: Event handlers and controllers to manage sound and video
				    // when both playing and/ leaving site
				    player.setVolume(1);

				    player.on('play', function() {
				        console.log('video played');
				        APP.muteAll(true);
				    });

				    player.on('pause', function() {
				        console.log('video paused!');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('stop', function() {
				        console.log('video stopped');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('loaded', function() {
				        console.log('video is ready and loaded');
				    });
				}
				

				break;
			case "gallery":
				str="<div class='gallery'>";
				$.each(data.feature.images,function(i,l){
					str+="<div class='slide "+l.class+"'><img src='"+l.file+"' />";
					if(l.title){str+="<div class='label'>"+l.title+"</div>";}
					str+="</div>";
				});
				str+="</div>";
				$(".work-detail .feature-content").html(str);

				APP.workDetail.curSlide=-1;
				APP.workDetail.rotateSlide();
				try{ clearInterval(APP.workDetail.slideTimer); } catch(e){}
				APP.workDetail.slideTimer = setInterval(APP.workDetail.rotateSlide,4000);

				break;
			case "iframe":
				str = "<iframe class='feature-iframe sixteen-nine' id='feature-iframe' src='"+data.feature.iframe+"' ></iframe>";
				$(".work-detail .feature-content").html(str);
				break;

			case "image":
				str = "<img class='feature-image sixteen-nine' id='feature-image' src='"+data.feature.images[0].file+"' />";
				$(".info .feature-content").html(str);
				break;
		}



		// longer bio
		$(".info .bio-title").html("[ bio ]");
		$(".info .bio").html(data.bio);


		//awards
		str="";
		$.each(data.awards,function(i,l){
			str+="<div data-aos='fade-in' data-aos-easing='ease-in-out' data-aos-offset='50' data-aos-duration='1000' data-aos-delay='50' class='list-item "+l.class+"'><img class='lazy' data-src='"+l.file+"' /><div class='label'>"+l.title+"</div></div>";
		});
		if(str!=""){
			$(".info .awards-title").html("[ awards | recognition ]");
			$(".info .awards-list").html(str);
			$(".info .awards").show();
		} else {
			// hide
			$(".info .awards").hide();
		}


		//awards
		str="";
		$.each(data.clients,function(i,l){
			str+="<div data-aos='fade-in' data-aos-easing='ease-in-out' data-aos-offset='50' data-aos-duration='1000' data-aos-delay='50' class='list-item "+l.class+"'><img class='lazy' data-src='"+l.file+"' /></div>";
		});
		if(str!=""){
			$(".info .clients-title").html("[ select clients ]");
			$(".info .clients-list").html(str);
			$(".info .clients").show();
		} else {
			// hide
			$(".info .clients").hide();
		}


		

		// instafeed
		$(".info .instafeed-title").html("[ instagram feed ]");
		var feed = new Instafeed({
	        get: 'user',
	        limit: 5,
	        template: '<a class="list-item" target="_blank" href="{{link}}"><img src="{{image}}" /></a>',
	        userId: '201601854',
	        clientId: '19a04ded169c456e80a86f630c967cf0',
	        accessToken:'201601854.19a04de.87ab9f8a0cf34fe4ad7d8af936ead969'
	    });
	    feed.run();

	    // twitter
	    $(".info .twitter-title").html("[ twitter feed ]");
	   



	   // social
		str="";
		$.each(data.social,function(i,l){
			target = "_blank";
			if(l.url.includes('mailto')){ target="_self";}
			str+="<div data-aos='fade-in' data-aos-easing='ease-in-out' data-aos-offset='50' data-aos-duration='1000' data-aos-delay='50' class='list-item "+l.class+"'><a href='"+l.url+"' target='"+target+"'><img title='"+l.title+"' src='"+l.file+"' /></a></div>";
		});
		if(str!=""){
			$(".info .social-title").html("[ booking | contact | connect ]");
			$(".info .social-list").html(str);
			$(".info .social").show();
		} else {
			// hide
			$(".info .social").hide();
		}



		//press
		str="";
		$.each(data.press,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".work-detail .press-title").html("[ press | articles | news ]");
			$(".work-detail .press-list").html(str);
			$(".work-detail .press").show();
		} else {
			// hide
			$(".work-detail .press").hide();
		}

		


	},
	show : function(dir){
		console.log("show info",dir);
		APP.showPage($(".info"),dir);
		$(".info .page-title").removeClass("aos-animate");
		$(".info .page-subtitle").removeClass("aos-animate");
		setTimeout(function(){$(".info .page-title").addClass("aos-animate");},500);
		setTimeout(function(){$(".info .page-subtitle").addClass("aos-animate");},500);
	},
	hide: function(dir){
		console.log("hide info",dir);
		APP.hidePage($(".info"),dir);
		$(".info .page-title").removeClass("aos-animate");
		$(".info .page-subtitle").removeClass("aos-animate");
	}
}




APP.workDetail = { 
	_this : this,
	init : function(){
		console.log("init work detail");

	    $(".work-detail .next-button").click(function(){
	    	APP.sounds["click"].play();
	    	APP.workDetail.goNext();
	    });

	    $(".work-detail .bottom-next").click(function(){
	    	APP.sounds["click"].play();
	    	APP.workDetail.goNext();
	    });

	    $(".work-detail .bottom-back").click(function(){
	    	APP.sounds["click"].play();
	    	APP.workDetail.goBack();
	    });

	    $(".work-detail .bottom-up").click(function(){
	    	APP.sounds["click"].play();
	    	APP.go("work", true);
	    });

	},
	show : function(dir){
		console.log("show work detail",dir);
		APP.showPage($(".work-detail"),dir);
		$(".work-detail .page-title").removeClass("aos-animate");
		$(".work-detail .page-subtitle").removeClass("aos-animate");
		setTimeout(function(){$(".work-detail .page-title").addClass("aos-animate");},500);
		setTimeout(function(){$(".work-detail .page-subtitle").addClass("aos-animate");},500);
	},
	hide: function(dir){
		console.log("hide work detail",dir);
		APP.hidePage($(".work-detail"),dir);
		//$(".work-detail iframe").attr("src","");
		//$(".work-detail .feature-content").html("");
		setTimeout(function(){$(".work-detail .feature-content").html("");},500);
		$(".work-detail .page-title").removeClass("aos-animate");
		$(".work-detail .page-subtitle").removeClass("aos-animate");
	},
	load : function(data){
		console.log("loading new work detail data",data);
		$(".work-detail .page-title").html(data.title);
		$(".work-detail .page-subtitle").html(data.subtitle);
		$(".work-detail .client").html("<b>Client: </b>"+data.client);
		$(".work-detail .role").html("<b>Role: </b>"+data.role);
		$(".work-detail .content-title").html("[ brief ]");
		$(".work-detail .content").html(data.content);
		
		// share
		$(".work-detail .social-title").html("[ share ]");
	    $(".work-detail .share-page-facebook").click(function(){
	    	window.open("https://www.facebook.com/sharer/sharer.php?u="+data.url+"&display=popup&ref=plugin&src=share_button","Facebook Share","width=600, height=450 top=" + ($(window).height() / 2 - 300) + ", left=" + ($(window).width() / 2 - 225) );
	    })
			
		$(".work-detail .share-page-twitter").click(function(){
	    	window.open("https://twitter.com/intent/tweet?hashtags="+data.hashtags+"&original_referer="+data.url+"&ref_src=twsrc%5Etfw&related=synergyseeker&text="+data.twitterShare+"&tw_p=tweetbutton&url="+data.url,"Twitter Share","width=600, height=350 top=" + ($(window).height() / 2 - 300) + ", left=" + ($(window).width() / 2 - 175) );
	    })
	    

		// feature
		switch(data.feature.type){
			case "video":
				str = "<div class='feature-video sixteen-nine' id='feature-video'></div>";
				$(".work-detail .feature-content").html(str);
				if(data.feature.source=='vimeo'){
					var options = {
				        id: data.feature.id,
				        api:true,
				        responsive:true,
				        loop: false,
				        autoplay:true,
				        byline:false,
				        title:false
				    };

				    var player = new Vimeo.Player('feature-video', options);

				    // TODO: Event handlers and controllers to manage sound and video
				    // when both playing and/ leaving site
				    player.setVolume(1);

				    player.on('play', function() {
				        console.log('video played');
				        APP.muteAll(true);
				    });

				    player.on('pause', function() {
				        console.log('video paused!');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('stop', function() {
				        console.log('video stopped');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('loaded', function() {
				        console.log('video is ready and loaded');
				    });
				} 

				if(data.feature.source=='youtube'){
					
						var options = {
					        id: data.feature.id,
					        api:1,
					        enablejsapi:1,
					        controls:1,
					        modestbranding:1,
					        showinfo:0,
					        responsive:1,
					        loop: 0,
					        playerVars:{"autoplay":1, "autohide":1, "controls":1, "showinfo":0, "modestbranding":1, "rel":0, "fs":1, "wmode":"transparent", "iv_load_policy":3,"allowfullscreen":"true", "frameborder": 0, "scrolling": 'no' },
				            autopause: true,
				            autoplay:true,
					        byline:0,
					        title:0,
					        host: 'https://www.youtube.com',
					        videoId: data.feature.id
					        
					    };


					    var player = new YT.Player('feature-video', options);

					    
					    
					    player.addEventListener('onStateChange', function(e) {
					        if (e.data == YT.PlayerState.PLAYING) {
					        	console.log('video playing');
	         					APP.muteAll(true);
					        } else {
					        	console.log('video not playing, state: ' + e.data)
					        	if(APP.soundOn && !APP.hidden){
					   				APP.unMuteAll();
					   			}
					        }
					        
					    });

					    
					
				} 
				

				break;
			case "gallery":
				str="<div class='gallery'>";
				$.each(data.feature.images,function(i,l){
					str+="<div class='slide "+l.class+"'><img class='sixteen-nine' src='"+l.file+"'  />";
					if(l.title){str+="<div class='label'>"+l.title+"</div>";}
					str+="</div>";
				});
				str+="</div>";
				$(".work-detail .feature-content").html(str);

				APP.workDetail.curSlide=-1;
				APP.workDetail.rotateSlide();
				try{ clearInterval(APP.workDetail.slideTimer); } catch(e){}
				APP.workDetail.slideTimer = setInterval(APP.workDetail.rotateSlide,4000);

				break;
			case "iframe":
				str = "<iframe class='feature-iframe sixteen-nine' id='feature-iframe' src='"+data.feature.iframe+"' ></iframe>";
				$(".work-detail .feature-content").html(str);
				break;

			case "image":
				str = "<img class='feature-image sixteen-nine' id='feature-image' src='"+data.feature.images[0].file+"' />";
				$(".work-detail .feature-content").html(str);
				break;
		}


		//awards
		str="";
		$.each(data.awards,function(i,l){
			str+="<div class='list-item "+l.class+"'><img src='"+l.file+"' /><div class='label'>"+l.title+"</div></div>";
		});

		if(str!=""){
			$(".work-detail .awards-title").html("[ awards | recognition ]");
			$(".work-detail .awards-list").html(str);
			$(".work-detail .awards-block").show();
		} else {
			// hide
			$(".work-detail .awards-block").hide();
		}


		//press
		str="";
		$.each(data.press,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".work-detail .press-title").html("[ press | articles | news ]");
			$(".work-detail .press-list").html(str);
			$(".work-detail .press-block").show();
		} else {
			// hide
			$(".work-detail .press-block").hide();
		}
		
		// links
		// TODO: In CSS style these link buttons, porbalby only ever LAUNCH SITE
		str="";
		$.each(data.links,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".work-detail .links-title").html("");
			$(".work-detail .links-list").html(str);
			$(".work-detail .links-block").show();
		} else {
			// hide
			$(".work-detail .links-block").hide();
		}


		// media
		str="";
		$.each(data.media,function(i,l){
			str+="<div class='list-item "+l.class+"' data-aos='fade-in' >";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			if(l.title){str+="<div class='label'>"+l.title+"</div>";}
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		
		if(str!=""){
			$(".work-detail .media-title").html("[ selected frames | concept art | media ]");
			$(".work-detail .media-list").html(str);
			$(".work-detail .media-block").show();
		} else {
			// hide
			$(".work-detail .media-block").hide();
		}
		


		// related work
		str="";
		// convert tags list to array and trim spaces
		var tagsToMatch = data.tags.split(",").map(function(item) { return item.trim();});
		var count = 0;

		$.each(APP.data.work.list,function(i,l){
			var tags = l.tags.split(",").map(function(item) { return item.trim();});
			if(tagsToMatch.some(r=> tags.includes(r)) && l.link!=data.link && count<6){
				str+="<div data-link='"+l.link+"' class='tilt list-item "+l.class+"'>";	
				if(l.thumb){str+="<img src='"+l.thumb+"' />";}
				str+="<div class='titles'><div class='subtitle'>"+l.subtitle+"</div><div class='title'>"+l.title+"</div></div>";
				str+="</div>";
				count++;
			}
		});

		
		$(".work-detail .related-title").html("[ related work ]");
		$(".work-detail .related-list").html(str);
		$(".work-detail .related-list .list-item").click(function(){
			var link = $(this).attr("data-link");
			if(link){ APP.go(link,true); }
		});

		//refresh the tilt
		VanillaTilt.init(document.querySelectorAll(".tilt"), {
			reverse:true,
			max:5,
			scale:1.05,
			glare:true,
			"max-glare":.1
		});

	},
	rotateSlide: function(){
		console.log(APP.workDetail.curSlide);
		APP.workDetail.curSlide++;
		if(APP.workDetail.curSlide>=$(".slide").length) {APP.workDetail.curSlide=0;}
		$(".slide").removeClass("show");
		$($(".slide")[APP.workDetail.curSlide]).addClass("show");
		setTimeout(function(){ $(".slide").css("z-index",0);$($(".slide")[APP.workDetail.curSlide]).css("z-index",1);  },500);
	},
	goNext:function(){
    	var list = APP.data.work.list;
    	// find this index
    	var index=0;
    	var path = APP.state.split( '/' );
		if(path[0]){ var section  = path[0]; }
		if(path[1]){ var page = path[1]; }

    	$.each(list,function(i,l){
    		var path = l.link.split( '/' );
			var slug = path[1];
			console.log(page,slug)
    		if(page==slug){
    			index = i;
    			return false;
    		}
    	});

    	if(index<list.length-1){
    		APP.go(list[index+1].link,true);
    	} else {
    		console.log(list[0]);
    		APP.go(list[0].link,true);
    	}
	},

	goBack:function(){
		var list = APP.data.work.list;
    	// find this index
    	var index=0;
    	var path = APP.state.split( '/' );
		if(path[0]){ var section  = path[0]; }
		if(path[1]){ var page = path[1]; }

    	$.each(list,function(i,g){
    		var path = g.link.split( '/' );
			var slug = path[1];
			console.log(page,slug)
    		if(page==slug){
    			index = i;
    			return false;
    		}
    	});

    	if(index>0){
    		APP.go(list[index-1].link,true);
    	} else {
    		console.log(list[list.length-1]);
    		APP.go(list[list.length-1].link,true);
    	}
	}
}




APP.artDetail = { 
	_this : this,
	init : function(){
		console.log("init art detail");

	    $(".art-detail .next-button").click(function(){
	    	APP.artDetail.goNext();
	    });

	    $(".art-detail .bottom-next").click(function(){
	    	APP.artDetail.goNext();
	    });

	    $(".art-detail .bottom-back").click(function(){
	    	APP.artDetail.goBack();
	    });

	    $(".art-detail .bottom-up").click(function(){
	    	APP.go("art", true);
	    });

	},
	show : function(dir){
		console.log("show art detail",dir);
		APP.showPage($(".art-detail"),dir);
		$(".art-detail .page-title").removeClass("aos-animate");
		$(".art-detail .page-subtitle").removeClass("aos-animate");
		setTimeout(function(){$(".art-detail .page-title").addClass("aos-animate");},500);
		setTimeout(function(){$(".art-detail .page-subtitle").addClass("aos-animate");},500);
	},
	hide: function(dir){
		console.log("hide art detail",dir);
		APP.hidePage($(".art-detail"),dir);
		//$(".art-detail iframe").attr("src","");
		//$(".art-detail .feature-content").html();
		setTimeout(function(){$(".press-detail .feature-content").html("");},500);
		$(".art-detail .page-title").removeClass("aos-animate");
		$(".art-detail .page-subtitle").removeClass("aos-animate");
	},



	load : function(data){
		console.log("loading new art detail data",data);
		$(".art-detail .page-title").html(data.title);
		$(".art-detail .page-subtitle").html(data.subtitle);
		$(".art-detail .client").html("<b>Client: </b>"+data.client);
		$(".art-detail .role").html("<b>Role: </b>"+data.role);
		$(".art-detail .content-title").html("[ brief ]");
		$(".art-detail .content").html(data.content);
		
		// share
		$(".art-detail .social-title").html("[ share ]");
	    $(".art-detail .share-page-facebook").click(function(){
	    	window.open("https://www.facebook.com/sharer/sharer.php?u="+data.url+"&display=popup&ref=plugin&src=share_button","Facebook Share","width=600, height=450 top=" + ($(window).height() / 2 - 275) + ", left=" + ($(window).width() / 2 - 225) );
	    })
			
		$(".art-detail .share-page-twitter").click(function(){
	    	window.open("https://twitter.com/intent/tweet?hashtags="+data.hashtags+"&original_referer="+data.url+"&ref_src=twsrc%5Etfw&related=synergyseeker&text="+data.twitterShare+"&tw_p=tweetbutton&url="+data.url,"Twitter Share","width=600, height=350 top=" + ($(window).height() / 2 - 275) + ", left=" + ($(window).width() / 2 - 225) );
	    })
	    

		// feature
		switch(data.feature.type){
			case "video":
				str = "<div class='feature-video' id='feature-video'></div>";
				$(".art-detail .feature-content").html(str);
				if(data.feature.source=='vimeo'){
					var options = {
				        id: data.feature.id,
				        api:true,
				        responsive:true,
				        loop: false,
				        autoplay:false,
				        byline:false,
				        title:false
				    };

				    var player = new Vimeo.Player('feature-video', options);

				    // TODO: Event handlers and controllers to manage sound and video
				    // when both playing and/ leaving site
				    player.setVolume(1);

				    player.on('play', function() {
				        console.log('video played');
				        APP.muteAll(true);
				    });

				    player.on('pause', function() {
				        console.log('video paused!');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('stop', function() {
				        console.log('video stopped');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('loaded', function() {
				        console.log('video is ready and loaded');
				    });
				}
				

				break;
			case "gallery":
				str="<div class='gallery'>";
				$.each(data.feature.images,function(i,l){
					str+="<div class='slide "+l.class+"'><img src='"+l.file+"' />";
					if(l.title){str+="<div class='label'>"+l.title+"</div>";}
					str+="</div>";
				});
				str+="</div>";
				$(".art-detail .feature-content").html(str);

				APP.workDetail.curSlide=-1;
				APP.workDetail.rotateSlide();
				try{ clearInterval(APP.workDetail.slideTimer); } catch(e){}
				APP.workDetail.slideTimer = setInterval(APP.workDetail.rotateSlide,4000);

				break;
			case "iframe":
				str = "<iframe class='feature-iframe sixteen-nine' id='feature-iframe' src='"+data.feature.iframe+"' ></iframe>";
				$(".art-detail .feature-content").html(str);
				break;

			case "image":
				str = "<img class='feature-image sixteen-nine' id='feature-image' src='"+data.feature.images[0].file+"' />";
				$(".art-detail .feature-content").html(str);
				break;
		}


		//awards
		str="";
		$.each(data.awards,function(i,l){
			str+="<div class='list-item "+l.class+"'><img src='"+l.file+"' /><div class='label'>"+l.title+"</div></div>";
		});

		if(str!=""){
			$(".art-detail .awards-title").html("[ awards | recognition ]");
			$(".art-detail .awards-list").html(str);
			$(".wart-detail .awards").show();
		} else {
			// hide
			$(".art-detail .awards").hide();
		}


		//press
		str="";
		$.each(data.press,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".art-detail .press-title").html("[ press | articles | news ]");
			$(".art-detail .press-list").html(str);
			$(".art-detail .press").show();
		} else {
			// hide
			$(".art-detail .press").hide();
		}
		
		// links
		// TODO: In CSS style these link buttons, porbalby only ever LAUNCH SITE
		str="";
		$.each(data.links,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".art-detail .links-title").html("");
			$(".art-detail .links-list").html(str);
			$(".art-detail .links").show();
		} else {
			// hide
			$(".art-detail .links").hide();
		}


		// media
		str="";
		$.each(data.media,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			if(l.title){str+="<div class='label'>"+l.title+"</div>";}
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		
		if(str!=""){
			$(".art-detail .media-title").html("[ selected frames | concept art | media ]");
			$(".art-detail .media-list").html(str);
			$(".art-detail .media-block").show();
		} else {
			// hide
			$(".art-detail .media-block").hide();
		}
		


		// related art
		str="";
		// convert tags list to array and trim spaces
		var tagsToMatch = data.tags.split(",").map(function(item) { return item.trim();});
		var count = 0;

		$.each(APP.data.art.list,function(i,l){
			var tags = l.tags.split(",").map(function(item) { return item.trim();});
			if(tagsToMatch.some(r=> tags.includes(r)) && l.link!=data.link && count<6){
				str+="<div data-link='"+l.link+"' class='tilt list-item "+l.class+"'>";
				if(l.thumb){str+="<img src='"+l.thumb+"' />";}
				str+="<div class='titles'><div class='subtitle'>"+l.subtitle+"</div><div class='title'>"+l.title+"</div></div>";
				str+="</div>";
				count++;
			}
		});
		
		$(".art-detail .related-title").html("[ related art ]");
		$(".art-detail .related-list").html(str);
		$(".art-detail .related-list .list-item").click(function(){
			var link = $(this).attr("data-link");
			if(link){ APP.go(link,true); }
		});

		//refresh the tilt
		VanillaTilt.init(document.querySelectorAll(".tilt"), {
			reverse:true,
			max:5,
			scale:1.05,
			glare:true,
			"max-glare":.1
		});


	},
	goNext:function(){
    	var list = APP.data.art.list;
    	// find this index
    	var index=0;
    	var path = APP.state.split( '/' );
		if(path[0]){ var section  = path[0]; }
		if(path[1]){ var page = path[1]; }

    	$.each(list,function(i,l){
    		var path = l.link.split( '/' );
			var slug = path[1];
			console.log(page,slug)
    		if(page==slug){
    			index = i;
    			return false;
    		}
    	});

    	if(index<list.length-1){
    		APP.go(list[index+1].link,true);
    	} else {
    		console.log(list[0]);
    		APP.go(list[0].link,true);
    	}
	},

	goBack:function(){
		var list = APP.data.art.list;
    	// find this index
    	var index=0;
    	var path = APP.state.split( '/' );
		if(path[0]){ var section  = path[0]; }
		if(path[1]){ var page = path[1]; }

    	$.each(list,function(i,g){
    		var path = g.link.split( '/' );
			var slug = path[1];
			console.log(page,slug)
    		if(page==slug){
    			index = i;
    			return false;
    		}
    	});

    	if(index>0){
    		APP.go(list[index-1].link,true);
    	} else {
    		console.log(list[list.length-1]);
    		APP.go(list[list.length-1].link,true);
    	}
	}
}





APP.pressDetail = { 
	_this : this,
	init : function(){
		console.log("init press detail");

	    $(".press-detail .next-button").click(function(){
	    	APP.pressDetail.goNext();
	    });

	    $(".press-detail .bottom-next").click(function(){
	    	APP.pressDetail.goNext();
	    });

	    $(".press-detail .bottom-back").click(function(){
	    	APP.pressDetail.goBack();
	    });

	    $(".press-detail .bottom-up").click(function(){
	    	APP.go("press", true);
	    });

	},
	show : function(dir){
		console.log("show press detail",dir);
		APP.showPage($(".press-detail"),dir);
		$(".press-detail .page-title").removeClass("aos-animate");
		$(".press-detail .page-subtitle").removeClass("aos-animate");
		setTimeout(function(){$(".press-detail .page-title").addClass("aos-animate");},500);
		setTimeout(function(){$(".press-detail .page-subtitle").addClass("aos-animate");},500);
	},
	hide: function(dir){
		console.log("hide press detail",dir);
		APP.hidePage($(".press-detail"),dir);
		//$(".press-detail iframe").attr("src","");
		setTimeout(function(){$(".press-detail .feature-content").html("");},500);
		///$(".press-detail .feature-content").html();
		$(".press-detail .page-title").removeClass("aos-animate");
		$(".press-detail .page-subtitle").removeClass("aos-animate");
	},


	load : function(data){
		console.log("loading new press detail data",data);
		$(".press-detail .page-title").html(data.title);
		$(".press-detail .page-subtitle").html(data.subtitle);
		$(".press-detail .client").html("<b>Client: </b>"+data.client);
		$(".press-detail .role").html("<b>Role: </b>"+data.role);
		$(".press-detail .content-title").html("[ brief ]");
		$(".press-detail .content").html(data.content);
		
		// share
		$(".press-detail .social-title").html("[ share ]");
	    $(".press-detail .share-page-facebook").click(function(){
	    	window.open("https://www.facebook.com/sharer/sharer.php?u="+data.url+"&display=popup&ref=plugin&src=share_button","Facebook Share","width=600, height=450 top=" + ($(window).height() / 2 - 275) + ", left=" + ($(window).width() / 2 - 225) );
	    })
			
		$(".press-detail .share-page-twitter").click(function(){
	    	window.open("https://twitter.com/intent/tweet?hashtags="+data.hashtags+"&original_referer="+data.url+"&ref_src=twsrc%5Etfw&related=synergyseeker&text="+data.twitterShare+"&tw_p=tweetbutton&url="+data.url,"Twitter Share","width=600, height=350 top=" + ($(window).height() / 2 - 275) + ", left=" + ($(window).width() / 2 - 225) );
	    })
	    

		// feature
		switch(data.feature.type){
			case "video":
				str = "<div class='feature-video' id='feature-video'></div>";
				$(".press-detail .feature-content").html(str);
				if(data.feature.source=='vimeo'){
					var options = {
				        id: data.feature.id,
				        api:true,
				        responsive:true,
				        loop: false,
				        autoplay:false,
				        byline:false,
				        title:false
				    };

				    var player = new Vimeo.Player('feature-video', options);

				    // TODO: Event handlers and controllers to manage sound and video
				    // when both playing and/ leaving site
				    player.setVolume(1);

				    player.on('play', function() {
				        console.log('video played');
				        APP.muteAll(true);
				    });

				    player.on('pause', function() {
				        console.log('video paused!');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('stop', function() {
				        console.log('video stopped');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('loaded', function() {
				        console.log('video is ready and loaded');
				    });
				}
				

				break;
			case "gallery":
				str="<div class='gallery'>";
				$.each(data.feature.images,function(i,l){
					str+="<div class='slide "+l.class+"'><img src='"+l.file+"' />";
					if(l.title){str+="<div class='label'>"+l.title+"</div>";}
					str+="</div>";
				});
				str+="</div>";
				$(".press-detail .feature-content").html(str);

				APP.pressDetail.curSlide=-1;
				APP.pressDetail.rotateSlide();
				try{ clearInterval(APP.pressDetail.slideTimer); } catch(e){}
				APP.pressDetail.slideTimer = setInterval(APP.pressDetail.rotateSlide,4000);

				break;
			case "iframe":
				str = "<iframe class='feature-iframe sixteen-nine' id='feature-iframe' src='"+data.feature.iframe+"' ></iframe>";
				$(".press-detail .feature-content").html(str);
				break;

			case "image":
				str = "<img class='feature-image' id='feature-image' src='"+data.feature.images[0].file+"' />";
				$(".press-detail .feature-content").html(str);
				break;
		}


		//awards
		str="";
		$.each(data.awards,function(i,l){
			str+="<div class='list-item "+l.class+"'><img src='"+l.file+"' /><div class='label'>"+l.title+"</div></div>";
		});

		if(str!=""){
			$(".press-detail .awards-title").html("[ awards | recognition ]");
			$(".press-detail .awards-list").html(str);
			$(".press-detail .awards").show();
		} else {
			// hide
			$(".press-detail .awards").hide();
		}


		//press
		str="";
		$.each(data.press,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".press-detail .press-title").html("[ press | articles | news ]");
			$(".press-detail .press-list").html(str);
			$(".press-detail .press").show();
		} else {
			// hide
			$(".press-detail .press").hide();
		}
		
		// links
		// TODO: In CSS style these link buttons, porbalby only ever LAUNCH SITE
		str="";
		$.each(data.links,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".press-detail .links-title").html("");
			$(".press-detail .links-list").html(str);
			$(".press-detail .links").show();
		} else {
			// hide
			$(".press-detail .links").hide();
		}


		// media
		str="";
		$.each(data.media,function(i,l){
			str+="<div class='list-item "+l.class+"' data-aos='fade-in'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			if(l.title){str+="<div class='label'>"+l.title+"</div>";}
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		
		if(str!=""){
			$(".press-detail .media-title").html("[ selected frames | concept art | media ]");
			$(".press-detail .media-list").html(str);
			$(".press-detail .media-block").show();
		} else {
			// hide
			$(".press-detail .media-block").hide();
		}
		


		// related press
		str="";
		// convert tags list to array and trim spaces
		var tagsToMatch = data.tags.split(",").map(function(item) { return item.trim();});
		var count = 0;

		$.each(APP.data.press.list,function(i,l){
			var tags = l.tags.split(",").map(function(item) { return item.trim();});
			if(tagsToMatch.some(r=> tags.includes(r)) && l.link!=data.link && count<6){
				str+="<div data-link='"+l.link+"' class='tilt list-item "+l.class+"'>";
				if(l.thumb){str+="<img src='"+l.thumb+"' />";}
				str+="<div class='titles'><div class='subtitle'>"+l.subtitle+"</div><div class='title'>"+l.title+"</div></div>";
				str+="</div>";
				count++;
			}
		});
		
		$(".press-detail .related-title").html("[ related press ]");
		$(".press-detail .related-list").html(str);
		$(".press-detail .related-list .list-item").click(function(){
			var link = $(this).attr("data-link");
			if(link){ APP.go(link,true); }
		});

		//refresh the tilt
		VanillaTilt.init(document.querySelectorAll(".tilt"), {
			reverse:true,
			max:5,
			scale:1.05,
			glare:true,
			"max-glare":.1
		});

	},
	goNext:function(){
    	var list = APP.data.press.list;
    	// find this index
    	var index=0;
    	var path = APP.state.split( '/' );
		if(path[0]){ var section  = path[0]; }
		if(path[1]){ var page = path[1]; }

    	$.each(list,function(i,l){
    		var path = l.link.split( '/' );
			var slug = path[1];
			console.log(page,slug)
    		if(page==slug){
    			index = i;
    			return false;
    		}
    	});

    	if(index<list.length-1){
    		APP.go(list[index+1].link,true);
    	} else {
    		console.log(list[0]);
    		APP.go(list[0].link,true);
    	}
	},

	goBack:function(){
		var list = APP.data.press.list;
    	// find this index
    	var index=0;
    	var path = APP.state.split( '/' );
		if(path[0]){ var section  = path[0]; }
		if(path[1]){ var page = path[1]; }

    	$.each(list,function(i,g){
    		var path = g.link.split( '/' );
			var slug = path[1];
			console.log(page,slug)
    		if(page==slug){
    			index = i;
    			return false;
    		}
    	});

    	if(index>0){
    		APP.go(list[index-1].link,true);
    	} else {
    		console.log(list[list.length-1]);
    		APP.go(list[list.length-1].link,true);
    	}
	}
}





APP.prototypesDetail = { 
	_this : this,
	init : function(){
		console.log("init prototypes detail");

	    $(".prototypes-detail .next-button").click(function(){
	    	APP.sounds["click"].play();
	    	APP.prototypesDetail.goNext();
	    });

	    $(".prototypes-detail .bottom-next").click(function(){
	    	APP.sounds["click"].play();
	    	APP.prototypesDetail.goNext();
	    });

	    $(".prototypes-detail .bottom-back").click(function(){
	    	APP.sounds["click"].play();
	    	APP.prototypesDetail.goBack();
	    });

	    $(".prototypes-detail .bottom-up").click(function(){
	    	APP.sounds["click"].play();
	    	APP.go("prototypes", true);
	    });

	},
	show : function(dir){
		console.log("show prototypes detail",dir);
		APP.showPage($(".prototypes-detail"),dir);
		$(".prototypes-detail .page-title").removeClass("aos-animate");
		$(".prototypes-detail .page-subtitle").removeClass("aos-animate");
		setTimeout(function(){$(".prototypes-detail .page-title").addClass("aos-animate");},500);
		setTimeout(function(){$(".prototypes-detail .page-subtitle").addClass("aos-animate");},500);
	},
	hide: function(dir){
		console.log("hide prototypes detail",dir);
		APP.hidePage($(".prototypes-detail"),dir);
		//$(".prototypes-detail iframe").attr("src","");
		setTimeout(function(){$(".prototypes-detail .feature-content").html("");},500);
		//$(".prototypes-detail .feature-content").html();
		$(".prototypes-detail .page-title").removeClass("aos-animate");
		$(".prototypes-detail .page-subtitle").removeClass("aos-animate");
	},


	load : function(data){
		console.log("loading new prototypes detail data",data);
		$(".prototypes-detail .page-title").html(data.title);
		$(".prototypes-detail .page-subtitle").html(data.subtitle);
		//$(".prototypes-detail .client").html("<b>Client: </b>"+data.client);
		//$(".prototypes-detail .role").html("<b>Role: </b>"+data.role);
		$(".prototypes-detail .content-title").html("[ brief ]");
		$(".prototypes-detail .content").html(data.content);
		if('color' in data){  $(".prototypes-detail .page-title").css({'color': data.color}); }

		// share
		$(".prototypes-detail .social-title").html("[ share ]");
	    $(".prototypes-detail .share-page-facebook").click(function(){
	    	window.open("https://www.facebook.com/sharer/sharer.php?u="+data.url+"&display=popup&ref=plugin&src=share_button","Facebook Share","width=600, height=450 top=" + ($(window).height() / 2 - 275) + ", left=" + ($(window).width() / 2 - 225) );
	    })
			
		$(".prototypes-detail .share-page-twitter").click(function(){
	    	window.open("https://twitter.com/intent/tweet?hashtags="+data.hashtags+"&original_referer="+data.url+"&ref_src=twsrc%5Etfw&related=synergyseeker&text="+data.twitterShare+"&tw_p=tweetbutton&url="+data.url,"Twitter Share","width=600, height=350 top=" + ($(window).height() / 2 - 275) + ", left=" + ($(window).width() / 2 - 225) );
	    })
	    

		// feature
		switch(data.feature.type){
			case "video":
				str = "<div class='feature-video sixteen-nine' id='feature-video'></div>";
				$(".prototypes-detail .feature-content").html(str);
				if(data.feature.source=='vimeo'){
					var options = {
				        id: data.feature.id,
				        api:true,
				        responsive:true,
				        loop: false,
				        autoplay:true,
				        byline:false,
				        title:false
				    };

				    var player = new Vimeo.Player('feature-video', options);

				    // TODO: Event handlers and controllers to manage sound and video
				    // when both playing and/ leaving site
				    player.setVolume(1);

				    player.on('play', function() {
				        console.log('video played');
				        APP.muteAll(true);
				    });

				    player.on('pause', function() {
				        console.log('video paused!');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('stop', function() {
				        console.log('video stopped');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('loaded', function() {
				        console.log('video is ready and loaded');
				    });
				} 

				if(data.feature.source=='youtube'){
					
						var options = {
					        id: data.feature.id,
					        api:1,
					        enablejsapi:1,
					        controls:1,
					        modestbranding:1,
					        showinfo:0,
					        responsive:1,
					        loop: 0,
					        playerVars:{"autoplay":1, "autohide":1, "controls":1, "showinfo":0, "modestbranding":1, "rel":0, "fs":1, "wmode":"transparent", "iv_load_policy":3,"allowfullscreen":"true", "frameborder": 0, "scrolling": 'no' },
				            autopause: true,
				            autoplay:true,
					        byline:0,
					        title:0,
					        host: 'https://www.youtube.com',
					        videoId: data.feature.id
					        
					    };


					    var player = new YT.Player('feature-video', options);

					    // TODO: Event handlers and controllers to manage sound and video
					    // when both playing and/ leaving site
					    
					    player.addEventListener('onStateChange', function(e) {
					        if (e.data == YT.PlayerState.PLAYING) {
					        	console.log('video playing');
	         					APP.muteAll(true);
					        } else {
					        	console.log('video not playing, state: ' + e.data)
					        	if(APP.soundOn && !APP.hidden){
					   				APP.unMuteAll();
					   			}
					        }
					        
					    });
					
				} 
				

				break;
			case "gallery":
				str="<div class='gallery'>";
				$.each(data.feature.images,function(i,l){
					str+="<div class='slide "+l.class+"'><img src='"+l.file+"' />";
					if(l.title){str+="<div class='label'>"+l.title+"</div>";}
					str+="</div>";
				});
				str+="</div>";
				$(".prototypes-detail .feature-content").html(str);

				APP.prototypesDetail.curSlide=-1;
				APP.prototypesDetail.rotateSlide();
				try{ clearInterval(APP.prototypesDetail.slideTimer); } catch(e){}
				APP.prototypesDetail.slideTimer = setInterval(APP.prototypesDetail.rotateSlide,4000);

				break;
			case "iframe":
				str = "<iframe class='feature-iframe sixteen-nine' id='feature-iframe' src='' ></iframe>";
				$(".prototypes-detail .feature-content").html(str);
				setTimeout(function(){
					$(".prototypes-detail .feature-content .feature-iframe").attr("src",data.feature.iframe);
				},500);
				
				break;

			case "image":
				str = "<img class='feature-image sixteen-nine' id='feature-image' src='"+data.feature.images[0].file+"' />";
				$(".prototypes-detail .feature-content").html(str);
				break;
		}


		//awards
		str="";
		$.each(data.awards,function(i,l){
			str+="<div class='list-item "+l.class+"'><img src='"+l.file+"' /><div class='label'>"+l.title+"</div></div>";
		});

		if(str!=""){
			$(".prototypes-detail .awards-title").html("[ awards | recognition ]");
			$(".prototypes-detail .awards-list").html(str);
			$(".prototypes-detail .awards-block").show();
		} else {
			// hide
			$(".prototypes-detail .awards-block").hide();
		}


		//press
		str="";
		$.each(data.press,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".prototypes-detail .press-title").html("[ press | articles | news ]");
			$(".prototypes-detail .press-list").html(str);
			$(".prototypes-detail .press").show();
		} else {
			// hide
			$(".prototypes-detail .press-block").hide();
		}
		
		// links
		// TODO: In CSS style these link buttons, porbalby only ever LAUNCH SITE
		str="";
		$.each(data.links,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".prototypes-detail .links-title").html("");
			$(".prototypes-detail .links-list").html(str);
			$(".prototypes-detail .links-block").show();
		} else {
			// hide
			$(".prototypes-detail .links-block").hide();
		}


		// media
		str="";
		$.each(data.media,function(i,l){
			str+="<div class='list-item "+l.class+"' data-aos='fade-in'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			if(l.title){str+="<div class='label'>"+l.title+"</div>";}
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		
		if(str!=""){
			$(".prototypes-detail .media-title").html("[ selected frames | concept art | media ]");
			$(".prototypes-detail .media-list").html(str);
			$(".prototypes-detail .media-block").show();
		} else {
			// hide
			$(".prototypes-detail .media-block").hide();
		}
		


		// related prototypes
		str="";
		// convert tags list to array and trim spaces
		var tagsToMatch = data.tags.split(",").map(function(item) { return item.trim();});
		var count = 0;

		$.each(APP.data.prototypes.list,function(i,l){
			var tags = l.tags.split(",").map(function(item) { return item.trim();});
			if(tagsToMatch.some(r=> tags.includes(r)) && l.link!=data.link && count<6){
				str+="<div data-link='"+l.link+"' class='tilt list-item "+l.class+"'>";
				if(l.thumb){str+="<img src='"+l.thumb+"' />";}
				str+="<div class='titles'><div class='subtitle'>"+l.subtitle+"</div><div class='title'>"+l.title+"</div></div>";
				str+="</div>";
				count++;
			}
		});
		
		$(".prototypes-detail .related-title").html("[ related prototypes ]");
		$(".prototypes-detail .related-list").html(str);
		$(".prototypes-detail .related-list .list-item").click(function(){
			APP.sounds["click"].play();
			var link = $(this).attr("data-link");
			if(link){ APP.go(link,true); }
		});


		//refresh the tilt
		VanillaTilt.init(document.querySelectorAll(".tilt"), {
			reverse:true,
			max:5,
			scale:1.05,
			glare:true,
			"max-glare":.1
		});

	},
	goNext:function(){
    	var list = APP.data.prototypes.list;
    	// find this index
    	var index=0;
    	var path = APP.state.split( '/' );
		if(path[0]){ var section  = path[0]; }
		if(path[1]){ var page = path[1]; }

    	$.each(list,function(i,l){
    		var path = l.link.split( '/' );
			var slug = path[1];
			console.log(page,slug)
    		if(page==slug){
    			index = i;
    			return false;
    		}
    	});

    	if(index<list.length-1){
    		APP.go(list[index+1].link,true);
    	} else {
    		console.log(list[0]);
    		APP.go(list[0].link,true);
    	}
	},

	goBack:function(){
		var list = APP.data.prototypes.list;
    	// find this index
    	var index=0;
    	var path = APP.state.split( '/' );
		if(path[0]){ var section  = path[0]; }
		if(path[1]){ var page = path[1]; }

    	$.each(list,function(i,g){
    		var path = g.link.split( '/' );
			var slug = path[1];
			console.log(page,slug)
    		if(page==slug){
    			index = i;
    			return false;
    		}
    	});

    	if(index>0){
    		APP.go(list[index-1].link,true);
    	} else {
    		console.log(list[list.length-1]);
    		APP.go(list[list.length-1].link,true);
    	}
	}
}



APP.showPage = function(page){
	$(page).removeClass("hide");
	setTimeout(function(){$(page).addClass("show"); AOS.refresh(); },100);	
}

APP.hidePage = function(page){
	$(page).removeClass("show");

	// if we are going from a detail page to the same detail page, dont hide it from DOM
	if( $(page).hasClass("work-detail") && APP.state=="workDetail") { return false; }
	if( $(page).hasClass("prototypes-detail") && APP.state=="prototypesDetail") { return false; }
	if( $(page).hasClass("press-detail") && APP.state=="pressDetail") { return false; }
	if( $(page).hasClass("art-detail") && APP.state=="artDetail") { return false; }
	
	// hide page from DOM
	setTimeout(function(){$(page).addClass("hide");},1000);

	// turn ambient back on, if not muted
	if(APP.soundOn && !APP.hidden){
		APP.unMuteAll();
	}
	
}
