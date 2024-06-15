<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow" btn-background="bg-gradient-success" :dark-mode="true" v-if="showNavbar" />
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
                    مرحباً بعودتك
                  </h3>
                  <p class="mb-0">ادخل رقم هاتفك وكلمة المرور لتسجيل دخولك</p>
                </div>
           <div class="card-body">
                  <form @submit.prevent="handleLogin" role="form" class="text-end">
                    <label>رقم الهاتف</label>
                    <input class="form-control" v-model="phone" type="text" placeholder="رقم الهاتف" />
                    <label>كلمة المرور</label>
                    <input  class="form-control" v-model="password" type="password" placeholder="كلمة المرور" />
                    <div class="text-center">
                      <soft-button class="my-4 mb-2" variant="gradient" color="success" full-width>تسجيل الدخول</soft-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    ليس لديك حساب ?
                    <router-link :to="{ name: 'SignUp' }" class="text-success text-gradient font-weight-bold">سجل الان</router-link>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8">
                <div class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" :style="{ backgroundImage: 'url(' + require('@/assets/img/cover2.jpg') + ')' }"></div>
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
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";

import SoftButton from "@/components/SoftButton.vue";
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "SignIn",
  components: {
    Navbar,
    AppFooter,

    SoftButton,
  },
  data() {
    return {
      phone: '',
      password: '',
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
</style>