<template>
  <div>
    <v-overlay :value="overlay_value" style="height: 100vh;">
      <v-card class="mx-auto" width="400" outlined>
        <v-card-title class="text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
          >Masuk
          <v-spacer></v-spacer>
          <v-btn icon @click="close_masuk">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field
          class="text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            type="email"
            v-model="email"
            label="Email"
            v-on:keyup.enter="loginAccount"
          ></v-text-field>
          <v-text-field
          class="text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            type="password"
            v-model="password"
            label="Password"
            v-on:keyup.enter="loginAccount"
          ></v-text-field>
        </v-card-text>
        <v-checkbox v-model="checkbox" label="stay signed in" class="text-caption text-sm-body-2 text-md-body-1 text-lg-h6"></v-checkbox>
        <v-card-actions>
          <v-btn
            outlined
            rounded
            block
            class="mb-3 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            v-show="show"
            @click="loginAccount"
            
          >
            Masuk
          </v-btn>
          <div class="text-center mx-auto" v-show="!show">
            <v-btn>
              <v-progress-circular
                indeterminate
                color="red"
              ></v-progress-circular>
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </div>
</template>
      
<script>
import firebase from "firebase";
import { db } from "../db";
export default {
  name: "OverlayMasuk",
  props: {
    overlay_value: Boolean,
  },
  data() {
    return {
      absolute: true,
      show: true,
      email: "",
      password: "",
      checkbox: false,
      cart: [],
    };
  },
  methods: {
    close_masuk() {
      this.$emit("close", !this.overlay_value);
    },
    async loginAccount() {
      this.show = false;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          var isLogin = true;
          var email = this.email;
          var password = this.password;
          var stay_signed = this.checkbox;
          if(stay_signed){
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
          }
            
          

          this.$store.commit("login", {
            isLogin,
            email,
            password,
            stay_signed,
          });
          this.email = "";
          this.password = "";
          this.show = true;
          this.close_masuk();
        });

      db.collection("cart")
        .doc(this.email)
        .get()
        .then((snapshot) => {
          const documents = snapshot.data();
          if (typeof documents == "undefined") {
            db.collection("cart").doc(this.email).set({ isi_cart: {} });
          }
          db.collection("cart")
            .doc(this.email)
            .get()
            .then((snapshot) => {
              const documents = snapshot.data();
              this.$store.commit("setCart", documents);
              this.close_masuk();
            });
        });
      
    },
  },
};
</script>