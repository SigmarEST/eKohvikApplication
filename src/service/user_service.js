'use strict';

App.factory('UserService', function($http, $q){

	var backendUrl = 'http://localhost:8081/api/user/';

	return {
		
			fetchAllUsers: function() {
					return $http.get(backendUrl)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while fetching users');
										return $q.reject(errResponse);
									}
							);
			},
			
			fetchUser: function(userId){
				return $http.get(backendUrl+userId)
				.then(
						function(response){
							return response.data;
						}, 
						function(errResponse){
							console.error('Error while fetching users');
							return $q.reject(errResponse);
						}
				);
			},
			
			fetchUserByEmail: function(email){
				return $http.get(backendUrl+'email/'+email)
				.then(
						function(response){
							return response.data;
						}, 
						function(errResponse){
							console.error('Error while fetching user with '+ email);
							return $q.reject(errResponse);
						}
				);
			},
		    
		    createUser: function(user){
					return $http.post(backendUrl, user)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while creating user');
										return $q.reject(errResponse);
									}
							);
		    },
		    
		    updateUser: function(user){
					return $http.put(backendUrl, user)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while updating user');
										return $q.reject(errResponse);
									}
							);
			},
		    
			deleteUser: function(userId){
					return $http.delete(backendUrl+ userId)
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while deleting user');
										return $q.reject(errResponse);
									}
							);
			}
		
	};

});
