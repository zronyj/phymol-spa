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
            for (const pageSegment of item.pageContent) {
                if (pageSegment.type === "text") {
                    complete += `<h2>${pageSegment.title}</h2>\n`;
                    var body = '';
                    for (const segmentItem of pageSegment.data) {
                        body += `<p>${segmentItem}</p>\n`;
                    }
                    complete += body;
                } else if (pageSegment.type === "images") {
                    complete += `<h2>${pageSegment.title}</h2>\n`;
                    var body = '';
                    for (const segmentItem of pageSegment.data) {
                        body += `<a href="${segmentItem.link}" target="_blank">\n`;
                        body += '<img class="thumbnail" title="' + segmentItem.name + '" src="' + segmentItem.img + '" >\n';
                        body += `</a>`
                    }
                    complete += body;
                } else {
                    complete += '';
                }
            }
            complete += '</div>'
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