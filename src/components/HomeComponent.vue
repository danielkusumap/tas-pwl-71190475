<template>
  <div>
    <SlideItem/>
    <KategoriTopup/>
  </div>
</template>
<script>
import SlideItem from "./SlideItem.vue"
import KategoriTopup from "./KategoriTopup.vue"

export default {
  name: "HomeComponent",
  components:{
    SlideItem,
    KategoriTopup
  }
};
</script>
