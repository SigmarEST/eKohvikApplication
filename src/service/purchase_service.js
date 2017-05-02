'use strict';

App.factory('PurchaseService', function($http, $q){

	var backendUrl = 'http://localhost:8081/api/purchase/';

	return {
		
			fetchAllPurchases: function() {
					return $http.get(backendUrl)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while fetching purchases');
										return $q.reject(errResponse);
									}
							);
			},
			
			fetchPurchase: function(purchaseId){
				return $http.get(backendUrl+purchaseId)
				.then(
						function(response){
							return response.data;
						}, 
						function(errResponse){
							console.error('Error while fetching purchase');
							return $q.reject(errResponse);
						}
				);
			},
			
			
			fetchPurchaseByEmail: function(email){
				return $http.get(backendUrl+'email/'+email)
				.then(
						function(response){
							return response.data;
						}, 
						function(errResponse){
							console.error('Error while fetching purchase with '+ email);
							return $q.reject(errResponse);
						}
				);
			},
		    
		    createPurchase: function(purchase){
					return $http.post(backendUrl, purchase)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while creating purchase');
										return $q.reject(errResponse);
									}
							);
		    },
		    
		    updatePurchase: function(purchase){
					return $http.put(backendUrl, purchase)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while updating purchase');
										return $q.reject(errResponse);
									}
							);
			},
		    
			deletePurchase: function(purchaseId){
					return $http.delete(backendUrl+ purchaseId)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while deleting purchase');
										return $q.reject(errResponse);
									}
							);
			}
		
	};

});
