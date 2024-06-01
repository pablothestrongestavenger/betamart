<template>
  <div class="splitter-container">
    <div class="background-image"></div>
    <div class="wrapper">
      <div class="logo">
      </div>
      <div class="text-center mt-4 name">
        User Registration
      </div>
      <form @submit.prevent="registerUser" class="p-3 mt-3">
        <div class="form-field d-flex align-items-center mb-3">
          <span class="far fa-user"></span>
          <input type="text" name="name" v-model="name" class="form-control" placeholder="Name">
        </div>
        <div class="form-field d-flex align-items-center mb-3">
          <span class="far fa-envelope"></span>
          <input type="email" name="email" v-model="email" class="form-control" placeholder="Email">
        </div>
        <div class="form-field d-flex align-items-center mb-3">
          <span class="fas fa-key"></span>
          <input type="password" name="password" v-model="password" class="form-control" placeholder="Password">
        </div>
        <div class="form-field d-flex align-items-center mb-3">
          <span class="fas fa-key"></span>
          <input type="password" name="password_confirmation" v-model="password_confirmation" class="form-control" placeholder="Confirm Password">
        </div>
        <button type="submit" class="btn mt-3">Register</button>
      </form>
      <div class="text-center fs-6">
        <p class="mt-3">Already have an account? <router-link to="/" class="link-sign">Login here!</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/lib/config';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('/api/create', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });

        if (response.status === 201) {
          // Reset fields
          this.name = '';
          this.email = '';
          this.password = '';
          this.password_confirmation = '';
          alert('New account created.');
          this.$router.go(-1);
        }
      } catch (error) {
        console.log(error);
        alert('Registration failed. Please try again.');
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
  background-image: url('@/assets/bg.jpg');
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.wrapper {
  flex: 1; 
  padding: 40px 30px 30px 30px;
  background-color: #e5f4e2; /* Light green background */
  border: 2px solid #006400; /* Dark green border */
  border-radius: 0; /* No rounded borders */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

  @media(max-width: 380px) {
    .wrapper {
      margin: 30px 20px;
    }
  }

  .wrapper .name {
    font-size: 1.4rem; 
  }

  .wrapper .btn {
    font-size: 0.9rem; 
  }
}
</style>
