function getList(t){var a="";a=getAjax("GET","http://203.110.178.189:8090/weixin.php?check=getlist",{page:t,limit:5});var e=a.data.length;if(e){$(".main-content").html("");for(var n=0;n<e;n++)$(".main-content").append("<dl><dt><img src="+a.data[n].article_thumbnail+"/></dt><dd><h3>"+a.data[n].article_title+"</h3><p>"+a.data[n].article_brief+'</p><div class="_data"><span class="public-num">公众号</span><span class="date">'+a.data[n].article_publish_time+'</span><span class="read">阅读全文</span></div></dd></dl>')}return a}function getAjax(t,a,e){var n="";return $.ajax({type:t,url:a,data:e,async:!1,beforeSend:function(){console.log("loading...")},success:function(t){var t=JSON.parse(t);"0"==t.err&&(n=t)},error:function(t){console.log(t)}}),n}$(function(){$("#header").load("./common/header.html",function(){$(".header").children("img").attr("src","../../../public/static/images/china-road-bg.png")}),$("#footer").load("./common/footer.html");var t=1;sessionStorage.getItem("page")&&(t=sessionStorage.getItem("page"));var a=getList(t);$("#page").initPage(a.totalpages,t,function(t){sessionStorage.setItem("page",t),a=getList(t)}),$(".main-content").on("click",".read",function(){var t=$(this).parents("dl").index();localStorage.setItem("article_content",a.data[t].article_content),localStorage.setItem("header_img","china-road-bg"),location.href="detail.html"})});