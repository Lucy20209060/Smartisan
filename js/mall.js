$(function(){
	
//	滑过商品区域出现 查看详情 与 加入购物车或已售罄 按钮
	$('.ul_event>li').each(function(){
		$(this).hover(
			function(){
				$(this).find('.operator').css('display','block');
			},
			function(){
				$(this).find('.operator').css('display','none');
			}
		);
	});
	
	//商品初始化 首页数据推入页面
	$('.dots').each(function(){
		//获取商品id
		var code = $(this).attr('code');
		//图片放置位置
		var shopImg = $(this).parent().children('#img_wrap').children();
		//商品名称位置
		var titlewrap = $(this).prev().children('.titlename');
		//商品说明内容位置
		var explainwrap = $(this).prev().children('.explain');
		//商品价格位置
		var pricewrap = $(this).next().children('.price');
		
		$.getJSON("js/date.json",function(date){

			var nameStr1 = 'date.'+code+'[0]';
			var name1 = eval(nameStr1);
			var pic1 = name1.mall_path0;
			//首页每个商品的第一张展示图片
			shopImg.attr("src",pic1);
			
			//获取商品名称 与 说明 并写入页面
			var title = name1.title;
			titlewrap.text(title);
			
			//获取商品说明内容 并写入页面
			var explain = name1.explain;
			explainwrap.text(explain);
			
			//获取商品价格 并写入页面
			var price = name1.price;
			pricewrap.text(price)
		});
		

		$(this).find('li').each(function(index){
			$(this).hover(
				function(){
					$(this).parent().children().css('border-color','#fff');
					$(this).css('border-color','#b2b2b2');
						
					//商品 滑过出现对应的图片
					var allImg = $(this).parent().parent().children('#img_wrap').children();				
					
					//从json文件中获取数据
					$.getJSON("js/date.json",function(date){

						var nameStr = 'date.'+code+'[0].mall_path'+index;
						var name = eval(nameStr);
						
						allImg.attr("src",name);
					});	
				}
				
			);
			
		});

	});
	
	
	//点击'查看详情'按钮 跳转至 商品详情页
	$('.btn_1').each(function(){
		$(this).on('click',function(){
			var code = $(this).parent().attr('code');
			var urlStr = 'html/Goods_details.html?id='+code;
			
			//将商品id拼接到链接中 并跳转
			window.open('html/GoodsDetails.html?id='+code,'_blank');
		});
	});
	
	
	$('.btn_2').each(function(){
		var code = $(this).parent().attr('code');
		var colorStr = 'date.'+code+'[0].num';
		
		var btn2 = $(this);
		$.getJSON("js/date.json",function(date){
			//获取商品数量
			var colorNum = eval(colorStr);
			if(colorNum<=0){
				btn2.addClass('shop_over').text('已售罄');
			}else{
				btn2.addClass('add_cart').text('加入购物车');	
			}
			
		});
	});
	
	
	
	$('#shoppingcart').hover(
		function(){
			$('.empty_cart').css('display','block');
		},
		function(){
			$('.empty_cart').css('display','none');
		}
	);
	
	
	
	
	$(window).on("scroll",function() {
		var $scrolltop = $(window).scrollTop();
		
		if($scrolltop>600){                   
			$('.back_top').fadeIn();  
		}else{
			$('.back_top').fadeOut();     
		}
	});
	
	
	//主页 回到顶部
	$('.back_top').on("click",function(){
        $('body,html').animate({scrollTop:0},1000);  
	});
	
	

//	3D轮播图
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        effect : 'fade',
        speed:1000,
        autoplay : 5000,
        autoplayDisableOnInteraction : false,
    });

    $(".movie").hover3d({
        selector: ".layer-1",
        selector2: ".layer-2",
        selector3: ".layer-3",
        shine: false,       //是否需要阴影
        sensitivity: 100,  //值越小，倾斜越大
        sensitivity2: 150,
        sensitivity3: 80,
    });



	
});
