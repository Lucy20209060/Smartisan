//此处引用：鼠标滚轮mousewheel插件
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

$(function(){
	var i=-1;
	var $btn = $('.section-btn li'),
		$wrap = $('.section-wrap'),
		$arrow = $('.arrow'),
		$headerwrap = $('#headerwrap'),
		iDirection = 0,
		$footer = $('footer'),
		$main = $('#mainwrap'),
		$section1=$(".section-1"),
		$sectionWrap=$(".section-wrap"),
		$section3=$(".section-3"),
		$sectionBtn=$(".section-btn"),
		$handle=$(".handle"),
		$text=$(".text"),
		$secContanier=$(".spin-contanier");
	/*当前页面赋值*/
	function up(){i++;if(i>$btn.length-1){i=$btn.length};}
	function down(){i--;if(i<0){i=-1};}
	
	/*页面滑动*/
	function run(){
		if(i>-1&&i<4){		
			$btn.eq(i).addClass('on').siblings().removeClass('on');	
			$wrap.attr("class","section-wrap").addClass(function() { return "put-section-"+i; }).find('.section').eq(i).find('.title').addClass('active');
			if(i==0){
				iDirection = 1;
				$headerwrap.animate({'top':'-120px'},500,function(){
					$headerwrap.animate({'top':"-120px"},800);
					$headerwrap.find(".headerSub").animate({'height':"60px"},300).addClass("headerSubMove");
					$headerwrap.find('.crumbs').addClass('crumbsMove');
					$headerwrap.find('.phoneLogo').addClass('phoneLogoMove');
					$headerwrap.find('.buywrap').addClass("buywrapMove");
					$section1.find(".content").animate({'opacity':"0"});
					$sectionBtn.animate({'opacity':"1"})
				})
			}
			$footer.removeClass('footerMove');
			$main.removeClass('mainwrapMove');
			$sectionBtn.removeClass('btnMove')
			if(i==1){
				$secContanier.find(".list-1").addClass("list1");
				$secContanier.find(".list-2").addClass("list2");
				$secContanier.find(".list-3").addClass("list3");
				$secContanier.find(".list-4").addClass("list4");
			}
			if(i!=1){
				$secContanier.find(".list-1").removeClass("list1");
				$secContanier.find(".list-2").removeClass("list2");
				$secContanier.find(".list-3").removeClass("list3");
				$secContanier.find(".list-4").removeClass("list4");
			}
			
			if(i==2){
				$section3.find(".active").addClass("activeMove");
				$headerwrap.find(".headerSub").addClass("cover-dark");
			}
			if(i==1||i==3 ||i==0){
				$section3.find(".active").removeClass("activeMove");
				$headerwrap.find(".headerSub").removeClass("cover-dark");
				$sectionBtn.animate({'opacity':"1"})
			}
			if(i==3){
				$handle.children("li").addClass("active");
				clearInterval(timer);
				var j=0;
				var timer=setInterval(function(){
					j++;
					if(j>2){
						j=0;
					}
					move(j)
				},2500);
				function move(){
					$text.children("span").eq(j).addClass("active").siblings().removeClass("active");
					
				}
			}
			if(i!=3){
				$handle.children("li").removeClass("active");
				clearInterval(timer);
			}
		}else if(i==-1){
			iDirection = 0;
			$headerwrap.animate({'top':"0px"},800);
			$headerwrap.find(".headerSub").animate({'height':"36px"},300).removeClass("headerSubMove");
			$headerwrap.find('.crumbs').removeClass('crumbsMove');
			$headerwrap.find('.phoneLogo').removeClass('phoneLogoMove');
			$headerwrap.find('.buywrap').removeClass("buywrapMove");
			$section1.find(".content").animate({'opacity':"1"});
			$wrap.attr("class","section-wrap").addClass(function() { return "put-section-"+i; }).find('.section').eq(i).animate({"top":"0"});
			$sectionBtn.animate({'opacity':"0"});
		}else if(i==4){
			$footer.addClass('footerMove');
			$main.addClass('mainwrapMove');
			$sectionBtn.addClass('btnMove');
			$sectionBtn.animate({'opacity':"0"});
		}
		
		console.log(i)

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