export default {
    data () {
        return {
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
        },
        buildComponent: function(item) {
            var complete = '<div>\n';
            complete += `<h2>${item.pageContent[0].title}</h2>\n`;
            for (item of item.pageContent[0].data) {
                complete += `<p>${item}</p>\n`;
            }
            complete += '</div>\n';
            return complete;
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
    }
 }