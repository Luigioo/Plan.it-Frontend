<template>
    <div>
        <b-form @submit="onSubmit">
            <b-row>
                <b-col md>
                    <b-form-checkbox v-model="checkone">Select this schedule</b-form-checkbox>
                    <FullCalendar ref="calone" :options="calendarOptions1"/>
                </b-col>
                <b-col md>
                    <b-form-checkbox v-model="checktwo">Select this schedule</b-form-checkbox>
                    <FullCalendar ref="caltwo" :options="calendarOptions2"/>
                </b-col>
            
            </b-row>
            <br>
            <b-row>
                <b-col>
                    <b-button type="submit" variant="primary">Submit</b-button>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>

import FullCalendar from "@fullcalendar/vue";
import timeGridPlugin from "@fullcalendar/timegrid";
import {events} from "../scripts/plans";
export default {
    components:{
        FullCalendar,
    },
    props:{
        res:Array,
        taskName:String,
    },
    mounted(){
        console.log("=------=")
        console.log(events);
        
        var _this = this;
        setTimeout(function(){ _this.$refs.calone.getApi().render(); }, 200);
        setTimeout(function(){ _this.$refs.caltwo.getApi().render(); }, 200);
    },
    data(){
        return{
            checkone:false,
            checktwo:false,
            ievent:[],
            calendarOptions1:{
                plugins: [timeGridPlugin],
                headerToolbar: {
                left:"",
                center: "",
                right:''
                },
                initialView: "timeGridWeek",
                height: "auto",
                themeSystem:"bootstrap",
                initialEvents: this.getEvents,
                //editable: true,
                //selectable: true,
                //selectMirror: true,
                dayMaxEvents: true,
                weekends: true,
            },
            calendarOptions2:{
                plugins: [timeGridPlugin],
                headerToolbar: {
                left:"",
                center: "",
                right:''
                },
                initialView: "timeGridWeek",
                height: "auto",
                themeSystem:"bootstrap",
                initialEvents: this.getEvents2,
                //editable: true,
                //selectable: true,
                //selectMirror: true,
                dayMaxEvents: true,
                weekends: true,
            }
        }
    },
    methods:{
        onSubmit(){
            console.log(this.checkone);
            console.log(this.checktwo);
            var plans = [];
            var index = 0;
            if(this.checktwo){
                index=1;
            }
            var _this = this;
            this.ievent[index].forEach((e)=>{
                plans.push({
                    name:_this.taskName,
                    start:e.start,
                    end:e.end,
                    allday:false
                })
            });
            plans.forEach((p)=>{
                var xhttp = new XMLHttpRequest();
                xhttp.withCredentials = true;
                xhttp.onreadystatechange = function(){
                    if(this.readyState == 4 && this.status == 200){
                        console.log("success");
                    }
                }
                xhttp.open("Post", process.env.VUE_APP_BACKEND+"plan", true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                xhttp.send(JSON.stringify(p));

            })


        },
        getEvents(info, successCallback, failureCallback){
            console.log(info);
            console.log(successCallback);
            console.log(failureCallback);
            var initevents = [[],[]];
            events.forEach((e)=>{
                initevents[0].push(e);
                initevents[1].push(e);
            });
            this.ievent=[[],[]];
            for(var i=0;i<this.res.length;i++){
                for(var k=0;k<this.res[i].length;k++){
                    this.res[i][k].name="NEW PLAN";
                    initevents[i].push(this.res[i][k]);
                    this.ievent[i].push(this.res[i][k]);
                }
            }
            
            successCallback(initevents[0]);
        },
        getEvents2(info, successCallback, failureCallback){
            console.log(info);
            console.log(successCallback);
            console.log(failureCallback);
            var initevents = [[],[]];
            events.forEach((e)=>{
                initevents[0].push(e);
                initevents[1].push(e);
            });
            this.ievent=[[],[]];
            for(var i=0;i<this.res.length;i++){
                for(var k=0;k<this.res[i].length;k++){
                        initevents[i].push(this.res[i][k]);
                        this.ievent[i].push(this.res[i][k]);
                }
            }
            
            successCallback(initevents[1]);
        }
    }
}
</script>

