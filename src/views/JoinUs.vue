<template lang="">
    <div class="overlay">
 
    
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


        <div  data-bs-target="#navbar" data-bs-spy="scroll" tabindex="0">
            <section class="hero-section overflow-hidden position-relative z-0 mb-4 mb-lg-0" id="home">
              <div  class="hero-background bg-gray-100">
                <div class="container">
                  <div class="row gy-4 gy-md-8 pt-9 pt-lg-0">
                    <div class="col-lg-6 text-center text-lg-start">
                      <h1 class="fs-2 fs-lg-1 text-white fw-bold mb-2 mb-lg-x1 lh-base mt-3 mt-lg-0"> إنظم لمجتمع ملعبي ونسق مباراتك</h1>
                      <p class="fs-8 text-white mb-3 mb-lg-4 lh-lg">كصاحب ملعب يمكنك تسجيل ملعبك عبر المنصة وتحديد تفاصيل خدماتك والاستفادة من نظام ادارة مواردك</p>
                      <div class="d-flex justify-content-center justify-content-lg-start"><router-link class="btn btn-primary btn-lg lh-xl mb-4 mb-md-5 mb-lg-7" to="/sign-up" style="background-color: var(--brainwaveio-success); color:white;">الإنظمام كصاحب ملعب</router-link></div>
               
                      <div class="d-flex flex-wrap justify-content-center justify-content-lg-start gap-2 position-relative z-2"><a class="border-0 p-0 bg-transparent cursor-pointer rounded-1" href="#!"> <img class="img-fluid" src="../assets/img/logos/App_Store.webp" alt="assets/img/logos/App_Store.webp" /></a><a class="border-0 p-0 bg-transparent cursor-pointer rounded-1" href="#!"> <img class="img-fluid" src="../assets/img/logos/Play_Store.webp" alt="assets/img/logos/Play_Store.webp" /></a></div>
                    </div>
                    <div class="col-lg-6 position-lg-relative">
                      <div class="position-lg-absolute z-1 text-center"><img class="img-fluid chat-image" src="../assets/img/Frame.webp" alt="" />
                        <div class="position-absolute dots d-none d-md-block"> <img class="img-fluid w-50 w-lg-75" src="../assets/img/illustrations/Dots.webp" alt="" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="position-absolute bottom-0 start-0 end-0 z-1"><img class="wave mb-md-n2" src="../assets/img/illustrations/Wave.svg" alt="" />
                <div class="bg-white py-2 py-md-5"></div>
              </div>
            </section>
  
       
            <section class="bg-300" id="pricing">
              <div class="container py-8 py-lg-10">
                <div class="row justify-content-center">
                  <div class="col-md-8 col-lg-7">
                    <h3 class="fs-4 fs-lg-3 fw-bold text-center mb-2 mb-lg-x1 lh-sm">Pricing made easy</h3>
                    <p class="fs-8 mb-7 mb-lg-8 text-center lh-lg fw-normal">Show your pricing to your customers once they’re here with easily modifiable pricing cards. </p>
                  </div>
                  <div class="col-12">
                    <div class="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
                      <div class="p-x1 text-center price-card-1 bg-transparent border mb-3 mb-md-0 rounded-2 pricing-card">
                        <p class="fs-10 text-uppercase mb-3 fw-bold text-primary ls-2"> Starter</p>
                        <h2 class="mb-3"><span class="fs-6 fs-md-7 fw-bold">$</span><span class="fs-2 fs-md-1 fw-bold">19</span><span class="fs-9 lh-xl font-sans-serif">/ mo</span></h2>
                        <ul class="list-unstyled fs-8 lh-xl fw-light text-1100 ls-1">
                          <li class="py-x1 px-1 border-top"> Upto 100 Team Members </li>
                          <li class="py-x1 px-1 border-top"> 100 GB Cloud Storage </li>
                          <li class="py-x1 px-1 border-top"> Unlimited Meetings </li>
                          <li class="py-x1 px-1 border-top"> Premium Support </li>
                          <li class="mt-1 d-grid"> <button class="btn btn-secondary btn-lg lh-xl">Get Started Now</button></li>
                        </ul>
                      </div>
                      <div class="p-x1 text-center bg-white border shadow-sm rounded-2 pricing-card">
                        <p class="fs-10 text-uppercase mb-3 fw-bold text-primary ls-2"> Unlimited</p>
                        <h2 class="mb-3"><span class="fs-6 fs-md-7 fw-bold">$</span><span class="fs-2 fs-md-1 fw-bold">99</span><span class="fs-9 lh-xl font-sans-serif">/ mo</span></h2>
                        <ul class="list-unstyled fs-8 lh-xl fw-light text-1100 ls-1">
                          <li class="py-x1 px-1 border-top"> Unlimited Team Members </li>
                          <li class="py-x1 px-1 border-top"> Unlimited Cloud Storage </li>
                          <li class="py-x1 px-1 border-top"> Unlimited Meetings </li>
                          <li class="py-x1 px-1 border-top"> Premium Support </li>
                          <li class="mt-1 d-grid"> <button class="btn btn-primary btn-lg lh-xl">Get Started Now</button></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
       
       
          </div>

          

</div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
h1{
    color:#5d5d5d !important;
    text-align: right;
}
p{
    color:#5d5d5d !important;
    text-align: right;
}
a{
    font-family: 'TajawalBold', sans-serif !important;
    color: #00bfa6 ;
}
.overlay {
 
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
</style>