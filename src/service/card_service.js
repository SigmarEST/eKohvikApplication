'use strict';

App.factory('CardService', function($http, $q, UserService){
	
	var backendUrl = 'http://localhost:8081/api/card/';
	
	return {
		
			fetchAllCards: function() {
					return $http.get(backendUrl)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while fetching cards');
										return $q.reject(errResponse);
									}
							);
			},
		    
		    createCard: function(card){
			    	    return $http.post(backendUrl, card)
						.then(
								function(response){
									return response.data;
								}, 
								function(errResponse){
									console.error('Error while creating card');
									return $q.reject(errResponse);
								}
		    	   
		    	  );
					
		    },
		    
		    updateCard: function(card){
					return $http.put(backendUrl, card)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while updating card');
										return $q.reject(errResponse);
									}
							);
			},
		    
			deleteCard: function(cardId){
					return $http.delete(backendUrl + cardId)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while deleting card');
										return $q.reject(errResponse);
									}
							);
			}
		
	};

});
