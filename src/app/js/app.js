angular.module('userApp', [])
  .controller('userController', function($window, $http) {
    var userctl = this;
    var serverName = "http://localhost:3000";

    userctl.showHideInsert = function(){
      if(!userctl.operationInsert){
        userctl.insertIsVisible = true;
      }else{
        userctl.insertIsVisible = false;
      }
    };

    userctl.showHideAllUsers = function(){
      if(!userctl.operationGetAll){
        userctl.allUsersIsVisible = true;
        $http.get(serverName+"/users").then(
          function successCallback(response) {
            console.log("Successfully GET-ed data");
            //var r = response.data;
            //console.log(r);
            //alert(response.data.data[0].name)
            userctl.userList = response.data.data;
          },
          function errorCallback(response) {
            console.log("GET-ing of data failed");
            console.log(response);
          }
        );
      }else{
        userctl.allUsersIsVisible = false;
      }
    };

    userctl.showHideSearch = function(){
      if(!userctl.operationSearch){
        userctl.searchIsVisible = true;
      }else{
        userctl.searchIsVisible = false;
      }
    };

    userctl.addUser = function(){
      console.log("Inside insert funcion");
      console.log(userctl.userName);
      console.log(userctl.userEmail);
      console.log(userctl.userTelephone);
      console.log(userctl.userPassword);
      console.log(userctl.userAge);
      console.log(userctl.userGender);
      console.log(userctl.userHobby);
      //$window.location.href= "userList.html";
      var today = new Date();
      var data={
        name: userctl.userName,
        email: userctl.userEmail,
        telephone: userctl.userTelephone,
        password: userctl.userPassword,
        age: userctl.userAge,
        gender: userctl.userGender,
        hobby: userctl.userHobby,
        registrationdate : today.toISOString()
      };

      $http.post(serverName+"/users",data).then(
        function successCallback(response) {
          console.log(response);
          console.log("Successfully POST-ed data");
          userctl.insertMessage = "User created";
        },
        function errorCallback(response) {
          console.log(response);
          console.log("POST-ing of data failed");
          userctl.insertMessage = "Failed to create the user try again";
        }
      );
    };

    userctl.deleteUser = function(item){
      console.log("Inside DELETE funcion");
      console.log(item._id);
      var index = userctl.userList.indexOf(item);
      console.log("index= "+index)
      $http.delete(serverName+"/users/"+item._id).then(
        function successCallback(response) {
          console.log("Successfully DELETE-ed data");
          userctl.userList.splice(index, 1);
        },
        function errorCallback(response) {
          console.log("DELETE-ing of data failed");
          console.log(response);
        }
      );
    }
});
