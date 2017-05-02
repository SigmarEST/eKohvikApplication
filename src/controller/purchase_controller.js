'use strict';

App
		.controller(
				'PurchaseController', function($scope, PurchaseService, CardService, UserService) {
							var self = this;
							self.purchase = {purchaseId : null, dateTime : null,  user : null, cost:null, items:[]};
							self.purchases = [];

							self.fetchAllPurchases = function() {
								PurchaseService
										.fetchAllPurchases()
										.then(
												function(d) {
													console.log(d)
													self.purchases = d;
												},
												function(errResponse) {
													console
															.error('Error while fetching purchases');
												});
							};

					          self.createPurchase = function(purchase){
					              PurchaseService.createPurchase(purchase)
							              .then(
					                          self.fetchAllPurchases, 
					                          function(errResponse){
										               console.error('Error while creating purchase.');
									              }	
					                  );
					          };
					          
					         self.fetchAllPurchases();
					          
					         self.updatePurchase = function(purchase){
					              PurchaseService.updatePurchase(purchase)
							              .then(
									              self.fetchAllPurchases, 
									              function(errResponse){
										               console.error('Error while updating purchase.');
									              }	
					                  );
					          };
					          
					          self.fetchAllPurchases();

					         self.deletePurchase = function(purchaseId){
					              PurchaseService.deletePurchase(purchaseId)
							              .then(
									              self.fetchAllPurchases, 
									              function(errResponse){
										               console.error('Error while deleting purchase.');
									              }	
					                  );
					          };
					          
					          self.fetchAllPurchases();

					          self.submit = function() {
					              if(self.purchase.purchaseId==null){
					                  console.log('Saving New Purchase', self.purchase);    
					                  self.createPurchase(self.purchase);
					              }else{
					                  self.updatePurchase(self.purchase);
					                  console.log('Purchase updated with id ', self.purchase.purchaseId);
					              }
					              self.reset();
					          };
					           
					          self.fetchAllPurchases();
					          
					          self.edit = function(purchaseId){
					              console.log('id to be edited', purchaseId);
					              for(var i = 0; i < self.purchases.length; i++){
					                  if(self.purchases[i].purchaseId == purchaseId) {
					                     self.purchase = angular.copy(self.purchases[i]);
					                     break;
					                  }
					              }
					          };
					          
					          self.fetchAllPurchases();
					          
					          self.remove = function(purchaseId){
					              console.log('id to be deleted', purchaseId);
					              if(self.purchase.purchaseId === purchaseId) {//clean form if the user to be deleted is shown there.
					                 self.reset();
					              }
					              self.deletePurchase(purchaseId);
					          };
					          
					          self.fetchAllPurchases();

					          
					          self.reset = function(){
					              self.purchase={purchaseId : null, dateTime : null,  user : null, cost:null, items:[]};
					              $scope.myForm.$setPristine(); //reset Form
					          };

					      });
