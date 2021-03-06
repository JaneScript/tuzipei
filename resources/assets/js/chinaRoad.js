
$(function() {
	/********加载公共头部和尾部方法********/
	$('#header').load('./common/header.html',function() {
		$('.header').children('img').attr('src', '../../../public/static/images/china-road-bg.png');
	})
	$('#footer').load('./common/footer.html')
	
	/********分页********/
	var StoragePage = 1; //储存上一个页码
	//展示上一次浏览的页面
	if(sessionStorage.getItem('page')) {
		StoragePage = sessionStorage.getItem('page');
	}
	//ajax请求的数据；
	var getData = getList(StoragePage);
	//分页初始化
	$("#page").initPage(getData.totalpages, StoragePage, function(page) {//参数：initPage(总共的页码数量，展示page顺序，点击分页按钮执行的方法)
		sessionStorage.setItem("page",page);//储存当前页码
    	getData = getList(page);//获取文章数据
    });
	
	/********阅读全文click事件********/
	$('.main-content').on('click', '.read', function() {
		var index = $(this).parents('dl').index();
		localStorage.setItem("article_content",getData.data[index].article_content);
		localStorage.setItem("header_img",'china-road-bg');
		location.href = 'detail.html';
	})
})



function getList(page) {//获取数据后插入文档显示
	var data = ''; //ajax请求的数据； 
	var params = {
		page : page,
		limit : 5
	}
	data = getAjax('GET', 'http://203.110.178.189:8090/weixin.php?check=getlist', params);
	var len = data.data.length;
	if(len) {
		$('.main-content').html('');
		for(var i=0; i<len; i++) {
			$('.main-content').append(
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