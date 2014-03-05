angular.module('app', ['ngAnimate']).directive('carousel', function($timeout, $animate){

  return function(scope, el, attr) {

    var currentId = 0,
        text = scope.$eval(attr.carousel);

    function increment() {
      return (currentId = ((currentId + 1) % text.length));
    }

    function toggleText(test) {
      if (test) {
        this.text(text[increment()]);
        $animate.addClass(this, 'new-content', toggleText.bind(this, !test));
      } else {
        this.text('');
        $animate.removeClass(this, 'new-content', toggleText.bind(this, !test));
      }
    }

    $timeout(function(){
      //For whatever reason, the first call needs a small delay
      toggleText.call(el, true);
    }, 0);
  };
});
