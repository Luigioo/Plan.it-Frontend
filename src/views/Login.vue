<template>
    <div>
        <b-row>
            <b-col>
                <b-form @submit.prevent="login">
                    <b-form-group label="Log in" >
                        <b-form-input v-model="username" placeholder="Enter your name"></b-form-input>
                        <b-form-input v-model="password" placeholder="Enter your password" type="password"></b-form-input>
                    </b-form-group>
                    <b-button type="submit" variant="primary">Submit</b-button>
                </b-form>
            </b-col>
            <b-col>
                <b-form @submit.prevent="signup">
                    <b-form-group label="Sign up">
                        <b-form-input v-model="username" placeholder="Enter your name"></b-form-input>
                        <b-form-input v-model="password" placeholder="Enter your password" type="password"></b-form-input>
                    </b-form-group>
                    <b-button type="submit" variant="primary">Submit</b-button>
                </b-form>
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            username:'',
            password:''
        }
    },
    methods:{
            login(){
                console.log(this.username+this.password);
                console.log(process.env.VUE_APP_BACKEND)
                if(this.username!=null && this.password!=null){
                    
                    var xhttp = new XMLHttpRequest();
                    xhttp.withCredentials = true;
                    //var _this = this;
                    xhttp.onreadystatechange = function(){
                        if(this.readyState == 4){
                            if(this.status == 200){
                                alert("log in success");

                            }else{
                                alert("log in failed");
                            }
                        }
                    };
                    xhttp.open("GET",process.env.VUE_APP_BACKEND+"test/user", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    xhttp.setRequestHeader("Authorization", "Basic "+window.btoa(this.username+":"+this.password));
                    xhttp.send();

                }
            },
            signup(){
                if(this.username!=null && this.password!=null){
                    var xhttp = new XMLHttpRequest();
                    xhttp.withCredentials = true;
                    //var _this = this;
                    xhttp.onreadystatechange = function(){
                        if(this.readyState == 4 && this.status == 200){
                            alert("sign up success");
                        }
                    };
                    xhttp.open("Post", process.env.VUE_APP_BACKEND+"signup", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    var msg = {
                        name:this.username,
                        password:this.password
                    };
                    xhttp.send(JSON.stringify(msg));

                }
            }
    }
}
</script>