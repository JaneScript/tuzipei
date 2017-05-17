$(function() {
	/********加载公共头部和尾部方法********/
	$('#header').load('./common/header.html',function() {
		$('.header').children('img').attr('src', '../../../public/static/images/selection-bg.png');
	})
	$('#footer').load('./common/footer.html')
	
    /********分页********/
   	var dataList = article_selection_data  //article_selection_data 是js引入的静态数据文件；
	var StoragePage = 1; //储存上一个页码
	//展示上一次浏览的页面
	if(sessionStorage.getItem('page_selection')) {
		StoragePage = sessionStorage.getItem('page_selection');
	}
	getPageData(StoragePage);//获取文章数据
    //分页初始化
	$("#page").initPage(4, StoragePage, function(page) {//参数：页码数量，展示page顺序，点击分页按钮执行的方法)
		sessionStorage.setItem("page_selection",page);//储存当前页码
    	getPageData(page);//获取文章数据
   	});	
	
	/********阅读全文click事件********/
	$('.main-content').on('click', '.read', function() {
		var index = $(this).parents('dl').index();
		var page = 1;
		if(sessionStorage.getItem('page_selection')) {
			page = sessionStorage.getItem('page_selection');
		}
		localStorage.setItem("article_content", dataList['page'+page][index].article_content);
		localStorage.setItem("header_img",'selection-bg');
		location.href = 'detail.html';
	})
	
	function getPageData(index) {
		$('.main-content').html('');
		var data = dataList['page'+index];
		
		for(var i=0; i<data.length; i++) {
			$('.main-content').append(
				'<dl>'+
					'<dt>'+
						'<img src='+data[i].article_thumbnail+'>'+
					'</dt>'+
					'<dd>'+
						'<h3>'+data[i].article_title+'</h3>'+
						'<p>'+data[i].article_brief+'</p>'+
						'<div class="_data">'+
							'<span class="public-num">公众号</span>'+
							'<span class="date">'+data[i].article_publish_time+'</span>'+
	//						'<span class="share">点赞(2134)</span>'+
	//						'<span class="comments">阅读(3423)</span>'+
							'<span class="read">阅读全文</span>'+
						'</div>'+
					'</dd>'+
				'</dl>'
			)
		}
	}
})
	

