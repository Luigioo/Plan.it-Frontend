<template>
  <div>
    <b-container fluid>
      <b-row align-v="stretch">
        <b-col cols="2">
          <br />
          <b-button block to="/calendar">Dashboard</b-button>
          <br>
          Add a Task:
          <br><br>
          <b-form ref="form" @submit.stop.prevent="onSubmit">
            <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required">
              <b-form-input id="name-input" v-model="name" required></b-form-input>
            </b-form-group>
            <b-form-group label="Duration(hours)" label-for="duration-input">
              <b-form-input id="duration-input" v-model="duration" type="range" min="1" max="24"></b-form-input>
              <b-form-text>{{duration}} hour(s)</b-form-text>
            </b-form-group>
            <b-form-group label="Type">
              <b-form-select v-model="selected" :options="options"></b-form-select>
            </b-form-group>
          </b-form>
        </b-col>

        <b-col lg>
          <b-card title="Card Title" no-body>
            <b-card-header header-tag="nav">
              <b-nav card-header tabs align="right">
                <b-nav-item to="/login" exact exact-active-class="active"
                  >Log in/Sign up</b-nav-item
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
export default {
  data(){
    return{
      name:"",
      duration:1,
      selected:"",
      options:[
        // { value: null, text: 'Please select a type' },
        { value: 'study', text:'Study'},
        { value: 'shop', text:'Shop'},
        { value: 'play', text:'Play'},
      ]
    }
  }
}
</script>

<style>
</style>
