export default {
    data () {
        return {
            content: null
        }
    },
    template: '<component :is="dynamicComponent"></component>',
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
        getMyContent: async function() {
            var thecomponent = this;
            await this.readTextFile('./src/data/home.json', function(text){
                var data = JSON.parse(text);
                thecomponent.content = data;
            })
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
                this.getMyContent();
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
        this.getMyContent();
    }
 }