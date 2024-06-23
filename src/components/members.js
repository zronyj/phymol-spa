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
                for (const member of entity.members) {
                    var thisCard = '<div class="card benelistcard">\n';
                    thisCard += '<div class="row">\n';
                    thisCard += '<div class="col-md-3 imgcard">\n';
                    thisCard += `<img class="benelistimg" title="${member.name}" src="${member.img}" >\n`;
                    thisCard += '</div>\n';
                    thisCard += '<div class="col-md-9">\n';
                    thisCard += `<div class="card-header"><h5>${member.name}</h5></div>\n`;
                    thisCard += '<div class="card-body">\n';
                    thisCard += `<p class="card-text"><b>Country:</b> ${member.country}</p>\n`;
                    thisCard += `<p class="card-text"><b>Website:</b> <a href="${member.profile}" target="_blank">Link</a>\n</p>\n`;
                    thisCard += `<p class="card-text"><b>Department Division Laboratory:</b> ${member.department}</p>\n`;
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