$(function(){	
	var $li = $('.rhythm').find('li');
	var $ul = $('.rhythm');
	var liPer = $li.outerWidth()/16; // 将每个li 16 等分
	var positionArr = ["60%","50%","15%","30%","40%","35%","46%"]; // 设置图片初始位置
	var bBtn = true; // 开关
	var windowWid = $(window).outerWidth();
	console.log(windowWid)
	// 设置页面加载时图片的初始位置
	function initMove(){
		$li.find('img').each(function(index){ // 对7张图片遍历
			$li.find('img').eq(index).css({"transform":"translateY("+positionArr[index]+")"});
		})
		
	}
	
	initMove();
	// 鼠标在不同li移动改变图片的高度
	$li.on('mousemove',function(e){
		
		if(bBtn == true){
			var liIndex = $(this).index(); 	
			var imgFloatPer = Math.ceil(e.offsetX/liPer); // 计算鼠标在当前li移动，其他图片的微小改变量			
			move(liIndex,imgFloatPer);
		}
		
	})
	
	// 当鼠标离开容器使图片返回初始位置
	$ul.on('mouseenter mouseleave',function(e){
		
		if(bBtn == true){
			if(e.type=="mouseleave"){
				$li.find('img').each(function(index){ 
					$li.find('img').eq(index).css({"transform":"translateY("+positionArr[index]+")",'transition':'all 0.2s'});
				})
			}else{
				return;
			}
		}else{
			return;
		}
		
	})
	
	// li的点击放大事件
	$li.on('click',function(){
		var liIndex = $(this).index();
		var bigLiWid = $li.outerWidth()*3;
		var moveDistance = (windowWid-bigLiWid)/2;
		console.log($li.outerWidth());
		move(liIndex,8);
		if(bBtn==true){
			if(liIndex<3){
				$ul.css({'transformOrigin':$li.outerWidth()*liIndex+"px"+' 20%','transform':'translateX('+(moveDistance-$li.outerWidth()*liIndex)+'px)'+'scale(3)'});
			}else if(liIndex>3){
				$ul.css({'transformOrigin':$li.outerWidth()*(liIndex+1)+"px"+' 20%','transform':'translateX('+-($li.outerWidth()*(liIndex+1)-(moveDistance+bigLiWid))+'px)'+'scale(3)'});
			}else if(liIndex==3){
				$ul.css({'transformOrigin':'50% 20%','transform':'scale(3)'});
			}
			$('.rhythmTitBox').addClass('rhythmTitFade'); // 标题消失
			//console.log($ul.outerWidth())
		}else{
			$ul.css({'transform':'scale(1)'});
			$('.rhythmTitBox').removeClass('rhythmTitFade');
		}
		bBtn = !bBtn;
		
	})
	
	
	// 创建图片移动函数（宏观移动参数，微观移动参数）
	function move(liIndex,imgFloatPer){
		$li.find('img').each(function(index){ 
			$(this).css({'transition':'all 0.1s'});
			if(index>liIndex){
				if(imgFloatPer>8){
					$li.find('img').eq(index).css({"transform":"translateY("+((parseInt(index)-parseInt(liIndex))*10-(imgFloatPer-8)*1)+"%)"});
				}else{
					$li.find('img').eq(index).css({"transform":"translateY("+((parseInt(index)-parseInt(liIndex))*10+(8-imgFloatPer)*1)+"%)"});
				}				
			}else if(index<liIndex){
				if(imgFloatPer>8){
					$li.find('img').eq(index).css({"transform":"translateY("+((parseInt(liIndex)-parseInt(index))*10+(imgFloatPer-8)*1)+"%)"});
				}else{
					$li.find('img').eq(index).css({"transform":"translateY("+((parseInt(liIndex)-parseInt(index))*10-(8-imgFloatPer)*1)+"%)"});
				}				
			}else if(index==liIndex){
				$li.find('img').eq(index).css({'transform':'translateY(0%)'});
			}
		})
	}
	
	// 图片更换事件
	var srcList1 = [
		'../images/main/backcover-red-medium_3f0005c622.png',
		'../images/main/backcover-orange-medium_36f81aedcc.png',
		'../images/main/backcover-yellow-medium_ab1a170cd0.png',
		'../images/main/backcover-green-medium_f266ac7d0c.png',
		'../images/main/backcover-cyan-medium_582c756831.png',
		'../images/main/backcover-blue-medium_be525c644c.png',
		'../images/main/backcover-purple-medium_38f80813ae.png'
	];
	var srcList2 = [
		'../images/main/img2/backcover-bone-medium_8b93ed5331.png',
		'../images/main/img2/backcover-coffee-medium_74b4b00b9e.png',
		'../images/main/img2/backcover-olive-medium_f4c5a050ea.png',
		'../images/main/img2/backcover-pink-medium_cb63859def.png',
		'../images/main/img2/backcover-rose-medium_a360e85178.png',
		'../images/main/img2/backcover-sand-medium_e9c0f362f2.png',
		'../images/main/img2/backcover-violet-medium_f35bdbd876.png'
	]
	$('.select1').on('click',function(){
		$li.find('img').each(function(i){
			$li.find('img').eq(i).attr({'src':srcList1[i]});
		})
	})
	$('.select2').on('click',function(){
		$li.find('img').each(function(i){
			$li.find('img').eq(i).attr({'src':srcList2[i]});
		})
	})
	
	
	
	
})
