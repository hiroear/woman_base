
//スマホ版のハンバーガメニュー開閉
$('.header-button').on('click', function () {
  $('body').toggleClass('open');
});

// 現在のURLの場所のナビバーを太字に
$(function() {
  const param = location.search;
  if(param != null) {
    $('.pc-nav a:eq(0)').addClass('active');
  } else {
    $('.pc-nav a:eq(0)').addClass('active');
    //$('.pc-nav a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
  }
});


$('#page_top').on('click', function () {
  scrollTo(0, 0);
});

// スクロールするとヘッダーが隠れる
$(function(){
  const header = $('#header');
  $(window).on('scroll', function(){
    const scroll = $(window).scrollTop();
    let pastPos = 0;
    const start = 300;
    if(scroll >= pastPos && scroll >= start){
      header.addClass('hide');
    } else {
      header.removeClass('hide');
    }
    pastPos = scroll;
  });
});

// ページネーションをクリックすると同じところまでスクロール
// $('.page-link').on('click', function () {
//   setTimeout(function () {
//     const target = document.getElementById('post-anchor');
//     const position = target.getBoundingClientRect().top + window.pageYOffset;
//     $("body,html").stop().animate({
//         scrollTop: position
//     }, 500);
//   },400);
// });

// なぜかアンカーでページ遷移しないので URLに #アンカー名がある場合のみ、URLのアンカー位置までスクロールする
// $(function () {                                  // $(function () {})で囲うと処理の内容を必要な回数だけ何度でも呼び出すことができる
//   const headH = $("header").outerHeight();       //<header>の外側の高さを数値で取得
//   const animeSpeed = 100;                        //数値が大きくなる程遅い
//   const urlHash = location.hash;                 //URLの #アンカー(#ハッシュタグ)を取得
//   if (urlHash) {                                 //#アンカーが有る場合
//     $("body,html").scrollTop(0);               //なくてもいいかも
//     setTimeout(function () {                   //setTimeout 無くてもいいが有ると動作が安定する
//       const target = $(urlHash);
//       const position = target.offset().top - headH;  //ターゲットまでの距離からヘッダーの高さを引く
//       $("body,html").stop().animate({
//           scrollTop: position
//       }, animeSpeed);
//     }, 0);
//   }
// });
