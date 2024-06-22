// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Tables from "@/views/Tables.vue";
import Billing from "@/views/Billing.vue";
import Profile from "@/views/Profile.vue";
import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import HomePage from "@/views/HomePage.vue";
import Terms from "@/views/Terms.vue";
import JoinUs from "@/views/JoinUs.vue";
import Community from "@/views/Community.vue";
import Help from "@/views/Help.vue";
import ContactUs from "@/views/ContactUs.vue";
import Playground from "@/views/Playgrounds/Playgrounds.vue";
import EditPlayground from "@/views/Playgrounds/EditPlayground.vue";
import AddPlayground from "@/views/Playgrounds/AddPlayground.vue";
import Booking from "@/views/Booking/Booking.vue";
import store from '@/store';

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/terms', name: 'Terms', component: Terms },
  { path: '/join', name: 'JoinUs', component: JoinUs },
  { path: '/help', name: 'Help', component: Help },
  { path: '/community', name: 'Community', component: Community },
  { path: '/contact', name: 'ContactUs', component: ContactUs },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/bookings', name: 'Booking', component: Booking, meta: { requiresAuth: true } },
  { path: '/tables', name: 'Tables', component: Tables, meta: { requiresAuth: true } },
  { path: '/billing', name: 'Billing', component: Billing, meta: { requiresAuth: true } },
  { path: '/playground', name: 'Playgrounds', component: Playground, meta: { requiresAuth: true } },
  { path: '/add-playground', name: 'add-playground', component: AddPlayground, meta: { requiresAuth: true } },
  { path: '/playground/edit/:id', name: 'EditPlayground', component: EditPlayground, meta: { requiresAuth: true } }, // Add this route
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/rtl-page', name: 'Rtl', component: Rtl, meta: { requiresAuth: true } },
  { path: '/sign-in', name: 'SignIn', component:SignIn },
  { path: '/sign-up', name: 'SignUp',component:SignUp  },
  // Fallback route for 404 - Not Found
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Redirect to HomePage if not authenticated
    if (!store.getters.isAuthenticated) {
      next({ name: 'HomePage' });
    } else {
      next();
    }
  } else if (to.name === 'SignIn' && store.getters.isAuthenticated) {
    // Redirect to Dashboard if authenticated and trying to access SignIn
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router;
