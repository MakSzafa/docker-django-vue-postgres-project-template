import { createStore } from "vuex";

import users from '@/store/modules/users'
import auth from '@/store/modules/auth'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { 
    users, 
    auth 
  },
});
