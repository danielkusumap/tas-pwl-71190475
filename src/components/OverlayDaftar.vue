<template>
  <div>
    <v-overlay :value="overlay_value" style="height: 100vh">
      <v-card class="mx-auto" width="400" outlined>
        <v-card-title
          >Daftar
          <v-spacer></v-spacer>
          <v-btn icon @click="close_daftar">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="username"
            type="username"
            label="username"
          ></v-text-field>
          <v-text-field
            v-model="email"
            type="email"
            label="Email"
            v-on:keyup.enter="createAccount"
          ></v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            v-on:keyup.enter="createAccount"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            outlined
            rounded
            block
            class="mb-3"
            v-show="show"
            @click="createAccount"
          >
            Daftar
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
  name: "OverlayDaftar",
  props: {
    overlay_value: Boolean,
  },
  data() {
    return {
      absolute: true,
      email: "",
      password: "",
      username: "",
      show: true,
    };
  },
  methods: {
    close_daftar() {
      this.$emit("close", !this.overlay_value);
    },
    createAccount() {
      this.show = false;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          var isLogin = true;
          var email = this.email;
          var password = this.password;
          var stay_signed = this.checkbox;
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          this.$store.commit("login", {
            isLogin,
            email,
            password,
            stay_signed,
          });
          this.username = "";
          this.email = "";
          this.password = "";
          db.collection("cart").doc(this.email).set({ isi_cart: {} });
          db.collection("cart")
            .doc(this.email)
            .get()
            .then((snapshot) => {
              const documents = snapshot.data();
              this.$store.commit("setCart", documents);
              this.close_daftar();
              // this.$store.state.cart.isi_cart["test"]+=1
            });
        });

      this.show = true;
    },
  },
};
</script>