'use strict';

App.controller('StationController', function($scope, StationService) {
          var self = this;
          self.station={id:null, address:'', username:null, password:null };
          self.stations=[];
              
          self.fetchAllStations = function(){
              StationService.fetchAllStations()
                  .then(
      					       function(d) {
      						        self.stations = d;
      						        console.log(d);
      					       },
            					function(errResponse){
            						console.error('Error while fetching Stations');
            					}
      			       );
          };
           
          self.createStation = function(station){
              StationService.createStation(station)
		              .then(
                          self.fetchAllStations, 
                          function(errResponse){
					               console.error('Error while creating Station.');
				              }	
                  );
          };
          
          self.fetchAllStations();

         self.updateStation = function(station){
              StationService.updateStation(station)
		              .then(
				              self.fetchAllStations, 
				              function(errResponse){
					               console.error('Error while updating station.');
				              }	
                  );
          };
          
          self.fetchAllStations();

         self.deleteStation = function(id){
              StationService.deleteStation(id)
		              .then(
				              self.fetchAllStations, 
				              function(errResponse){
					               console.error('Error while deleting Station.');
				              }	
                  );
          };

          self.fetchAllStations();

          self.submit = function() {
              if(self.station.id==null){
                  console.log('Saving New Station', self.station);    
                  self.createStation(self.station);
              }else{
                  self.updateStation(self.station);
                  console.log('Station updated with id ', self.station.id);
              }
              self.reset();
          };
              
          self.edit = function(id){
              console.log('id to be edited', id);
              for(var i = 0; i < self.stations.length; i++){
                  if(self.stations[i].id == id) {
                     self.station = angular.copy(self.stations[i]);
                     break;
                  }
              }
          };
              
          self.remove = function(id){
              console.log('id to be deleted', id);
              if(self.station.id === id) {//clean form if the item to be deleted is shown there.
                 self.reset();
              }
              self.deleteStation(id);
          };

          
          self.reset = function(){
              self.station={id:null, address:'', username:null, password:null};
              $scope.myForm.$setPristine(); //reset Form
          };

      });
