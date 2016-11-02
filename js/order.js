$(function(){
	/*----------------------------------点击添加地址按钮地址编辑栏以及蒙版出现-----------------------------*/
	$(".od-add").on("click",function(){
		$(".module-dialog-layer").css("display","block");
		$(".module-dialog").css("display","block");
	});
	/*----------------------------------点击关闭按钮地址编辑栏以及蒙版消失-----------------------------*/
	$(".dialog-tit").children("span").on("click",function(){
		$(".module-dialog-layer").css("display","none");
		$(".module-dialog").css("display","none");
	});
	
	/*--------------------------------当输入框获得焦点，父元素的表框变色以及字体消失-------------------*/
	$("input").each(function(){
		$(this).focus(function(){
			$(this).parent().css("border-color","#6b93f2");
			$(this).siblings("i").css("display","none");
		})
	});
	/*--------------------------------当输入框失去焦点，父元素的表框变色以及字体出现-------------------*/
	$("input").each(function(){
		$(this).blur(function(){
			if($(this).val()==""){
				$(this).parent().css("border-color","#e66157");
				$(this).siblings("i").css("display","block");
			}else{
				$(this).parent().css("border-color","#6b93f2");
				$(this).siblings("i").css("display","none");
			}
		})
	});
	
	
	/*--------------------------------------点击保存的时候，输入的内容体现在页面中-------------------------*/
	
	$(".save-btn").on("click",function(){
		var $Name=$(".myname").val(),
			$Phone=$(".myphone").val(),
			$Provice=$("select option:selected").html(),
			$City=$(".city").find("option:selected").val(),
			$Area=$(".dist").val(),
			$top=parseInt($($(".check-item").children("span")).css("backgroundPositionY")),
			$Street=$(".street").val();
		var $li=$("<li class='lists'>"),
		      $div=$("<div class='add-box'>"),
		      $names=$("<div class='names'>"),
		      $tel=$("<div class='tel'>"),
		      $add=$("<div class='add'>");
		      if($top!=0){
					$li.addClass("active");
					$(".active").removeClass("active");
				}
		      $names.html($Name);
		      $tel.html($Phone);
		      $add.html($Provice+$City+$Area+"<br/>"+$Street);
				$div.append($names);
				$div.append($tel);
				$div.append($add);
				$li.append($div);
				$li.insertBefore($(".od-add"));
				$(".module-dialog-layer").css("display","none");
				$(".module-dialog").css("display","none");
				$Name="";
				$Phone="";
				$Provice="";
				$City="";
				$Area="";
				$Street="";
				
	})
	
/*-------------------------------------------------默认地址的选项卡的点击----------------------------------*/	
	$(".check-item").children("span").on("click",function(){
		var $top=parseInt($(this).css("backgroundPositionY"));
		if($top==0){
			$(this).css("background","url(../images/order/checkbox-bg.png) 0 -20px no-repeat");
		}else{
			$(this).css("background","url(../images/order/checkbox-bg.png) no-repeat");
		}
		
	})
	
/*-------------------------------------------验证表单---------------------------------------*/	
	$(".myphone").blur(function(){
	     var $Phone=$(".myphone").val();
	      var flag = false;
	      var myreg =/^1[3|4|5|7|8][0-9]\d{4,8}$/i;       
	      if($Phone == ''){
	       $(".myphone").siblings(".verify-error").show();
	      }else if($Phone.length !=11){
	       $(this).siblings(".verify-error").html("手机格式错误").show();
	      }else if(!myreg.test($Phone)){
	      $(this).siblings("verify-error").html("手机格式错误").show();
	      }else{
	          flag = true;
	      }
	});
	
	
	$(".myname").blur(function(){
		var $Name=$(".myname").val();
		if($Name==""){
			$(this).siblings(".verify-error").show();
		}
	})
	
	
	
	$(".street").blur(function(){
		$Street=$(".street").val();
		if($Street==""){
			$(this).siblings(".verify-error").show();
		}
	})
	
	
	$(".area-number").blur(function(){
		$ANumber=$(".area-number").val();
		if($ANumber.length>4){
			$(this).siblings(".verify-error").show();
		}
	})
	
	$(".phone-number").blur(function(){
		$Pnumber=$(".phone-number").val();
		if($Pnumber.length>8){
			$(this).siblings(".verify-error").show();
		}
	})
	
	
	
	
/*------------------------------------------------发票验证-------------------------------------------------*/	
	$(".radio-btn").on("click",function(){
		$(this).children().addClass("blue-on").parents("lable").siblings("lable").children("a").removeClass("blue-on");
		console.log($(this).children().addClass("blue-on").parents("lable").siblings("lable"))
	})
	
	
	$(".radio-btn2").on("click",function(){
		$(this).children().addClass("blue-on").parents("lable").siblings().children("a").removeClass("blue-on");
		
	})
	
})
