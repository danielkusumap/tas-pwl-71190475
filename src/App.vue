<template>
  <v-app>
    <div style="position: sticky; top: 0; z-index: 1">
      <v-progress-linear
        v-show="show_bar"
        :value="this.$store.state.progress_value"
        height="3"
        striped
      ></v-progress-linear>
      <v-app-bar color="deep-purple accent-4" dense dark height="60">
        <v-toolbar-title @click="backHome">TokoSaya</v-toolbar-title>

        <v-spacer></v-spacer>

        <Transition name="slide-fade">
          <v-text-field
            id="text-field-search"
            class="jarak pt-6"
            v-show="show"
            v-model="search_input"
            label="search"
            v-on:keyup.enter="searchProd"
          ></v-text-field>
        </Transition>
        <v-btn icon @click="closeSearch" v-show="show">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn icon @click="search" v-show="!show">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <div v-show="!$store.getters.cekLoginInfo">
          <v-btn
            class="jarak text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            @click="masuk"
            >Masuk</v-btn
          >
          <v-btn
            class="jarak text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            @click="daftar"
            >Daftar</v-btn
          >
        </div>
        <div v-show="$store.getters.cekLoginInfo">
          <v-menu offset-y :close-on-content-click="closeOnContentClick">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                color="white"
                class="
                  mx-5
                  text-caption text-sm-body-2 text-md-body-1 text-lg-h6
                "
                @click="cekCartItem"
                v-show="show_icon"
              >
                <v-badge :content="cekCart()">
                  <v-icon> mdi-cart-outline </v-icon>
                </v-badge>
              </v-btn>
            </template>

            <v-card elevation="16" max-width="1200" class="mx-auto">
              <v-virtual-scroll
                :items="items"
                item-height="200"
                height="400"
                width="800"
              >
                <template v-slot:default="{ item }">
                  
                  <v-list-item :key="item.id">
                    <v-list-item-avatar
                      class="mb-5"
                      width="200"
                      height="150"
                      tile
                    >
                      <v-img :src="item[1].foto_produk"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item[1].nama_produk }}
                      </v-list-item-title>
                      <v-list-item-title>
                        {{ item[1].jumlah }} x Rp{{ (item[1].harga_produk).toLocaleString("id-ID") }}
                      </v-list-item-title>
                      <v-list-item-title>
                        subtotal: Rp{{ (item[1].jumlah * item[1].harga_produk).toLocaleString("id-ID") }}
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-content>
                      <v-list-item-icon>
                        <v-btn icon @click="decreaseItem(item[1])">
                          <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <p class="mt-2">{{ item[1].jumlah }}</p>
                        <v-btn icon @click="newItem(item[1])">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </v-list-item-icon>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                </template>
              </v-virtual-scroll>

              <v-card-title>
                Total harga: Rp{{
                  $store.getters.getTotalHarga.toLocaleString("id-ID")
                }}
              </v-card-title>
              <v-card-actions>
                <v-btn @click="$router.push('/checkout')"> checkout </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
          <!-- <v-btn icon color="white" class="mx-5" @click="test">
            <v-badge :content="cekCart()">
              <v-icon> mdi-cart-outline </v-icon>
            </v-badge>
          </v-btn> -->

          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="text-caption text-sm-body-2 text-md-body-1 text-lg-h10"
                v-show="show_icon"
              >
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>
            <v-list class="px-4">
              <v-list-item>
                <v-list-item-title>{{
                  $store.getters.emailInfo
                }}</v-list-item-title>
              </v-list-item>
              <v-btn x-large block> logout </v-btn>
              <!-- <v-list-item link @click="logoutAccount">
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item> -->
            </v-list>
          </v-menu>
          <!-- <v-btn>{{ $store.getters.emailInfo }}</v-btn> -->
        </div>
      </v-app-bar>
    </div>
    <v-main>
      <overlay-masuk :overlay_value="overlay_masuk" @close="close_overlay" />
      <overlay-daftar :overlay_value="overlay_daftar" @close="close_overlay" />
      <!-- <slide-item />
      <kategori-topup /> -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { db } from "./db";
import OverlayMasuk from "./components/OverlayMasuk.vue";
// import SlideItem from "./components/SlideItem.vue";
// import KategoriTopup from "./components/KategoriTopup.vue";
import OverlayDaftar from "./components/OverlayDaftar.vue";

export default {
  name: "App",
  components: {
    OverlayMasuk,
    // SlideItem,
    // KategoriTopup,
    OverlayDaftar,
  },

  data: () => ({
    show: false,
    search_input: "",
    absolute: true,
    overlay_masuk: false,
    overlay_daftar: false,
    show_bar: false,
    closeOnContentClick: false,
    items: "",
    screen_width: "",
    show_icon: true,
  }),

  methods: {
    search() {
      // if (this.search_input === "") {
      //   this.show = !this.show;
      // }
      this.show = true;
      this.screen_width = screen.availWidth;
      if (this.screen_width <= 480) {
        this.show_icon = false;
      }
    },
    masuk() {
      this.overlay_masuk = !this.overlay_masuk;
    },
    daftar() {
      this.overlay_daftar = !this.overlay_daftar;
    },
    close_overlay(value) {
      this.overlay_masuk = value;
      this.overlay_daftar = value;
    },
    closeSearch() {
      this.show = false;
      this.show_icon = true;
    },
    searchProd() {
      this.show_bar = true;
      // this.$store.commit("setProgressValue", 15);
      this.$store.commit("setSearchProd", this.search_input);
      // this.$store.commit("setProgressValue", 50);

      if (this.$router.currentRoute.path != "/search") {
        this.$router.push("/search");
      }
      // this.$router.push("/search");

      this.show_bar = false;
      // this.$store.commit("setProgressValue", 0);
    },
    backHome() {
      this.show_bar = true;
      this.$store.commit("setProgressValue", 35);
      this.$router.push("/");
      this.$store.commit("setProgressValue", 75);
      this.show_bar = false;
      this.$store.commit("setProgressValue", 0);
    },
    logoutAccount() {
      // console.log("AAAAAAA")
      var isLogin = false;
      var email = "";
      var password = "";
      var stay_signed = false;
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          this.$store.commit("login", {
            isLogin,
            email,
            password,
            stay_signed,
          });
        });
    },
    cekCart() {
      try {
        return this.$store.state.totalJumlah;
        // return Object.keys(this.$store.getters.getCart.isi_cart).length;
        // return Object.size(this.$store.getters.getCart.isi_cart)
      } catch (err) {
        return 0;
      }
    },
    newItem(item) {
      this.$store.commit("addToCart", item);
      var email = this.$store.getters.emailInfo;
      db.collection("cart").doc(email).set(this.$store.getters.getCart);
    },
    decreaseItem(item) {
      this.$store.commit("decreaseItem", item);
      var email = this.$store.getters.emailInfo;
      this.cekCartItem();
      db.collection("cart").doc(email).set(this.$store.getters.getCart);
    },
    cekCartItem() {
      this.items = Object.entries(this.$store.getters.getCart.isi_cart);
    },
    // test() {
    //   console.log(this.$store.state.totalJumlah);
    //   // console.log("AAAAAAAAA");
    // },
  },
  created() {
    if (localStorage.getItem("email") && localStorage.getItem("password")) {
      var isLogin = true;
      var email = localStorage.getItem("email");
      var password = localStorage.getItem("password");
      var stay_signed = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          this.$store.commit("login", {
            isLogin,
            email,
            password,
            stay_signed,
          });
        });
      db.collection("cart")
        .doc(email)
        .get()
        .then((snapshot) => {
          const documents = snapshot.data();
          // this.cart = documents;
          // this.$store.commit("setCart", documents);
          // console.log(documents, "AAAA");
          if (typeof documents == "undefined") {
            db.collection("cart").doc(email).set({ isi_cart: {} });
          }
          db.collection("cart")
            .doc(email)
            .get()
            .then((snapshot) => {
              const documents = snapshot.data();
              this.$store.commit("setCart", documents);
              // this.$store.state.cart.isi_cart["test"]+=1
            });
        });
    }
  },
};
</script>

<style>
.jarak {
  margin: 2px;
}
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>