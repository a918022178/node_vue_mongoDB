<template>
  <div>
    <img width="100" :src="require('../assets/'+img+'.jpg')" alt="">
    <input @change="change" ref="file" type="file" accept="image/jpg,image/jpeg,image/png">
    <img width="100" :src="url" alt="">
    <button @click="submit">修改</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      img: localStorage.getItem('img'),
      file: '',
      url: ''
    }
  },
  methods: {
    change () {
      let that = this
      let file = this.$refs.file.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        that.url = e.target.result
        // that.img = localStorage.getItem('img')
        // console.log(this)
      }
    },
    submit () {
      var form = new FormData()
      console.log(this.$refs.file.files[0])
      form.append('tou', this.$refs.file.files[0])
      form.append('account', localStorage.getItem('account'))
      localStorage.setItem('img', localStorage.getItem('account'))
      this.$http.post('/api/user/avatar', form).then(data => {
        alert(data.body)
        this.$router.push('a')
      })
    }
  }
}
</script>
