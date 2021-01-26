<template>
    <div>
        <!-- <button @click="loadPlan">Reload Plans</button> -->
        <form @submit.prevent="findPlan">
            <label>Plan ID: </label>
            <input
                v-model="planId"
                name="planName"
                autocomplete="off"
            >
            <button>Find Plan</button>
        </form>
        <div>
            <br>
            <ul id="plans">
            <li>
                {{ plan.id }}<br>
                {{ plan.name }}<br>
                {{ plan.start }}<br>
                {{ plan.end }}<br>
            </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'find',
    data:function() {
        return{
            planId:'',
            plan:{
                id: null,
                name: null,
                start: null,
                end: null
            }
        }
        
    },
    methods:{
        findPlan: function(){
            if(this.planId!=null){
                var _this=this;
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function(){
                    if(this.readyState == 4 && this.status == 200){
                        _this.plan = JSON.parse(this.responseText);
                        // _this.loadPlan();
                    }
                }
                xhttp.open("Get", process.env.VUE_APP_BACKEND+this.planId, true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send();
            }
            // if(this.planName!=null){
            //     var _this = this;
            //     var xhttp = new XMLHttpRequest();
            //     xhttp.onreadystatechange = function(){
            //         if(this.readyState == 4 && this.status == 200){
            //             console.log("added: "+this.planName);
            //             _this.loadPlan();
            //         }
            //     };
            //     xhttp.open("Post", 'http://localhost:8081/plan', true);
            //     xhttp.setRequestHeader("Content-type", "application/json");
            //     xhttp.send(JSON.stringify({name:this.planName}));
            // }
        }
    }
}
</script>