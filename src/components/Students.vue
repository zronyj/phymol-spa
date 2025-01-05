<script setup>
import { toRaw } from 'vue';
import preBene from '../data/beneficiaries.json'
import preProjs from '../data/projects.json'
import people from '../data/people.json'
import preStud from '../data/students.json'

var students = {};
for (const [key, value] of Object.entries(preStud.rawContent)) {
    var entry = structuredClone(value);
    entry["host"] = structuredClone(preBene.pageContent.data[value.host]);
    entry["supervisor"] = {};
    entry["cosupervisor"] = {};
    entry["mentor"] = {};
    var DC = preProjs.pageContent.data[value.candidate.toUpperCase()];
    for (const item of DC.super) {
        entry["supervisor"][item] = structuredClone(people.rawContent[item]);
    }
    for (const item of DC.cosup) {
        entry["cosupervisor"][item] = structuredClone(people.rawContent[item]);
    }
    for (const item of DC.mento) {
        entry["mentor"][item] = structuredClone(people.rawContent[item]);
    }
    students[key] = entry;
}
</script>

<script>
export default {
    data() {
        return {
            selected: "humahuti"
        }
    },
    methods: {
        setSelected(key, candidate) {
            this.selected = key;
            this.$nextTick(() => {
                var focusElement = document.getElementById(candidate);
                focusElement.scrollIntoView({behavior: 'smooth', block: "center"});
            });
        }
    }
}
</script>

<template>
    <div>
        <h2>OUR DOCTORAL CANDIDATES</h2>
        <div class="row">
            <div v-for="(entry, key) in students" class="studentSelect col-xl-2 col-md-3 col-sm-4 col-xs-6 col-6 px-2 py-1">
                <span>{{ entry.name }}</span>
                <div v-on:click="setSelected(key, entry.candidate)">
                    <img :title="entry.name" :src="entry.img" :alt="entry.name">
                </div>
            </div>
        </div>
        <br>
        <br>
        <div v-for="(entry, key) in students">
            <div v-if="key === selected" class="card">
                <div class="row">
                    <div class="col-md-3 imgcard">
                        <img class="studentImg" :title="entry.name" :src="entry.img" :alt="entry.name">
                    </div>
                    <div class="col-md-9">
                        <div class="card-header">
                            <h5 :id="entry.candidate">{{ entry.name }}</h5>
                        </div>
    
                        <div class="card-body">
                            <div class="card-text">
                                <b class="memlinks">About my research: </b>{{ entry.description }}
                            </div>
                            <br>
                            <div class="card-text">
                                <div class="row">
                                    <div class="col-md-6 col-sm-12">
                                        <div class="memlinks"><b>Find my work at:</b>
                                            <ul>
                                                <li v-if="entry.socialMedia.orcid"><a :href="entry.socialMedia.orcid" target="_blank" rel="noopener noreferrer">ORCID</a></li>
                                                <li v-if="entry.socialMedia.googleScholar"><a :href="entry.socialMedia.googleScholar" target="_blank" rel="noopener noreferrer">Google Scholar</a></li>
                                                <li v-if="entry.socialMedia.researchGate"><a :href="entry.socialMedia.researchGate" target="_blank" rel="noopener noreferrer">ResearchGate</a></li>
                                                <li v-if="entry.versionControl.github"><a :href="entry.versionControl.github" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                                                <li v-if="entry.versionControl.gitlab"><a :href="entry.versionControl.gitlab" target="_blank" rel="noopener noreferrer">GitLab</a></li>
                                            </ul>
                                        </div>
                                        <div class="memlinks"><b>And you may also find me at:</b>
                                            <ul>
                                                <li v-if="entry.socialMedia.linkedin"><a :href="entry.socialMedia.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                                                <li v-if="entry.socialMedia.twitter"><a :href="entry.socialMedia.twitter" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
                                                <li v-if="entry.socialMedia.facebook"><a :href="entry.socialMedia.facebook" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-12">
                                        <div class="memlinks"><b>Additional information:</b>
                                            <ul>
                                                <li>Country of origin: {{ entry.country }}</li>
                                                <li>Host university: <a :href="entry.host.website.link" target="_blank" rel="noopener noreferrer">{{ entry.host.short }}, {{ entry.hostCountry }}</a></li>
                                                <li>Supervisor:
                                                    <router-link v-for="(supervisor, key2) in entry.supervisor" :to="'/members#' + key2">&nbsp;{{ supervisor.name }} ({{ supervisor.host.toUpperCase() }})</router-link>
                                                </li>
                                                <li>Co-supervisor:
                                                    <router-link v-for="(cosupervisor, key2) in entry.cosupervisor" :to="'/members#' + key2">&nbsp;{{ cosupervisor.name }} ({{ cosupervisor.host.toUpperCase() }})</router-link>
                                                </li>
                                                <li>Mentor:
                                                    <router-link v-for="(mentor, key2) in entry.mentor" :to="'/members#' + key2">&nbsp;{{ mentor.name }} ({{ mentor.host.toUpperCase() }})</router-link>
                                                </li>
                                                <li>Position:
                                                    <router-link :to="'/dcs/' + entry.candidate">PHYMOL details of {{ entry.candidate.toUpperCase() }}</router-link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>