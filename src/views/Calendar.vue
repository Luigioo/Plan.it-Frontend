<template>
  <div>
    <FullCalendar :options="calendarOptions" />

    <b-modal id="add" hide-backdrop content-class="shadow" @ok="handleOk">
      <b-form ref="form" @submit.stop.prevent="onSubmit">
        <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required" >
          <b-form-input id="name-input" v-model="name" required></b-form-input>
        </b-form-group>
        
        <b-form-group label="Start Time" label-for="start-input">
          <b-form-input id="start-input" v-model="start" type="time"></b-form-input>
        </b-form-group>
        <b-form-group label="End Time" label-for="time-input">
          <b-form-input id="end-input" v-model="end" type="time"></b-form-input>
        </b-form-group>
        <b-form-checkbox id="allday" v-model="allday" name="allday">
          All day event
        </b-form-checkbox>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import { INITIAL_EVENTS } from "../scripts/event_utils";
import { loadEvents,deletePlan } from "../scripts/plans";
export default {
  mounted(){
    
  },
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      name:'',
      start: null,
      end: null,
      selectInfo: null,
      
      allday: true,
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        initialView: "dayGridMonth",
        height: "auto",
        events: loadEvents,
        // initialEvents: INITIAL_EVENTS,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        navLinks: true,
        navLinksDayClick: this.changeDayView,
      },
      plans: [],
      currentEvents: [],
    };
  },
  methods: {
    
    handleOk(bvModalEvt){
      bvModalEvt.preventDefault()
      this.onSubmit()
    },
    validationCheck(){
      if(this.name==null||this.name.length<=0){
        return false;
      }else{
        return true;
      }
    },
    onSubmit() {
      if(!this.validationCheck()){
        return;
      }
      var startStr = "";
      var endStr = "";
      if(this.allday){
        startStr = this.selectInfo.startStr+"T"+"00:00:00.000+00:00";
        endStr = this.selectInfo.startStr+"T"+"23:59:59.000+00:00";
      }else{
        if(this.start!=null){
          startStr=this.selectInfo.startStr+"T"+this.start+":00.000+00:00";
        }
        if(this.end!=null){
          var yesterday=this.selectInfo.end;
          yesterday.setDate(yesterday.getDate()-1);
          // var arr=endStr.split("-");
          
          endStr=yesterday.toISOString().split("T")[0]+"T"+this.end+":00.000+00:00";
          console.log(endStr);
          console.log(startStr);
        }
      }
      var xhttp = new XMLHttpRequest();
      xhttp.withCredentials = true;
      var _this = this;
      xhttp.onreadystatechange = function(){
          if(this.readyState == 4 && this.status == 200){
              console.log("200dsf");
              var cal = _this.selectInfo.view.calendar;
              // var insertedPlan = JSON.parse(this.responseText);
              cal.refetchEvents();
              // cal.addEvent({
              //   id: insertedPlan.id,
              //   title: _this.name,
              //   allDay: insertedPlan.allday,
              //   start: startStr,
              //   end: endStr,
              // })
              _this.$nextTick(() => {
                  _this.$bvModal.hide('add');
              });
          }
      };
      xhttp.open("Post", process.env.VUE_APP_BACKEND+"plan", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      var msg = {
        name:this.name,
        start:startStr,
        end:endStr,
        allday: this.allday
      };
      xhttp.send(JSON.stringify(msg));


      // this.$nextTick(() => {
      //     this.$bvModal.hide('modal-prevent-closing')
      // })
      
      
    },
    onReset() {},
    changeDayView(date, jsEvent, calendar) {
      console.log(jsEvent);
      console.log(date);

      calendar.changeView("timeGridDay", "2021-01-01");
    },
    handleDateSelect(selectInfo) {
      //let calendarApi = selectInfo.view.calendar;
      // console.log("start: "+selectInfo.startStr+" ola "+selectInfo.end);
      this.selectInfo = selectInfo;
      this.allday = true;
      this.$bvModal.show("add");
    },

    handleEventClick(clickInfo) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        deletePlan(clickInfo.event.id);
        clickInfo.event.remove();

      }
    },

    handleEvents(events) {
      this.currentEvents = events;
    },
  },
};
</script>
