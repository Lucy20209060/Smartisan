$(function(){
	

	//截取商品id
	var idPar = location.search;
	if(!idPar){
		
		$('.error_up').css('display','block');
		$('.error404_wrap').css('display','block');

		$('.product_information').css('display','none');
		$('#OM_sub_nav').css('display','none');
		$('.fixed_nav').css('display','none');
		$('.goods_wrap').css('display','none');


		document.title='404';
		var S=5;
		var timer = setInterval(function(){
			S=S-1;
			$('.times').text(S);
			
			if(S==0){
				clearInterval(timer);
				//window.open("about:blank","_self").close();//关闭页面
				//自动跳转主页
				window.location.href="../online-mall.html";
			}
		},1000);
	}


	//截取商品id
	var idPar = location.search;
	var goodsId = idPar.slice(4);
	//console.log(goodsId);
	
	$.getJSON("../js/date.json",function(date){
		//从json文件中获取商品信息
		var nameStr = 'date.'+goodsId;
		var name = eval(nameStr);
		//修改页面title
		document.title = name[0].title+' - Smartisan';
		
		//第一张图片推入页头区域
		var PathStr1 = 'date.'+goodsId+'[1].details0_path0';
		var Path1 = eval(PathStr1);
		var $img3 = $('<img>').attr("src",Path1);
		$img3.appendTo($('.img_wrap'));
		
		//推入商品名称
		$('.custom_title').text(name[0].title);
		$('.fixed_title').text(name[0].title);//页头位置
		
		//推入商品说明
		$('.custom_info').text(name[0].explain);
		
		//推入规格
		//$li5 = $('<li>').text();
		$('.specification_select').text(name[1].specification)
		
		
		//推入商品价格
		$('.custom_price').text(name[0].price);
		$('.fixed_price').text(name[0].price);//页头位置
		
		//展示图片的数量
		var picNum = name[1].picNum;
		
		//获取商品数量
		var shopnum = name[0].num;
		if(shopnum<=0){
			$('.fixed_btn').text('已售罄');
			$('.fixed_btn').addClass('fixed_btn2');
			$('.fixed_btn').removeClass('fixed_btn1');
			
			//左下方的大按钮
			$('.add_cart').css('display','none');
			$('.immed_Buy').css('display','none');
			$('.shopover').css('display','block');
		}else{
			$('.fixed_btn').text('加入购物车');
			$('.fixed_btn').addClass('fixed_btn1');
			$('.fixed_btn').removeClass('fixed_btn2');
			
			//左下方的大按钮 根据商品数量 判断 加入购物车 现在购买 还是 已售罄
			$('.add_cart').css('display','block');
			$('.immed_Buy').css('display','block');
			$('.shopover').css('display','none');
		}
		
		//将图片推入展示区域
		for(var i=0; i<picNum; i++){
			var $li1 = $('<li>');
			var $li2 = $('<li>');
			
			var PathStr = 'date.'+goodsId+'[1].details0_path'+i;
			var Path = eval(PathStr);
			
			var $img1 = $('<img>').attr("src",Path);
			var $img2 = $('<img>').attr("src",Path);
			
			$img1.appendTo($li1);
			$img2.appendTo($li2);
			
			$li1.appendTo($('.picwrap ul'));
			$li2.appendTo($('.picThumb'));
		}
		
		//点击颜色块 查看商品
		var colNum = name[1].colNum;
		for(var n=0; n<colNum; n++){
			//获取颜色
			var colStr = 'date.'+goodsId+'[1].colSlect'+n;
			var colSlect = eval(colStr);
			
			var $li4 = $('<li>');
			var $img4 = $('<img>').attr("src",colSlect);
			
			$img4.appendTo($li4);
			$li4.appendTo($('.color_select'));
		}

		$('.color_select li').each(function(index){
			$(this).on('click',function(){
				$('.picwrap ul').empty();
				$('.picThumb').empty();
				$('.img_wrap').empty();
				
				//选择不同颜色时，将第一张图片推入页头
				var PathStr1 = 'date.'+goodsId+'[1].details'+index+'_path0';
				var Path1 = eval(PathStr1);
				var $img3 = $('<img>').attr("src",Path1);
				$img3.appendTo($('.img_wrap'));
				
				for(var i=0; i<picNum; i++){
					
					var $li1 = $('<li>');
					var $li2 = $('<li>');
					
					var PathStr = 'date.'+goodsId+'[1].details'+index+'_path'+i;
					var Path = eval(PathStr);
					
					var $img1 = $('<img>').attr("src",Path);
					var $img2 = $('<img>').attr("src",Path);
					
					$img1.appendTo($li1);
					$img2.appendTo($li2);
					
					$li1.appendTo($('.picwrap ul'));
					$li2.appendTo($('.picThumb'));
				}
				
				
				imgAlternate();
				
				
				
			});
			
			imgAlternate();

		});
		

		
		//产品信息图片的数量
		var img_info_num = name[1].img_info_num;
		//推入 产品信息图片
		for(var j=0; j<img_info_num; j++){
			var PathStr = 'date.'+goodsId+'[1].img_info'+j;
			var Path = eval(PathStr);
			var $img = $('<img>').attr("src",Path);
			$img.appendTo($('.img_info'));
		}
		
	});	
			
	//图片展示的选项卡函数
	function imgAlternate(){
		$('.picwrap ul li').each(function(index){
			$(this).on('click',function(event){
				event.preventDefault();
				
				$('.picwrap ul li').removeClass('imglist_active');
				$(this).addClass('imglist_active');
				
				$('.picThumb li').each(function(){
					$('.picThumb li').css('display','none');
					$('.picThumb li').eq(index).fadeIn();
				});
			});
		});	
	}
	
	
	
	$('#shoppingcart').hover(
		function(){
			$('.empty_cart').css('display','block');
		},
		function(){
			$('.empty_cart').css('display','none');
		}
	);
	
	
	//固定定位的商品展示
	$(window).on("scroll",function() {
		var $scrolltop = $(window).scrollTop();
		
		if($scrolltop>600){                   
			$('.back_top').fadeIn();  
		}else{
			$('.back_top').fadeOut();     
		}
		
		if($scrolltop>600){                   
			$('.fixed_nav').fadeIn();  
		}else{
			$('.fixed_nav').fadeOut();     
		}
	});
	
	
	//主页 回到顶部
	$('.back_top').on("click",function(){
        $('body,html').animate({scrollTop:0},1000);  
	});
	
	
	
	//商品数量点击增减 
	$('.cut_num').on('click',function(){
		var s = $('.input_num').val();
		s--;
		$('.input_num').val(s);
		if(s<=1){
			$('.input_num').val(1);
			$(this).addClass('acc');
		}else{
			$(this).removeClass('acc');
		}
	});
	$('.cut_num').hover(function(){
		var s = $('.input_num').val();
		if(s<=1){
			$(this).addClass('acc');
		}else{
			$(this).removeClass('acc');
		}
	});
	
	$('.add_num').on('click',function(){
		var s = $('.input_num').val();
		s++;
		$('.input_num').val(s);
		if(s>=10){
			$('.input_num').val(10);
			$(this).addClass('acc');
		}else{
			$(this).removeClass('acc');
		}
	});
	
	$('.add_num').hover(function(){
		var s = $('.input_num').val();
		if(s>=10){
			$(this).addClass('acc');
		}else{
			$(this).removeClass('acc');
		}
	});
	

	$('.input_num').blur(function(){
		var nums = $('.input_num').val();
		if(nums !==1||2||3||4||5||6||7||8||9||10){
			$('.input_num').val(1);
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
