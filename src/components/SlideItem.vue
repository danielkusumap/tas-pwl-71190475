<template>
  <div>
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col cols="9">
          <v-carousel hide-delimiters show-arrows-on-hover cycle height="auto">
            <v-carousel-item src="../assets/SlideItem/diskon1.png"></v-carousel-item>
            <v-carousel-item src="../assets/SlideItem/diskon2.png"></v-carousel-item>
            <v-carousel-item src="../assets/SlideItem/diskon3.png"></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SlideItem",
  data() {
    return {
    };
  },
};
</script>
