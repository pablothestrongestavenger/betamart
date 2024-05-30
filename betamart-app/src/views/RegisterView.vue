<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h2 class="text-center">Register</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="register">
                <div class="mb-3">
                  <label for="username" class="form-label">Username:</label>
                  <input type="text" id="username" v-model="username" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email:</label>
                  <input type="email" id="email" v-model="email" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password:</label>
                  <input type="password" id="password" v-model="password" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm Password:</label>
                  <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      register() {
        // Implement registration logic here
        console.log('Register form submitted');
        // Redirect user after successful registration if needed
      }
    }
  };
  </script>
  