<template>
    <div>
      <div class="py-4 container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="content-wrapper">
              <div class="content">
                <div class="card card-default">
                  <div class="card-header card-header-border-bottom text-end">
                    <h2>طلبات الحجز هنا</h2>
                    <p class="mb-5">
                      هنا تستطيع العمل على تأكيد حجوزاتك او رفضها
                      <b>باقة ( خدمة )</b>
                    </p>
                  </div>
                  <div class="card-body">
                    <!-- Display booking requests -->
                    <ul v-if="reservations.length" class="list-group">
                      <li v-for="reservation in reservations" :key="reservation.id" class="reservation-item list-group-item">
                        <div class="reservation-details">
                          <p><strong>المستخدم:</strong> {{ reservation.user.name }}</p>
                          <p><strong>التاريخ:</strong> {{ formatDate(reservation.start_time) }}</p>
                          <p><strong>الوقت:</strong> {{ formatTime(reservation.start_time) }} الى {{ formatTime(reservation.end_time) }}</p>
                          <p><strong>السعر:</strong> د.ل{{ reservation.total_price }}</p>
                        </div>
                        <div class="reservation-actions">
                          <button @click="confirmReservation(reservation.id)" :disabled="reservation.status === 'confirmed'" class="btn btn-success">قبول الحجز</button>
                          <button @click="cancelReservation(reservation.id)" :disabled="reservation.status === 'canceled'" class="btn btn-danger">رفض الحجز</button>
                        </div>
                      </li>
                    </ul>
                    <p v-else>No reservations found.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  import { fetchOwnerReservations, confirmReservation, cancelReservation } from '@/api';
  import moment from 'moment';
  export default {
    name: 'Booking',
    data() {
      return {
        reservations: [],
        errorMessage: '',
      };
    },
    methods: {

        formatDate(dateString) {
      return moment(dateString).format('YYYY-MM-DD');
    },
    formatTime(dateString) {
      return moment(dateString).format('HH:mm');
    },
      async loadReservations() {
        try {
            
          const data = await fetchOwnerReservations();
          this.reservations = data;
         
        } catch (error) {
          this.errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
        }
      },
      async confirmReservation(id) {
        try {
          await confirmReservation(id);
          this.loadReservations(); // Reload reservations
        } catch (error) {
          this.errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
        }
      },
      async cancelReservation(id) {
        try {
          await cancelReservation(id);
          this.loadReservations(); // Reload reservations
        } catch (error) {
          this.errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
        }
      },

      resetRTL() {
        this.$store.state.isRTL = true;
        document.querySelector("html").removeAttribute("lang");
        document.querySelector("html").removeAttribute("dir");
        document.querySelector("#app").classList.remove("rtl");
      },
      reloadComponent() {
        this.$store.state.isRTL = true;
        document.querySelector("html").setAttribute("lang", "ar");
        document.querySelector("html").setAttribute("dir", "rtl");
        document.querySelector("#app").classList.add("rtl");
      },
    },
    async mounted() {
      this.reloadComponent();
      await this.loadReservations();
    },
    beforeUnmount() {
      this.resetRTL();
    },
  };
  </script>
  
  
  <style scoped>
  h2 {
    font-family: 'HacenSamra', sans-serif !important;
  }
  
  .container-dash {
    background: rgb(95,250,74);
    background: linear-gradient(90deg, rgba(95,250,74,1) 0%, rgba(108,255,82,1) 15%, rgba(1,255,0,1) 100%);
  }
  
  button {
    font-family: 'TajawalRegular', sans-serif !important;
    text-align: right;
  }
  
  th {
    font-family: 'TajawalRegular', sans-serif !important;
    text-align: right;
  }
  
  .reservation-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .reservation-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 15px;
  }
  
  .reservation-actions {
    display: flex;
    gap: 10px;
  }
  </style>