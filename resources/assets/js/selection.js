$(function() {
	/********加载公共头部和尾部方法********/
	$('#header').load('./common/header.html',function() {
		$('.header').children('img').attr('src', '../../../public/static/images/selection-bg.png');
	})
	$('#footer').load('./common/footer.html')
	
    var GG = {//点击分页获取当前的页数值1,2,3,4,5
        "kk":function(mm){
          //alert(mm);
        }
    }
	$("#page").initPage(4,1,GG.kk);
	
	
	
	var data = article_selection_data  //article_selection_data 是js引入的静态数据文件；
	$('.main-content').html('');
	for(var i=0; i<data.length; i++) {
		$('.main-content').append(
			'<dl>'+
				'<dt>'+
					'<img src='+data[i].article_thumbnail+'/>'+
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
	
	/********阅读全文click事件********/
	$('.main-content').on('click', '.read', function() {
		var index = $(this).parents('dl').index();
		localStorage.setItem("article_content", data[index].article_content);
		localStorage.setItem("header_img",'selection-bg');
		location.href = 'detail.html';
	})
	
})
		
