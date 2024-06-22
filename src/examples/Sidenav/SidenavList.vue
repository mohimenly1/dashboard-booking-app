<template>
  <div>
    <div
      class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
      id="sidenav-collapse-main"
    >
      <ul class="navbar-nav">
        <li class="nav-item">
          <sidenav-collapse navText="لوحة التحكم" :to="{ name: 'Dashboard' }">
            <template #icon>
              <shop />
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <sidenav-collapse navText="ملعبك" :to="{ name: 'Playgrounds' }">
            <template #icon>
              <soccer />
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <sidenav-collapse navText="الحجوزات" :to="{ name: 'Booking' }">
            <template #icon>
              <Booking />
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <sidenav-collapse navText="الجداول" :to="{ name: 'Tables' }">
            <template #icon>
              <office />
            </template>
          </sidenav-collapse>
        </li>
        <li class="nav-item">
          <sidenav-collapse navText="المحفظة" :to="{ name: 'Billing' }">
            <template #icon>
              <credit-card />
            </template>
          </sidenav-collapse>
        </li>

        <li class="mt-3 nav-item">
          <h6
            class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
            :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
          >
            واجهات أخرى
          </h6>
        </li>
        <li class="nav-item">
          <sidenav-collapse navText="الملف الشخصي" :to="{ name: 'Profile' }">
            <template #icon>
              <customer-support />
            </template>
          </sidenav-collapse>
        </li>
      </ul>
    </div>
    <div class="pt-3 mx-3 mt-3 sidenav-footer">
      <sidenav-card
        :class="cardBg"
        textPrimary="Need Help?"
        textSecondary="Please check our docs"
        route="https://www.creative-tim.com/learning-lab/vue/overview/soft-ui-dashboard/"
        label="Documentation"
        icon="ni ni-diamond"
      />
    </div>
    <div class="pt-3 mx-3 mt-3 sidenav-footer">
      <!-- Logout Button -->
      <button class="Btn" @click="handleLogout">
        <div class="sign">
          <svg viewBox="0 0 512 512">
            <path
              d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
            />
          </svg>
        </div>
        <div class="text">تسجيل الخروج</div>
      </button>
    </div>
  </div>
</template>

<script>
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCard from "./SidenavCard.vue";
import Shop from "../../components/Icon/Shop.vue";
import Office from "../../components/Icon/Office.vue";
import Soccer from "../../components/Icon/Soccer.vue";
import Booking from "../../components/Icon/Booking.vue";
import CreditCard from "../../components/Icon/CreditCard.vue";
import CustomerSupport from "../../components/Icon/CustomerSupport.vue";
import { mapActions } from 'vuex';

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavCollapse,
    SidenavCard,
    Shop,
    Office,
    Soccer,
    CreditCard,
    CustomerSupport,
    Booking
  },
  methods: {
    ...mapActions(['logout']),
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    async handleLogout() {
      try {
        await this.logout();
        this.$router.push({ name: 'HomePage' });
      } catch (error) {
        console.error('Logout failed', error);
        alert('Logout failed. Please try again.');
      }
    },
    beforeMount() {
    this.$store.state.isRTL = true;
    document.querySelector("html").setAttribute("lang", "ar");
    document.querySelector("html").setAttribute("dir", "rtl");
    document.querySelector("#app").classList.add("rtl");
  },
  beforeUnmount() {
    this.$store.state.isRTL = true;
    document.querySelector("html").removeAttribute("lang");
    document.querySelector("html").removeAttribute("dir");
    document.querySelector("#app").classList.remove("rtl");
  },
  },
};
</script>
