<!--
 * @Author: your name
 * @Date: 2020-04-23 16:34:21
 * @LastEditTime: 2020-05-05 19:45:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /full/front/pages/index.vue
 -->
<template>
  <section class="container">
    <div v-if="user">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      user: null
    }
  },
  async mounted() {
    const token = window.localStorage.getItem('token')
    const { data } = await this.$http.get('/api/user/info?token=' + token)
    this.user = data
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
