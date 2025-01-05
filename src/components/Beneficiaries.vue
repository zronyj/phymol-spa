<script setup>
import preBene from '../data/beneficiaries.json'
import people from '../data/people.json'
var bene = {
  "pageContent": {
    "title" : preBene.pageContent.title,
    "type" : preBene.pageContent.type,
    "data" : []
  }
};

for (const [key, value] of Object.entries(preBene.pageContent.data)) {
  var mem = [];
  var entry = structuredClone(value);
  for (const item of value.keyMem) {
    mem.push(people.rawContent[item]);
  }
  entry["members"] = mem;
  bene.pageContent.data.push(entry);
}
</script>

<template>
    <div>
        <h2>{{ bene.pageContent.title }}</h2>
        <div v-for="entry in bene.pageContent.data">
            <div :id="entry.website.name" class="card benelistcard">
                <div class="row">
                    <div class="col-md-3 imgcard">
                        <img class="benelistimg" :title="entry.website.name" :src="entry.img" :alt="entry.website.name">
                    </div>
                    <div class="col-md-9">
                        <div class="card-header">
                            <h5>{{ entry.title }}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text" v-html="entry.content"></p>
                            <p class="card-text"><b>Website:</b> <a :href="entry.website.link" target="_blank" rel="noopener noreferrer">{{ entry.website.name }}</a></p>
                            <p class="card-text">PHYMOL Members:</p>
                            <ul class="memlinks">
                                <li v-for="member in entry.members">
                                    <a :href="member.profile" target="_blank" rel="noopener noreferrer">{{ member.name }}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
