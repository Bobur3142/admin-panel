<template>
  <div class="customers">
    <main>
      <div class="dark_mode_customers">
        <h1>Customers</h1>
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
      </div>
      <div className="recent-orders">
        <div class="add_users">
          <h2>Recent Customers</h2>
          <div class="q-pa-md q-gutter-sm">
            <button class="add_new_customer" @click="prompt = true">
              <i class="fa-solid fa-plus"></i> Add New
            </button>

            <q-dialog v-model="prompt" persistent>
              <q-card class="modal" style="min-width: 450px">
                <q-card-section>
                  <div class="text-h6 modal_h1">Your address</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-input dense v-model="name" autofocus placeholder="Name" />

                  <q-input
                    class="q-mt-sm"
                    dense
                    v-model="userName"
                    autofocus
                    placeholder="Username"
                  />

                  <q-input
                    dense
                    v-model="phone"
                    class="q-mt-sm"
                    autofocus
                    placeholder="Phone"
                  />
                </q-card-section>
                <p className="error">{{ error }}</p>

                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="Cancel" v-close-popup />
                  <q-btn flat label="Add address" @click="sendNewCustomers()" />
                </q-card-actions>
              </q-card>
            </q-dialog>
            <q-dialog v-model="editPrompt" persistent>
              <q-card class="modal" style="min-width: 450px">
                <q-card-section>
                  <div class="text-h6 modal_h1">Edit User</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-input
                    dense
                    v-model="editedName"
                    autofocus
                    placeholder="Name"
                  />
                  <q-input
                    dense
                    v-model="editedUserName"
                    autofocus
                    placeholder="Username"
                  />
                  <q-input
                    dense
                    v-model="editedPhone"
                    autofocus
                    placeholder="Phone"
                  />
                </q-card-section>
                <p class="error">{{ editError }}</p>

                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="Cancel" v-close-popup />
                  <q-btn flat label="Save Changes" @click="saveEditedUser" />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>USERNAME</th>
              <th>PHONE</th>
              <th>MENU</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in displayedProducts" :key="index">
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>
                {{ item.username }}
              </td>
              <td>{{ item.phone }}</td>
              <td>
                <button className="btn edit" @click="openEditDialog(index)">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="btn delete" @click="deleteUser(index)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button
            class="btn_pagination"
            @click="previousPage"
            :disabled="currentPage === 0"
          >
            <i class="fa-solid fa-angle-left"></i>
          </button>
          <button
            class="btn_pagination"
            @click="nextPage"
            :disabled="currentPage === maxPage"
          >
            <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import axios from "axios";
import { ref, computed } from "vue";

export default {
  setup() {
    return {
      prompt: ref(false),
    };
  },
  data() {
    return {
      products: [],
      darkModeEnabled: false,
      currentPage: 0,
      itemsPerPage: 9,
      error: "",
      name: "",
      userName: "",
      phone: "",
      editPrompt: false,
      editIndex: -1,
      editedName: "",
      editedUserName: "",
      editedPhone: "",
      editError: "",
    };
  },
  async created() {
    await this.fetchProducts();
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
    }
  },
  computed: {
    displayedProducts() {
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    },
    maxPage() {
      return Math.ceil(this.products.length / this.itemsPerPage) - 1;
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
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    nextPage() {
      if (this.currentPage < this.maxPage) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },

    openEditDialog(index) {
      const realIndex = this.currentPage * this.itemsPerPage + index;
      this.editIndex = realIndex;
      this.editedName = this.products[realIndex].name;
      this.editedUserName = this.products[realIndex].username;
      this.editedPhone = this.products[realIndex].phone;
      this.editPrompt = true;
    },
    saveEditedUser() {
      if (this.editedName === "") {
        this.editError = "Name is required";
        return;
      } else if (this.editedUserName === "") {
        this.editError = "Username is required";
        return;
      } else if (this.editedPhone === "") {
        this.editError = "Phone is required";
        return;
      }
      this.editError = "";
      this.products[this.editIndex] = {
        id: this.editIndex + 1,
        name: this.editedName,
        username: this.editedUserName,
        phone: this.editedPhone,
      };
      localStorage.setItem("products", JSON.stringify(this.products));
      this.editPrompt = false;
    },

    sendNewCustomers() {
      if (this.name == "") {
        this.error = "Имя не введено";
        return;
      } else if (this.userName == "") {
        this.error = "юзер не введен";
        return;
      } else if (this.phone == "") {
        this.error = "Номер не введен";
        return;
      }
      this.error = "";
      this.products.push({
        id: this.products[this.products.length - 1].id + 1,
        name: this.name,
        username: this.userName,
        phone: this.phone,
      });

      // это чтоб новые пользователи выходили сверху
      // this.products.unshift({
      //   id: this.products.length + 1,
      //   name: this.name,
      //   username: this.userName,
      //   phone: this.phone,
      // });
      // это чтоб новые пользователи выходили сверху

      localStorage.setItem("products", JSON.stringify(this.products));
      this.name = "";
      this.userName = "";
      this.phone = "";
      this.prompt = false;
      console.log(this.products);
    },
    deleteUser(index) {
      const realIndex = this.currentPage * this.itemsPerPage + index;
      this.products.splice(realIndex, 1);
      localStorage.setItem("products", JSON.stringify(this.products));
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
