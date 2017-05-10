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
	
	
	/********获取文章数据方法********/
	
	var params = {
		page : 1,
		limit : 10
	}
	getList('GET', 'http://203.110.178.189:8090/weixin.php?check=getlist', params);
	
	function getList(type, url, params) {
		$.ajax({
            type: type,
            url: url,
            data: params,
            beforeSend: function() {
                console.log('loading...');
            },
            
            success: function(res){
            	
        		var res = JSON.parse( res );
        		
        		var len = res.data.length;
        		if(len) {
	        		for(var i=0; i<len; i++) {
	        			console.log(res.data[i].article_title);
	        			$('.main-content').append(
	        				'<dl>'+
								'<dt>'+
									'<img src='+res.data[i].article_thumbnail+'/>'+
								'</dt>'+
								'<dd>'+
									'<h3>'+res.data[i].article_title+'</h3>'+
									'<p>'+res.data[i].article_brief+'</p>'+
									'<div>'+
										'<span class="public-num">公众号</span>'+
										'<span class="date">'+res.data[i].article_publish_time+'</span>'+
//										'<span class="share">点赞(2134)</span>'+
//										'<span class="comments">阅读(3423)</span>'+
									'</div>'+
								'</dd>'+
							'</dl>'
	        			)
	        		}
        		}
        		
        		console.log(res.totalpages)
            },
            
            error: function(res) {
            	console.log('err',res);
            }
       	});
	}
	
})