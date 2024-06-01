<template>
  <div>
    <div class="splitter-container">
      <!-- Background image -->
      
      <!-- Wrapper -->
      <div class="wrapper">
        <div class="logo">
          <!--  -->
        </div>
        <div class="text-center mt-4 name">
          Login
        </div>
        <form @submit.prevent="login" class="p-3 mt-3">
          <div class="form-field d-flex align-items-center mb-3">
            <span class="far fa-user"></span>
            <input type="text" name="email" v-model="email" class="form-control" placeholder="Email" required>
          </div>
          <div class="form-field d-flex align-items-center mb-3">
            <span class="fas fa-key"></span>
            <input type="password" name="password" v-model="password" class="form-control" placeholder="Password" required>
          </div>
          <button type="submit" class="btn mt-3">Login</button>
        </form>
        <div class="text-center fs-6">
          <p class="mt-3">Don't have an account? <router-link to="/register" class="link-sign">Sign up here!</router-link></p>
        </div>
      </div>
      <div class="background-image"></div>
    </div>
  </div>
</template>

<script>
import axios from "@/lib/config";

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/api/login', {
          email: this.email,
          password: this.password
        });

        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          this.email = '';
          this.password = '';

          this.$router.push('/home');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.splitter-container {
  display: flex;
  height: 100vh;
}

.background-image {
  flex: 2; 
  background-image: url('@/assets/bg2.avif');
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.wrapper {
  flex: 1; 
  padding: 40px 30px 30px 30px;
  background-color: #f0f8ea; /* Green background */
  border: 2px solid #006400; /* Dark green border */
  display: flex;
  flex-direction: column;
  justify-content: center; 
}

.wrapper .logo {
  width: 100px;
  margin: auto;
}

.wrapper .logo img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.wrapper .name {
  font-weight: 600;
  font-size: 1.6rem;
  color: #006400; /* Dark green text color */
}

.wrapper .form-field {
  width: 100%;
  margin-bottom: 20px;
  border: 2px solid #006400; /* Dark green border */
  background-color: #ffffff; /* White background */
  padding: 10px;
  display: flex;
  align-items: center;
}

.wrapper .form-field input {
  width: 100%;
  border: none;
  outline: none;
  background: none;
  font-size: 1.1rem;
  color: #006400; /* Dark green text color */
  padding: 10px;
}

.wrapper .form-field .fas,
.wrapper .form-field .far {
  margin-right: 10px;
  color: #006400; /* Dark green icon color */
}

.wrapper .btn {
  width: 100%;
  height: 45px;
  font-size: 1rem;
  background-color: #006400; /* Dark green button color */
  color: #ffffff; /* White text color */
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.wrapper .btn:hover {
  background-color: #004d00; /* Dark green hover color */
}

.wrapper a {
  text-decoration: none;
  font-size: 1rem;
  color: #006400; /* Dark green link color */
}

.wrapper a:hover {
  text-decoration: underline;
  color: #003300; /* Darker green hover color */
}

@media(max-width: 768px) {
  .background-image {
    display: none;
  }

  .wrapper {
    padding: 20px; 
  }
}

@media(max-width: 480px) {
  .wrapper .logo img {
    width: 80px; 
    height: 80px;
  }

  .wrapper .name {
    font-size: 1.4rem; 
  }

  .wrapper .btn {
    font-size: 0.9rem; 
  }
}
</style>
