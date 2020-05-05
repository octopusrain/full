import Vue from 'vue'
import axios from 'axios'
const service = axios.create({
  baseUrl: '/api',
  timeout: 10000
})
service.interceptors.response.use((response) => {
  const { data } = response
  return data
})
Vue.prototype.$http = service
export const http = service