angular.module('dashControl', []).controller('dashboardController', function($scope, $http){
  $scope.myDate = new Date();

  var year = ""+$scope.myDate.getFullYear();
  $scope.myDate.month = ("0" + ($scope.myDate.getMonth()+1)).slice(-2);
  $scope.myDate.date = ("0" + $scope.myDate.getDate()).slice(-2);
  $scope.myDate.stringBusqueda = ""+year+
                                    $scope.myDate.month+
                                    $scope.myDate.date;
  $scope.times = [];
  $scope.fotos = [];

  //Request cuando carga Angular, se le pregunta todo lo que tiene al bucket y
  //devuelve un arreglo de objetos disponibles
  /*global $http*/
  $http({
      method: 'GET',
      url: '/api',
  }).then(function(response){
    //Variable que almacena la respuesta del servidor
    $scope.fotos = response.data.message;
    //Se muestra la foto más reciente que llego al servidor
    $scope.onDisplay = "https://storage.googleapis.com/" +
                        $scope.fotos[$scope.fotos.length-1].bucket.id + "/" +
                        $scope.fotos[$scope.fotos.length-1].id;

    $scope.reqDate();
  });

  $scope.selectChanged = function(){
    $scope.onDisplay = "https://storage.googleapis.com/" +
                        $scope.selectedFoto.bucket.id + "/" +
                        $scope.selectedFoto.id;
  };

  $scope.reqDate = function(){
    $scope.myDate.year = ""+$scope.myDate.getFullYear();
    $scope.myDate.month = ("0" + ($scope.myDate.getMonth()+1)).slice(-2);
    $scope.myDate.date = ("0" + $scope.myDate.getDate()).slice(-2);
    $scope.myDate.stringBusqueda = ""+$scope.myDate.year+"-"+
                                      $scope.myDate.month+"-"+
                                      $scope.myDate.date;
    $scope.times = [];
    for(var i = 0; i<$scope.fotos.length; i++){
      if($scope.fotos[i].metadata.hasOwnProperty("metadata")){
        if($scope.fotos[i].metadata.metadata.fecha === $scope.myDate.stringBusqueda){
          $scope.times.push($scope.fotos[i]);
        }
      }
    }
  };
  //Function to select a given photo depending on the time it was taken
  $scope.selectedHour = function(){
    $scope.onDisplay = "https://storage.googleapis.com/" +
                        $scope.time.bucket.id + "/" +
                        $scope.time.id;
  }
});
