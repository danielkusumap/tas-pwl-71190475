import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    email: "",
    password: "",
    search_prod: "",
    progress_value: 0,
    list_prod: [],
    hasil_filter: [],
    stay_singed: "",
    cart: [],
    totalJumlah: 0,
    totalHarga:0,
    list_voucher:[],
    list_transaksi:[]
  },
  mutations: {
    login(state, { isLogin, email, password, stay_singed }) {
      state.isLogin = isLogin
      state.email = email
      state.password = password
      state.stay_singed = stay_singed
    },
    setListTransaksi(state, list_transaksi){
      state.list_transaksi = list_transaksi
    },
    setCart(state, cart) {
      state.cart = cart
      try {
        const cartSlice = Object.entries(state.cart.isi_cart)
        var jumlah = 0
        for (var i = 0; i < cartSlice.length; i++) {
          jumlah += cartSlice[i][1].jumlah
          state.totalHarga += cartSlice[i][1].jumlah * cartSlice[i][1].harga_produk
        }
        state.totalJumlah = jumlah
        // state.totalJumlah = Object.entries(state.cart.isi_cart).length
      }
      catch (err) {
        state.totalJumlah = 0
      }
    },
    addToCart(state, item) {
      if (item.id in state.cart.isi_cart) {
        state.cart.isi_cart[item.id]["jumlah"] += 1
      }
      else {
        state.cart.isi_cart[item.id] = { ...item, jumlah: 1 }
      }
      state.totalHarga += state.cart.isi_cart[item.id]["harga_produk"]
      state.totalJumlah += 1
    },
    decreaseItem(state, item) {
      if (item.id in state.cart.isi_cart) {
        state.cart.isi_cart[item.id]["jumlah"] -= 1
        state.totalHarga -= state.cart.isi_cart[item.id]["harga_produk"]
        if(state.cart.isi_cart[item.id]["jumlah"] == 0){
          // const cartSlice = Object.entries(state.cart.isi_cart)
          // var tempCart = {"isi_cart":{}}
          // for (var i = 0; i < cartSlice.length; i++){
          //   if(item.id != cartSlice[i][1].id){
          //     tempCart["isi_cart"][cartSlice[i][1].id] = cartSlice[i][1]
          //   }
          // }
          // console.log(tempCart)
          delete state.cart.isi_cart[item.id]
          // console.log(state.cart)
          // state.cart = state.cart.isi_cart.filter((produk) => produk.id !== item.id)
          
        }
        
        state.totalJumlah -= 1
      }      
    },
    deleteCart(state){
      const cartSlice = Object.entries(state.cart.isi_cart)
      for (var i = 0; i < cartSlice.length; i++) {
        delete state.cart.isi_cart[cartSlice[i][1].id]
      }
      state.cart = []
      state.totalJumlah = 0
    },
    setSearchProd(state, search_prod) {
      state.search_prod = search_prod
    },
    setProgressValue(state, val) {
      state.progress_value = val
    },
    setListProd(state, list_prod) {
      state.list_prod = list_prod;
    },
    setListVoucher(state, list_voucher){
      state.list_voucher = list_voucher
    }
  },
  getters: {
    cekLoginInfo(state) {
      return state.isLogin
    },
    emailInfo(state) {
      return state.email
    },
    getCart(state) {
      return state.cart
    },
    getTotalHarga(state){
      return state.totalHarga
    },
    hasilPencarian(state) {
      return state.list_prod.filter((item) => {
        state.progress_value = 100;
        if ((item.nama_produk).toLowerCase().match(state.search_prod.toLowerCase())) {
          return (item.nama_produk).toLowerCase().match(state.search_prod.toLowerCase())
        }
        if ((item.kategori_produk).toLowerCase().match(state.search_prod.toLowerCase())) {
          return (item.kategori_produk).toLowerCase().match(state.search_prod.toLowerCase())
        }
      })
    },
    getListVoucher(state){
      return state.list_voucher
    },
    getListTransaksi(state){
      return state.list_transaksi
    }
  }
})
