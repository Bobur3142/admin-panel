<template>
  <main class="dashboard_start">
    <h1>Dashoard</h1>
    <div className="insights">
      <div className="sales">
        <span className="material-icons-outlined">analytics</span>
        <div className="middle">
          <div className="left">
            <h3>Total Sales</h3>
            <h1>$25,024</h1>
          </div>
          <div className="progress">
            <svg>
              <circle cx="38" cy="38" r="36"></circle>
            </svg>
            <div className="number">
              <p>81%</p>
            </div>
          </div>
        </div>
        <small className="text-muted">Last 24 House</small>
      </div>
      <!------------------------ END OF SALES------------------------>
      <div className="expenses">
        <span className="material-icons-outlined">bar_chart</span>
        <div className="middle">
          <div className="left">
            <h3>Total Expenses</h3>
            <h1>$14,160</h1>
          </div>
          <div className="progress">
            <svg>
              <circle cx="38" cy="38" r="36"></circle>
            </svg>
            <div className="number">
              <p>62%</p>
            </div>
          </div>
        </div>
        <small className="text-muted">Last 24 House</small>
      </div>
      <!------------------------ END OF EXPENSES------------------------>
      <div className="income">
        <span className="material-icons-outlined">stacked_line_chart</span>
        <div className="middle">
          <div className="left">
            <h3>Total Income</h3>
            <h1>$10,864</h1>
          </div>
          <div className="progress">
            <svg>
              <circle cx="38" cy="38" r="36"></circle>
            </svg>
            <div className="number">
              <p>44%</p>
            </div>
          </div>
        </div>
        <small className="text-muted">Last 24 House</small>
      </div>
      <!------------------------ END OF INCOME------------------------>
    </div>
    <!------------------------ END OF INSIGHTS------------------------>
    <div className="recent-orders">
      <div class="dashboard_pagination">
        <h2>Recent Orders</h2>
        <div class="d_pagination">
          <button
            class="d_btn_pagination"
            @click="previousPage"
            :disabled="currentPage === 0"
          >
            <i class="fa-solid fa-angle-left"></i>
          </button>
          <button
            class="d_btn_pagination"
            @click="nextPage"
            :disabled="currentPage === maxPage"
          >
            <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Mune</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in paginatedProducts" :key="index">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.phone }}</td>
            <td>
              <button className="btn edit" @click="openEditModal(index)">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button className="btn delete" @click="deleteUser(item)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <q-dialog v-model="editPrompt" persistent>
        <q-card class="modal" style="min-width: 450px">
          <q-card-section>
            <div class="text-h6 modal_h1">Edit User</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input dense v-model="editedName" placeholder="Name" />
            <q-input dense v-model="editedUserName" placeholder="Username" />
            <q-input dense v-model="editedPhone" placeholder="Phone" />
          </q-card-section>
          <p class="error">{{ editError }}</p>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Save Changes" @click="saveEditedUser" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- <a href="#">Show All</a> -->
    </div>
  </main>
  <!------------------------ END OF MAIN------------------------>

  <div className="right dashboard_end">
    <div className="top">
      <button id="menu-btn" @click="openMenuBtn()">
        <span className="material-icons-outlined">menu</span>
      </button>
      <div className="theme-toggler" @click="darkMod()">
        <span :class="{ active: !darkModeEnabled }"
          ><i class="fa-solid fa-sun"></i
        ></span>
        <span :class="{ active: darkModeEnabled }"
          ><i class="fa-solid fa-moon"></i
        ></span>
      </div>
      <div className="profile">
        <div className="info">
          <p>Hey, <b>Daniel</b></p>
          <small className="text-muted">Admin</small>
        </div>
        <div className="profile-photo">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </div>
      </div>
    </div>
    <!-- END OF TOP -->
    <div className="recent-updates">
      <h2>Recent Updates</h2>
      <div className="updates">
        <div className="update">
          <div className="profile-photo">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </div>
          <div className="message">
            <p>
              <b>Mike Tyson</b> received his order or of Night lion tech GPS
              drone.
            </p>
            <small className="text-muted">2 Minutes Ago</small>
          </div>
        </div>
        <div className="update">
          <div className="profile-photo">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </div>
          <div className="message">
            <p>
              <b>Mike Tyson</b> received his order or of Night lion tech GPS
              drone.
            </p>
            <small className="text-muted">2 Minutes Ago</small>
          </div>
        </div>
      </div>
    </div>
    <!------------------------ END OF RECENT UPDATES------------------------>
    <div className="sales-analytics">
      <h2>Sales Analytics</h2>
      <div className="item online">
        <div className="icon">
          <span className="material-icons-outlined">shopping_cart</span>
        </div>
        <div className="right">
          <div className="info">
            <h3>ONLINE ORDERS</h3>
            <small className="text-muted">Last 24 Hours</small>
          </div>
          <h5 className="success">+39%</h5>
          <h3>3849</h3>
        </div>
      </div>
      <div className="item offline">
        <div className="icon">
          <span className="material-icons-outlined">local_mall</span>
        </div>
        <div className="right">
          <div className="info">
            <h3>OFFLINE ORDERS</h3>
            <small className="text-muted">Last 24 Hours</small>
          </div>
          <h5 className="danger">-17%</h5>
          <h3>1100</h3>
        </div>
      </div>
      <div className="item customers">
        <div className="icon">
          <span className="material-icons-outlined">person</span>
        </div>
        <div className="right">
          <div className="info">
            <h3>NEW CUSTOMERS</h3>
            <small className="text-muted">Last 24 Hours</small>
          </div>
          <h5 className="success">+25%</h5>
          <h3>849</h3>
        </div>
      </div>
      <div className="item add-product">
        <div>
          <span className="material-icons-outlined">add</span>
          <h3>Add Product</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      darkModeEnabled: false,
      editPrompt: false,
      editedName: "",
      editedUserName: "",
      editedPhone: "",
      editError: "",
      editedUserIndex: -1,
      currentPage: 0,
      maxPage: 0,
    };
  },
  async created() {
    await this.fetchProducts();
    this.calculateMaxPage();
  },
  computed: {
    paginatedProducts() {
      const startIndex = this.currentPage * 6;
      const endIndex = startIndex + 6;
      return this.products.slice(startIndex, endIndex);
    },
  },
  watch: {
    products() {
      this.calculateMaxPage();
    },
  },
  mounted() {
    const darkModeEnabled = localStorage.getItem("darkModeEnabled");
    if (darkModeEnabled) {
      this.darkModeEnabled = JSON.parse(darkModeEnabled);
      if (this.darkModeEnabled) {
        this.enableDarkMode();
      }
    }
  },

  methods: {
    async fetchProducts() {
      try {
        const localProducts = localStorage.getItem("products");
        if (localProducts) {
          this.products = JSON.parse(localProducts);
        } else {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          this.products = response.data;
          localStorage.setItem("products", JSON.stringify(this.products));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    calculateMaxPage() {
      this.maxPage = Math.ceil(this.products.length / 6) - 1;
    },
    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.maxPage) {
        this.currentPage++;
      }
    },
    openEditModal(index) {
      this.editedName = this.products[index].name;
      this.editedUserName = this.products[index].username;
      this.editedPhone = this.products[index].phone;
      this.editedUserIndex = index;
      this.editPrompt = true;
    },
    async saveEditedUser() {
      try {
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${
            this.products[this.editedUserIndex].id
          }`,
          {
            name: this.editedName,
            username: this.editedUserName,
            phone: this.editedPhone,
          }
        );
        const updatedUser = response.data;
        this.products.splice(this.editedUserIndex, 1, updatedUser);
        localStorage.setItem("products", JSON.stringify(this.products));
        this.editPrompt = false;
      } catch (error) {
        console.error("Error saving changes:", error);
        this.editError = "Error saving changes.";
      }
    },
    async deleteUser(user) {
      try {
        await axios.delete(
          `https://jsonplaceholder.typicode.com/users/${user.id}`
        );
        this.products = this.products.filter((item) => item.id !== user.id);
        localStorage.setItem("products", JSON.stringify(this.products));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },

    openMenuBtn() {
      document.querySelector("aside").classList.add("block");
    },

    darkMod() {
      this.darkModeEnabled = !this.darkModeEnabled;
      const themeToggler = document.querySelector(".theme-toggler");
      const lightModeIcon = themeToggler.querySelector("span:nth-child(1)");
      const darkModeIcon = themeToggler.querySelector("span:nth-child(2)");
      if (this.darkModeEnabled) {
        this.enableDarkMode();
        lightModeIcon.classList.remove("active");
        darkModeIcon.classList.add("active");
      } else {
        this.disableDarkMode();
        darkModeIcon.classList.remove("active");
        lightModeIcon.classList.add("active");
      }
      localStorage.setItem(
        "darkModeEnabled",
        JSON.stringify(this.darkModeEnabled)
      );
    },
    enableDarkMode() {
      const root = document.documentElement;
      root.style.setProperty("--color-background", "#181a1e");
      root.style.setProperty("--color-white", "#202528");
      root.style.setProperty("--color-dark", "#edeffd");
      root.style.setProperty("--color-dark-variant", "#a3bdcc");
      root.style.setProperty("--color-light", "rgba(0, 0, 0, 0.4)");
      root.style.setProperty("--box-shadow", "0 2rem 3rem var(--color-light)");
    },
    disableDarkMode() {
      const root = document.documentElement;
      root.style.removeProperty("--color-background");
      root.style.removeProperty("--color-white");
      root.style.removeProperty("--color-dark");
      root.style.removeProperty("--color-dark-variant");
      root.style.removeProperty("--color-light");
      root.style.removeProperty("--box-shadow");
    },
  },
};
</script>

<style scoped></style>
