<template>
    <div class="overlay">
      <div class="indicator"></div>
  
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
          <router-link class="active">الرئيسية</router-link>

        </div>
      </nav>
  
      <div id="demo">
        <div v-for="(item, index) in data" :key="index" :id="'card' + index" class="card" :style="getCardStyle(index, item.image)"></div>
        <div v-for="(item, index) in data" :key="'content-' + index" :id="'card-content-' + index" class="card-content" :style="getCardContentStyle(index)">
          <div class="content-start"></div>
          <div class="content-place">{{ item.place }}</div>
          <div class="content-title-1">{{ item.title }}</div>
          <div class="content-title-2">{{ item.title2 }}</div>
        </div>
      </div>
  
      <div class="details" id="details-even">
        <div class="place-box">
          <div class="text">{{ currentCard.place }}</div>
        </div>
        <div class="title-box-1"><div class="title-1">{{ currentCard.title }}</div></div>
        <div class="title-box-2"><div class="title-2">{{ currentCard.title2 }}</div></div>
        <div class="desc">{{ currentCard.description }}</div>
        <div class="cta">
          <button class="bookmark">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
            </svg>
          </button>

          <soft-button class="my-4 mb-2 discover" variant="gradient" color="success" full-width>تحميـل التطبيق الأن</soft-button>
        </div>
      </div>
  
      <div class="details" id="details-odd">
        <div class="place-box">
          <div class="text">{{ currentCard.place }}</div>
        </div>
        <div class="title-box-1"><div class="title-1">{{ currentCard.title }}</div></div>
        <div class="title-box-2"><div class="title-2">{{ currentCard.title2 }}</div></div>
        <div class="desc">{{ currentCard.description }}</div>
        <div class="cta">
          <button class="bookmark">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
            </svg>
          </button>
          <soft-button class="my-4 mb-2 discover" variant="gradient" color="success" full-width>تحميـل التطبيق الأن</soft-button>
        </div>
      </div>
  
      <div class="pagination" id="pagination">
        <div class="arrow arrow-left" @click="previousSlide">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div class="arrow arrow-right" @click="nextSlide">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div class="progress-sub-container">
          <div class="progress-sub-background">
            <div class="progress-sub-foreground"></div>
          </div>
        </div>
        <div class="slide-numbers" id="slide-numbers"></div>
      </div>
  
      <div class="cover"></div>
    </div>
  </template>
  
  <script>
import gsap from "gsap";
import { mapActions, mapGetters } from "vuex";
import SoftButton from "../components/SoftButton.vue";
import playground1 from '@/assets/images/playgrounds/1.jpg';
import playground2 from '@/assets/images/playgrounds/2.jpg';
import playground3 from '@/assets/images/playgrounds/3.jpg';
import playground7 from '@/assets/images/playgrounds/7.jpg';
import playground6 from '@/assets/images/playgrounds/6.jpg';
import playground10 from '@/assets/images/playgrounds/10.jpg';
/*
import playground2 from '@/assets/images/playgrounds/2.jpg';
import playground2 from '@/assets/images/playgrounds/2.jpg';
import playground2 from '@/assets/images/playgrounds/2.jpg';
import playground2 from '@/assets/images/playgrounds/2.jpg';
import playground2 from '@/assets/images/playgrounds/2.jpg';

*/

export default {
  name: "SignIn",
  data() {
    return {
      phone: '',
      password: '',
      rememberMe: false,
      data: [
        { image: playground1, place: "الماية", title: "ملعـب المايـة", title2: "", description: "احجز مبارتك الاولى على حسابنا، نزل التطبيق وشوف صحابك" },
        { image: playground2, place: "النجيلة", title: "ملعـب النجيلة", title2: "", description: "احجز مبارتك الاولى على حسابنا، نزل التطبيق وشوف صحابك"},
        { image: playground3, place: "الزاوية المركز", title: "ملعـب الزاوية المركز", title2: "", description: "احجز مبارتك الاولى على حسابنا، نزل التطبيق وشوف صحابك"},
        { image: playground10, place: "اليرموك", title: "ملعـب جنزور", title2: "", description: "احجز مبارتك الاولى على حسابنا، نزل التطبيق وشوف صحابك" },
        { image: playground7, place: "قرجي", title: "ملعـب قرجي", title2: "", description: "احجز مبارتك الاولى على حسابنا، نزل التطبيق وشوف صحابك"},
        { image: playground6, place: "الدريبي", title: "ملعـب الدريبي", title2: "", description: "احجز مبارتك الاولى على حسابنا، نزل التطبيق وشوف صحابك" }
      ],
      order: [0, 1, 2, 3, 4, 5],
      detailsEven: true,
      offsetTop: 200,
      offsetLeft: 700,
      cardWidth: 200,
      cardHeight: 300,
      gap: 40,
      numberSize: 50,
      ease: "sine.inOut",
      clicks: 0,
    };
  },
  components:{
    SoftButton
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
    getCard(index) {
      return `#card${index}`;
    },
    getCardContent(index) {
      return `#card-content-${index}`;
    },
    getSliderItem(index) {
      return `#slide-item-${index}`;
    },
    async animate(target, duration, properties) {
      return new Promise((resolve) => {
        gsap.to(target, {
          ...properties,
          duration: duration,
          onComplete: resolve,
        });
      });
    },
    async init() {
      const [active, ...rest] = this.order;
      const detailsActive = this.detailsEven ? "#details-even" : "#details-odd";
      const detailsInactive = this.detailsEven ? "#details-odd" : "#details-even";
      const { innerHeight: height, innerWidth: width } = window;
      this.offsetTop = height - 430;
      this.offsetLeft = width - 830;

      gsap.set("#pagination", {
        top: this.offsetTop + 330,
        left: this.offsetLeft,
        y: 200,
        opacity: 0,
        zIndex: 60,
      });
      gsap.set("nav", { y: -200, opacity: 0 });

      gsap.set(this.getCard(active), {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      });
      gsap.set(this.getCardContent(active), { x: 0, y: 0, opacity: 0 });
      gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
      gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
      gsap.set(`${detailsInactive} .text`, { y: 100 });
      gsap.set(`${detailsInactive} .title-1`, { y: 100 });
      gsap.set(`${detailsInactive} .title-2`, { y: 100 });
      gsap.set(`${detailsInactive} .desc`, { y: 50 });
      gsap.set(`${detailsInactive} .cta`, { y: 60 });

      gsap.set(".progress-sub-foreground", {
        width: 500 * (1 / this.order.length) * (active + 1),
      });

      rest.forEach((i, index) => {
        gsap.set(this.getCard(i), {
          x: this.offsetLeft + 400 + index * (this.cardWidth + this.gap),
          y: this.offsetTop,
          width: this.cardWidth,
          height: this.cardHeight,
          zIndex: 30,
          borderRadius: 10,
        });
        gsap.set(this.getCardContent(i), {
          x: this.offsetLeft + 400 + index * (this.cardWidth + this.gap),
          zIndex: 40,
          y: this.offsetTop + this.cardHeight - 100,
        });
        gsap.set(this.getSliderItem(i), { x: (index + 1) * this.numberSize });
      });

      gsap.set(".indicator", { x: -window.innerWidth });

      const startDelay = 0.6;

      gsap.to(".cover", {
        x: width + 400,
        delay: 0.5,
        ease: this.ease,
        onComplete: () => {
          setTimeout(() => {
            this.loop();
          }, 500);
        },
      });
      rest.forEach((i, index) => {
        gsap.to(this.getCard(i), {
          x: this.offsetLeft + index * (this.cardWidth + this.gap),
          zIndex: 30,
          delay: 0.05 * index,
          ease: this.ease,
     
        });
        gsap.to(this.getCardContent(i), {
          x: this.offsetLeft + index * (this.cardWidth + this.gap),
          zIndex: 40,
          delay: 0.05 * index,
          ease: this.ease,
      
        });
      });
      gsap.to("#pagination", { y: 0, opacity: 1, ease: this.ease, delay: startDelay });
      gsap.to("nav", { y: 0, opacity: 1, ease: this.ease, delay: startDelay });
      gsap.to(detailsActive, { opacity: 1, x: 0, ease: this.ease, delay: startDelay });
    },
    async step() {
      this.order.push(this.order.shift());
      this.detailsEven = !this.detailsEven;

      const detailsActive = this.detailsEven ? "#details-even" : "#details-odd";
      const detailsInactive = this.detailsEven ? "#details-odd" : "#details-even";

      document.querySelector(`${detailsActive} .place-box .text`).textContent = this.data[this.order[0]].place;
      document.querySelector(`${detailsActive} .title-1`).textContent = this.data[this.order[0]].title;
      document.querySelector(`${detailsActive} .title-2`).textContent = this.data[this.order[0]].title2;
      document.querySelector(`${detailsActive} .desc`).textContent = this.data[this.order[0]].description;

      gsap.set(detailsActive, { zIndex: 22 });
      gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease: this.ease });
      gsap.to(`${detailsActive} .text`, { y: 0, delay: 0.1, duration: 0.7, ease: this.ease });
      gsap.to(`${detailsActive} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease: this.ease });
      gsap.to(`${detailsActive} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease: this.ease });
      gsap.to(`${detailsActive} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease: this.ease });
      gsap.to(`${detailsActive} .cta`, { y: 0, delay: 0.35, duration: 0.4, ease: this.ease });
      gsap.set(detailsInactive, { zIndex: 12 });

      const [active, ...rest] = this.order;
      const prv = rest[rest.length - 1];

      gsap.set(this.getCard(prv), { zIndex: 10 });
      gsap.set(this.getCard(active), { zIndex: 20 });
      gsap.to(this.getCard(prv), { scale: 1.5, ease: this.ease });

      gsap.to(this.getCardContent(active), { y: this.offsetTop + this.cardHeight - 10, opacity: 0, duration: 0.3, ease: this.ease });
      gsap.to(this.getSliderItem(active), { x: 0, ease: this.ease });
      gsap.to(this.getSliderItem(prv), { x: -this.numberSize, ease: this.ease });
      gsap.to(".progress-sub-foreground", { width: 500 * (1 / this.order.length) * (active + 1), ease: this.ease });

      gsap.to(this.getCard(active), {
        x: 0,
        y: 0,
        ease: this.ease,
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: 0,
        onComplete: () => {
          const xNew = this.offsetLeft + (rest.length - 1) * (this.cardWidth + this.gap);
          gsap.set(this.getCard(prv), { x: xNew, y: this.offsetTop, width: this.cardWidth, height: this.cardHeight, zIndex: 30, borderRadius: 10, scale: 1 });

          gsap.set(this.getCardContent(prv), { x: xNew, y: this.offsetTop + this.cardHeight - 100, opacity: 1, zIndex: 40 });
          gsap.set(this.getSliderItem(prv), { x: rest.length * this.numberSize });

          gsap.set(detailsInactive, { opacity: 0 });
          gsap.set(`${detailsInactive} .text`, { y: 100 });
          gsap.set(`${detailsInactive} .title-1`, { y: 100 });
          gsap.set(`${detailsInactive} .title-2`, { y: 100 });
          gsap.set(`${detailsInactive} .desc`, { y: 50 });
          gsap.set(`${detailsInactive} .cta`, { y: 60 });
          this.clicks -= 1;
          if (this.clicks > 0) {
            this.step();
          }
        },
      });

      rest.forEach((i, index) => {
        if (i !== prv) {
          const xNew = this.offsetLeft + index * (this.cardWidth + this.gap);
          gsap.set(this.getCard(i), { zIndex: 30 });
          gsap.to(this.getCard(i), { x: xNew, y: this.offsetTop, width: this.cardWidth, height: this.cardHeight, ease: this.ease, delay: 0.1 * (index + 1) });

          gsap.to(this.getCardContent(i), { x: xNew, y: this.offsetTop + this.cardHeight - 100, opacity: 1, zIndex: 40, ease: this.ease, delay: 0.1 * (index + 1) });
          gsap.to(this.getSliderItem(i), { x: (index + 1) * this.numberSize, ease: this.ease });
        }
      });
    },
    async loop() {
      await this.animate(".indicator", 2, { x: 0 });
      await this.animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
      gsap.set(".indicator", { x: -window.innerWidth });
      await this.step();
      this.loop();
    },
    async loadImage(src) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    },
    async loadImages() {
      const promises = this.data.map(({ image }) => this.loadImage(image));
      return Promise.all(promises);
    },
    async start() {
      try {
        await this.loadImages();
        this.init();
      } catch (error) {
        console.error("One or more images failed to load", error);
      }
    },
    getCardStyle(index, image) {
      return {
        backgroundImage: `url(${image})`,
        translate: 'none',
        rotate: 'none',
        scale: 'none',
        height: '300px',
        width: '200px',
        transform: `translate(${536 + (index * 240)}px, 213px)`,
        zIndex: 30,
        borderRadius: '10px'
      };
    },
    getCardContentStyle(index) {
      return {
        translate: 'none',
        rotate: 'none',
        scale: 'none',
        opacity: 1,
        transform: `translate(${536 + (index * 240)}px, 413px)`,
        zIndex: 40
      };
    },
    startAnimation() {
      this.timeline = gsap.timeline({ repeat: -1 });
      this.data.forEach((item, index) => {
        this.timeline.to(`#card${index}`, { duration: 1, opacity: 1, ease: "power2.inOut" }, `+=${index * 1}`);
        this.timeline.to(`#card-content-${index}`, { duration: 1, opacity: 1, ease: "power2.inOut" }, `+=${index * 1}`);
      });
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.data.length;
      this.currentCard = this.data[this.currentIndex];
    },
    previousSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.data.length) % this.data.length;
      this.currentCard = this.data[this.currentIndex];
    }
  },
  computed: {
    ...mapGetters(['showNavbar', 'showFooter']),
  },
  created() {
    this.$store.commit('LOGOUT'); // Ensure components are hidden on the login page
    this.currentCard = this.data[0];
    this.startAnimation();
  },
  mounted() {
    this.start();
  },
};
</script>
<style scoped>
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
    color: white;
}
.card {
  position: absolute;
  left: 0;
  top: 0;
  background-position: center;
  background-size: cover;
  box-shadow: 6px 6px 10px 2px rgba(0, 0, 0, 0.6);
}

#btn {
  position: absolute;
  top: 690px;
  left: 16px;
  z-index: 99;
}

.card-content {
  position: absolute;
  left: 0;
  top: 0;
  color: #FFFFFFDD;
  padding-left: 16px;
}

.content-place {
  margin-top: 6px;
  font-size: 13px;
  font-weight: 500;
}

.content-place {
  font-weight: 500;
}

.content-title-1,
.content-title-2 {
  font-weight: 600;
  font-size: 20px;
  font-family: 'TajawalRegular', sans-serif !important;
}

.content-start {
  width: 30px;
  height: 5px;
  border-radius: 99px;
  background-color: #FFFFFFDD;
}

.details {
  z-index: 22;
  position: absolute;
  top: 240px;
  left: 60px;
  background-color: #1a19177c;
}
.details .place-box {
  height: 46px;
  overflow: hidden;
}
.details .place-box .text {
  padding-top: 16px;
  font-family: 'TajawalBold', sans-serif !important;
  font-size: 20px;
}
.details .place-box .text:before {
  top: 0;
  left: 0;
  position: absolute;
  content: "";
  width: 30px;
  height: 4px;
  border-radius: 99px;
  background-color: white;
}
.details .title-1,
.details .title-2 {
    text-align: center;
  font-weight: 600;
  font-size: 52px;
  font-family: 'TajawalBold', sans-serif !important;
}
.details .title-box-1,
.details .title-box-2 {
  margin-top: 2px;
  height: 100px;
  overflow: hidden;
}
.details > .desc {
    text-align: center;
  margin-top: 16px;
  width: 500px;
  font-size: 20px;
  font-family: 'HacenSamra',sans-serif !important;;
}
.details > .cta {
  width: 500px;
  margin-top: 24px;
  display: flex;
  align-items: center;
}
.details > .cta > .bookmark {
  border: none;
  background-color: #ecad29;
  width: 36px;
  height: 36px;
  border-radius: 99px;
  color: white;
  display: grid;
  place-items: center;
}
.details > .cta > .bookmark svg {
  width: 20px;
  height: 20px;
}
.details > .cta > .discover {
  border: 1px solid #ffffff;
  background-color: transparent;
  height: 36px;
  border-radius: 99px;
  color: #ffffff;
  padding: 4px 24px;
  font-size: 12px;
  margin-left: 16px;
  text-transform: uppercase;
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

.indicator {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 5px;
  z-index: 60;
  background-color: #ecad29;
}

.pagination {
  position: absolute;
  left: 0px;
  top: 0px;
  display: inline-flex;
}
.pagination > .arrow {
  z-index: 60;
  width: 50px;
  height: 50px;
  border-radius: 999px;
  border: 2px solid #ffffff55;
  display: grid;
  place-items: center;
}
.pagination > .arrow:nth-child(2) {
  margin-left: 20px;
}
.pagination > .arrow svg {
  width: 24px;
  height: 24px;
  stroke-width: 2;
  color: #ffffff99;
}
.pagination .progress-sub-container {
  margin-left: 24px;
  z-index: 60;
  width: 500px;
  height: 50px;
  display: flex;
  align-items: center;
}
.pagination .progress-sub-container .progress-sub-background {
  width: 500px;
  height: 3px;
  background-color: #ffffff33;
}
.pagination .progress-sub-container .progress-sub-background .progress-sub-foreground {
  height: 3px;
  background-color: #ecad29;
}
.pagination .slide-numbers {
  width: 50px;
  height: 50px;
  overflow: hidden;
  z-index: 60;
  position: relative;
}
.pagination .slide-numbers .item {
  width: 50px;
  height: 50px;
  position: absolute;
  color: white;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  font-size: 32px;
  font-weight: bold;
}

.cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 100;
}


</style>