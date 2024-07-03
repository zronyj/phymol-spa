export default {
    data () {
        return {
            candidate: "dc1",
            content: null
        }
    },
    props: {
        package: Object
    },
    template: '<component :is="dynamicComponent"></component>',
    methods: {
        populateData: function() {
            this.content = this.$props.package;
            this.candidate = this.$route.params.dc;
        },
        buildComponent: function(item) {
            var complete = '<div>\n';
            complete += `<h2>${item.pageContent[this.candidate].title}</h2>\n`;
            for (const [key, value] of Object.entries(item.pageContent[this.candidate].content)) {
                if (key != "Webpage:") {
                    complete += `<p><b>${key}</b> ${value}</p>\n`;
                } else {
                    complete += `<p class="memlinks"><b>${key}</b> <a href="${value.url}" target="_blank">${value.title}</a></p>\n`;
                }
            }
            complete += '</div>\n';
            return complete;
        },
        fetchDC: function(key) {
            return key;
        }
    },
    computed: {
        dynamicComponent: function() {
            if (this.content === null) {
                this.populateData();
                return {
                    template: '<h2>Loading ...</h2>'
                }
            } else {
                var data = this.buildComponent(this.content);
                return {
                    template: data
                }
            }
        }
    },
    created() {
        this.populateData();
        this.$watch(
            () => this.$route.params.dc,
            (newId, oldId) => {
              this.candidate = newId;
            }
        )
    }
 }