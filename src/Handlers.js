var UIHandler = {
    selectedItems: [],

    bindEvents: function () {

    },
    HTML: {
        enable: function (target) {
            let elem = document.getElementById(target);
            elem.removeAttribute("disabled")
        },
        disable: function (target) {
            let elem = document.getElementById(target);
            elem.setAttribute("disabled", "disabled")
        },
        validateCardAndUser: function (card, user) {
            return card.value.length * user.value.length
        },
        validateCard: function () {
            let result = true;
            let user_email = document.getElementById("user_email_to_search").value;
            let card_name = document.getElementById("card_name").value;
            if(!(card_name.length>0)){
                alert('CARD NAME');
                result = false;
            }
            if(!(user_email.length>0 && user_email.indexOf("@") != -1 && user_email.lastIndexOf("@") < user_email.lastIndexOf("."))){
                alert('EMAIL');
                result = false;
            }
            return result;
        },
        validateUser: function () {
            let result = true;
            let user_email = document.getElementById("user_email").value;
            let user_name = document.getElementById("user_name").value;
            let card_name = document.getElementById("user_card_name").value;
            if(!(card_name.length>0)){
                alert('card name');
                result = false;
            }
            if(!(user_email.length>0 && user_email.indexOf("@") != -1 && user_email.lastIndexOf("@") < user_email.lastIndexOf("."))){
                alert('email');
                result = false;
            }
            if(!(user_name.length>0)){
                alert('user name');
                result = false;
            }
            return result;

        }
    },
    changePage: function (pageName) {
        if (pageName != "PageWelcome")
            TimeHandler.reset();
        document.querySelectorAll(".page").forEach(page => {
            if (page.id === pageName)
                page.style.display = "block";
            else
                page.style.display = "none";
        })

    },
    Item: {
        remove: function (i) {
            console.info(i, UIHandler.selectedItems.length);
            UIHandler.selectedItems.splice(i, 1);
            UIHandler.Item.displaySelectedItems();
        },
        displaySelectedItems: function () {
            TimeHandler.reset();
            console.log(UIHandler.selectedItems)
            var ul = document.createElement("ul");
            for (let i = 0; i < UIHandler.selectedItems.length; i++) {
                var li = document.createElement("li");
                li.id = `selectedItem${i}`;
                li.innerHTML = JSON.parse(UIHandler.selectedItems[i]).name;
                li.addEventListener('click', function () {
                    UIHandler.Item.remove(i)
                })
                ul.appendChild(li);
            }
            document.getElementById("purchase").innerHTML = "";
            document.getElementById("purchase").appendChild(ul);
        },
        click: function (item) {
            var itemObj = JSON.stringify(item);
            UIHandler.selectedItems.push(itemObj);
            UIHandler.Item.displaySelectedItems();

        },
        displayAll: function (items) {
            console.log(items)
            UIHandler.selectedItems = [];
            var ul = document.createElement("ul");
            JSON.parse(items).forEach(item => {
                var li = document.createElement("li");
                li.innerHTML = item.name;
                li.addEventListener('click', function () {
                    UIHandler.Item.click(item);
                })
                ul.appendChild(li);
            });
            document.getElementById("items").innerHTML = "";
            document.getElementById("items").appendChild(ul);
        }
    },

    User: {
        displayUserInfo: function (user) {
            console.log(user);
            var userlar = JSON.parse(user)
            store.user = userlar;
            console.log(userlar.name)
            document.getElementById("userName").innerHTML = "Welcome: " + userlar.name;
            document.getElementById("userBalance").innerHTML = "Your balance: " + userlar.balance;
        }
    },

    CreateUser: function (name, email) {
        RESTAdapter.CreateUser(name, email)
    },
    AddCardToUser: function (email, card) {
        RESTAdapter.AddCardToUser(email);

    }

}


var NFCHandler = {
    Reader: {
        error: function (err) {
            console.error(err);
        },
        read: function (reader) {
            UIHandler.changePage("PageWelcome")
        }
    },
    Card: {
        read: function (card, found = false) {
            store.card = card;
            UIHandler.changePage(found ? "PageItems" : "PageUser")
        },
        error: function (err) {
            UIHandler.changePage("PageError");
        }
    }
}

var TimeHandler = {
    timer: null,
    timeOut: 60000,
    reset: function () {
        if (TimeHandler.timer)
            TimeHandler.clear();
        TimeHandler.start();
    },
    clear: function () {

        clearTimeout(TimeHandler.timer);
    },
    start: function () {
        console.info("Timer Started")
        TimeHandler.timer = setTimeout(TimeHandler.onTimedOut, TimeHandler.timeOut);
    },
    onTimedOut: function () {
        console.info("Timed Out")
        UIHandler.changePage("PageWelcome");
    }
}


var store = {
    card: null,
    user: {}
}

/*
document.getElementById("closeEmailNotFound").onclick = function () {
    UIHandler.changePage("PageWelcome");
}

document.getElementById("closeOrderCreated").onclick = function () {
    UIHander.changePage("PageWelcome");
}

document.getElementById("btnBuy").onclick = function () {
    if (UIHandler.selectedItems.length > 0)
        RESTAdapter.CreatePurchase(store.user, UIHandler.selectedItems.map(item => JSON.parse(item)));
    UIHandler.selectedItems.length = 0;
}

document.getElementById('btnCreateUser').onclick = function () {
    UIHandler.changePage("PageCreateUser");
}

document.getElementById('btnAddCardToExistingUser').onclick = function () {
    UIHandler.changePage("PageAddCardToExistingUser");
}

document.getElementById('btnCancel').onclick = function () {
    UIHandler.changePage("PageWelcome")
}

document.getElementById('btnCreateNewUser').onclick = function () {
    var name = document.getElementById('user_name').value;
    var email = document.getElementById('user_email').value
    console.log(email);
    if (UIHandler.HTML.validateUser()) {
        UIHandler.CreateUser(name, email);
        document.getElementById("user_name").value = "";
        document.getElementById("user_email").value = "";
    }
    else {
        alert('no create');
    }
}

document.getElementById("cancelCreateUser").onclick = function () {
    UIHandler.changePage("PageWelcome")
}


document.getElementById("cancelAddCardToUser").onclick = function () {
    UIHandler.changePage("PageWelcome")
}

document.getElementById('btnAddCardToUser').onclick = function () {
    var emailToSearch = document.getElementById("user_email_to_search").value
    if (UIHandler.HTML.validateCard()) {
        UIHandler.AddCardToUser(emailToSearch);
        document.getElementById("user_email_to_search").value = "";
    }
    else {
        alert('no add');
    }
}

document.getElementById("closeEmailSent").onclick = function () {
    UIHandler.changePage("PageItems")
}

*/