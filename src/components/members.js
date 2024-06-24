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
            complete += '<h2>MEMBERS</h2>\n';
            for (const entity of item.pageContent.data) {
                complete += `<h4>${entity.title}</h4>\n`;
                for (var i = 0; i < entity.members.length; i++) {
                    var thisCard = `<div id="${entity.keyMem[i]}" class="card benelistcard">\n`;
                    thisCard += '<div class="row">\n';
                    thisCard += '<div class="col-md-3 imgcard">\n';
                    thisCard += `<img class="benelistimg" title="${entity.members[i].name}" src="${entity.members[i].img}" >\n`;
                    thisCard += '</div>\n';
                    thisCard += '<div class="col-md-9">\n';
                    thisCard += `<div class="card-header"><h5>${entity.members[i].name}</h5></div>\n`;
                    thisCard += '<div class="card-body">\n';
                    thisCard += `<p class="card-text"><b>Country:</b> ${entity.members[i].country}</p>\n`;
                    thisCard += `<p class="card-text"><b>Website:</b> <a href="${entity.members[i].profile}" target="_blank">Link</a>\n</p>\n`;
                    thisCard += `<p class="card-text"><b>Department Division Laboratory:</b> ${entity.members[i].department}</p>\n`;
                    thisCard += '</div>\n'; // Body
                    thisCard += '</div>\n'; // Column
                    thisCard += '</div>\n'; // Row
                    thisCard += '</div>\n'; // Card
                    complete += thisCard;
                }
            }
            complete += '</div>';
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