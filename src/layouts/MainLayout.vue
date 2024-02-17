<template>
  <div class="container_menu">
    <aside>
      <div className="sidebar_top">
        <div className="logo">
          <!-- <img
            src="https://st2.depositphotos.com/4398873/7993/v/950/depositphotos_79934552-stock-illustration-retro-cinema-logo.jpg"
          /> -->
          <h2>ADMIN<span className="danger">PANEL</span></h2>
        </div>
        <div className="close" id="close-btn" @click="closeMenuBtn()">
          <span className="material-icons-outlined">close</span>
        </div>
      </div>

      <div className="sidebar">
        <router-link
          class="a"
          to="/dashboard"
          :class="{ active: $route.name === 'dashboard' }"
        >
          <span className="material-icons-outlined">grid_view</span>
          <h3>Dashboard</h3>
        </router-link>

        <router-link
          class="a"
          to="/customers"
          :class="{ active: $route.name === 'customers' }"
        >
          <span className="material-icons-outlined">person_outline</span>
          <h3>Customers</h3>
        </router-link>

        <router-link
          class="a"
          to="/orsers"
          :class="{ active: $route.name === 'orsers' }"
        >
          <span className="material-icons-outlined">receipt_long</span>
          <h3>Orsers</h3>
        </router-link>

        <router-link
          class="a"
          to="/analytics"
          :class="{ active: $route.name === 'analytics' }"
        >
          <span className="material-icons-outlined">insights</span>
          <h3>Analytics</h3>
        </router-link>

        <router-link
          class="a"
          to="/messages"
          :class="{ active: $route.name === 'messages' }"
        >
          <span className="material-icons-outlined">mail_outline</span>
          <h3>Messages <span className="message-count">26</span></h3>
        </router-link>

        <router-link
          class="a"
          to="/products"
          :class="{ active: $route.name === 'products' }"
        >
          <span className="material-icons-outlined">inventory</span>
          <h3>Products</h3>
        </router-link>

        <router-link
          class="a"
          to="/reports"
          :class="{ active: $route.name === 'reports' }"
        >
          <span className="material-icons-outlined">report_gmailerrorred</span>
          <h3>Reports</h3>
        </router-link>

        <router-link
          class="a"
          to="/settings"
          :class="{ active: $route.name === 'settings' }"
        >
          <span className="material-icons-outlined">settings</span>
          <h3>Settings</h3>
        </router-link>

        <router-link
          class="a"
          to="/add"
          :class="{ active: $route.name === '/add-product' }"
        >
          <span className="material-icons-outlined">add</span>
          <h3>Add Product</h3>
        </router-link>

        <router-link
          class="a"
          to="/logout"
          :class="{ active: $route.name === '/logout' }"
        >
          <span className="material-icons-outlined">logout</span>
          <h3>Logout</h3>
        </router-link>
      </div>
    </aside>

    <!-- <q-page-container> -->
    <router-view />
    <!-- </q-page-container> -->
  </div>
</template>

<script>
export default {
  methods: {
    closeMenuBtn() {
      document.querySelector("aside").classList.remove("block");
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 769px) {
  .aside.menu-hidden {
    display: none;
  }
}
</style>
