'use strict';

App.controller('ItemController', function($scope, ItemService) {
          var self = this;
          self.item={itemId:null, name:null, price:null ,available:true};
          self.items=[];
              
          self.fetchAllItems = function(){
              ItemService.fetchAllItems()
                  .then(
      					       function(d) {
      						        self.items = d;
      					       },
            					function(errResponse){
            						console.error('Error while fetching Items');
            					}
      			       );
          };
           
          self.createItem = function(item){
              ItemService.createItem(item)
		              .then(
                          self.fetchAllItems, 
                          function(errResponse){
					               console.error('Error while creating Item.');
				              }	
                  );
          };
          
          self.fetchAllItems();

         self.updateItem = function(item){
              ItemService.updateItem(item)
		              .then(
				              self.fetchAllItems, 
				              function(errResponse){
					               console.error('Error while updating Item.');
				              }	
                  );
          };
          
          self.fetchAllItems();

         self.deleteItem = function(itemId){
              ItemService.deleteItem(itemId)
		              .then(
				              self.fetchAllItems, 
				              function(errResponse){
					               console.error('Error while deleting Item.');
				              }	
                  );
          };

          self.fetchAllItems();

          self.submit = function() {
              if(self.item.itemId==null){
                  console.log('Saving New Item', self.item);    
                  self.createItem(self.item);
              }else{
                  self.updateItem(self.item);
                  console.log('Item updated with id ', self.item.itemId);
              }
              self.reset();
          };
              
          self.edit = function(itemId){
              console.log('id to be edited', itemId);
              for(var i = 0; i < self.items.length; i++){
                  if(self.items[i].itemId == itemId) {
                     self.item = angular.copy(self.items[i]);
                     break;
                  }
              }
          };
              
          self.remove = function(itemId){
              console.log('id to be deleted', itemId);
              if(self.item.itemId === itemId) {//clean form if the item to be deleted is shown there.
                 self.reset();
              }
              self.deleteItem(itemId);
          };

          
          self.reset = function(){
              self.item={itemId:null, name:'',price:null, available:true};
              $scope.myForm.$setPristine(); //reset Form
          };

      });
