/**
 * Created by shekhargulati on 10/06/14.
 */

var app = angular.module('todoapp', ['xeditable',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'    
]);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
    }).when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl'
    }).when('/edit', {
        templateUrl: 'views/edit.html',
        controller: 'Edit'
    }).otherwise({
        redirectTo: '/'
    })
});

app.controller('ListCtrl', function ($scope, $http) {
    $http.get('/api/v1/todos')
    .success(function (data) {
        $scope.todos = data;
        
    }).error(function (data, status) {
        console.log('Error ' + data)
    })

    $scope.todoStatusChanged = function (todo) {
        console.log(todo);
         
        $http.put('/api/v1/todos/' + todo.id, todo).success(function (data) {
        	
            console.log('status changed');
        }).error(function (data, status) {
            console.log('Error ' + data)
        })
    }
    
  /*  
    $scope.fetch = function(todo) {
    	console.log('fetch');
          $http.get('/api/v1/todos/' + todo.id).success(function (data) {
        	  $scope.todo = data;
        	  $scope.todo.title = data.title;
        	  console.log(data.id);
              console.log($scope.todo.title);
          }).error(function (data, status) {
              console.log('Error ' + data)
          })	
    }     
             
*/
    
    $scope.editTodo = function (todo) {
        
        console.log(todo);
        
        $http.put('/api/v1/todos/' + todo.id, todo).success(function (data) {
        	
            console.log('title changed');
        }).error(function (data, status) {
            console.log('Error ' + data)
        })
    }
      

});

app.controller('CreateCtrl', function ($scope, $http, $location) {
    $scope.todo = {
        done: false
    };

    $scope.createTodo = function () {
        console.log($scope.todo);
        $http.post('/api/v1/todos', $scope.todo).success(function (data) {
            $location.path('/');
        }).error(function (data, status) {
            console.log('Error ' + data)
        })
    }
});



app.run(function(editableOptions) {
	  editableOptions.theme = 'bs3';
	});
     
