
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));


/*********************************************	cookie	*****************************************/




//购物车
var Cart = function () {
		this.Count = 0;// 购买的商品数量
		this.Total = 0;// 总计金额
		this.Items = new Array();// 购买的商品
};
//购物车集合对象
var CartItem = function () {
  	this.Id = 0; // 商品ID
  	this.Name = "";// 商品名称
  	this.Count = 0;// 购买数量
  	this.Price = 0;// 单价
  	this.imgPath="";// 商品图片路径
};
  
//购物车操作
var CartHelper = function () {
  	this.cookieName = "myCart";
  
  	this.Clear = function () {
    		var cart = new Cart();
    		this.Save(cart);
    		return cart;
  	};
  
  //向购物车添加
  this.Add = function (id, name, count, price, imgPath) {
    	var cart = this.Read();
    	var index = this.Find(id);
    	//如果ID已存在，覆盖数量
    	if (index > -1) {
      		var oldCount = cart.Items[index].Count;
      		var newCount = Number(oldCount) + Number(count);
      		cart.Items[index].Count = newCount;
      		cart.Total += (((cart.Items[index].Count * 100) * (cart.Items[index].Price * 100)) / 10000);
    	} else {
     		 var item = new CartItem();
      		item.Id = id;
      		item.Name = name;
      		item.Count = count;
      		item.Price = price;
      		item.imgPath = imgPath;
      
      		cart.Items.push(item);
      		cart.Count++;
      		cart.Total += (((cart.Items[cart.Items.length - 1].Count * 100) * (cart.Items[cart.Items.length - 1].Price * 100)) / 10000);
   		}
    	this.Save(cart);
    	return cart;
  };
  
  //改变数量
  this.Change = function (id, count) {
    	var cart = this.Read();
    	var index = this.Find(id);
    	cart.Items[index].Count = count;
    	this.Save(cart);
    	return cart;
  };
  
  //移出购物车
  this.Del = function (id) {
    	var cart = this.Read();
    	var index = this.Find(id);
    	if (index > -1) {
      		var item = cart.Items[index];
      		cart.Count--;
      		cart.Total = cart.Total - (((item.Count * 100) * (item.Price * 100)) / 10000);
      		cart.Items.splice(index, 1);
      		this.Save(cart);
    	}
    	return cart;
  };
  
  //根据ID查找
  this.Find = function (id) {
    	var cart = this.Read();
    	var index = -1;
    	for (var i = 0; i < cart.Items.length; i++) {
      		if (cart.Items[i].Id == id) {
        			index = i;
      		}
    	}
    	return index;
  };
  
  //COOKIE操作
  this.Save = function (cart) {
    	var source = "";
    	for (var i = 0; i < cart.Items.length; i++) {
      		if (source != "") { source += "|$|"; }
      				source += this.ItemToString(cart.Items[i]);
    			}
    			$.cookie(this.cookieName, source, {expires:7});
  		};
  
  		this.Read = function () {
    			//读取COOKIE中的集合
    			var source = $.cookie(this.cookieName);
    			var cart = new Cart();
    			if (source == null || source == "") {
     					 return cart;
    			}
    			var arr = source.split("|$|");
    			cart.Count = arr.length;
    			for (var i = 0; i < arr.length; i++) {
      				var item = this.ItemToObject(arr[i]);
      				cart.Items.push(item);
      				cart.Total += (((item.Count * 100) * (item.Price * 100)) / 10000);
    			}
    			return cart;
  		};
  		this.ItemToString = function (item) {
    			return item.Id + "||" + escape(item.Name) + "||" + item.Count + "||" + item.Price + "||" + item.imgPath;
  		};
  
  	this.ItemToObject = function (str) {
  	  	var arr = str.split('||');
  	 	 	var item = new CartItem();
  	 	 	item.Id = arr[0];
  	  	item.Name = unescape(arr[1]);
  	  	item.Count = arr[2];
  	  	item.Price = arr[3];
  	  	item.imgPath = arr[4];
  	  	return item;
  	};
};


/*************************************************	所有操作 	******************************************************/

$(function () {				
	// 创建购物车
	$(window).on("load", function () {
		loadCart();	

	});
	
		
	//点击加入购物车按钮	
	$('.btn_2').each(function(){
		$(this).on('click',function(event){
			if($(this).hasClass('add_cart')){	//如果是加入购物车按钮
				//获取商品id
				var id = $(this).parent().attr('code');
				//获取商品名
				var goodsName =$(this).parent().parent().children(".info").find('.titlename').text();
				//主页商品点击加入购物车时商品数量默认为1，之后数量可在购物车中修改
				var count = 1;
				//获取商品价格
				var price =	$(this).parent().parent().children(".price_area").find('.price').text();;
				//获取图片路径
				var imgPath = $(this).parent().parent().children("#img_wrap").find('img').attr("src");
				
				// 写购物车到cookie中
				new CartHelper().Add(id, goodsName, count, price, imgPath);
				// 加载购物车中的数据
				loadCart();	
				

				//点击加入购物车 飞入效果
				var offset = $(".shoppingcart").offset();
				var flyer = $('<img class="u-flyer" src="'+imgPath+'">');
				flyer.fly({
					start: {
						left: event.clientX,
						top: event.clientY
					},
					end: {
						left: offset.left+10,
						top: offset.top-200,
						width: 0,
						height: 0
					}
					
				});
				
	
			}
		});
	});
	
	
	
	
	// 加载购物车中的商品
	function loadCart() {
		var carts = new CartHelper().Read();// 读取购物车中的数据
		$(".all_shop_wrap").children().remove();	//（主页购物车显示）刷新时清除之前的信息 防止多次刷新 内容重复写入
		$('.cart_shop_wrap').children().remove();	//购物车页面 数据刷新清除之前信息 作用同上
		$('.order_all_price').text('商品总计：￥'+(carts.Total+15).toFixed(2));	//提交订单页面
		// 加载到页面上
		/******************* 加载购买商品信息 BEGIN***********************/
		$.each(carts.Items, function(index,cartItem) {
			// console.log(index + "---" + cartItem);
			// console.log(value);	
			updateCartPage(cartItem.Id, cartItem.Name, cartItem.Count, cartItem.Price, cartItem.imgPath);
		});
		/******************* 加载购买商品信息 END***********************/
		// 加载购物结算信息
		$(".cart_empty_num").text(carts.Count);	//购买商品种类
		$(".allprice").text(carts.Total.toFixed(2));			//主页显示总价格
		$(".allshopprice").text('￥'+carts.Total.toFixed(2));	//购物车显示总价格
		$('.order-total-line').text('商品总计：￥'+carts.Total.toFixed(2));	//提交订单页面
		//判断是否是从注册页面跳转够来的页面 如果是 才能进入购物车 否则按钮半透明 没有点击事件
		var regsterSign = location.hash;
		var succeed = regsterSign.slice(1);	//200
		
		if(succeed!=200){
			$('.go_shopcart').css('opacity','.45');
		}else if(succeed==200){
			$('.go_shopcart').css('opacity','1');
		}
		
		$('.go_shopcart').click(function(){
			if(succeed==200){
				//window.location.href="html/shoppingCart.html";
				window.open('html/shoppingCart.html','_blank');
			}
		});
		
		
		//删除购物车商品
		$('.all_shop_wrap .cancel').each(function(index){
			$(this).on('click',function(){
				var id = $(this).text();
				new CartHelper().Del(id);
				loadCart();
			});
		});
		
		
		//删除购物车页面商品
		$('.cart_shop_wrap .cutshop').each(function(index){
			$(this).on('click',function(){
				var id = $(this).text();
				new CartHelper().Del(id);
				loadCart();
			});
		});
		
		$('.cutnum').on('click',function(){
			var aaa = $(this).next().val();
			//loadCart();
			
		});
		
		//购物车页面 加数量
		$('.addnum').on('click',function(){
			var num = $(this).prev().val();
			num++;
			$(this).prev().val(num);
			if($(this).prev().val()>10){
				$(this).prev().val(10);
				$(this).addClass('addstyle');
			}else{
				var id = $(this).parent().next().next().text();
				var count=$(this).prev().val();
				console.log()
				new CartHelper().Change(id,count);
				loadCart();
			}
		});	
		$('.addnum').hover(function(){
			if($(this).prev().val()>10){
				$(this).prev().val(10);
				$(this).addClass('addstyle');
			}else{
				$(this).removeClass('addstyle');
			}
		});
		
		
		
		
		
		//购物车页面 减数量
		$('.cutnum').on('click',function(){
			var num = $(this).next().val();
			num--;
			$(this).next().val(num);
			if($(this).next().val()<1){
				$(this).next().val(1);
				$(this).addClass('addstyle');
			}else{
				var id = $(this).parent().next().next().text();
				var count=$(this).next().val();
				console.log()
				new CartHelper().Change(id,count);
				loadCart();
			}
		});	
		$('.cutnum').hover(function(){
			if($(this).next().val()<1){
				$(this).next().val(1);
				$(this).addClass('addstyle');
			}else{
				$(this).removeClass('addstyle');
			}
		});
		
		$('.numinput').blur(function(){
			if($(this).val()!=1||2||3||4||5||6||7||8||9||10){
				$(this).val(1)
			}
		});
		
			
	}


	

	//********************** 更新主页购物车	 ************************
	function updateCartPage(id, goodsName, count, price, imgPath) {
		$('.cart_empty_num').text(count)
		$('.cart_empty_num').css('background','#cb5959');

		$('.empty_cart').addClass('mall_shop_cart');
		$('.btnwrap').css('display','block');
		
		//主页显示购物车情况
		$item = $('<div>').addClass('item');	//最外层包裹
		
		//创建图片
		$imgdiv = $('<div>').addClass('imgdiv');	//图片包裹
		$img1 = $("<img class='mallimg'>").attr("src",imgPath);
		$img2 = $("<img class='detailimg'>").attr("src",'../'+imgPath);
		$img1.appendTo($imgdiv);	//图片放入包裹层
		$img2.appendTo($imgdiv);			

		
		$center_info = $('<div>').addClass('center_info');//信息外层包裹
		$center_title = $('<a>').addClass('center_title').attr("src",'javascript:;').text(goodsName);
		$center_title.appendTo($center_info);
		
		$pricenum = $('<p>').addClass('pricenum');
		$price = $('<span>').addClass('price').text('￥'+price);
		
		$num = $('<span>').addClass('num').text('X '+count);
		
		//价格与该商品加入购物车数量信息
		$price.appendTo($pricenum);
		$num.appendTo($pricenum);
		$pricenum.appendTo($center_info);
		
		//创建删除按钮
		$cancel = $('<div>').addClass('cancel').text(id);
		
		
		$cancel.appendTo($item);
		$imgdiv.appendTo($item);			//被包裹的图片插入到最外层包裹
		$center_info.appendTo($item);		//信息外层包裹插入到最外层包裹
		

		$item.appendTo($('.all_shop_wrap'));
		

		//********************	更新购物车页面信息	***********************************
		$shopitem = $("<div class='shopitem'>");	//外层
		
		$chose = $("<i class='chose'>");	//勾选部分
		$chose.appendTo($shopitem);
		
		$imgwrap = $("<div class='imgwrap'>");	//商品图片部分
		$shopimg = $("<img class='shopimg'>").attr("src",'../'+imgPath);
		$shopimg.appendTo($imgwrap);
		$imgwrap.appendTo($shopitem);
		
		$shoptitle = $("<div class='shoptitle'>");	//商品名部分
		$atitle = $("<a href='javascript:;' class='atitle'>").text(goodsName);
		$atitle.appendTo($shoptitle);
		$shoptitle.appendTo($shopitem);
		
		$pricediv = $("<div class='pricediv'>").text('￥'+price);	//价格部分
		$pricediv.appendTo($shopitem);
		
		$shopnum = $("<div class='shopnum'>");	//数量部分
		$cutnum = $("<div class='cutnum'>");	//减 键
		$cutnum.appendTo($shopnum);
		$numinput = $("<input type='text' class='numinput'>").val(count);	//数量输入框
		$numinput.appendTo($shopnum);
		$addnum = $("<div class='addnum'>");	//加 键
		$addnum.appendTo($shopnum);
		$shopnum.appendTo($shopitem);
		
		$countprice = $("<div class='countprice'>").text('￥'+(count*price).toFixed(2));	//一种商品的价格之和
		$countprice.appendTo($shopitem);
		
		$cutshopdiv = $("<div class='countpricediv'>");	//操作 删除商品部分
		$cutshop = $("<i class='cutshop'>").text(id);
		$cutshop.appendTo($cutshopdiv);
		$cutshopdiv.appendTo($shopitem);
		
		$shopitem.appendTo($('.cart_shop_wrap'));	//商品加入购物车页面
		
		
		
		//****************************	更新订单页面信息	***************************
		$goods_item = $("<div class='goods-item'>");	//外包裹
		
		$a = $("<a href='javascript:;' class='item-pic'>");	//图片
		$img = $("<img>").attr("src",'../'+imgPath);	
		$img.appendTo($a);
		$a.appendTo($goods_item);
		
		$item_name = $("<div class='item-name'>");		//商品名
		$title = $("<a href='javascript:;'>").text(goodsName);
		$title.appendTo($item_name);
		$item_name.appendTo($goods_item);
		
		$item_total = $("<div class='item-total'>").text('￥'+(count*price).toFixed(2));
		$item_total.appendTo($goods_item);
		
		$item_number = $("<div class='item-number'>").text(count);	//单个商品的数量
		$item_number.appendTo($goods_item);
		
		$item_price = $("<div class='item-price'>").text('￥'+price);	//商品单价
		$item_price.appendTo($goods_item);
		
		$goods_item.appendTo($('.goods-group'));
	}
	
	
	
	
	
});