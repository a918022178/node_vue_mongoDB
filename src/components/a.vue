<template>
  <div class="hello">
    <h1>{{result.account}}</h1>
    <img :src="require('../assets/'+result.img+'.jpg')" alt="">
    <router-link to="avatar">修改头像</router-link>
    <textarea placeholder="搞砰肥辣鸡" v-model="txt" name="txt" id="" cols="30" rows="10"></textarea>
    <button @click="submit">发表</button>
    <div class="shuo" v-for="(v,i) in list" :key="i">
      <!-- <img :src="'../assets/'+v.img+'.jpg'" alt=""> -->
      <img :src="require('../assets/'+v.img+'.jpg')" alt="">
      <span style="padding-right:20px">{{v.account}}:</span>
      <span>{{v.txt}}</span><br>
      <span>{{v.date}}</span>
      <button v-show="v.account === result.account" style="float:right" @click="del(v.txt)">删除</button>
    </div>
    <div class="aa">
      <h1>sdfksdafsdabfkads</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      result: {},
      txt: '',
      list: ''
    }
  },
  created () {
    this.result.img = 1
    var body = {
      account: localStorage.getItem('account')
    }
    this.$http.post('/api/user', body).then(data => {
      console.log(data.body[0])
      this.result = data.body[0]
      localStorage.setItem('img', this.result.img)
    })
    this.$http.post('/api/user/all').then(data => {
      this.list = data.body
      // this.list.reverse()
    })
    // this.$ajax({
    //   method: 'get',
    //   url: '/api/test?p=0',
    //   params: {
    //     name: 'wise',
    //     info: 'wrong'
    //   }
    // }).then((data) => {
    //   console.log(data)
    // })
    var params = {name: 'wise', info: 'wrong'}
    this.$http.get('/api/test', {params}).then((data) => {
      console.log(data)
    })
  },
  methods: {
    submit () {
      if (!this.txt.trim()) {
        return
      }
      var body = {
        account: this.result.account,
        txt: this.txt,
        img: this.result.img
      }
      this.$http.post('/api/user/shuo', body).then(data => {
        // console.log(data)
        alert(data.body)
        location.reload()
      })
    },
    del (txt) {
      this.$http.post('/api/user/delete', {account: this.result.account, txt: txt}).then(data => {
        // console.log(data)
        alert(data.body)
        location.reload()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  img{
    width: 100px;
  }
  .shuo{
    border: 1px solid #ccc;
    text-align: left;
    padding: 20px 40px;
    margin: 10px 0;
  }
  .shuo img{
    width: 50px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .shuo img span{
    vertical-align: middle;
  }
  .aa{
    h1{
      color: aqua;
    }
  }
</style>
