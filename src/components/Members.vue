<script setup>
import preBene from '../data/beneficiaries.json'
import prePeople from '../data/people.json'
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
    mem.push(prePeople.rawContent[item]);
  }
  entry["members"] = mem;
  bene.pageContent.data.push(entry);
}
</script>

<template>
    <div>
        <h2>Members</h2>
        <div v-for="entry in bene.pageContent.data">
            <h4>{{ entry.title }}</h4>
            <div v-for="(member, index) in entry.members" :id="entry.keyMem[index]"  class="card benelistcard">
                <div class="row">
                    <div class="col-md-3 imgcard">
                        <img class="benelistimg" :title="member.name" :src="member.img" :alt="member.name">
                    </div>
                    <div class="col-md-9">
                        <div class="card-header">
                            <h5>{{ member.name }}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><b>Country:</b> {{ member.country }}</p>
                            <p class="card-text"><b>Website:</b> <a :href="member.profile" target="_blank" rel="noopener noreferrer">Link</a></p>
                            <p class="card-text"><b>Department Division Laboratory:</b> {{ member.department }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>