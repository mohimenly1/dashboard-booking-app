<template>
    <div>
      <div class="py-4 container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="content-wrapper">
              <div class="content">
                <div class="card card-default">
                  <div class="card-header card-header-border-bottom text-end">
                    <h2>تعديل الملعب</h2>
                    <p class="mb-5">يمكنك تعديل تفاصيل الملعب هنا</p>
                  </div>
                  <div class="card-body">
                    <form @submit.prevent="submitUpdate" class="text-end">
                      <div class="form-group">
                        <label for="name">اسم الملعب</label>
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          v-model="playground.name"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="description">الوصف</label>
                        <textarea
                          class="form-control"
                          id="description"
                          v-model="playground.description"
                          required
                        ></textarea>
                      </div>
                      <div class="form-group">
                        <label for="price_per_half_hour">سعر نصف ساعة</label>
                        <input
                          type="number"
                          class="form-control"
                          id="price_per_half_hour"
                          v-model="playground.price_per_half_hour"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="price_per_hour">سعر الساعة</label>
                        <input
                          type="number"
                          class="form-control"
                          id="price_per_hour"
                          v-model="playground.price_per_hour"
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
                          <li v-for="(image, index) in playground.images" :key="index">
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
                          v-model="playground.open_time"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="close_time">وقت الإغلاق</label>
                        <input
                          type="time"
                          class="form-control"
                          id="close_time"
                          v-model="playground.close_time"
                          required
                        />
                      </div>
                      <button type="submit" class="btn btn-success">تحديث</button>
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
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        playground: {
          name: '',
          description: '',
          price_per_half_hour: 0,
          price_per_hour: 0,
          open_time: '',
          close_time: '',
          images: [],
        },
        errorMessage: ''
      };
    },
    computed: {
      ...mapGetters(['playgrounds']),
    },
    methods: {
      ...mapActions(['updatePlayground']), // Renamed action to avoid conflicts
  
      fetchPlaygroundDetails() {
        const id = this.$route.params.id;
        const playground = this.playgrounds.find(playground => playground.id === parseInt(id));
        if (playground) {
          this.playground = { ...playground };
        }
      },
  
      async submitUpdate() { // Renamed method
        try {
          await this.updatePlayground({ id: this.playground.id, data: this.playground });
          // Optionally, you can redirect the user after successful update
        //   this.$router.push('/playgrounds');
        } catch (error) {
          this.errorMessage = error.response.data.error || 'An error occurred.';
        }
      },
  
      handleFileUpload(event) {
    const files = event.target.files;
    this.playground.images = [];
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.playground.images.push({
                name: files[i].name,
                preview: e.target.result
            });
        };
        reader.readAsDataURL(files[i]);
    }
    // Convert images array to JSON string before sending
    this.playground.images = JSON.stringify(this.playground.images);
},
  
      removeImage(index) {
        this.playground.images.splice(index, 1);
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
      }
    },
    beforeMount() {
      this.reloadComponent();
    },
    beforeUnmount() {
      this.resetRTL();
    },
    created() {
      this.fetchPlaygroundDetails();
    },
  };
  </script>
  