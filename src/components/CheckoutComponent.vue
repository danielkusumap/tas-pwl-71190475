<template>
  <div class="mb-10">
    <!-- <v-list-item v-for="item in cekCartItem()" :key="item.id">
      <v-list-item-title>
        {{ item[1].nama_produk }} {{ item[1].jumlah }}
      </v-list-item-title>
    </v-list-item> -->
    <v-text-field
      placeholder="nama penerima"
      label="nama penerima"
      class="mx-10 pt-5"
      :rules="rules"
      v-model="nama_penerima"
      outlined
    ></v-text-field>
    <v-text-field
      placeholder="alamat"
      label="alamat"
      class="mx-10 pt-3"
      v-model="alamat"
      :rules="rules"
      outlined
    ></v-text-field>
    <v-card class="mx-10 mt-5">
      <v-row v-for="item in cekCartItem()" :key="item.id">
        <v-col xs="12" sm="4" md="4" lg="4">
          <v-img width="200" height="150" :src="item[1].foto_produk" class="mb-5"></v-img>
          <!-- <v-list-item-avatar class="mb-5" width="200" height="150" tile>
            <v-img :src="item[1].foto_produk"></v-img>
          </v-list-item-avatar> -->
        </v-col>

        <v-col xs="12" sm="4" md="4" lg="4">
          <v-list-item-content>
            <v-list-item-title
              class="text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            >
              {{ item[1].nama_produk }}
            </v-list-item-title>
            <v-list-item-title
              class="text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            >
              {{ item[1].jumlah }} x Rp{{
                item[1].harga_produk.toLocaleString("id-ID")
              }}
            </v-list-item-title>
            <v-list-item-title
              class="text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            >
              subtotal: Rp{{
                (item[1].jumlah * item[1].harga_produk).toLocaleString("id-ID")
              }}
            </v-list-item-title>
          </v-list-item-content>
        </v-col>

        <v-col xs="12" sm="4" md="4" lg="4">
          <v-list-item-content>
            <v-list-item-icon
              class="text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            >
              <v-btn icon @click="decreaseItem(item[1])">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <p class="">{{ item[1].jumlah }}</p>
              <v-btn icon @click="newItem(item[1])">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item-content>
        </v-col>
      </v-row>
      <!-- <v-list-item
        v-for="item in cekCartItem()"
        :key="item.id"
        class="ml-10 pt-5"
      >
        <v-list-item-avatar class="mb-5" width="200" height="150" tile>
          <v-img :src="item[1].foto_produk"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-caption text-sm-body-2 text-md-body-1 text-lg-h6">
            {{ item[1].nama_produk }}
          </v-list-item-title>
          <v-list-item-title class="text-caption text-sm-body-2 text-md-body-1 text-lg-h6">
            {{ item[1].jumlah }} x Rp{{ (item[1].harga_produk).toLocaleString("id-ID") }}
          </v-list-item-title>
          <v-list-item-title class="text-caption text-sm-body-2 text-md-body-1 text-lg-h6">
            subtotal: Rp{{ (item[1].jumlah * item[1].harga_produk).toLocaleString("id-ID") }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-icon class="text-caption text-sm-body-2 text-md-body-1 text-lg-h6">
            <v-btn icon @click="decreaseItem(item[1])">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <p class="">{{ item[1].jumlah }}</p>
            <v-btn icon @click="newItem(item[1])">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item-content>
      </v-list-item> -->
      <v-text-field
        placeholder="voucher"
        label="voucher"
        class="mx-10"
        outlined
        hide-details
        v-model="kode_voucher"
        @input="cekVoucher"
      ></v-text-field>
      <v-card-title
        v-show="show_voucher"
        class="mx-10 pa-0 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
        style="color: green"
        >yeay ada diskon {{ this.persen_diskon * 100 }}% !!!</v-card-title
      >
      <v-card-title class="mx-10 pa-0 py-5 text-caption text-sm-body-2 text-md-body-1 text-lg-h6">
        Total harga: Rp{{
          (
            $store.getters.getTotalHarga -
            $store.getters.getTotalHarga * this.persen_diskon
          ).toLocaleString("id-ID")
        }}
      </v-card-title>
      <v-card-actions class="pb-5">
        <v-btn block x-large class="btn-css" @click="orderNow">order now</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style>
.btn-css {
  box-shadow: 0 10px 0 #a9b1bb;
}
.btn-css:active {
  box-shadow: none;
  transform: translateY(10px);
}
</style>

<script>
import { db } from "../db";
export default {
  name: "CheckoutComponent",
  data() {
    return {
      kode_voucher: "",
      show_voucher: false,
      persen_diskon: 0,
      rules: [(value) => !!value || "Required."],
      nama_penerima: "",
      alamat: "",
    };
  },
  methods: {
    orderNow(){
      if(this.alamat === ""){
        alert("harap isi alamat dulu")
        return
      }
      if(this.nama_penerima === ""){
        alert("harap isi nama penerima dulu")
        return
      }
    },
    cekVoucher() {
      const list_voucher = this.$store.getters.getListVoucher;
      for (var i = 0; i < list_voucher.length; i++) {
        if (list_voucher[i].kode_voucher === this.kode_voucher.toLowerCase()) {
          this.persen_diskon = list_voucher[i].persen_diskon;
          this.show_voucher = true;
          return;
        }
      }
      this.persen_diskon = 0;
      this.show_voucher = false;
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
      return Object.entries(this.$store.getters.getCart.isi_cart);
    },
  },
  created() {
    db.collection("voucher")
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => doc.data());
        this.$store.commit("setListVoucher", documents);
      });
  },
};
</script>