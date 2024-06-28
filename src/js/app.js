const { createApp, shallowRef, ref } = Vue
import router from './router.js'

const app = createApp({
    data() {
        return {
        }
    },
    methods: {
    },
    created() {
    },
    mounted() {
		
	}
});

app.use(router);
app.mount('#app');