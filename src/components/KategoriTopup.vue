<template>
  <div>
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col  style="height: 250px">
          <v-card outlined>
            <v-card-title class="text-caption text-sm-body-2 text-md-body-1 text-lg-h6">Kategori Pilihan</v-card-title>
              <div v-if="show">
                <div class="text-center mb-5">
                  <v-progress-circular
                    indeterminate
                    color="red"
                  ></v-progress-circular>
                </div>
              </div>
              <div v-else>
                <v-row class="mx-auto my-auto">
                  <v-col
                    xs="12"
                    sm="12"
                    md="4"
                    lg="4"
                    v-for="item in kategori_pilihan"
                    :key="item.id"
                  >
                    <v-card outlined link>
                      <v-img
                        :src="item.path_file"
                        height="100"
                        width="100"
                        class="mx-auto mt-3"
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
                        >{{ item.nama }}</v-card-title
                      >
                      <!-- <v-card-actions>
                        <v-btn class="ma-2 mx-auto" outlined color="indigo">
                          Lihat
                        </v-btn>
                      </v-card-actions> -->
                    </v-card>
                  </v-col>
                </v-row>
              </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db } from "../db";
export default {
  name: "KategoriTopup",
  data() {
    return {
      kategori_pilihan: [],
      show: true,
    };
  },
  created() {
    db.collection("kategori_pilihan")
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => doc.data());
        this.kategori_pilihan = documents;
        this.show = !this.show;
      });
  },
};
</script>