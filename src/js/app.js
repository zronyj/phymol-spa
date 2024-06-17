const { createApp, shallowRef, ref } = Vue
import router from './router.js'

const app = createApp({
    data() {
        return {
        stickyNav: false,
        tester: false,
        menuItems: [],
        pageMap: {
            "PROJECT": "project.js",
            "NETWORK": "network.js",
            "RESEARCH PROJECTS": "projects.js",
            "RECRUITMENT": "recruitment.js",
            "EVENTS": "events.js",
            "TRAINING": "training.js",
            "IMPACT": "impact.js",
            "CALENDAR": "calendar.js"
        },
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
        },
        readMenu: function(){
            for (const [key, value] of Object.entries(this.pageMap)){
                this.menuItems.push(key);
            }
        }
    },
    created() {
        this.readMenu();
    },
    mounted() {
		
	}
});

app.use(router);
app.mount('#app');