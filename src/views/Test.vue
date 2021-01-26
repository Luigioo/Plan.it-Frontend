<template>
    <div>
        Test ground
        <br>
        <br>
        {{msg}}
        <br>
        <br>
        <button @click="accessUser">accessUser</button>
        <button @click="sendNamePassword">send username and password</button>
    </div>
</template>

<script>
export default {
    name: 'Test',
    data:function() {
        return{
            msg: ""
        }
        
    },
    methods:{
        accessUser: function(){
            //console.log("helw");
            var xhttp = new XMLHttpRequest();
            xhttp.withCredentials = true;
            var _this = this;
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    console.log("accessed: "+this.responseText);
                    _this.msg = this.responseText;
                }
            }
            xhttp.open("GET", process.env.VUE_APP_BACKEND+"test/user", true);
            xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();

        },
        sendNamePassword: function(){
            var username = "group6";
            var password = "1234";//just for testing; should get these from the user input
            var xhttp = new XMLHttpRequest();
            xhttp.withCredentials = true;
            //var _this = this;
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    console.log("sent name & password: "+this.responseText);
                }
            }
            xhttp.open("GET",process.env.VUE_APP_BACKEND+"test/user", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Authorization", "Basic "+window.btoa(username+":"+password));
            xhttp.send();
        }
    }
}
</script>