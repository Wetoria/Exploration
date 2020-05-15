<template>
  <div>
    <h1>hello!</h1>
    <div v-for="(item, index) of list" :key="index">
      {{ item.name + index }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: 'test',
        },
        {
          name: 'test',
        },
        {
          name: 'test',
        },
        {
          name: 'test',
        },
      ],
    };
  },
}
</script>