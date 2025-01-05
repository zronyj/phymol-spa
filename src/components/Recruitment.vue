<script setup>
import recruitment from '../data/recruitment.json'
const content = structuredClone(recruitment);

function buildList(content, orderedList) {
    var lT = (orderedList ? 'o' : 'u' );
    var littleList = `<${lT}l>\n`;
    for (const item of content) {
        if (typeof item === 'string') {
            littleList += `<li>${item}</li>\n`;
        } else {
            littleList += buildList(item, orderedList);
        }
    }
    littleList += `</${lT}l>\n`;
    return littleList;
}

function checkContent(content) {
    var result = '';
    for (const [key2, value2] of Object.entries(content)) {
        if (typeof value2 === 'string') {
            result += `<p>${value2}</p>\n`;
        } else {
            if (key2 === "data") {
                result += this.buildList(value2, false);
            } else if (key2 === "odata") {
                result += this.buildList(value2, true);
            } else {
                var jump = ((value2.description.length != 0) ? '<br>' : '');
                result += `<p><b>${key2}:</b><br>${value2.description}${jump}</p>\n`;
                result += this.buildList(value2.data, false);
            }
        }
    }
    return result;
}
</script>

<template>
    <div>
        <h2>{{ content.pageContent.title }}</h2>
        <p>{{ content.pageContent.description }}</p>
        <p v-html="buildList(content.pageContent.data, false)"></p>
        <div class="accordion" id="accordionProjects">
            <div v-for="(value, key, index) in content.pageContent.accordion" class="accordion-item">
                <h4 class="accordion-header">
                    <button class="accordion-button collapsed accordionTitle" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="false" :aria-controls="'collapse' + index">{{ key }}</button>
                </h4>
                <div :id="'collapse' + index" class="accordion-collapse collapse">
                    <div class="accordion-body" v-html="checkContent(value)"></div>
                </div>
            </div>
        </div>
        <br>
        <p class="memlinks"><b>Contact:</b> <span v-html="content.pageContent.contact"></span></p>
        <span class="memlinks">
            <b>Timeline:</b>
            <div v-html="buildList(content.pageContent.timelines, false)"></div>
        </span>
    </div>
</template>

<style scoped>

</style>
