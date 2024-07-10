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
            complete += `<h2>EVENTS</h2>\n`;
            for (const entry of item.pageContent.reverse()) {
                complete += '<div class="card border-dark text-bg-light benelistcard">\n';
                complete += '<div class="row">\n';
                complete += '<div class="col-md-2 imgcard">\n';
                complete += `<img class="benelistimg" title="${entry.title}" src="${entry.img}" >\n`;
                complete += '</div>\n';
                complete += '<div class="col-md-10">\n';
                complete += `<div class="card-header"><h5>${entry.title}</h5></div>\n`;
                complete += '<div class="card-body">\n';
                complete += `<p class="card-text">${entry.description}</p>\n`;
                complete += '</div>\n'; // Body
                complete += '</div>\n'; // Column
                complete += '</div>\n'; // Row
                complete += '</div>\n'; // Card
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