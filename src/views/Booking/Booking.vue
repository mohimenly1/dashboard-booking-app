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
                  <div class="row">
                    تحقق من صحة الحجز :    
                    <button @click="openQrScanner" class="button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" class="svg-icon">
                        <g stroke-width="2" stroke-linecap="round" stroke="#fff" fill-rule="evenodd" clip-rule="evenodd">
                          <path d="m4 9c0-1.10457.89543-2 2-2h2l.44721-.89443c.33879-.67757 1.03131-1.10557 1.78889-1.10557h3.5278c.7576 0 1.4501.428 1.7889 1.10557l.4472.89443h2c1.1046 0 2 .89543 2 2v8c0 1.1046-.8954 2-2 2h-12c-1.10457 0-2-.8954-2-2z"></path>
                          <path d="m15 13c0 1.6569-1.3431 3-3 3s-3-1.3431-3-3 1.3431-3 3-3 3 1.3431 3 3z"></path>
                        </g>
                      </svg>
                      <span class="label">check reservation</span>
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <!-- Display booking requests -->
                  <ul v-if="reservations.length" class="list-group">
                    <li v-for="reservation in reservations" :key="reservation.id" class="reservation-item list-group-item">
                      <div class="reservation-details">
                        <p><strong>المستخدم:</strong> {{ reservation.user.name }}</p>
                        <p><strong>رقم الهاتف:</strong> {{ reservation.user.phone }}</p>
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
    <!-- QR Code Scanner Modal -->
    <div v-if="qrScannerVisible" class="qr-scanner-modal">
      <qrcode-stream 
      :formats="selectedBarcodeFormats"
      :track="trackFunctionSelected.value"
      @decode="onDecode" @init="onInit" @detect="onDetect" @error="onError"></qrcode-stream>
      <button @click="closeQrScanner" class="btn btn-secondary">Close Scanner</button>
    </div>
    <!-- Dialog for displaying QR code data -->
    <el-dialog v-model="dialogVisible" title="Reservation Details">
      <p><strong>المستخدم:</strong> {{ decodedData.user_id }}</p>
      <p><strong>Playground ID:</strong> {{ decodedData.playground_id }}</p>
      <p><strong>Start Time:</strong> {{ decodedData.start_time }}</p>
      <p><strong>End Time:</strong> {{ decodedData.end_time }}</p>
      <p><strong>Total Price:</strong> {{ decodedData.total_price }}</p>
      <p><strong>Status:</strong> {{ decodedData.status }}</p>
      <span  class="dialog-footer">
        <el-button @click="dialogVisible = false">Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchOwnerReservations, confirmReservation, cancelReservation } from '@/api';
import { QrcodeStream  } from 'vue-qrcode-reader';
import { ElDialog, ElButton } from 'element-plus';
import moment from 'moment';
import {ref} from 'vue';

export default {
  name: 'Booking',
  components: {
    QrcodeStream,
    ElDialog,
    ElButton,
  },
  data() {
    return {
      reservations: [],
      errorMessage: '',
      qrScannerVisible: false,
      dialogVisible: false,
      decodedData: {},

      trackFunctionOptions: [
        { text: 'nothing (default)', value: undefined },
        { text: 'outline', value: this.paintOutline },
        { text: 'centered text', value: this.paintCenterText },
        { text: 'bounding box', value: this.paintBoundingBox }
      ],
      trackFunctionSelected: ref({ text: 'outline', value: this.paintOutline }),

      barcodeFormats: {
        aztec: false,
        code_128: false,
        code_39: false,
        code_93: false,
        codabar: false,
        databar: false,
        databar_expanded: false,
        data_matrix: false,
        dx_film_edge: false,
        ean_13: false,
        ean_8: false,
        itf: false,
        maxi_code: false,
        micro_qr_code: false,
        pdf417: false,
        qr_code: true,
        rm_qr_code: false,
        upc_a: false,
        upc_e: false,
        linear_codes: false,
        matrix_codes: false
      }
    
    };
  },
  methods: {
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

        ctx.strokeStyle = 'red';

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },
    paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height }
        } = detectedCode;

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#007bff';
        ctx.strokeRect(x, y, width, height);
      }
    },
    paintCenterText(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const { boundingBox, rawValue } = detectedCode;

        const centerX = boundingBox.x + boundingBox.width / 2;
        const centerY = boundingBox.y + boundingBox.height / 2;

        const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width);

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#35495e';
        ctx.strokeText(detectedCode.rawValue, centerX, centerY);

        ctx.fillStyle = '#5cb984';
        ctx.fillText(rawValue, centerX, centerY);
      }
    },
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
    openQrScanner() {
      this.qrScannerVisible = true;
    },
    closeQrScanner() {
      this.qrScannerVisible = false;
    },
    onDecode(result) {
      console.log('Decoded QR Code:', result); // Debugging output
      this.closeQrScanner();
      // Handle the reservation data from the QR code
      try {
        this.decodedData = JSON.parse(result);
        this.dialogVisible = true;
      } catch (error) {
        alert('Invalid QR code format');
      }
    },
    onInit(promise) {
      promise.catch(error => {
        if (error.name === 'NotAllowedError') {
          alert('User denied camera access');
        } else if (error.name === 'NotFoundError') {
          alert('No camera found on this device');
        } else {
          alert('Error initializing camera: ' + error.message);
        }
      });
    },
    onError(error) {
      console.error('QR Code reading error:', error); // Debugging output
      alert('Error reading QR code: ' + error.message);
    },
    onDetect(result) {
      console.log('QR Code detected but not yet decoded:', result); // Debugging output
      this.decodedData = JSON.stringify(result);
      this.dialogVisible = true;
     // this.closeQrScanner();
      
    },
    resetRTL() {
      this.$store.state.isRTL = true;
      document.querySelector('html').removeAttribute('lang');
      document.querySelector('html').removeAttribute('dir');
      document.querySelector('#app').classList.remove('rtl');
    },
    reloadComponent() {
      this.$store.state.isRTL = true;
      document.querySelector('html').setAttribute('lang', 'ar');
      document.querySelector('html').setAttribute('dir', 'rtl');
      document.querySelector('#app').classList.add('rtl');
    },
  },
  async mounted() {
    this.reloadComponent();
    await this.loadReservations();
  },
  beforeUnmount() {
    this.resetRTL();
  },
  computed:{
    selectedBarcodeFormats() {
      return Object.keys(this.barcodeFormats).filter((format) => this.barcodeFormats[format]);
    }
  }
};
</script>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 12px;
  gap: 8px;
  height: 40px;
  width: 172px;
  border: none;
  background: rgb(95,250,74);
  background: linear-gradient(90deg, rgba(95,250,74,1) 0%, rgba(108,255,82,1) 15%, rgba(1,255,0,1) 100%);
  border-radius: 20px;
  cursor: pointer;
}
.lable {
  line-height: 22px;
  font-size: 17px;
  color: #fff;
  font-family: sans-serif;
  letter-spacing: 1px;
}
.button:hover {
  background: rgb(95,250,74);
  background: linear-gradient(90deg, rgba(95,250,74,1) 0%, rgba(108,255,82,1) 15%, rgba(1,255,0,1) 100%);
}
.button:hover .svg-icon {
  animation: flickering 2s linear infinite;
}
@keyframes flickering {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  52% {
    opacity: 1;
  }
  54% {
    opacity: 0;
  }
  56% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  92% {
    opacity: 0;
  }
  94% {
    opacity: 1;
  }
  96% {
    opacity: 0;
  }
  98% {
    opacity: 1;
  }
  99% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
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
.qr-scanner-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>
