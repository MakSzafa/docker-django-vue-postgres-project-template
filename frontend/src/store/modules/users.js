import axios from "axios";

const state = {
  users: [],
  user: {},
  emailFail: false,
  resetTokenFail: false,
};

const getters = {};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
  setUser(state, user) {
    state.user = user;
  },
  setEmailFail(state, bool) {
    state.emailFail = bool;
  },
  setResetTokenFail(state, bool) {
    state.resetTokenFail = bool;
  },
};

const actions = {
  async getUsersList(context) {
    try {
      const response = await axios.get("/api/users/");
      context.commit("setUsers", response.data);
    } catch (e) {
      console.log(e.response);
      if (e.response.data.code === "token_not_valid") {
        context.dispatch("refreshAccessToken");
        try {
          const response = await axios.get("/api/users/");
          context.commit("setUsers", response.data);
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
  async getUser(context, userId) {
    try {
      const response = await axios.get(`/api/users/${userId}/`);
      context.commit("setUser", response.data);
    } catch (e) {
      console.log(e.response);
      if (e.response.data.code === "token_not_valid") {
        context.dispatch("refreshAccessToken");
        try {
          const response = await axios.get(`/api/users/${userId}/`);
          context.commit("setUser", response.data);
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
  async createUser(context, payload) {
    let avatar = payload.avatar;
    delete payload.avatar;

    try {
      const response = await axios.post("/api/users/", payload);
      // Image upload
      if (typeof avatar === "object") {
        let data = new FormData();
        data.append("avatar", avatar);
        await axios.patch(`/api/users/${response.data.id}/`, data);
      }
      const loginPayload = {
        email: payload.email,
        password: payload.password,
      };
      await context.dispatch("login", loginPayload);
    } catch (e) {
      console.log(e);
    }
  },
  async editUser(context, payload) {
    let avatar = payload.avatar;
    delete payload.avatar;

    try {
      const response = await axios.patch(`/api/users/${payload.id}/`, payload);
      // Image upload
      if (typeof avatar === "object") {
        let data = new FormData();
        data.append("avatar", avatar);
        return axios.patch(`/api/users/${payload.id}/`, data);
      }
    } catch (e) {
      console.log(e.response);
      if (e.response.data.code === "token_not_valid") {
        context.dispatch("refreshAccessToken");
        try {
          const response = await axios.patch(
            `/api/users/${payload.id}/`,
            payload
          );
          // Image upload
          if (typeof avatar === "object") {
            let data = new FormData();
            data.append("avatar", avatar);
            return axios.patch(`/api/users/${payload.id}/`, data);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
  async deleteUser(context, userId) {
    try {
      const response = await axios.delete(`/api/users/${userId}/`);
    } catch (e) {
      console.log(e.response);
      if (e.response.data.code === "token_not_valid") {
        context.dispatch("refreshAccessToken");
        try {
          const response = await axios.delete(`/api/users/${userId}/`);
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
  async passwordReset(context, email) {
    try {
      const response = await axios.post("/api/users/password_reset/", email);
      context.commit("setEmailFail", false);
    } catch (e) {
      context.commit("setEmailFail", true);
    }
  },
  async passwordChange(context, payload) {
    try {
      const response = await axios.post("/api/users/password_change/", payload);
      context.commit("setResetTokenFail", false);
    } catch (e) {
      context.commit("setResetTokenFail", true);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
