import Vue from 'vue'
import App from './App.vue'

import '@/assets/css/tailwind.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.config.productionTip = false

Vue.use(VueAxios, axios)

axios.interceptors.request.use()

axios.defaults.baseURL = 'https://api-medicalboxciisa.azurewebsites.net/api';


router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some(record => record.meta.requireAuth)

  if(protectedRoute && store.state.token === ''){
    next({name: 'Login' })
  }else{
    next();
  }
})

/*
 * Add a request interceptor
 @param config
*/
axios.interceptors.request.use(
    function(config) {
      //store.commit('loader/START_LOADING');
      const token = store.state.token;
      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function(error) {
      //store.commit('loader/FINISH_LOADING');
      return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
      //store.commit('loader/FINISH_LOADING');
      return response;
    },
    error => {
      //store.commit('loader/FINISH_LOADING');
      if (
          error.request.responseType === 'blob' &&
          error.response.data instanceof Blob &&
          error.response.data.type &&
          error.response.data.type.toLowerCase().indexOf('json') != -1
      )
      {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.onload = () => {
            error.response.data = JSON.parse(reader.result);
            resolve(Promise.reject(error));
          };

          reader.onerror = () => {
            reject(error);
          };

          reader.readAsText(error.response.data);
        });
      }

      return Promise.reject(error);
    }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
