$(function(){
	
	//获得与失去焦点是输入框边框颜色的变化
	$('input').each(function(){
		$(this).focus(function(){
			$(this).parent().css('borderColor','#608AF1');
			$(this).prev().css('display','none');
		});
		$(this).blur(function(){
			$('input').parent().css('borderColor','');
			$(this).prev().css('display','block');
		});
	});
	
	//密码框的文字提示
	$('#passwords').focus(function(){
		$('.pwTip1').css('display','block');
	});
	$('#passwords').blur(function(){
		$('.pwTip1').css('display','none');
	});
	
	
	$('#passwordAgain').focus(function(){
		$('.pwTip2').css('display','block');
	});
	$('#passwordAgain').blur(function(){
		$('.pwTip2').css('display','none');
	});
	
	var codes = NaN;		//短信验证码
	var account_switch = false; //手机账号开关
	var code_switch = false;	//验证码开关
	var note_switch = false;	//短信验证码开关
	var mail_switch = false;	//邮箱验证开关
	var passwords_switch = false;	//密码验证开关
	var passwordAgain_switch = false;	//重复密码验证开关
	var agree_switch = false;	//同意协议开关
	// 账号的验证
    $("#account").blur(function(){  
        reg=/^1(3|4|5|7|8)\d{9}$/;//验证手机正则(输入前7位至11位)  
  
        if( $(this).val()==""){  
        	$(this).parent().css('borderColor','#d16d62');
   			$(this).next().next().text("请输入手机号");  
            $(this).next().next().css("display","block");
            $(this).next().next().next().css("display","none");
            account_switch = false;
        }else if(!reg.test($("#account").val())){  
        	$(this).parent().css('borderColor','#d16d62');
            $(this).next().next().text("手机号码格式错误");  
           	$(this).next().next().css("display","block");
           	$(this).next().next().next().css("display","none");
           	$(this).prev().css('display','none');
           	account_switch = false;
           	
        }else{  
            $(this).next().next().css("display","none"); 
            $(this).next().next().next().css("display","block");
            $(this).prev().css('display','none');
            account_switch = true;
        }   
    });
	
	
	
	//验证码栏失去焦点  
    $("#val").blur(function(){  
  
        var code1 =$("#val").val().toLowerCase(); 
		var code2 = $('.verification_code img').attr('code').toLowerCase(); 

        if(code1!=code2){  
        	$(this).parent().css('borderColor','#d16d62');
        	$(this).next().text("验证码有误");  
            $(this).next().css("display","block");  
            $(this).next().next().css("display","none");
            $(this).prev().css('display','none');
            code_switch = false;
        }else{  
        	$(this).next().css("display","none"); 
        	$(this).next().next().css("display","block");
        	$(this).prev().css('display','none');
        	code_switch = true;
        }
        if( $(this).val()==""){  
        	$(this).parent().css('borderColor','#d16d62');
            $(this).next().text("验证码为空");  
            $(this).next().css("display","block"); 
            $(this).next().next().css("display","none");
            code_switch = false;
        } 
    }); 
	

	//短信验证码栏失去焦点  
	$("#msVal").blur(function(){  
		
  		var notecode1 =  $('#msVal').val();
        var notecode2 = codes;

        if(notecode1!=notecode2){ 
        	$(this).parent().css('borderColor','#d16d62');
        	$(this).next().text("短信验证有误");  
            $(this).next().css("display","block");  
            $(this).next().next().css("display","none");
            $(this).prev().css('display','none');
            note_switch = false;
        }else{  
        	$(this).next().css("display","none"); 
        	$(this).next().next().css("display","block");
        	$(this).prev().css('display','none');
        	note_switch = true;
        }
        if( $(this).val()==""){  
        	$(this).parent().css('borderColor','#d16d62');
            $(this).next().text("短信验证为空");  
            $(this).next().css("display","block"); 
            $(this).next().next().css("display","none");
            note_switch = false;
        }
   
    }); 
    
    
    
    //邮箱输入框失去焦点
    $("#mail").blur(function(){
    	reg=/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    	
    	if( $(this).val()==""){  
        	$(this).parent().css('borderColor','#d16d62');
   			$(this).next().text("请输入邮箱");  
            $(this).next().css("display","block");
            $(this).next().next().css("display","none");
            mail_switch = false;
        }else if(!reg.test($("#mail").val())){  
        	$(this).parent().css('borderColor','#d16d62');
            $(this).next().text("邮箱格式错误");  
           	$(this).next().css("display","block");
           	$(this).next().next().css("display","none");
           	$(this).prev().css('display','none');
           	mail_switch = false;
           	
        }else{  
            $(this).next().css("display","none"); 
            $(this).next().next().css("display","block");
            $(this).prev().css('display','none');
            mail_switch = true;
        } 

    });
    
   
    
    
    //密码的验证
 	$("#passwords").blur(function(){
 		reg=/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,12}$/;  
 		
 		 if( $(this).val()==""){
 		 	$(this).parent().css('borderColor','#d16d62');
 		 	$(this).next().text("密码不能为空");  
           	$(this).next().css("display","block");
           	$(this).next().next().css("display","none");
           	passwords_switch = false;
           	
 		 } else if(!reg.test($("#passwords").val())){  
        	$(this).parent().css('borderColor','#d16d62');
        	$(this).next().text("密码格式错误"); 
            $(this).next().css("display","block"); 
            $(this).next().next().css("display","none"); 
			passwords_switch = false;
       }else{  
            $(this).next().css("display","none");
            $(this).next().next().css("display","block");  
            passwords_switch = true;
        } 
 	});
    
    
    
    //重复密码失去焦点  
    $("#passwordAgain").blur(function(){  
        var pwd1=$('#passwords').val();  
        var pwd2=$(this).val();  
        if($(this).val() == "" && pwd1 == "" ){ 
        	passwordAgain_switch = false;
            return; 
        }else if(pwd1!=pwd2){
        	passwordAgain_switch = false;
        	$(this).parent().css('borderColor','#d16d62');
            $(this).next().text("两次密码输入不一致");  
            $(this).next().css("display","block"); 
            $(this).next().next().css("display","none");   
        }  
        else{  
        	passwordAgain_switch = true;
            $(this).next().css("display","none");
            $(this).next().next().css("display","block"); 
        }  
    }); 
    
    var agree_btn = false;
    $('.register-agree').click(function(){
    	agree_btn = !agree_btn;
    	if(agree_btn){
    		$('.agree').addClass("agree2");
    		agree_switch = true;
    	}else{
    		$('.agree').removeClass("agree2");
    		agree_switch = false;
    	}
    	
    });

    
    //更换短信验证码
    $('.change_notecode').click(function(){
		changeCodenote();
	});
	

	//注册按键
	$('.register-btn').click(function(){
		if(account_switch==true&&code_switch==true&&note_switch==true&&mail_switch==true&&passwords_switch==true&&passwordAgain_switch==true&&agree_switch==true){
			
			//注册成功出现提示
			var popNotice = function() {
		        if (Notification.permission == "granted") {
		            var notification = new Notification("锤子科技", {
		                body: "注册成功！正在跳转至主页...",
		                icon: '../images/public/favicon.ico'
		                
		            });
		            
		            notification.onclick = function() {  
		                notification.close();   
		            };
		            
		            setTimeout(function(){
		            	notification.close();
//		            	window.location.href="../online-mall.html";
						window.open('../online-mall.html#200','_blank');
		            },3000);
		        }    
		    };

	        if (Notification.permission == "granted") {
	            popNotice();
	        } else if (Notification.permission != "denied") {
	            Notification.requestPermission(function (permission) {
	              popNotice();
	            });
	        }	
	        

	        //注册成功 将账号 邮箱 密码 放入LocalStorage**************************************

		    var Laccount = $("#account").val(); 
			var Lmail = $("#mail").val() ; 
			var Lpasswords = $("#passwords").val(); 
		    
		    
			//*************	电话号码加密	******************************
			var Pnum = Number(Laccount)*5.3946;
			
			//*************	邮箱加密	*********************************
			//var C ="锤";
			//var Ccode = C.charCodeAt();//38180
			//邮箱字符串转化为数组
			//数组转化为字符串时用“锤”字隔开
			//插入"锤"字后的数组
			var Carr = Lmail.split("").join("锤").split("");	//["5", "锤", "5", "锤",  ...]	
			
			var Estr = '';	
			for(var i=0;i<Carr.length;i++){	//将数组中的元素顺序转化为Unicode，并拼接在一起
				var h = Carr[i].charCodeAt();
				var s = String(h);
				Estr+=s;
				
			}
			//console.log(Estr);	//邮箱加密后，即将推入数据库
			
			//*************	密码加密	**********************************
			
			var Pwarr = Lpasswords.split("").join("子").split("");
			
			var Pwstr = '';	
			for(var i=0;i<Pwarr.length;i++){	//将数组中的元素顺序转化为Unicode，并拼接在一起
				var Pwcode = Pwarr[i].charCodeAt();
				var sPwcode = String(Pwcode);
				Pwstr+=sPwcode;
				
			}
			//console.log(Pwstr);	//密码加密后的数字串
		
			//*************	将加密后的数据推入数据库	*******************
			var userInfo=[
				{
					userNames: "Smartisan User",
					userPhone: Pnum,
					userEmail: Estr,
					userPword: Pwstr
					
				}
			];
			//JSON.stringify() 方法可以将任意的 JavaScript 值序列化成 JSON 字符串
			var userInfoString=JSON.stringify(userInfo);
			//console.log(userInfoString);
			
			//JSON.parse() 方法将一个 字符串解析成一个 JSON 对象
			var outputuserInfo=JSON.parse(userInfoString);
			console.log(outputuserInfo)
			
			
		//************************	解释加密后的数据	***********************************	
			//将电话解释出来
			var phone = outputuserInfo[0].userPhone/5.3946;
			console.log(phone);
			
			
			
			//将邮箱解释出来
			var Enum = outputuserInfo[0].userEmail;
			var Euni = Enum.split("38180");
			//console.log(Euni);	//出掉“锤”字后的电话号码 Unicode数组
			var Email ="";
			for(var j=0;j<Euni.length;j++){
				var rr = Euni[j];
				var cc = String.fromCharCode(rr)
				Email+=cc;
		
			}
			console.log(Email);
			
			
			
			//将密码解释出来
			var Pwnum = outputuserInfo[0].userPword;
			var Pwuni = Pwnum.split("23376");
			//console.log(Pwuni);	//出掉“子”字后的电话号码 Unicode数组
			var password ="";
			for(var y=0;y<Pwuni.length;y++){
				var ff = Pwuni[y];
				var zz = String.fromCharCode(ff)
				password+=zz;
			}
			//将密码解释出来
			console.log(password);
//******************************************************************************	        
	            
		}else{
			var popNotice = function() {
		        if (Notification.permission == "granted") {
		            var notification = new Notification("锤子科技", {
		                body: "注册信息未完成！",
		                icon: '../images/public/favicon.ico'
		                
		            });
		            
		            notification.onclick = function() {  
		                notification.close();   
		            };
		            
		            setTimeout(function(){
		            	notification.close();
		            },2000);
		        }    
		    };

	        if (Notification.permission == "granted") {
	            popNotice();
	        } else if (Notification.permission != "denied") {
	            Notification.requestPermission(function (permission) {
	              popNotice();
	            });
	        }
		}
	})
	
	
	
	
	
	//更换图片验证码
	changeCodeimg();//页面打开时先运行一次
	$(".gray_layer").click(function(){
		$('#huanimg').addClass("rotateimg");
	});
	$(".gray_layer").mouseup(function(){
		$('#huanimg').removeClass("rotateimg");
		var timer = setInterval(function(){
			changeCodeimg();
			clearInterval(timer);
		},1000);
		
	})
	
	//遮罩层的出现于隐藏
	$(".gray_layer").hover(
		function(){
			$('.gray_layer_center').css("display","block");
		},
		function(){
			$('.gray_layer_center').css("display","none");
		}
	);
	
	
	
	
	
	function changeCodeimg(){
		var arr=[
			'<img src="../images/code/1.png" code="wyhj" />',
			'<img src="../images/code/2.png" code="1t3z" />',
			'<img src="../images/code/3.png" code="ax9r" />',
			'<img src="../images/code/4.png" code="zpcr" />',
			'<img src="../images/code/5.png" code="pbnf" />',
			'<img src="../images/code/6.png" code="uz3j" />',
			'<img src="../images/code/7.png" code="wilr" />',
			'<img src="../images/code/8.png" code="ub1s" />',
			'<img src="../images/code/9.png" code="4bpm" />',
			'<img src="../images/code/10.png" code="16kc" />',
			'<img src="../images/code/11.png" code="x3bb" />',
			'<img src="../images/code/12.png" code="t2mm" />',
			'<img src="../images/code/13.png" code="sxaq" />',
			'<img src="../images/code/14.png" code="ox14" />',
			'<img src="../images/code/15.png" code="wbaw" />',
			'<img src="../images/code/16.png" code="c8ch" />',
			'<img src="../images/code/17.png" code="kvk9" />',
			'<img src="../images/code/18.png" code="pxnz" />',
			'<img src="../images/code/19.png" code="nkcx" />',
			'<img src="../images/code/20.png" code="9lmx" />',
			'<img src="../images/code/21.png" code="qx2p" />',
			'<img src="../images/code/22.png" code="mjwz" />',
			'<img src="../images/code/23.png" code="8j2g" />',
			'<img src="../images/code/24.png" code="szun" />',
			'<img src="../images/code/25.png" code="4ksb" />',
			'<img src="../images/code/26.png" code="zn44" />'		
		];
		var i = parseInt(Math.random()*25)+1;
		$(".verification_code").html(arr[i]);
	}
	
	
	//获取短信验证码
	function changeCodenote(){
		if (window.Notification) {
		   	var code = parseInt(Math.random()*899999)+100000;
		   	codes = code;
		    var popNotice = function() {
		        if (Notification.permission == "granted") {
		            var notification = new Notification("锤子科技", {
		                body: '验证码：'+code,
		                icon: '../images/public/favicon.ico'
		                
		            });
		            
		            notification.onclick = function() {  
		                notification.close();   
		            };
		            setTimeout(function(){
		            	notification.close();
		            },6000);
		        }    
		    };

	        if (Notification.permission == "granted") {
	            popNotice();
	        } else if (Notification.permission != "denied") {
	            Notification.requestPermission(function (permission) {
	              popNotice();
	            });
	        }
		   	
		} else {
		    alert('浏览器不支持Notification');    
		}
		
	}
	
	
	
	
	
	
	

});
