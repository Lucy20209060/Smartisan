//此处引用：鼠标滚轮mousewheel插件
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

$(function(){
	var i=-1;
	var $btn = $('.section-btn li'),
		$wrap = $('.section-wrap'),
		$arrow = $('.arrow');
		$headerwrap = $('#headerwrap');
		iDirection = 0; // 滚动方向的判断 0：向下 ；1：向上
		$footer = $('footer');
		$main = $('#mainwrap');
	/*当前页面赋值*/
	function up(){i++;if(i>$btn.length-1){i=$btn.length};}
	function down(){i--;if(i<0){i=-1};}
	
	/*页面滑动*/
	function run(){
		console.log(1)
		//使鼠标滚轮滑动到不同状态进行不同动作
		if(i>-1&&i<4){		
			$btn.eq(i).addClass('on').siblings().removeClass('on');	
			$wrap.attr("class","section-wrap").addClass(function() { return "put-section-"+i; }).find('.section').eq(i).find('.title').addClass('active');
			if(iDirection==0){ // 向下滚到0触发
				iDirection = 1;
				
				// header 的移动
				$headerwrap.animate({'top':'-120px'},500,function(){
					$headerwrap.animate({'top':"-100px"},800);
					$headerwrap.find(".headerSub").animate({'height':"60px"},300).addClass("headerSubMove");
					$headerwrap.find('.crumbs').addClass('crumbsMove');
					$headerwrap.find('.phoneLogo').addClass('phoneLogoMove');
					$headerwrap.find('.buywrap').addClass("buywrapMove");
					
				})
				// section-1->rhythmTitBox的移动
				$('.rhythmTitBox').addClass('rhythmTitMove');
				// section-1->rhythm->img的移动
				var delay = 0.6;
				$('.rhythm > li').each(function(index){
					$('.rhythm > li').eq(index).addClass('rhythmImgMove').css({"animation-delay":delay+'s'});
					delay = delay + 0.1;
				})
				
				
			}
			
			//第二页的右侧图形上下移
			if(i==1){
				console.log(3)
				$('.colorful').addClass("sec-down")
			}
			if(i != 1){
				setTimeout(function () {
					$('.colorful').removeClass("sec-down");
				}, 1000)				
			}
			//还原每个区域
			$footer.removeClass('footerMove');
			$main.removeClass('mainwrapMove');
			$('.showBox > .showLeft').removeClass('showLeftMove');
			$('.showBox > .showRight').removeClass('showRightMove');
			// section-3->video->视频的播放
			if(i==2){
				var $video = $('#video1');
				$video[0].play();
			}
			
			// section-4->show区域的移动效果
			if(i==3){
				$('.showBox > .showLeft').addClass('showLeftMove');
				$('.showBox > .showRight').addClass('showRightMove');
			}
			
			
	
		}else if(i==-1){
			iDirection = 0;
			// header 的还原
			$headerwrap.animate({'top':"0px"},800);
			$headerwrap.find(".headerSub").animate({'height':"36px"},300).removeClass("headerSubMove");
			$headerwrap.find('.crumbs').removeClass('crumbsMove');
			$headerwrap.find('.phoneLogo').removeClass('phoneLogoMove');
			$headerwrap.find('.buywrap').removeClass("buywrapMove");
			
			// section-1->rhythmTitBox的还原
			$('.rhythmTitBox').removeClass('rhythmTitMove');
			
			// section-1->rhythm->img的还原
			$('.rhythm > li').removeClass('rhythmImgMove'); // !!!千万不要加点
		}else if(i==4){
			$footer.addClass('footerMove');
			$main.addClass('mainwrapMove');
		}
		

	};
	
	/*右侧按钮点击*/
	$btn.each(function(index) {
		$(this).click(function(){
			i=index;
			run();
		})
	});
	
	/*翻页按钮点击*/
	$arrow.one('click',go);
	function go(){
		up();run();	
		setTimeout(function(){$arrow.one('click',go)},1000)
	};
	
	
	/*响应鼠标*/
	$wrap.one('mousewheel',mouse_);
	function mouse_(event){
		if(event.deltaY<0) {up()}
		else{down()}
		run();
		
		setTimeout(function(){$wrap.one('mousewheel',mouse_)},1000)
	};
	
	/*响应键盘上下键*/
	$(document).one('keydown',k);
	function k(event){
		var e=event||window.event;
		var key=e.keyCode||e.which||e.charCode;
		switch(key)	{
			case 38: down();run();	
			break;
			case 40: up();run();	
			break;
		};
		setTimeout(function(){$(document).one('keydown',k)},1000);
	}
});