'use strict';

App.controller('UserController', function($scope, UserService) {
          var self = this;
          self.user={userId:null, name:null, email:null, balance:null, active:null, cardAddingBlocked:null, createdDate:null, cards:[] };
          self.users=[];
              
          self.fetchAllUsers = function(){
              UserService.fetchAllUsers()
                  .then(
      					       function(d) {
      						        self.users = d;
      						        console.log(d)
      					       },
            					function(errResponse){
            						console.error('Error while fetching users');
            					}
      			       );
          };
           
          self.createUser = function(user){
              UserService.createUser(user)
		              .then(
                          self.fetchAllUsers, 
                          function(errResponse){
					               console.error('Error while creating user.');
				              }	
                  );
          };
          
          self.fetchAllUsers();

         self.updateUser = function(user){
              UserService.updateUser(user)
		              .then(
				              self.fetchAllUsers, 
				              function(errResponse){
					               console.error('Error while updating user.');
				              }	
                  );
          };
          
          self.fetchAllUsers();

         self.deleteUser = function(userId){
              UserService.deleteUser(userId)
		              .then(
				              self.fetchAllUsers, 
				              function(errResponse){
					               console.error('Error while deleting user.');
				              }	
                  );
          };

          self.fetchAllUsers();

          self.submit = function() {
              if(self.user.userId==null){
                  console.log('Saving New User', self.user);    
                  self.createUser(self.user);
              }else{
                  self.updateUser(self.user);
                  console.log('User updated with id ', self.user.userId);
              }
              self.reset();
          };
              
          self.edit = function(userId){
              console.log('id to be edited', userId);
              for(var i = 0; i < self.users.length; i++){
                  if(self.users[i].userId == userId) {
                     self.user = angular.copy(self.users[i]);
                     break;
                  }
              }
          };
              
          self.remove = function(userId){
              console.log('id to be deleted', userId);
              if(self.user.userId === userId) {//clean form if the user to be deleted is shown there.
                 self.reset();
              }
              self.deleteUser(userId);
          };

          
          self.reset = function(){
              self.user={userId:null, name:null, email:null, balance:null, active:null, cardAddingBlocked:null, createdDate:null, cards:[]};
              $scope.myForm.$setPristine(); //reset Form
          };

      });
