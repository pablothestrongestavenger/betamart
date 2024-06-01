<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-green d-flex justify-content-between">
    <!-- <button class="navbar-brand btn-link">
      BETAMART
    </button> -->
    
    <!-- <h1 class=" navbar-brand btn-link">Betamart Page</h1> -->
    <br><br>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="/home">Home</a>
        </li>
      </ul>
      <button @click="logout" class="btn btn-primary align-self-end">Logout</button>
    </div>
  </nav>
</template>

<script>
import axios from '@/lib/config';
export default {
  computed: {
    getAccountDetails() {
      return this.$store.getters.getAccountDetails;
    }
  },
  methods: {
    async logout() {
      try {
        const response = await axios.post('/api/logout', {
          email: this.getAccountDetails.email
        });
        if (response.status == 200) {
          localStorage.removeItem('token');
          localStorage.removeItem('vuex');
          this.$store.dispatch('asyncLoadAccountDetails', []);
          this.$router.push('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #006400; /* Dark green background */
}

.navbar-brand {
  color: white;
  font-weight: bold;
}

.navbar-toggler {
  border-color: rgba(255, 255, 255, 0.1);
}

.navbar-toggler-icon {
  background-image: url('data:image/svg+xml;charset=utf8,%3Csvg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath stroke="rgba%28255, 255, 255, 0.5%29" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M4 7h22M4 15h22M4 23h22"/%3E%3C/svg%3E');
}

.nav-link {
  color: white !important;
  font-weight: 500;
}

.nav-link:hover {
  color: #d3ffd3 !important; /* Light green on hover */
}

.btn-link {
  border-color: transparent;
  color: black;
  cursor: pointer;
}

.btn-primary {
  background-color: #006400; /* Dark green button color */
  border-color: #004d00; /* Dark green border color */
}

.btn-primary:hover {
  background-color: #004d00; /* Darker green on hover */
  border-color: #003300; /* Darker green border on hover */
}
</style>
