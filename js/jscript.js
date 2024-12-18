$(function(){
  let count = 0;
  const now = new Date();
  const nowMonth = (now.getMonth()+1 < 10)? "0"+(now.getMonth()+1):now.getMonth()+1;
  const nowDate = (now.getDate() < 10)? "0"+(now.getDate()):now.getDate();
  const nowDay = now.getFullYear() + "." + nowMonth + "." + nowDate;
  const nowHours = (now.getHours() < 10)? "0"+(now.getHours()):now.getHours();
  const nowMinutes = (now.getMinutes() < 10)? "0"+(now.getMinutes()):now.getMinutes();

  $('.text-date').html(nowDay + "<strong>" + nowHours + ":" + nowMinutes + "</strong>");

  $(".grid-fill").hover(function(){
    $(this).find(".subnav").stop().fadeToggle(); 
  });
  $(".hero-box a").hover(function(){
    $(".hero-box a").removeClass("active");
    $(this).addClass("active"); 
  });
 
  $(".btn-right").click(function(e){
      e.preventDefault();
      fadeInOut();
  });

  $(".btn-left").click(function(e){
    e.preventDefault();
    fadeOutIn();
});

   fadeInOut();
   setInterval(fadeInOut, 9000);

   $('.b-table').eq(0).css('display', 'flex');

   const bTableCount = $('.b-table').length;
   
   $(document).on("click", ".run", function(){
      if($(this).hasClass('btn-next')){
        if(count > bTableCount - 2){
          $('.btn-next').removeClass('run');
        }else{
          count++;
          if(count > -1){
            $('.btn-prev').addClass('run');
          }
        }
      }else{
        if(count < 1){
          $('.btn-prev').removeClass('run');
       }else{
          count--;
          if(count <  bTableCount - 2){
             $(".btn-next").addClass('run');
          }
       }
      }
      $('.b-table').hide();
      $('.b-table').eq(count).css('display', 'flex');

   });

   //json가져오기
   $.ajax({
    url: "data/data.json",
    dataType: "json",
    success: function(data){
       console.log(data);
       $(".best_ul").html(displayData(data));
    },
    error: function(xhr, status, error){
       console.error("에러가 났습니다.", error);
    }
 });

 //setInterval (bannerShow, 3000);

}); // /.jquery

let i = 0;
function fadeInOut(){
   $(".hero .hero-box:eq(0)").clone().appendTo('.hero');
   $(".hero .hero-box:eq(0)").remove();
   $('.hero .hero-box:eq(0)').addClass('act');     
   $('.hero .hero-box:eq(0) ul>li:first-child a').addClass("active");
}

function fadeOutIn(){
   let ct = $(".hero-box").length;
   console.log(ct);
   $(".hero .hero-box:eq("+(ct-1)+")").clone().prependTo('.hero');
   $(".hero .hero-box:eq("+ct+")").remove();
   $(".hero .hero-box").removeClass("act");
   $(".hero .hero-box:eq(0)").addClass("act");
   $('.hero .hero-box:eq(0) ul>li:first-child a').addClass("active");
}

function displayData(data){ //받은 데이터를 매개변수로 넣음
  let htmlData = "";  //최초 비어있는 htmlData 변수를 만들고
  for(let i = 0; i < data.length; i++){  //data배열의 크기만큼 루프를 돌면서 htmlData에 li를 더함(10번)
    htmlData += `<li>
                        <a href="">
                            <div class="thumb_list"><img src="images/best_list/${data[i].img}" alt=""></div>
                            <div class="text_list">
                                <span>${data[i].id}</span>
                                <p class="text_p_list">${data[i].title}</p>
                            </div>
                            <div class="writer_list">
                                <span class="writer">${data[i].writer}</span>
                                <span class="comment">${data[i].comment}</span>
                            </div>
                        </a>
                    </li>`;
  }
  return htmlData;
}

function bannerShow(){
  $(".cafe-supporters img:(0)").fadeOut(500).next().fadeIn(500).end().appendTo(".cafe-supporters");
};
