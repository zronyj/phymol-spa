const { createApp, shallowRef, ref } = Vue
import router from './router.js'

const app = createApp({
    data() {
        return {
        stickyNav: false,
        tester: false,
        menuItems: [],
        pieces: {}
        }
    },
    methods: {
        readTextFile: function (file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
        }
    },
    created() {
    },
    mounted() {
		
	}
});

app.use(router);
app.mount('#app');