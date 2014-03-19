angular.module('app', ['ngAnimate']).directive('carousel', function($timeout, $animate){

  return function(scope, el, attr) {

    var currentId = 0,
  text = attr.carousel.split(',');

    function increment() {
      return (currentId = ((currentId + 1) % text.length));
    }

    function toggleText(test) {
      if (test) {
        this.text(text[increment()].trim());
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
}).directive('person', function() {
  return {
    restrict: 'E',
    scope: {
      'src':'@',
      'href': '@'
    },
    transclude: true,
    template: '<div class="mask"><img ng-src="{{src}}" height="90" width="90"></div><a ng-transclude class="name" ng-href="{{href}}"></a>'
  }
});
