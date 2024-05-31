<template>
  <div class="container mt-4">
    <h1 class="mb-4">User Management</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      
      fetch('api/users')
        .then(response => response.json())
        .then(data => {
          this.users = data; // Set the retrieved users to the users array
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }
  }
};
</script>
