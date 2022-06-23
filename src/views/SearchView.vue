<template>
  <div>
    <v-container class="px-0 mx-auto">
      <v-card class="px-5 mx-5">
        <v-card-title
          >{{ filterProd.length }} Hasil pencarian:
          {{ this.$store.state.search_prod }}</v-card-title
        >

        <v-row class="mx-5 pb-5">
          <v-col
            xs="12"
            sm="12"
            md="4"
            lg="4"
            v-for="prod in filterProd"
            :key="prod.id_produk"
          >
            <v-card outlined>
              <v-img
                :src="prod.foto_produk"
                height="200"
                width="200"
                class="mx-auto my-auto"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="black lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <v-card-title
                class="
                  justify-center
                  text-caption text-sm-body-2 text-md-body-1 text-lg-h6
                "
                >{{ prod.nama_produk }}</v-card-title
              >
              <v-card-subtitle
                class="
                  text-center
                  text-caption
                  text-sm-body-2
                  text-md-body-1
                  text-lg-h6
                "
                >Rp{{ prod.harga_produk.toLocaleString("id-ID") }}</v-card-subtitle
              >
              <v-rating
                class="
                  text-center
                  text-caption
                  text-sm-body-2
                  text-md-body-1
                  text-lg-h6
                "
                :value="prod.rating_produk"
                readonly
              ></v-rating>
              <div class="text-center mt-5 mb-5">
                <v-btn
                  :disabled="!$store.getters.cekLoginInfo"
                  @click="addTocart(prod)"
                  block
                >
                  Add to cart <v-icon icon>mdi-cart-plus</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { db } from "../db";
export default {
  name: "SearchView",
  data() {
    return {

    };
  },
  created() {
    db.collection("produk")
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.$store.commit("setListProd", documents);
      });
  },
  computed: {
    filterProd: function () {
      return this.$store.getters.hasilPencarian;
    },
  },
  methods: {
    addTocart(item) {
      this.$store.commit("addToCart", item);
      var email = this.$store.getters.emailInfo;
      db.collection("cart").doc(email).set(this.$store.getters.getCart);
    },
  },
};
</script>
