const URL = "http://192.168.112.47:8081/api";
const CARDS = URL + "/card/station";
const ITEMS = URL + "/item/items/";
const USERBYEMAIL = URL + "/station/user/email";
const CREATECARD = URL + "/card/email";
const CREATEUSER = URL + "/user/add/";
const USERBYCARD = URL + "/card/user";
const CREATPURCHASE = URL + "/purchase/";

var request = require('request');

var RESTAdapter = {

    Get: function (url, cb) {
        request(url, cb)
    },
    Post: function (url, body, cb) {
        request.post({
            url: url,
            method: 'POST',
            json: true,
            body: body
        }, cb)

    },
    GetItems: function () {
        RESTAdapter.Get(ITEMS, function (error, response, body) {
            console.log(ITEMS)
            UIHandler.Item.displayAll(body);
        })
    },
    GetUserByCard: function (card) {
        RESTAdapter.Get(`${USERBYCARD}/${card.uid}`, function (error, response, body) {
            UIHandler.User.displayUserInfo(body)
        })
    },
    GetCardByUID: function (card) {
        RESTAdapter.Get(`${CARDS}/${card.uid}`, function (error, response, body) {
            NFCHandler.Card.read(card, !!body);
            if (body) {
                console.log(body)
                console.log(response)
                RESTAdapter.GetUserByCard(card);
                RESTAdapter.GetItems();
            }
        });
    },
    CreateUser: function (_name, _email) {

        RESTAdapter.Post(
            `${CREATEUSER}`,
            { name: _name, email: _email, balance: 0.00 }
            , function (error, response, body) {
                console.info(error, response, body);
                if (error) {
                    UIHandler.changePage("PageConnectionError")
                }
                else {
                    UIHandler.User.displayUserInfo( JSON.stringify(body) )
                    console.log(_email)
                    let card_name = document.getElementById("user_card_name").value
                    RESTAdapter.Post(
                        `${CREATECARD}/${_email}`,
                        {name:card_name, uid: store.card.uid },
                        function (error, response, body) {
                            if (error) {
                                UIHandler.changePage("PageConnectionError")
                            }
                            else {
                                
                                UIHandler.changePage("PageEmailSent");
                                document.getElementById("emailSent").innerHTML = "Email sent to "+ _email;

                                //console.log("Card is created")
                                RESTAdapter.GetItems()
                            }
                        })
                }
            })
    },

    AddCardToUser: function (_email) {

        RESTAdapter.Get(`${USERBYEMAIL}/${_email}`, function (error, response, body) {
            var ErrorName = "";
            console.log(error)
            console.log(response)
            console.log(response.body)
            if (error) {
                UIHandler.changePage("PageConnectionError")
            }
            else if (response.body != "") {
                let card_name = document.getElementById("card_name").value

                RESTAdapter.Post(
                    `${CREATECARD}/${_email}`,
                    {name:card_name, uid: store.card.uid },
                    function (error, response, body) {
                        if (error) {
                            UIHandler.changePage("PageConnectionError")
                        }
                        else {
                            UIHandler.changePage("PageEmailSent");
                            document.getElementById("emailSent").innerHTML ="Email sent to "+ _email;

                            RESTAdapter.GetItems()
                        }
                    })
            }
            else {
                document.getElementById("emailNotFound").innerHTML = "User is not found with "+ _email;
                UIHandler.changePage("PageUserNotFound");
            }
        })

    },
    CreatePurchase: function (_user,_items) {
        let cost = 0;
        _items.forEach(item =>{
            cost += item.price;
        })
        let curBalance = 0;
        curBalance = _user.balance - cost
        RESTAdapter.Post(
            `${CREATPURCHASE}`,
            { user : _user, items:_items}
            , function (error, response, body) {
                console.info(error, response, body);
                if (error) {
                    UIHandler.changePage("PageConnectionError")
                }
                else{
                    document.getElementById("orderCreated").innerHTML="";
                    document.getElementById("orderCreated").innerHTML="Your order has been submitted. Your balance is "+ curBalance
                    UIHandler.changePage("PageOrderCreated")
                }
            })
    },

}