/*
jQuery Hover3d
=================================================
Version: 1.0.0
Author: Rian Ariona
Website: http://ariona.net
Docs: http://ariona.github.io/hover3d
Repo: http://github.com/ariona/hover3d
Issues: http://github.com/ariona/hover3d/issues
*/

(function($){
	
	$.fn.hover3d = function(options){
		
		var settings = $.extend({
			selector      : null,
			selector2      : null,
			selector3      : null,
			perspective   : 1000,
			sensitivity   : 20,
			sensitivity2   : 20,
			sensitivity3   : 20,
			invert        : false,
			shine	      : false,
			hoverInClass  : "hover-in",
			hoverOutClass : "hover-out"
		}, options);
		//console.log(options)
		return this.each(function(){
			
			var $this = $(this),
				$card = $this.find(settings.selector),
				$card2 = $this.find(settings.selector2),
				$card3 = $this.find(settings.selector3);
			//console.log($this)
			if( settings.shine ){
				$card.append('<div class="shine"></div>');
			}
			var $shine = $(this).find(".shine");

			// Set perspective and transformStyle value
			// for element and 3d object	
			$this.css({
				perspective: settings.perspective+"px",
				transformStyle: "preserve-3d"
			});
			
			$card.css({
				perspective: settings.perspective+"px",
				transformStyle: "preserve-3d",
			});
			$card2.css({
				perspective: settings.perspective+"px",
				transformStyle: "preserve-3d",
			});
			$card3.css({
				perspective: settings.perspective+"px",
				transformStyle: "preserve-3d",
			});

			$shine.css({
				position  : "absolute",
				top       : 0,
				left      : 0,
				bottom    : 0,
				right     : 0,
				"z-index" : 9
			});
			
			// Mouse Enter function, this will add hover-in
			// Class so when mouse over it will add transition
			// based on hover-in class
			function enter(){
				$card.addClass(settings.hoverInClass);
				$card2.addClass(settings.hoverInClass);
				$card3.addClass(settings.hoverInClass);
				
				setTimeout(function(){
					$card.removeClass(settings.hoverInClass);
				}, 1000);
				setTimeout(function(){
					$card2.removeClass(settings.hoverInClass);
				}, 1000);
				setTimeout(function(){
					$card3.removeClass(settings.hoverInClass);
				}, 1000);
			}
			
			// Mouse movement Parallax effect
			function move(event){
				var w      = $this.innerWidth(),
					h      = $this.innerHeight(),
					ax 	   = settings.invert ?  ( w / 2 - event.offsetX)/settings.sensitivity : -( w / 2 - event.offsetX)/settings.sensitivity,
					ay     = settings.invert ? -( h / 2 - event.offsetY)/settings.sensitivity :  ( h / 2 - event.offsetY)/settings.sensitivity;
					bx 	   = settings.invert ?  ( w / 2 - event.offsetX)/settings.sensitivity2 : -( w / 2 - event.offsetX)/settings.sensitivity2,
					by     = settings.invert ? -( h / 2 - event.offsetY)/settings.sensitivity2 :  ( h / 2 - event.offsetY)/settings.sensitivity2;
					cx 	   = settings.invert ?  ( w / 2 - event.offsetX)/settings.sensitivity3 : -( w / 2 - event.offsetX)/settings.sensitivity3,
					cy     = settings.invert ? -( h / 2 - event.offsetY)/settings.sensitivity3 :  ( h / 2 - event.offsetY)/settings.sensitivity3;
					dy     = event.offsetY - h / 2,
					dx     = event.offsetX - w / 2,
					theta  = Math.atan2(dy, dx),
					angle  = theta * 180 / Math.PI - 90;
					
				if (angle < 0) {
					angle  = angle + 360;
				}
				

				$card.css({
					perspective    : settings.perspective+"px",
					transformStyle : "preserve-3d",
					transform      : "rotateY("+ax+"deg) rotateX("+ay+"deg)"
				});
				$card2.css({
					perspective    : settings.perspective+"px",
					transformStyle : "preserve-3d",
					transform      : "rotateY("+bx+"deg) rotateX("+by+"deg) translateZ(20px)"
				});
				$card3.css({
					perspective    : settings.perspective+"px",
					transformStyle : "preserve-3d",
					transform      : "rotateY("+cx+"deg) rotateX("+cy+"deg) translateZ(30px)"
				});

				$shine.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + event.offsetY / h * .5 + ') 0%,rgba(255,255,255,0) 80%)');
			}
			
			// Mouse leave function, will set the transform
			// property to 0, and add transition class
			// for exit animation
			function leave(){
				$card.addClass(settings.hoverOutClass);
				$card2.addClass(settings.hoverOutClass);
				$card3.addClass(settings.hoverOutClass);

				$card.css({
					perspective    : settings.perspective+"px",
					transformStyle : "preserve-3d",
					transform      : "rotateX(0) rotateY(0)"
				});
				$card2.css({
					perspective    : settings.perspective+"px",
					transformStyle : "preserve-3d",
					transform      : "rotateX(0) rotateY(0) translateZ(20px)"
				});
				$card3.css({
					perspective    : settings.perspective+"px",
					transformStyle : "preserve-3d",
					transform      : "rotateX(0) rotateY(0) translateZ(30px)"
				});
				setTimeout( function(){
					$card.removeClass(settings.hoverOutClass);
				}, 1000 );
				setTimeout( function(){
					$card2.removeClass(settings.hoverOutClass);
				}, 1000 );
				setTimeout( function(){
					$card3.removeClass(settings.hoverOutClass);
				}, 1000 );
			}
			
			// Mouseenter event binding
			$this.on( "mouseenter", function(){
				return enter();
			});
			
			// Mousemove event binding
			$this.on( "mousemove", function(event){
				return move(event);
			});
			
			// Mouseleave event binding
			$this.on( "mouseleave", function(){
				return leave();
			});
			
		});
		
	};
	
}(jQuery));