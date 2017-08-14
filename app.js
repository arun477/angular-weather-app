//MODULE

var weatherApp = angular.module('weatherApp', ['ngRoute']);

//SERVICES

weatherApp.service('cityService',function(){
    let self = this;
    self.city = 'New York, NY';
});



//CONTROLLERS
weatherApp.controller('homeController',['$scope','cityService',function($scope,cityService){
    $scope.city = cityService.city;
     $scope.ani = function(){
        
         $('.form-control').removeClass('inputbox');
                   $('.form-control').addClass('coolmove');
    }
    
     $scope.ani2 = function(){
        
         $('.form-control').addClass('inputbox');
                   $('.form-control').removeClass('coolmove');
    }
    
    
    $scope.$watch('city',function(){
        cityService.city = $scope.city;
    });
    
}]);

weatherApp.controller('forecastController',['$scope','cityService','$http',function($scope,cityService,$http){
    $scope.city = cityService.city;
    
    
              
        
    
  $http({
      method:'GET',
      url:"https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q="+$scope.city+"?cnt=3,IN&APPID=03ff4754e1cc27ff1e2c4f59d1408f68"
  }).then(function(response){
      console.log(response);
      $scope.weatherResult = response.data;
      
  },function(error){console.log(error)})
                
                
   
    
}]);


//ROUTES

weatherApp.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'pages/home.html',
        controller:'homeController'
    })
    .when('/forecast',{
        templateUrl:'pages/forecast.html',
        controller:'forecastController'
    })
});
