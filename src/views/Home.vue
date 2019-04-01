<template>
   <div id="home">
        <home-nav/>
       <header>
         <div class="header-img"> </div>
          <div class="section">
              <div class="container">
                <h1 class="header center black-text">ESI IOT-Platform</h1>
                <div class="row">
                  <h5 class="header col s12"><i class="small material-icons">check_box</i> Collect your data from sensors</h5>
                  <h5 class="header col s12"><i class="small material-icons">check_box</i> Visualize, analyse and protect your data</h5>
                  <h5 class="header col s12"><i class="small material-icons">check_box</i> Controle your IOT devices remotely </h5>
                </div>
                <div class="center">
                   <router-link to="/auth" class="btn-large waves-effect waves-light">
                        Get Started
                  </router-link>
                </div>
            </div>
           </div>
       </header>
       <br><br><br>

    <div class="section">
      <div class="container">
          <div class="row">
            <div class="col s12 m4">
              <div>
                <h2 class="center indigo-text"><i class="large material-icons">settings_input_antenna</i></h2>
                <h5 class="center">Collect data</h5>

                <p class="light"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam tenetur, doloremque, modi aut maiores asperiores molestiae delectus eligendi architecto amet doloribus soluta nesciunt! Odit cupiditate sed quae! Earum, praesentium illum.</p>
              </div>
            </div>

            <div class="col s12 m4">
              <div>
                <h2 class="center indigo-text"><i class="large material-icons">pie_chart</i></h2>
                <h5 class="center">Analyze and visualize your data </h5>

                <p class="light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut tempora porro itaque mollitia soluta minima sint, sed alias? Vitae amet beatae nam praesentium deleniti quod. Pariatur quasi amet facere officiis?</p>
              </div>
            </div>

            <div class="col s12 m4">
              <div>
                <h2 class="center indigo-text"><i class="large material-icons">settings</i></h2>
                <h5 class="center">Controle IOT devices</h5>

                <p class="light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis aut soluta cumque isquam asperiores nemo minima! Necessitatibus optio repellat accusamus!</p>
              </div>
            </div>
          </div>
        </div>
  </div>

  <footer class="page-footer orange">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">ESI IOT-platform</h5>
          <p class="grey-text text-lighten-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. At voluptas sunt accusantium ducimus velit repudiandae dolorum vero molestias quidem ut. Quis, ad natus. Itaque deleniti commodi, voluptates officiis maxime quia.</p>


        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Settings</h5>
          <ul>
            <li><router-link to="#" class="white-text">Link 1</router-link></li>
            <li><router-link to="#" class="white-text">Link 2</router-link></li>
            <li><router-link to="#" class="white-text">Link 3</router-link></li>
          </ul>
        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Connect</h5>
          <ul>
            <li><router-link to="#" class="white-text">Link 1</router-link></li>
            <li><router-link to="#" class="white-text">Link 2</router-link></li>
            <li><router-link to="#" class="white-text">Link 3</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
      All rights are reserved <router-link to="#" class="orange-text text-lighten-3">ESI SBA</router-link>
      </div>
    </div>
  </footer>

   </div>
</template>

<script>
import HomeNav from '../components/HomeNav'
export default {
  name: 'home',
  components: {
    'home-nav': HomeNav
  }
}
</script>


<style scoped>

.header-img {
  position: absolute;
  background:url(../assets/images/header6.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 500px;
  width: 100%;
  z-index: -1;
  opacity: 0.5;

}

</style>
