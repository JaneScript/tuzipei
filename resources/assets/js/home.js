$(function() {
	/********加载公共头部和尾部方法********/
	$('#header').load('./common/header.html',function() {
		$('.header').children('img').attr('src', '../../../public/static/images/home/header-bg.png');
	})
	$('#footer').load('./common/footer.html')
	
	/********鼠标移入移出显示/隐藏二维码事件********/
	var path = ['wechat-logo','weibo-logo','email-logo'];
	var pathActive = ['wechat-logo2','weibo-logo2','email-logo2'];
	$('.qr-code').children('p').mouseover(function() {
		var length = $('.qr-code').children('p').length;
		for (var i=0; i<length; i++) {
			if($(this).index() == i) {
				$(this).children('img').attr('src','../../../public/static/images/home/'+pathActive[i]+'.png');
				break;
			}
		}
		$(this).children('span').css({
			'display': 'block',
		})
	})
	$('.qr-code').children('p').mouseout(function() {
		var length = $('.qr-code').children('p').length;
		for (var i=0; i<length; i++) {
			if($(this).index() == i) {
				$(this).children('img').attr('src','../../../public/static/images/home/'+path[i]+'.png');
				break;
			}
		}
		$(this).children('span').css({
			'display': 'none',
		})
	})
	
	
	
	
	
	
	
	
})
