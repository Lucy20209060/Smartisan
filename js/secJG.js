$(function () {
	//选项卡的切换
	$(".color-tabs li").click(function () {
		//当前选项卡字体颜色更改
		$(this).css("color", "black").siblings().css("color", "#c4c4c4");
		switch($(this).index()) {
			case 0: 
				//更改第一个小图标的边框
				$('.color-switch li').css({"border": "2px solid #e6e6e6","padding":"3px"});
				//三大ul隐藏另外两个
				$(".color-switch").css("display", "none"); 
				$(".switch-standard").css("display", "block").children("li").first().css({"border": "3px solid #999","padding": "2px"});
				$('.sYoung-tags').css("opacity", 0);
				//body背景色跟着改变
				$('.section-2').css("background","#fff");
				//其余大图透明，当前第一张大图显示并动画
				$(".colorful").css("opacity", 0).removeClass("sec-active");
				$('div.color-red').css("opacity", 1).addClass("sec-active");
				
				break;
			case 1:
				$('.color-switch li').css({"border": "2px solid #e6e6e6","padding":"3px"});
				
				$(".color-switch").css("display", "none"); 				
				$(".switch-young").css("display", "block").children("li").first().css({"border": "3px solid #999","padding": "2px"});
				$('.sYoung-tags').css("opacity", 1);
				
				$('.section-2').css("background","#fffcf5");
				
				$(".colorful").css("opacity", 0).removeClass("sec-active");
				$('div.color-bone').css("opacity", 1).addClass("sec-active");
				
				break;
			case 2:
				$('.color-switch li').css({"border": "2px solid #e6e6e6","padding":"3px"});
				
				$(".color-switch").css("display", "none");
				$(".switch-black").css("display", "block").children("li").first().css({"border": "3px solid #999","padding": "2px"});
				$('.sYoung-tags').css("opacity", 0);
				
				$('.section-2').css("background","#fff");
				
				$(".colorful").css("opacity", 0);
				$('div.color-black').css("opacity", 1).addClass("sec-active");
				
				break;
		}
	})
	
	
	//大图的切换并动画
	$('.color-switch li').click(function () {
		//更改小图标的border
		$('.color-switch li').css({"border": "2px solid #e6e6e6","padding":"3px"});
		$(this).css({"border": "3px solid #999","padding": "2px"});
		//更改右侧所有大图，移出class名，变为透明
		$(this).parents('#content').siblings(".colorful").removeClass("sec-active").css({"opacity": 0});
		//当前对应的大图，添加class，不透明
		var s = $(this).attr("class");	
		$(this).parents('#content').siblings("." + s).css({"opacity": 1}).addClass("sec-active");
		
	})
	$(window).scroll(function () {
		$('.colorful').addClass("sec-down");
	})
})

	

