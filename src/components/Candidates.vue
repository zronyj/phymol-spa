<script setup>
import candi from '../data/doctoral_candidates.json'

</script>

<template>
    <div>
        <h2>{{ candi.pageContent[$route.params.dc].title }}</h2>
        <p v-for="(entry, key) in candi.pageContent[$route.params.dc].content" :class="(key == 'Webpage:') ? '' : 'memlinks'">
            <b>{{ key }}&nbsp;</b>
            <span v-if="key != 'Webpage:'" v-html="entry"></span>
            <a v-else :href="entry.url" target="_blank" rel="noopener noreferrer">{{ entry.title }}</a>
        </p>
    </div>
</template>