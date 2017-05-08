App.config(function($stateProvider, $urlRouterProvider) {
			
		// the ui router will redirect if a invalid state has come.
		$urlRouterProvider.otherwise('/page-not-found');
		

		$stateProvider.state('login', {
			url : '/login',
			views : {
				'content@' : {
					templateUrl : 'src/views/login.html',
					controller : 'LoginController'
				}
			}
		}).state('register', {
			url : '/register',
			data : {
				role : 'USER'
			},
			views : {
				'content@' : {
					templateUrl : 'src/views/registerPage.html',
					controller : 'RegisterController',
				}
			}
		}).state('add-card-to-user', {
			url : '/add-card-to-user',
			data : {
				role : 'USER'
			},
			views : {
				'content@' : {
					templateUrl : 'src/views/addCardToUserPage.html',
					controller : 'AddCardToUserController',
				}
			}
		}).state('create-user', {
			url : '/create-user',
			data : {
				role : 'USER'
			},
			views : {
				'content@' : {
					templateUrl : 'src/views/createUserPage.html',
					controller : 'CreateUserController',
				}
			}
		}).state('email-sent', {
			url : '/email-sent',
			data : {
				role : 'USER'
			},
			views : {
				'content@' : {
					templateUrl : 'src/views/emailSentPage.html',
					controller : 'EmailSentController',
				}
			}
		}).state('show-items', {
			url : '/show-items',
			data : {
				role : 'USER'
			},
			views : {
				'content@' : {
					templateUrl : 'src/views/itemPage.html',
					controller : 'ShowItemsController',
				}
			}
		}).state('home', {
			url : '/',
			views : {
				'content@' : {
					templateUrl : 'src/views/welcomePage.html',
					controller : 'HomeController'
				}
			}
		}).state('order-created', {
			url : '/order-created',
			views : {
				'content@' : {
					templateUrl : 'src/views/orderCreatedPage.html',
					controller : 'OrderCreatedController'
				}
			}
		}).state('access-denied', {
			url : '/access-denied',
			views : {
				'content@' : {
					templateUrl : 'app/views/access-denied.html',
					controller : 'AccessDeniedController'
				}
			}
		}).state('show-purchases',{
			url:'/show-purchases',
			views: {
				'content@':{
					templateUrl :'src/views/purchases.html',
					controller: 'ShowPurchasesController'
				}
			}
		}).state('error',{
			url:'/error',
			views: {
				'content@':{
					templateUrl :'src/views/errorPage.html',
					controller: 'ErrorController'
				}
			}
		}).state('card-error',{
			url:'/card-error',
			views: {
				'content@':{
					templateUrl :'src/views/cardErrorPage.html',
					controller: 'CardErrorController'
				}
			}
		})
		
});
