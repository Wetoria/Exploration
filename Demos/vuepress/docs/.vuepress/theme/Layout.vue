<template>
  <div class="main">
    <div class="user-info-container"></div>
    <img src="../public/images/bg4.jpg" />
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$router, this.$route, this.$page, this.$site);
  }
}
</script>
