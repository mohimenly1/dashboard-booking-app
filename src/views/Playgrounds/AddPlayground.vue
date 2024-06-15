<template>
    <div>
      <div class="py-4 container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="content-wrapper">
              <div class="content">
                <div class="card card-default">
                  <div class="card-header card-header-border-bottom text-end">
                    <h2>إضافـة ملعـب</h2>
                    <p class="mb-5">
                      يمكنك اضافة ملعب مع كل اشتراك انت مشترك الأن بباقة
                      <b>( خدمة )</b>
                    </p>
                  </div>
                  <div class="card-body">
                    <form @submit.prevent="submitForm" class="text-end">
                      <div class="form-group">
                        <label for="name">اسم الملعب</label>
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          v-model="formData.name"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="description">الوصف</label>
                        <textarea
                          class="form-control"
                          id="description"
                          v-model="formData.description"
                          required
                        ></textarea>
                      </div>
                      <div class="form-group">
                        <label for="price_per_half_hour">سعر نصف ساعة</label>
                        <input
                          type="number"
                          class="form-control"
                          id="price_per_half_hour"
                          v-model="formData.price_per_half_hour"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="price_per_hour">سعر الساعة</label>
                        <input
                          type="number"
                          class="form-control"
                          id="price_per_hour"
                          v-model="formData.price_per_hour"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="images">الصور</label>
                        <input
                          type="file"
                          class="form-control"
                          id="images"
                          @change="handleFileUpload"
                          multiple
                        />
                        <ul>
                          <li v-for="(image, index) in formData.images" :key="index">
                            <img :src="image.preview" :alt="image.name" width="100" />
                            <p>{{ image.name }}</p>
                            <button type="button" @click="removeImage(index)">إزالة</button>
                          </li>
                        </ul>
                      </div>
                      <div class="form-group">
                        <label for="open_time">وقت الفتح</label>
                        <input
                          type="time"
                          class="form-control"
                          id="open_time"
                          v-model="formData.open_time"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="close_time">وقت الإغلاق</label>
                        <input
                          type="time"
                          class="form-control"
                          id="close_time"
                          v-model="formData.close_time"
                          required
                        />
                      </div>
                      <button type="submit" class="btn btn-success">إرسال</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal for errors -->
      <div v-if="errorMessage" class="modal fade show" style="display: block;" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">خطأ</h5>
            </div>
            <div class="modal-body">
              <p>{{ errorMessage }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="errorMessage = ''">إغلاق</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '@/api';
  
  export default {
    name: 'add-playground',
    data() {
      return {
        formData: {
          name: '',
          description: '',
          price_per_half_hour: '',
          price_per_hour: '',
          images: [],
          open_time: '',
          close_time: '',
        },
        errorMessage: '',
      };
    },
    methods: {
      async submitForm() {
        try {
          const formData = new FormData();
          for (const key in this.formData) {
            if (key === 'images') {
              this.formData.images.forEach((image) => {
                formData.append('images[]', image.file); // Append the file object
              });
            } else {
              formData.append(key, this.formData[key]);
            }
          }
  
          const response = await api.post('/add-playground', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          console.log('Playground created:', response.data);
          // Clear form after submission
          this.formData = {
            name: '',
            description: '',
            price_per_half_hour: '',
            price_per_hour: '',
            images: [],
            open_time: '',
            close_time: '',
          };
        } catch (error) {
          this.errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
        }
      },
      handleFileUpload(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          this.formData.images.push({
            file: file,
            name: file.name,
            preview: URL.createObjectURL(file),
          });
        }
      },
      removeImage(index) {
        this.formData.images.splice(index, 1);
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
      // Any other logic to reload data or reset state
    },
    },

    beforeMount() {
    this.reloadComponent();
  },
  beforeUnmount() {
    this.resetRTL();
  },
  };
  </script>
  
<style scoped>
    h2{
        font-family: 'HacenSamra', sans-serif !important;
    }

    .container-dash{
        background: rgb(95,250,74);
        background: linear-gradient(90deg, rgba(95,250,74,1) 0%, rgba(108,255,82,1) 15%, rgba(1,255,0,1) 100%); 
    }

    button{
        font-family: 'TajawalRegular', sans-serif !important;
        text-align: right;
    }

    th{
        font-family: 'TajawalRegular', sans-serif !important;
        text-align: right;
    }
</style>