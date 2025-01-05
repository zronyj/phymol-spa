<script setup>
import prePart from '../data/partners.json'
import people from '../data/people.json'
var part = {
  "pageContent": {
    "title" : prePart.pageContent.title,
    "type" : prePart.pageContent.type,
    "data" : []
  }
};

for (const [key, value] of Object.entries(prePart.pageContent.data)) {
  var par = [];
  var entry = structuredClone(value);
  for (const item of value.keyPar) {
    par.push(people.rawContent[item]);
  }
  entry["members"] = par;
  part.pageContent.data.push(entry);
}
</script>

<template>
    <div>
        <h2>{{ part.pageContent.title }}</h2>
        <div v-for="entry in part.pageContent.data">
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