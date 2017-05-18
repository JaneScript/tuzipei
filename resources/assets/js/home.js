
$(function() {
	/********加载公共头部和尾部方法********/
	$('#header').load('./common/header.html',function() {
		$('.header').children('img').attr('src', '../../../public/static/images/home/header-bg.png');
	})
	$('#footer').load('./common/footer.html')
	
	/********鼠标移入移出显示/隐藏二维码********/
	showQRCode();
	
	/********获取文章数据********/
	getList(1,10);
	
})




function showQRCode() {//鼠标移入显示二维码
	var path = ['wechat-logo','weibo-logo','email-logo'];
	var pathActive = ['wechat-logo2','weibo-logo2','email-logo2'];
	$('.qr-code').children('p').mouseover(function() {
		var length = $('.qr-code').children('p').length;
		for (var i=0; i<length; i++) {
			if($(this).index() == 2) {
				$(this).find('img').attr('src','../../../public/static/images/home/'+pathActive[2]+'.png');
				break;
			}
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
			if($(this).index() == 2) {
				$(this).find('img').attr('src','../../../public/static/images/home/'+path[2]+'.png');
				break;
			}
			if($(this).index() == i) {
				$(this).children('img').attr('src','../../../public/static/images/home/'+path[i]+'.png');
				break;
			}
		}
		$(this).children('span').css({
			'display': 'none',
		})
	})
}

function getList(page,limit) {//获取数据后插入文档显示
	var params = {
		page : page,
		limit : limit
	}
	var data = getAjax('GET', 'http://203.110.178.189:8090/weixin.php?check=getlist', params);
	var len = data.data.length;
	if(len) {
		for(var i=0; i<len; i++) {
			if(i < 4) {
				$('.main-content').append(
    				'<dl>'+
						'<dt>'+
							'<img src='+data.data[i].article_thumbnail+'/>'+
						'</dt>'+
						'<dd>'+
							'<h3>'+data.data[i].article_title+'</h3>'+
							'<p>'+data.data[i].article_brief+'</p>'+
							'<div>'+
								'<span class="public-num">公众号</span>'+
								'<span class="date">'+data.data[i].article_publish_time+'</span>'+
//								'<span class="share">点赞(2134)</span>'+
//								'<span class="comments">阅读(3423)</span>'+
							'</div>'+
						'</dd>'+
					'</dl>'
				)
			}
			if(i < 6) {
				$('.hotTitle-right').append(
					'<dl>'+
						'<dt></dt>'+
						'<dd>'+data.data[i].article_title+'</dd>'+
					'</dl>'
				)
			}
		}
		
		$('.main-content , .hotTitle-right').on('click', 'dl', function() {
			var index = $(this).index();
			localStorage.setItem("article_content",data.data[index].article_content);
			localStorage.setItem("header_img",'home/header-bg');
			location.href = 'detail.html';
		})
	}
	
	//点击排行和最新动态事件
	$('.nav-tabs').on('click', 'li', function() {
		
		$(this).children('a').addClass('liActive');
		$(this).siblings().children('a').removeClass('liActive');
		
		var index = $(this).index();
		
		$('.hotTitle-right').html('');
		if(index == 1) {
			for(var i=0; i<len; i++) {
				if(i%2==1 || i==8) {
					$('.hotTitle-right').append(
						'<dl>'+
							'<dt></dt>'+
							'<dd>'+data.data[i].article_title+'</dd>'+
						'</dl>'
					)
				}
			}
		} else if(index == 0) {
			for(var i=0; i<len; i++) {
				if(i < 6) {
					$('.hotTitle-right').append(
						'<dl>'+
							'<dt></dt>'+
							'<dd>'+data.data[i].article_title+'</dd>'+
						'</dl>'
					)
				}
			}
		}
	})
}

function getAjax(type, url, params) {//ajax请求数据
	var result = '';
	$.ajax({
        type: type,
        url: url,
        data: params,
        async: false,
        beforeSend: function() {
            console.log('loading...');
        },
        success: function(res) {
        	var res = JSON.parse(res);
        	if (res.err == "0") {
        		result = res;
        	}
        },
        error: function(res) {
        	console.log(res);
        } 
   });
   	return result;
}