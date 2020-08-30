$(function() {
  // アニメーションさせる要素を取得
  var $targetElements = $('.js-fade-animation');

  // アニメーションさせる要素があるとき
  if ($targetElements.length) {
    // アニメーションさせる要素の高さを取得(複数ある場合を考えて配列で保存)
    var fixedOffsets = $targetElements.map(function(index, element) {
      return $(element).offset().top;
    });
    // windowを取得
    var $window = $(window);
    // 画面の高さを取得
    var windowHight = $window.height();

    // resizeイベント
    $window.on('resize', $.throttle(250, function() {
      // 画面の高さを再取得
      windowHight = $window.height();

      // Offsetを再取得
      fixedOffsets = $targetElements.map(function(index, element) {
        return $(element).offset().top;
      });
    }));

    // スクロールイベント
    $window.on('scroll', $.throttle(250, function() {
      // スクロール位置を取得
      var scrollTop = $(this).scrollTop();

      // .js-fade-animationの要素をすべてチェックする
      fixedOffsets.each(function(index, offset) {
        // アニメーションさせる要素の位置よりも下にスクロールされているとき
        if (scrollTop + windowHight > offset) {
          // 要素をアニメーションさせる (.is-showを付与)
          $targetElements.eq(index).addClass('is-show');

          // アニメーション後は監視対象から外す
          fixedOffsets.splice(index, 1);
          $targetElements.splice(index, 1);
        }
      });
    }));
  }
});
