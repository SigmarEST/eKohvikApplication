'use strict';

App.factory('ItemService', function($http, $q){

	var backendUrl = 'http://localhost:8081/api/item/';

	return {
		
			fetchAllItems: function() {
					return $http.get(backendUrl)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while fetching items');
										return $q.reject(errResponse);
									}
							);
			},
		    
		    createItem: function(item){
					return $http.post(backendUrl, item)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while creating item');
										return $q.reject(errResponse);
									}
							);
		    },
		    
		    updateItem: function(item){
					return $http.put(backendUrl, item)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while updating item');
										return $q.reject(errResponse);
									}
							);
			},
		    
			deleteItem: function(itemId){
					return $http.delete(backendUrl+itemId)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while deleting item');
										return $q.reject(errResponse);
									}
							);
			}
		
	};

});
