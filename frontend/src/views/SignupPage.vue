<template>
  <div class="container">
    <h1>Example Signup Page</h1>
    <form @submit.prevent="submitForm">
      <div class="field">
        <label class="label">E-mail</label>
        <div class="control">
          <input class="input" type="email" v-model="email" />
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" v-model="password" />
        </div>
      </div>
      <div class="field submit-button">
        <div class="control">
          <button class="button is-dark">Sign up</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignupPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async submitForm() {
      const logUser = {
        email: this.email,
        password: this.password,
      };

      await this.$store.dispatch("createUser", logUser);

      const toPath = this.$route.query.to || "/";

      this.$router.push(toPath);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/main.scss";

h1 {
  text-align: center;
}
</style>
