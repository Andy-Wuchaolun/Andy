//购物车交互功能
var oCart =document.querySelector('.top .cart')
var oCartBox =document.querySelector('.top .cart-box a')
var oCartContent = document.querySelector('.top .cart-content')
oCart.onmouseenter = function(){
	console.log('aaa')
	oCartBox.style.color = '#ff6700';
	oCartBox.style.backgroundColor = '#fff';
	// oCartContent.style.height = '100px';
	animation(oCartContent,{height:100},true)
}
oCart.onmouseleave = function(){
	oCartBox.style.color = '#b0b0b0';
	oCartBox.style.backgroundColor = '#424242';
	// oCartContent.style.height = '0px';
	animation(oCartContent,{height:0},true)
}



handleCarousel();
handleCate();
handleFlashTimer();
handleFlashPart();


//轮播图
function handleCarousel(){
	function Carousel(options){
		//罗列属性
		this.oBox = document.getElementById(options.id);
		this.aImg = options.aImg;
		this.width = options.width;
		this.height = options.height;
		this.oLeftBtn = null;
		this.oRightBtn = null;
		this.oImgUl = null;
		this.oBtnUl = null;
		this.now = 0;//表示默认显示第一张
		this.autoPlayTime = options.autoPlayTime;//表示轮播时间
		// console.log(this.oBox)
		//初始化Dom节点
		this.init();
		//绑定事件
		this.bindEvent();
		//执行轮播事件
		if(this.autoPlayTime){
			this.auto();
		}
	}
	Carousel.prototype.init = function(){
		//针对最外层大盒子设定基本样式
		this.oBox.style.position = 'relative';
		this.oBox.style.width = this.width + 'px';
		this.oBox.style.height = this.height + 'px';
		//生成图片容器
		this.oImgUl = document.createElement('ul');
		//生成底部按钮容器
		this.oBtnUl = document.createElement('ul');
		//设置底部按钮定位属性
		this.oBtnUl.style.position = 'absolute';
		this.oBtnUl.style.zIndex = 99;
		this.oBtnUl.className = 'bottomBtn'
		for(var i=0;i<this.aImg.length;i++){
			var oLi = document.createElement('li');
			var oImg = document.createElement('img');
			var oBtnLi = document.createElement('li');
			//给每个li元素设置样式
			oLi.style.position = 'absolute';
			oLi.style.top = 0 ;
			oLi.style.left = 0 ;
			//给图片设置大小
			oImg.style.width = this.oBox.offsetWidth + 'px';
			oImg.style.height = this.oBox.offsetHeight + 'px';
			if(i == 0){
				oLi.style.zIndex = 50;
				oLi.style.opacity = 1;
				oBtnLi.className = 'active';
			}else{
				oLi.style.zIndex = 0;
				oLi.style.opacity = 0;
				oBtnLi.className = '';
			}
			oImg.src = this.aImg[i];
			//设置顶部按钮列表居中
			oLi.appendChild(oImg);
			this.oImgUl.appendChild(oLi);
			this.oBtnUl.appendChild(oBtnLi);
		}
		//生成左右按钮
		this.oLeftBtn = document.createElement('span');
		this.oRightBtn = document.createElement('span');
		this.oLeftBtn.className = 'leftBtn';
		this.oRightBtn.className = 'rightBtn';
		//设置按钮的位置属性
		this.oLeftBtn.style.position = 'absolute';
		this.oRightBtn.style.position = 'absolute';
		this.oLeftBtn.style.zIndex = 99;
		this.oRightBtn.style.zIndex = 99;
		this.oLeftBtn.innerHTML = '&lt;'
		this.oRightBtn.innerHTML = '&gt;'
		this.oBox.appendChild(this.oImgUl)
		this.oBox.appendChild(this.oLeftBtn)
		this.oBox.appendChild(this.oRightBtn)
		this.oBox.appendChild(this.oBtnUl)
		// console.log(this.oBtnUl.offsetWidth)
		//设置底部按钮居中
		this.oBtnUl.style.marginLeft = - this.oBtnUl.offsetWidth * 0.5 +'px';
	}
	Carousel.prototype.bindEvent = function(){
		
		var _this = this;
		//右边按钮下一张事件
		this.oRightBtn.onclick = function(){
			_this.now++
			if(_this.now >= _this.oImgUl.children.length){
				_this.now = 0;
			}
			_this.tab();
		}
		//左边按钮上一张事件
		this.oLeftBtn.onclick = function(){
			_this.now--;
			if(_this.now < 0){
				_this.now = _this.oImgUl.children.length -1;
			}
			_this.tab();
		}
		//底部按钮事件
		for(var i=0;i<_this.oBtnUl.children.length;i++){
			_this.oBtnUl.children[i].index = i;
			// console.log(_this.oBtnUl.children.length)
			_this.oBtnUl.children[i].onclick = function(){
				_this.now = this.index;
				_this.tab();
			}
		}
	}
	Carousel.prototype.tab = function(){
		// console.log(this)
		for(var i=0;i<this.oImgUl.children.length;i++){
			this.oImgUl.children[i].style.zIndex = 0;
			this.oImgUl.children[i].style.opacity = 0;
			this.oBtnUl.children[i].className = '';
		}
		this.oImgUl.children[this.now].style.zIndex = 50;
		// this.oImgUl.children[this.now].style.opacity = 1;
		animation(this.oImgUl.children[this.now],{opacity:100},true)
		this.oBtnUl.children[this.now].className = 'active';
	}
	Carousel.prototype.auto = function(){
		// console.log('aaaa')
		var timer = 0;
		var _this = this;
		timer = setInterval(this.oRightBtn.onclick,this.autoPlayTime);
		this.oBox.onmouseover = function(){
			clearInterval(timer)
		}
		this.oBox.onmouseout = function(){
			timer = setInterval(_this.oRightBtn.onclick,_this.autoPlayTime);
		}
	}
	/*
	new Carousel('box',['images/carousel1.jpg','images/carousel2.jpg','images/carousel3.jpg'],800,400);
	*/
	new Carousel({
		id:'carousel',
		aImg:['../../../../school-project/2019-7-14/2019-003-js基础/photo/carousel1.jpg','../../../../school-project/2019-7-14/2019-003-js基础/photo/carousel2.jpg','../../../../school-project/2019-7-14/2019-003-js基础/photo/carousel3.jpg'],
		width:1226,
		height:460,
		autoPlayTime:2000
	})
}
//cate部分
function handleCate(){

}
//倒计时部分
function handleFlashTimer(){
	function to2Str(num){
		return num<10 ?  '0'+num :  ''+num;
	}
	var aTimerNum = document.querySelectorAll('.timer-time .timer-num')
	console.log(aTimerNum)
	function handleTime(){
		var allTime = parseInt((endTime - Date.now())/1000);
		if(allTime<=0){
			allTime=0;
			clearInterval(timer)
		}
		var iHour = parseInt(allTime/3600);
		var iMinute = parseInt((allTime%3600)/60);
		var iSecond = (allTime%3600)%60;
		aTimerNum[0].innerHTML = to2Str(iHour)
		aTimerNum[1].innerHTML = to2Str(iMinute)
		aTimerNum[2].innerHTML = to2Str(iSecond)
	}
	var oTimer = document.getElementById('timer');
	var endDate = new Date('2019-09-14 15:00:00');
	var endTime = endDate.getTime();
	var timer = 0;
	timer = setInterval(handleTime,500);
	handleTime();

}
//flash按钮滑动部分
function handleFlashPart(){
	var aBtn = document.querySelectorAll('.flash .hd .more .iconfont')
	// console.log(aBtn)
	var oUl = document.querySelector('.home .flash .bd .product-list')
	aBtn[0].onclick = function(){
		oUl.style.marginLeft = '0px';
	}
	aBtn[1].onclick = function(){
		oUl.style.marginLeft = '-978px';
	}
}
