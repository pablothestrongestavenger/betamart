<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">BetaMart</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/manage-users">Manage Users</router-link>
            </li>
          </ul>
          <button class="btn btn-danger" @click="logout">Logout</button>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    methods: {
      // logout() {
      //   localStorage.removeItem('authToken'); 
      //   this.$router.push('/login'); 
      // }
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  