$(function() {
	$('#header').load('./common/header.html',function() {
		$('.header').children('img').attr('src', '../../../public/static/images/ziPeiSay-header-bg.png');
	})
	$('#footer').load('./common/footer.html')
	
	
	var infinite = 0;
	var dataList;
	
	if(localStorage.getItem("wechat-content")) {
		$('.article-tabs').children().eq(1).addClass('tabsActive');
		$('.article-tabs').children().eq(0).removeClass('tabsActive');
		if(infinite == 0) {
			dataList = getList(1);
			infinite++
		}
		$('.weibo-content').css('display','none');
		$('.wechat-content').css('display','block');
	}
	$('.article-tabs').on('click', 'p', function() {
		var index = $(this).index();
		if(!$(this)[0].className) {
			$(this).addClass('tabsActive');
			$(this).siblings().removeClass('tabsActive');
			if(index == 1) {
				//ajax请求的数据；
				if(infinite == 0) {
					dataList = getList(1);
					infinite++
				}
				$('.weibo-content').css('display','none');
				$('.wechat-content').css('display','block');
				localStorage.setItem("wechat-content",'1');
			} else {
				$('.wechat-content').css('display','none');
				$('.weibo-content').css('display','block');
				localStorage.removeItem("wechat-content");
			}
		}
	})
	
	/********阅读全文click事件********/
	$('.article-content').on('click', '.read', function() {
		var index = $(this).parents('dl').index();
		localStorage.setItem("article_content",dataList.data[index].article_content);
		localStorage.setItem("header_img",'ziPeiSay-header-bg');
		location.href = 'detail.html';
	})
})

function getList(page) {//获取数据后插入文档显示
	var data = ''; //ajax请求的数据； 
	var params = {
		page : 1,
		limit : 100
	}
	data = getAjax('GET', 'http://203.110.178.189:8090/weixin.php?check=getlist', params);
	var len = data.data.length;
	if(len) {
		//$('.wechat-content').html('');
		for(var i=0; i<len; i++) {
			$('.wechat-content').append(
				'<dl>'+
					'<dt>'+
						'<img src='+data.data[i].article_thumbnail+'/>'+
					'</dt>'+
					'<dd>'+
						'<h3>'+data.data[i].article_title+'</h3>'+
						'<p>'+data.data[i].article_brief+'</p>'+
						'<div class="_data">'+
							'<span class="public-num">公众号</span>'+
							'<span class="date">'+data.data[i].article_publish_time+'</span>'+
//							'<span class="share">点赞(2134)</span>'+
//							'<span class="comments">阅读(3423)</span>'+
							'<span class="read">阅读全文</span>'+
						'</div>'+
					'</dd>'+
				'</dl>'
			)
		}
		
	}
	return data;
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