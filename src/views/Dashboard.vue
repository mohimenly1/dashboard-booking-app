<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <notifications position="top left" classes="my-custom-class" />
      <div v-if="statisticsLoaded" class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="اجمالي الحجوزات"
          :value="totalReservations"
          :percentage="{
            value: `+${totalReservationsPercentage}%`,
            color: totalReservationsPercentage >= 0 ? 'text-success' : 'text-danger',
          }"
          :icon="{
            component: 'ni ni-world',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div v-if="statisticsLoaded" class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="حجوزات قيد الانتظار"
          :value="pendingReservations"
          :percentage="{
            value: `+${pendingReservationsPercentage}%`,
            color: pendingReservationsPercentage >= 0 ? 'text-success' : 'text-danger',
          }"
          :icon="{
            component: 'ni ni-paper-diploma',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div v-if="statisticsLoaded" class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="الحجوزات المؤكدة"
          :value="confirmedReservations"
          :percentage="{
            value: `+${confirmedReservationsPercentage}%`,
            color: confirmedReservationsPercentage >= 0 ? 'text-success' : 'text-danger',
          }"
          :icon="{
            component: 'ni ni-check-bold',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div v-if="statisticsLoaded" class="col-xl-3 col-sm-6 mb-xl-0">
        <mini-statistics-card
          title="الحجوزات الملغاة"
          :value="canceledReservations"
          :percentage="{
            value: `+${canceledReservationsPercentage}%`,
            color: canceledReservationsPercentage >= 0 ? 'text-success' : 'text-danger',
          }"
          :icon="{
            component: 'ni ni-fat-remove',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div v-if="!statisticsLoaded" class="col-12 text-center">
        <p>Loading...</p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-7 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-lg-6">
                <div class="d-flex flex-column h-100">
                  <p class="mb-1 pt-2 text-bold">تم التطوير لصالح</p>
                  <h5 class="font-weight-bolder">مشروع ملعبي</h5>
                  <p class="mb-5">
                    يمكنك اضافة ملاحظتك والمساهمة في اضافة مميزات جديدة للمشروع عبر مراسلتنا
                  </p>
                  <a
                    class="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto"
                    href="javascript:;"
                  >
                    راسلنا
                    <i
                      class="fas fa-arrow-right text-sm ms-1"
                      aria-hidden="true"
                    ></i>
                  </a>
                </div>
              </div>
              <div class="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
                <div class="bg-gradient-success-con border-radius-lg h-100">
                  <img
                    src="../assets/img/shapes/waves-white.svg"
                    class="position-absolute h-100 w-50 top-0 d-lg-block d-none"
                    alt="waves"
                  />
                  <div
                    class="position-relative d-flex align-items-center justify-content-center h-100"
                  >
                    <img
                      class="w-100 position-relative z-index-2 pt-4"
                      src="../assets/img/illustrations/Soccer-bro.svg"
                      alt="rocket"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card h-100 p-3">
          <div
            class="overflow-hidden position-relative border-radius-lg bg-cover h-100"
            style="
              background-image: url('../assets/img/first.jpg');
            "
          >
            <span class="mask bg-gradient-dark"></span>
            <div class="card-body position-relative z-index-1 p-3 h-100">
              <div class="d-flex flex-column h-100">
                <h5 class="text-white font-weight-bolder mb-4 pt-2">
                  العمل مع زملاء مشروعك متاح الان
                </h5>
                <p class="text-white mb-5">
اعثر على اصدقاء النجاح الذين لديهم افكار ابداعية للمساهمة في الاضافة الايجابية ( أندية رياضية - صالات رياضة - مدربين )
                </p>
                <a
                  class="text-white font-weight-bold ps-1 mb-0 icon-move-left mt-auto"
                  href="javascript:;"
                >
                  تصفح
                  <i
                    class="fas fa-arrow-right text-sm ms-1"
                    aria-hidden="true"
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 row">
      <div class="mb-4 col-lg-5 mb-lg-0">
        <div class="card z-index-2">
          <div class="p-3 card-body">
            <reports-bar-chart
              id="chart-bar"
              title="active Users"
              description="(<strong>+23%</strong>) than last week"
              :chart="{
                labels: [
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
                datasets: {
                  label: 'Sales',
                  data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
                },
              }"
              :items="[
                {
                  icon: {
                    color: 'primary',
                    component: faUsers,
                  },
                  label: 'users',
                  progress: { content: '37K', percentage: 60 },
                },
                {
                  icon: { color: 'info', component: faHandPointer },
                  label: 'clicks',
                  progress: { content: '2m', percentage: 90 },
                },
                {
                  icon: { color: 'warning', component: faCreditCard },
                  label: 'Sales',
                  progress: { content: '435$', percentage: 30 },
                },
                {
                  icon: { color: 'danger', component: faScrewdriverWrench },
                  label: 'Items',
                  progress: { content: '43', percentage: 50 },
                },
              ]"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-7">
        <!-- line chart -->
        <div class="card z-index-2">
          <gradient-line-chart
            id="chart-line"
            title="Gradient Line Chart"
            description="<i class='fa fa-arrow-up text-success'></i>
      <span class='font-weight-bold'>4% more</span> in 2021"
            :chart="{
              labels: [
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              datasets: [
                {
                  label: 'Mobile Apps',
                  data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                },
                {
                  label: 'Websites',
                  data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
                },
              ],
            }"
          />
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import { notify } from "@kyvg/vue3-notification";
import  Echo  from "../echo";

import api from "@/api.js";
import US from "../assets/img/icons/flags/US.png";
import DE from "../assets/img/icons/flags/DE.png";
import GB from "../assets/img/icons/flags/GB.png";
import BR from "../assets/img/icons/flags/BR.png";
import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";




export default {
  name: "dashboard-default",
  data() {
    return {
      iconBackground: "bg-gradient-success",
      faCreditCard,
      faScrewdriverWrench,
      faUsers,
      faHandPointer,
      statisticsLoaded: false,
      totalReservations: 0,
      pendingReservations: 0,
      confirmedReservations: 0,
      canceledReservations: 0,
      totalReservationsPercentage: 0,
      pendingReservationsPercentage: 0,
      confirmedReservationsPercentage: 0,
      canceledReservationsPercentage: 0,
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
        },
      },
    };
  },
  components: {
    MiniStatisticsCard,
    ReportsBarChart,
    GradientLineChart,
  

  },
  methods:{
    notifyy(notification="") {
      // Add your notification logic here
      console.log(notification.title, notification.text, notification.type);
    }
  },
  async mounted() {
    
   // const channel = pusher.subscribe('private-reservations');
    console.log(this.notifyy())
    Echo.private('item-channel')
            .listen('ItemCreated', (event) => {
                console.log('Received', event);
                notify({
                    title: 'New Reservation',
                    text: `Reservation created with ID: ${event.reservation.id}`,
                    type: 'success'
                });
            });




        Echo.connector.pusher.connection.bind('connected', () => {
            console.log('Pusher connected');
        });

        Echo.connector.pusher.connection.bind('error', (err) => {
            console.error('Pusher error:', err);
        });

        Echo.connector.pusher.connection.bind('state_change', (states) => {
            console.log('Pusher state change:', states);
        });
    this.$store.state.isRTL = true;
    document.querySelector("html").setAttribute("lang", "ar");
    document.querySelector("html").setAttribute("dir", "rtl");
    document.querySelector("#app").classList.add("rtl");

    try {
      const response = await api.get('/get-status-reservations');
      this.totalReservations = response.data.total_reservations || 0;
      this.pendingReservations = response.data.pending_reservations || 0;
      this.confirmedReservations = response.data.confirmed_reservations || 0;
      this.canceledReservations = response.data.canceled_reservations || 0;

      // Calculate percentages
      const total = this.totalReservations;
      this.totalReservationsPercentage = total !== 0 ? ((total - total) / total) * 100 : 0;
      this.pendingReservationsPercentage = total !== 0 ? ((total - this.pendingReservations) / total) * 100 : 0;
      this.confirmedReservationsPercentage = total !== 0 ? ((total - this.confirmedReservations) / total) * 100 : 0;
      this.canceledReservationsPercentage = total !== 0 ? ((total - this.canceledReservations) / total) * 100 : 0;

      this.statisticsLoaded = true;
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
    }
  },
  beforeUnmount() {

    this.$store.state.isRTL = true;
    document.querySelector("html").removeAttribute("lang");
    document.querySelector("html").removeAttribute("dir");
    document.querySelector("#app").classList.remove("rtl");
  },
};
</script>


<style scoped>
.my-custom-class{
  width: 100px;
  height: 100px;
}
</style>