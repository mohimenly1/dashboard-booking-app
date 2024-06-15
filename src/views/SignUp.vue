<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <nav>
          <div>
            <div class="svg-container">
              <img style="height: 30px;" src="../assets/img/logo.png"/>
            </div>
            <!-- <div>الملعب ملعبك</div> -->
          </div>
          <div>
  
          <!-- Icons -->
  
          <div class="svg-container">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <div class="svg-container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
              </svg>
            </div>
  
  
          
            <router-link to="/contact">تواصل معنا</router-link>
            <router-link to="/help">المساعدة</router-link>
            <router-link to="/community">المجتمع</router-link>
            <router-link to="/join">الإنظمام</router-link>
            <router-link to="/terms">شروط وأحكام</router-link>
            <router-link to="/">الرئيسية</router-link>
  
          </div>
        </nav>
      </div>
    </div>
  </div>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-end">
                  <h3 class="font-weight-bolder text-success text-gradient">
                    مرحبـاً بك، الانظمام متاح في الوقت الذي يناسبك
                  </h3>
                  <p class="mb-0">ادخل رقم هاتفك وكلمة المرور لتسجيل دخولك</p>
                </div>
                <div class="card-body">
                  <form @submit.prevent="handleLogin" role="form" class="text-end">
                    <label >رقم الهاتف</label>
                    <soft-input v-model="phone" type="text" placeholder="رقم الهاتف" />
                    <label>كلمة المرور</label>
                    <soft-input v-model="password" type="password" placeholder="كلمة المرور" />
                    <label>تأكيد كلمة المرور</label>
                    <soft-input v-model="password" type="password" placeholder="أعد كتابة كلمة المرور" />
                   
                    <div class="text-center">
                      <soft-button class="my-4 mb-2" variant="gradient" color="success" full-width>إشترك الأن</soft-button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
            <div class="col-md-6">
              <div class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8">
                <div class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" :style="{ backgroundImage: 'url(' + require('@/assets/img/cover5.jpg') + ')' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <app-footer v-if="showFooter" />
</template>

<script>

import AppFooter from "@/examples/PageLayout/Footer.vue";
import SoftInput from "@/components/SoftInput.vue";

import SoftButton from "@/components/SoftButton.vue";
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "SignUp",
  components: {

    AppFooter,
    SoftInput,

    SoftButton,
  },
  data() {
    return {
      phone: '',
      password: '',
      rememberMe: false,
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      try {
        await this.login({ phone: this.phone, password: this.password });
        this.$router.push({ name: 'Dashboard' });
      } catch (error) {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    },
  },
  computed: {
    ...mapGetters(['showNavbar', 'showFooter']),
  },
  created() {
    this.$store.commit('LOGOUT'); // Ensure components are hidden on the login page
  },
};
</script>
<style scoped>
h3{
  font-family: 'TajawalRegular', sans-serif !important;
}

label{
  font-family: 'TajawalRegular', sans-serif !important;
}

.form-control::placeholder {
  font-family: 'TajawalRegular', sans-serif !important;
  text-align: right;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999; /* Ensure it is above all other elements */
  pointer-events: none; /* Allows clicks to pass through */
}

.overlay * {
  pointer-events: auto; /* Re-enable pointer events for child elements */
}
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500&display=swap");
div {

  color: #FFFFFFDD;
  font-family: 'TajawalRegular', sans-serif !important;
  
}

a{
    font-family: 'TajawalBold', sans-serif !important;
    color: #00bfa6;
}


nav {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 36px;
  font-weight: 500;

}
nav svg {
  width: 20px;
  height: 20px;
}
nav .svg-container {
  width: 20px;
  height: 20px;
}
nav > div {
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  font-size: 14px;
}
nav > div:first-child {
  gap: 10px;
}
nav > div:last-child {
  gap: 24px;
}
nav > div:last-child > .active {
  position: relative;
}
nav > div:last-child > .active:after {
  bottom: -8px;
  left: 0;
  right: 0;
  position: absolute;
  content: "";
  height: 3px;
  border-radius: 99px;
  background-color: #ecad29;
}


.container {
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
}
/* Small */
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
/* Medium */
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
/* Large */
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
/* End Global Rules */

/* Start Landing Page */
.landing-page header {
  min-height: 80px;
  display: flex;
}
@media (max-width: 767px) {
  .landing-page header {
    min-height: auto;
    display: initial;
  }
}
.landing-page header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
@media (max-width: 767px) {
  .landing-page header .container {
    flex-direction: column;
    justify-content: center;
  }
}
.landing-page header .logo {
  color: #5d5d5d;
  font-style: italic;
  text-transform: uppercase;
  font-size: 20px;
}
@media (max-width: 767px) {
  .landing-page header .logo {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
.landing-page header .links {
  display: flex;
  align-items: center;
}
@media (max-width: 767px) {
  .landing-page header .links {
    text-align: center;
    gap: 10px;
  }
}
.landing-page header .links li {
  margin-left: 30px;
  color: #5d5d5d;
  cursor: pointer;
  transition: .3s;
}
@media (max-width: 767px) {
  .landing-page header .links li {
    margin-left: auto;
  }
}
.landing-page header .links li:last-child {
  border-radius: 20px;
  padding: 10px 20px;
  color: #FFF;
  background-color: #6c63ff;
}
.landing-page header .links li:not(:last-child):hover {
  color: #6c63ff;
}
.landing-page .content .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 140px;
  min-height: calc(100vh - 80px);
}
@media (max-width: 767px) {
  .landing-page .content .container {
    gap: 0;
    min-height: calc(100vh - 101px);
    justify-content: center;
    flex-direction: column-reverse;
  }
}
@media (max-width: 767px) {
  .landing-page .content .info {
    text-align: center;
    margin-bottom: 15px 
  }
}
.landing-page .content .info h1 {
  color: #5d5d5d;
  font-size: 44px;
}
.landing-page .content .info p {
  margin: 0;
  line-height: 1.6;
  font-size: 15px;
  color: #5d5d5d;
}
.landing-page .content .info button {
  font-family: 'TajawalBold', sans-serif !important;
  border: 0;
  border-radius: 20px;
  padding: 12px 30px;
  margin-top: 30px;
  cursor: pointer;
  color: #FFF;
  background-color: #00bfa6;
}
.landing-page .content .image img {
  max-width: 100%;
}
/* End Landing Page */
</style>