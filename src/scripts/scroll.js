define(function(){
  return{
    init: function(){
      var rowTop = $(".nav-bar").offset().top;
      var nf = $(".plan-l");
      var ulTop = $(".plan-l").offset().top;
      var iTag = $(".plan-r h4");
      var liTag = $(".plan-l li");
      var bdTop = "";
      var dayArr = [];
      var listArr = [];
      var last = 0;
      var wn = 0;
      var direction = null;
      var comp = "";
      // var tabH_og = $(".table_content").height();
      // var tabH = "";
      var isClick = false;
      $(".plan-r > div").each(function(index, element){
        dayArr.push($(".plan-r > div").eq(index).offset().top);
      })
      $(".detail-wrap").each(function(index, element){
        listArr.push($(".detail-wrap").eq(index).offset().top);
      })

      if (window.addEventListener) {
        window.addEventListener('mousewheel',function(event){
          direction = event.deltaY < 0 ? 0 : 1;
        },false);
      }
      else {
        window.attachEvent('mousewheel',function(event){
          direction = event.deltaY < 0 ? 0 : 1;
        },false);
      }

      // window.addEventListener('mousewheel',function(event){
      //   direction = event.deltaY < 0 ? 0 : 1;
      // },false);
      $(window).scroll(function(){
        if(isClick) return;
        // console.log("非点击");
        comp = $(window);
        // tabH = tabH_og - $(".table_content").height();
        bdTop = comp.scrollTop() + 100 + 70 + (direction ? 40 : 0);
        bdTop += last * 40;
        newTop = comp.scrollTop() + 75;
        bdTop >= (rowTop + 100 + 70 + (direction ? 40 : 0)) ? $(".nav-bar").addClass("fixed") : $(".nav-bar").removeClass("fixed")
        // $(".nav-bar").css(bdTop >= (rowTop + 100 + 70 + (direction ? 40 : 0)) ? {"position":"fixed","top":"0","z-index":"999"} : {"position":"static"});
        $(".product-details").css(bdTop >= (rowTop + 100 + 70 + (direction ? 40 : 0)) ? {"margin-top":"82px"} : {"margin-top":"0"});
        // $(".details_list .tableBox").css(bdTop >= (rowTop + 100 + 70 + (direction ? 40 : 0)) ? {"margin-top":"110px","top":"0"} : {"margin-top":"0","top":"0"});

        for(var i in dayArr){
          last = (bdTop - 80)  > (dayArr[i] - 10*(i-1)) ? i : last;
          // console.log(bdTop+'========');
        }
        $(".plan-l li").removeClass("current");
        $(".plan-l li").eq(last).addClass("current");
        for(var i in listArr){
        // console.log(listArr[i]);
        wn = newTop > listArr[i] ? i : wn;
        }
        $(".nav-bar li").removeClass("active");
        $(".nav-bar li").eq(wn).addClass("active");
        if(bdTop >= (ulTop + 99 + (direction ? 40 : 0))){
          $(".plan-l").addClass("fixed").removeAttr("style");
        }else{
          $(".plan-l").removeClass("fixed");
        }
        
        if(last == dayArr.length-1) {
          // console.log(nf.outerHeight(true)+'========');
        if(comp.scrollTop() + nf.outerHeight(true) + 80 > dayArr[last] + $(".day:last-child").outerHeight(true) + 15){
          $(".plan-l").removeClass("fixed").css({
            "position":"absolute",
            "bottom":"20px"
          })
        }
        // console.log('!!!----',comp.scrollTop() + nf.outerHeight(true) + 100,dayArr[last] + $(".day:last-child").outerHeight(true) + 10);
      }
        // console.log(bdTop);
        // console.log(ulTop);
        // console.log(comp.scrollTop());
        // console.log(last);
      });
      
      var stot = null;
      var djs = null;
      
      $(".nav-bar li").click(function(){
        isClick = true;
        $(".plan-l li").first().addClass("current").siblings().removeClass("current");
        // $(".nav-bar").css({"position":"fixed","top":"0","z-index":"999"});
        $(".nav-bar").addClass("fixed");
        $(".plan-l").removeClass("fixed");
        var num = $(this).index();
        // console.log(num);
        // $(".nav-bar li").removeClass("active");
        // $(this).addClass("active");
        // if($(".nav-bar li").eq(0).attr("class") == "active" || $(".nav-bar li").eq(1).attr("class") == "active"){
        //   $(".plan-l").removeAttr("style");
        // };
        var id = $(this).find("a").attr("href");
        var pos = $(id).offset().top - 92;
        var count = 0;
        // clearInterval(stot);
        // console.log($(window).scrollTop());
        // if($("html,body").is(":animated")){
        //   clearTimeout(djs);
        // };
        $("html,body").stop().animate({scrollTop: pos}, {"queue":false, duration: 300, complete: function(){
          $(".nav-bar li").removeClass("active");
          // console.log(isClick);
          $(".nav-bar li").eq(num).addClass("active");
          // var st = $(window).scrollTop();
          // stot = setInterval(function(){
          //   if($(window).scrollTop() === st) count++;
          //   console.log(st);
          //     // console.log(count);
          //   if(count > 100) {
          //     console.log(">100");
          //     // console.log("%c clear...", "color:#f00");
          //     // clearInterval(stot);
          //     count = 0;
          //     isClick = false;
          //   };
          // },1);
          djs = setTimeout(function(){
            isClick = false;
            // console.log("aha");
          },500);
          // clearTimeout(djs);
        }});

        // $("html,body").stop(true).animate({scrollTop: pos}, 300, function(){
        //   $(".nav-bar li").removeClass("active");
        //   console.log(num);
        //   $(".nav-bar li").eq(num).addClass("active");
        // });
        // setTimeout(function(){
        //   isClick = false;
        //   // console.log("aha");
        // },500);
        
        return false;
      })
      $(".plan-l li").click(function(){
        isClick = true;
        $(".nav-bar").addClass("fixed");
        $(this).addClass("current").siblings().removeClass("current");
        // console.log($(this).index()+"hehe");
        var tagN = $(this).index();
        var pos = $(".plan-r .day").eq(tagN).offset().top - 70;
        $("html,body").animate({scrollTop: pos}, 300, function(){
          $(".plan-l").addClass("fixed");
        });
        setTimeout(function(){
          isClick = false;
        },500);
      })
    }
  }
});











