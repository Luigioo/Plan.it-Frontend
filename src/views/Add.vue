<template>
    <div>
        <button @click="loadPlan">Reload Plans</button>
        <form @submit.prevent="addPlan">
            <label>Plan Name: </label>
            <input
                v-model="planName"
                name="planName"
                autocomplete="off"
            >
            <button>Add Plan</button>
        </form>
        <div>
            <br>
            <ul id="plans">
            <li v-for="p in plans" :key="p.id">
                {{ p.id }}<br>
                {{ p.name }}<br>
                {{ p.start }}<br>
                {{ p.end }}<br>
            </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Add',
    data:function() {
        return{
            planName:'',
            plans: new Array()
        }
        
    },
    methods:{
        addPlan: function(){
            if(this.planName!=null&&this.planName.length>0){
                var _this = this;
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function(){
                    if(this.readyState == 4 && this.status == 200){
                        console.log("added: "+_this.planName);
                        _this.loadPlan(); //refresh the displayed plans
                    }
                };
                xhttp.open("Post", process.env.VUE_APP_BACKEND+"plan", true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send(JSON.stringify({name:this.planName}));
            }
            this.planName = null;
        },
        loadPlan: function(){
            this.plans = new Array()
            var xhttp = new XMLHttpRequest();
            var _this = this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var arr = JSON.parse(this.responseText);
                    for(var i=0;i<arr.length;i++){
                        // console.log(arr[i]);
                        // console.log("olala\n");
                        var p = arr[i];
                        // console.log(typeof(new Array()));
                        _this.plans.push({
                            id: p.id,
                            name: p.name,
                            start: p.start,
                            end: p.end
                        });
                        
                    }
                }
            };
            xhttp.open("GET", process.env.BACKEND_ADDR+"plan", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        },
    }
}
</script>