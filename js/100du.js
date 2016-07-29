

$(function(){
  //搜索切换
    (function(){
        var aLi=$("#menu li");
        var oText=$('#search').find('.form .text');
        var arrText = [
            '例如：荷棠鱼坊烧鱼 或 樱花日本料理',
            '例如：昌平区育新站龙旗广场2号楼609室',
            '例如：万达影院双人情侣券',
            '例如：东莞出事了，大老虎是谁？',
            '例如：北京初春降雪，天气变幻莫测'
        ];
        var iNow=0;
        oText.val(arrText[iNow]);

        aLi.each(function(index){
            $(this).click(function(){
                  aLi.attr('class','gradient');
                  $(this).attr('class','active');
                  iNow=index;
                  oText.val(arrText[iNow]);
            })
        });
        oText.focus(function(){
              //console.log(arrText[iNow]);
              if($(this).val()==arrText[iNow]){
                  $(this).val('');
              }
        });
        oText.blur(function(){
              if($(this).val()==''){
                   $(this).val(arrText[iNow]);
              }
        });

    })();
    
    //update更新文字滑动
    (function(){
       var oDiv=$('.update');
       var oUl=oDiv.find('ul');
       var arrData=[
            { 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
            { 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
            { 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
            { 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' },
            { 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
            { 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
            { 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
            { 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' }
       ];
       var str='';

       for(var i=0;i<arrData.length;i++){
          str+="<li><a href='"+arrData[i].url+"'><strong>"+arrData[i].name+"</strong> <span>"+arrData[i].time+"分钟前</span> 写了一篇新文章："+arrData[i].title+"</a></li>";
       }
        oUl.html(str);

        var oBtnUp=$('#updateUpBtn');
        var oBtnDown=$('#updateDownBtn');
        var timer=null;
        var iNow=0;
        var iH=0;

        iH=oDiv.height();//iH = oUl.find('li').height();

        oBtnUp.click(function(){
              doMove(-1);
        });
        oBtnDown.click(function(){
              doMove(1);
        });
        function autoPlay(){
            timer=setInterval(function(){
               doMove(-1);
            },3500);
        };
        autoPlay();

        oDiv.hover(function (){
           clearInterval( timer );
        }, autoPlay);

        function doMove(num){
            iNow+=num;
            if(iNow>0){
              iNow=-(arrData.length-1);
            }
            if(Math.abs(iNow)>(arrData.length-1)){
              iNow=0;
            }
            oUl.stop().animate({top:iH*iNow},2200,'elasticOut');
       }

    })();

    //options切换选项卡
    (function(){
        fnTab($('.tabNav1'),$('.tabCon1'));
        fnTab($('.tabNav2'),$('.tabCon2'));


        function fnTab(oNav,aCon){
            var aElem=oNav.children();
            aCon.hide().eq(0).show();

            aElem.each(function(index){
                $(this).click(function(){
                    aElem.removeClass('active').addClass('gradient');
                    $(this).removeClass('gradient').addClass('active');
                    aElem.find('a').attr('class','triangle_down_gray');
                    aElem.find('a').eq(index).attr('class','triangle_down_red');

                    aCon.hide().eq(index).show();
                })
            })
        }

    })();

    //焦点图自动播放
    (function(){
        var oDiv=$('#fade');
        var aUlLi=oDiv.find('ul li');
        var aOlLi=oDiv.find('ol li');

        var oP=oDiv.find('p');
        var iNow=0;
        var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
        var timer=null;

        fnFade();
        aOlLi.click(function(){
            iNow=$(this).index();
            fnFade();
        });
        function autoPlay(){
            timer=setInterval(function(){
                iNow++;
                iNow%=arr.length;
                fnFade();
            },2000);
        }
        autoPlay();

        oDiv.hover(function(){
            clearInterval(timer);
        },autoPlay);
       
        function fnFade(){
            aUlLi.each(function(i){
                if(i!=iNow){
                    aOlLi.eq(i).removeClass('active');
                    $(this).css('zIndex',1).fadeOut();
                }else{
                    $(this).css('zIndex',2).fadeIn();
                    aOlLi.eq(i).addClass('active');
                }
   
            }) ;
            oP.text(arr[iNow]);        
        }
    })();

    //日历提示说明
    (function(){
        var aImg=$('.calendar ol .img');
        var oPrompt=$('.today_info');
        var oImg=oPrompt.find('img');
        var oStrong=oPrompt.find('strong');
        var oP=oPrompt.find('p');
        var aSpan=$('.calendar h3 span');



        aImg.hover(function(){
            var iTop=$(this).parent().position().top-30;
            var iLeft=$(this).parent().position().left+50;
            var iIndex=$(this).parent().index()%aSpan.size();
            
            oPrompt.show().css({'left':iLeft,'top':iTop});
            oImg.attr('src',$(this).attr('src'));
            oStrong.text(aSpan.eq(iIndex).text());
            oP.text($(this).attr('info'));

            //console.log($(this).parent().position().top);
        },function(){
            oPrompt.hide();
        });

    })();

    //BBS高亮显示
    (function(){
      $('.bbs ol li').mouseover(function(){
         $('.bbs ol li').attr('class','');
         $(this).attr('class','active');
      })
       
    })();

    //红人烧客文字蒙板
    (function(){
        var arr = [
          '',
          '用户1<br />人气1',
          '用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
          '用户3<br />人气3',
          '用户4<br />人气4',
          '用户5<br />人气5',
          '用户6<br />人气6',
          '用户7<br />人气7',
          '用户8<br />人气8',
          '用户9<br />人气9',
          '用户10<br />人气10'
        ];
        $('.hot_area li').mouseover(function(){
            var iWidth=$(this).width()-12;
            var iHeight=$(this).height()-12;

            $('.hot_area li p').remove();
            $(this).append('<p style="width:'+iWidth+'px;height:'+iHeight+'px;">'+arr[$(this).index()]+'</p>')
        })
    })();

});
  
