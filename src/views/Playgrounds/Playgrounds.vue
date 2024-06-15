<template>
    <div :key="componentKey">
      <div class="py-4 container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="content-wrapper">
              <div class="content">
                <div class="card card-default">
                  <div class="card-header card-header-border-bottom text-end">
                    <h2>إضافـة ملعـب</h2>
                    <p class="mb-5">يمكنك اضافة ملعب مع كل اشتراك</p>
                  </div>
                  <div class="card-body">
                    <div class="row mb-4">
                      <div class="col-md-6">
                        <router-link to="/add-playground" class="container-dash btn btn-primary">
                          إضافـة ملعـب جديد
                        </router-link>
                      </div>
                      <div class="col-md-6">
                        <input type="text" v-model="searchQuery" class="form-control" placeholder="ابحث عن ملعب" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th>الاسم</th>
                              <th>الإجراءات</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="playground in filteredPlaygrounds" :key="playground.id">
                              <td>{{ playground.name }}</td>
                              <td>
                                <router-link :to="`/playground/edit/${playground.id}`" class="btn btn-warning">
                                  تعديل
                                </router-link>
                                <button class="btn btn-danger" @click="deletePlayground(playground.id)">
                                  حذف
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
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
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    name: 'Playgrounds',
    data() {
      return {
        componentKey: 0,
        searchQuery: '',
      };
    },
    computed: {
      ...mapGetters(['playgrounds']),
      filteredPlaygrounds() {
        return this.playgrounds.filter(playground =>
          playground.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
      ...mapActions(['fetchPlaygrounds']),
    //   deletePlayground(playgroundId) {
    //     // Implement the logic to delete the playground
    //   },
      showAddPlaygroundModal() {
        // Implement the logic to show add playground modal
      },
      reloadComponent() {
        this.$store.state.isRTL = true;
        document.querySelector("html").setAttribute("lang", "ar");
        document.querySelector("html").setAttribute("dir", "rtl");
        document.querySelector("#app").classList.add("rtl");
        // Any other logic to reload data or reset state
      },
      resetRTL() {
        this.$store.state.isRTL = true;
        document.querySelector("html").removeAttribute("lang");
        document.querySelector("html").removeAttribute("dir");
        document.querySelector("#app").classList.remove("rtl");
      }
    },
    beforeMount() {
      this.reloadComponent();
      this.fetchPlaygrounds(); // Fetch playgrounds before the component mounts
    },
    beforeUnmount() {
      this.resetRTL();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.componentKey += 1; // Change the key to force re-render
        vm.reloadComponent();
      });
    },
    beforeRouteUpdate(to, from, next) {
      this.componentKey += 1; // Change the key to force re-render
      this.reloadComponent();
      next();
    }
  }
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