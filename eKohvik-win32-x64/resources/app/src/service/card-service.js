App
// Creating the Angular Service for storing logged user details
.service('CardService', function() {
    var data = {
        customer : null,
        card : null,
        //user_email : null,
        errorMessage : null,
        selectedItems:[],
        totalPrice:0.00

    }

	return {
        data : data        
	}
    
});
