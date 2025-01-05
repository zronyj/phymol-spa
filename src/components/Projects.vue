<script setup>
import preBene from '../data/beneficiaries.json'
import preProjs from '../data/projects.json'
import people from '../data/people.json'
var projs = {
  "pageContent": {
    "title" : preProjs.pageContent.title,
    "type" : preProjs.pageContent.type,
    "description" : preProjs.pageContent.description,
    "data" : []
  }
}

for (const [key, value] of Object.entries(preProjs.pageContent.data)) {
  var entry = structuredClone(value);
  entry["host"] = preBene.pageContent.data[value.short_host];
  entry["supervisor"] = [];
  entry["cosupervisor"] = [];
  entry["mentor"] = [];
  for (const item of value.super) {
    entry["supervisor"].push(people.rawContent[item]);
  }
  for (const item of value.cosup) {
    entry["cosupervisor"].push(people.rawContent[item]);
  }
  for (const item of value.mento) {
    entry["mentor"].push(people.rawContent[item]);
  }
  projs.pageContent.data.push(entry);
}
</script>

<template>
    <div>
        <h2>{{ projs.pageContent.title }}</h2>
        <p v-for="paragraph in projs.pageContent.description" v-html="paragraph"></p>
        <div class="accordion" id="accordionProjects">
            <div v-for="accoItem in projs.pageContent.data" :id="accoItem.info" class="accordion-item">
                <h4 class="accordion-header">
                    <button class="accordion-button collapsed accordionTitle" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + accoItem.info" aria-expanded="false" :aria-controls="'collapse' + accoItem.info">{{accoItem.title}}</button>
                </h4>
                <div :id="'collapse' + accoItem.info" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <p class="memlinks"><b>Host:</b> <router-link :to="'/beneficiaries#' + accoItem.host.website.name">{{accoItem.host.short}} ({{ accoItem.host.website.name }})</router-link></p>
                        <p><b>PhD Enrollment:</b> {{ accoItem.enrollment }}</p>
                        <p><b>Start Date:</b> {{ accoItem.start }}</p>
                        <p><b>Duration:</b> {{ accoItem.duration }}</p>
                        <p><b>Objectives:</b> {{ accoItem.objectives }}</p>
                        <p class="memlinks"><b>Supervisor: </b>
                            <router-link v-for="(supervisor, index) in accoItem.supervisor" :to="'/members#' + accoItem.super[index]">{{ supervisor.name }} ({{ supervisor.host.toUpperCase() }})</router-link>
                        </p>
                        <p class="memlinks"><b>Co-supervisor: </b>
                            <router-link v-for="(cosupervisor, index) in accoItem.cosupervisor" :to="'/members#' + accoItem.cosup[index]">{{ cosupervisor.name }} ({{ cosupervisor.host.toUpperCase() }})</router-link>
                        </p>
                        <p class="memlinks"><b>Mentor: </b>
                            <router-link v-for="(mentor, index) in accoItem.mentor" :to="'/members#' + accoItem.mento[index]">{{ mentor.name }} ({{ mentor.host.toUpperCase() }})</router-link>
                        </p>
						            <p class="memlinks"><b>Further information: </b>
                            <router-link :to="'/dcs/' + accoItem.info">Project details of {{ accoItem.info.toUpperCase() }}</router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
