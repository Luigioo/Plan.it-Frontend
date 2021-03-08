<template>
  <div>
    <b-modal id="select" hide-backdrop content-class="shadow" size="xl">
      <SelectCal :res="res" :taskName="taskName"/>

      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="cancelTask"
          >
            Cancel
          </b-button>
        </div>
      </template>
      <!-- <b-form ref='form' @submit.stop.prevent="onSubmit">

      </b-form> -->
    </b-modal>
    <b-container>
      <b-row align-v="stretch" justify-content-center>

        <b-sidebar id="sidebar1" title="MENU">
          <b-container>
            <br />
            <b-button block to="/calendar">Dashboard</b-button>
            <br>
            
            <b-container>
              Add a Task:
              <br><br>
              <b-form ref="form" @submit.stop.prevent="submitTask">
                <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required">
                  <b-form-input id="name-input" v-model="taskName" required></b-form-input>
                </b-form-group>
                <b-form-group label="Start Date" label-for="start-input" invalid-feedback="Start Date is required">
                  <b-form-input id="start-input" v-model="start" type="date" required></b-form-input>
                </b-form-group>
                <b-form-group label="End Date" label-for="end-input" invalid-feedback="End is required">
                  <b-form-input id="end-input" v-model="end" type="date" required></b-form-input>
                </b-form-group>
                <b-form-group label="Duration(hours)" label-for="duration-input" invalid-feedback="Duration is required">
                  <b-form-input id="duration-input" v-model="duration" type="range" min="1" max="24" required></b-form-input>
                  <b-form-text>{{duration}} hour(s)</b-form-text>
                </b-form-group>
                <b-form-group label="Type">
                  <b-form-select v-model="selected" :options="options"></b-form-select>
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
              </b-form>
            </b-container>
          </b-container>
        </b-sidebar>

      

        <b-col md>
          <b-card title="Card Title" no-body >
            <b-card-header header-tag="nav">
              <b-nav card-header pills align="right">
                <b-nav-item v-b-toggle.sidebar1>Menu</b-nav-item>
                <b-nav-item to="/login" exact exact-active-class="active"
                  >Log in</b-nav-item
                >
                <b-nav-item to="/signup" exact exact-active-class="active"
                  >Sign up</b-nav-item
                >
                <b-nav-item to="/logout" exact exact-active-class="active"
                  >Logout</b-nav-item
                >
              </b-nav>
            </b-card-header>

            <b-card-body>
              <router-view></router-view>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>



  </div>
</template>
<script>
import SelectCal from "@/components/SelectCal";
export default {
  components:{
    SelectCal
  },
  mounted() {

    // var _this = this;
    // _this.$refs.calone.getApi();
    // this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
    //   console.log('Modal is about to be shown', bvEvent, modalId)
    //   if(modalId=="select"){
    //     console.log(_this.name);
    //     _this.$refs.calone.getApi().render();
    //   }
    // })
  },
  data(){
    return{
      name:"app",
      taskName:"",
      start:"",
      end:"",
      duration:1,
      selected:"",
      options:[
        // { value: null, text: 'Please select a type' },
        { value: 'study', text:'Study'},
        { value: 'shop', text:'Shop'},
        { value: 'play', text:'Play'},
      ],
      res:[],
    }
  },
  methods:{
    submitTask(){
      var startStr = this.start+"T09:00:00.000+00:00";
      var endStr = this.end+"T23:59:00.000+00:00";
      console.log(startStr);
      console.log(endStr);
      var msg = {
        name: "default",
        start: startStr,
        end: endStr,
        duration: this.duration
      };
      var xhttp = new XMLHttpRequest();
      xhttp.withCredentials = true;
      var _this = this;
      xhttp.onreadystatechange = function(){
          if(this.readyState == 4 && this.status == 200){
              console.log("200dsf");
              var res = JSON.parse(this.responseText);
              // console.log(res);
              _this.res = res;
              for(var i=0;i<res.length;i++){
                for(var k=0;k<res[i].length;k++){
                  // console.log(res[i][k].start);
                  // console.log(res[i][k].end);
                }
                console.log(" ----- ");
              }
              _this.$bvModal.show("select");
              
          }
      };
      xhttp.open("Post", process.env.VUE_APP_BACKEND+"task", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhttp.send(JSON.stringify(msg));
    },
    cancelTask(){
      console.log("cancel");
      var _this = this;
      _this.$nextTick(() => {
        _this.$bvModal.hide('select');
      });
    }
  }
}

</script>

<style>
</style>
