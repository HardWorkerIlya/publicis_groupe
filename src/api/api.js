import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const get = (url, options) => Vue.http.get(url, options)

export const Data = {
  getTableUsers: () => get('https://jsonplaceholder.typicode.com/users')
}