<script setup>
import preHome from '../data/home.json'
import preBene from '../data/beneficiaries.json'
import prePart from '../data/partners.json'

var home = {
  "pageContent": [
    {
      "title" : preHome.pageContent.title,
      "type" : "text",
      "data" : preHome.pageContent.data
    },
    {
      "title": "PARTNERS",
      "type": "images",
      "data": []
    },
    {
      "title": "BENEFICIARIES",
      "type": "images",
      "data": []
    }
  ]
};

for (const [key, item] of Object.entries(preBene.pageContent.data)) {
  home.pageContent[2].data.push({
    "name" : item.short,
    "img" : item.img,
    "link" : item.website.link
  });
}

for (const [key, item] of Object.entries(prePart.pageContent.data)) {
  home.pageContent[1].data.push({
    "name" : item.website.name,
    "img" : item.img,
    "link" : item.website.link
  });
}
</script>

<template>
  <div>
    <h2>{{ home.pageContent[0].title }}</h2>
    <p v-for="paragraph in home.pageContent[0].data">{{ paragraph }}</p>

    <h2>{{ home.pageContent[1].title }}</h2>
    <a v-for="entry in home.pageContent[1].data" :href="entry.link" target="_blank" rel="noopener noreferrer">
      <img class="thumbnail" :title="entry.name" :src="entry.img" :alt="entry.name">
    </a>

    <h2>{{ home.pageContent[2].title }}</h2>
    <a v-for="entry in home.pageContent[2].data" :href="entry.link" target="_blank" rel="noopener noreferrer">
      <img class="thumbnail" :title="entry.name" :src="entry.img" :alt="entry.name">
    </a>
  </div>
</template>
