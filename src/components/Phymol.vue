<script setup>
import json from '../data/phymol.json'
const content = json;
</script>

<template>
  <div>
    <h2>{{ content.pageContent[0].title }}</h2>
    <p v-for="paragraph in content.pageContent[0].data">{{ paragraph }}</p>
  </div>
  <div>
      <h2>Calendar</h2>
      <p>
          <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Etc%2FGMT&showTitle=0&hl=en_GB&showTz=0&src=M2NhYmQyMTFkZDM0ZmU0NjhjMjU3YTBjMTlkMWM1NDY4MTQ5NDBjMmJhZDZjYzZmODJlN2UzZmU0NzlmMWVlZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23A79B8E" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
      </p>
  </div>
</template>

<style scoped>

</style>
