;
(function() {

    function Friend(obj) {
        this.fullName = obj.first_name + ' ' + obj.last_name;
        this.firstName = obj.first_name;
        this.lastName = obj.last_name;
        this.photo = obj.photo_50;
        this.userId = obj.uid;
        this.htmlObject = {};
    };

    function friendsFilter(parametrs){



    }

    new Promise(function(resolve){

        if (document.readyState === 'complete'){
            resolve();
        }
        else{
            window.onload = resolve;
        }
    }).then(function(){
            return new Promise(function(resolve, reject){
                VK.init({
                    apiId: 5396504

                });
                VK.Auth.login(function(response){
                    if (response.session){
                        resolve(response);
                    }
                    else{
                        reject(new Error('Не удалось авторизоваться'));
                    }
                }, 4)
            });
        }).then(function(){
            return new Promise(function(resolve, reject){
                VK.api('friends.get',{
                    user_id: 295336398,
                    order: "name",
                    fields: "photo_50"
                },function(response){

                    if (response.error){
                        reject(new Error(response.error.error_msg))
                        console.log('ЧТо-то пошло не так!');
                    }
                    else{
                        console.log(response);

                        var source = friendsLeft.innerHTML,
                            templateFn = Handlebars.compile(source),
                            template = templateFn({users_left: response.response});
                        //console.log(template);
                        //console.log(response.response);
                        allFriends.innerHTML = template;
                        //headerInfo.textContent = 'Музыка на странице' + response.response[0].first_name + response.response[0].last_name;
                        resolve();

                    }

                });
            })
        })
        .catch(function(e){
            alert('Ошибка' + e.message);

        });


    var parametrs = {
            appId: 5396504,
            selectedFriendsContainerId: "selectedFriendsContainer",
            allFriendsContainerId: "allFriendsContainer",
            friendAppId: "friendApp",
            searchYourFriendsFieldId: "yourFriends",
            searchSelectedFriendsFieldId: "selectedFriends",
            friendListTempateId: "friendListTempate",
            selectedFriendListTempateId: "selectedFriendListTempate",
            authButtonId: "getFriendApp",
            saveButtonId: "saveResultButton"
        };



}) ();
