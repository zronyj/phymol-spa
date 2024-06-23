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
            complete += `<h2>${item.pageContent.title}</h2>\n`;
            complete += `<p>${item.pageContent.description}</p>\n`;
            complete += '<div class="accordion" id="accordionProjects">\n';
            for (const [accoKey, accoItem] of Object.entries(item.pageContent.data)) {
                var thisItem = '<div class="accordion-item">\n';
                thisItem += '<h4 class="accordion-header">\n';
                thisItem += `<button class="accordion-button collapsed accordionTitle" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${accoKey}" aria-expanded="false" aria-controls="collapse${accoKey}">${accoItem.title}</button>`;
                thisItem += '</h4>\n';
                thisItem += `<div id="collapse${accoKey}" class="accordion-collapse collapse">\n`;
                thisItem += '<div class="accordion-body">\n';
                thisItem += `<p><b>Host:</b> ${accoItem.host}</p>\n`;
                thisItem += `<p><b>PhD Enrollment:</b> ${accoItem.enrollment}</p>\n`;
                thisItem += `<p><b>Start Date:</b> ${accoItem.start}</p>\n`;
                thisItem += `<p><b>Duration:</b> ${accoItem.duration}</p>\n`;
                thisItem += `<p><b>Objectives:</b> ${accoItem.objectives}</p>\n`;
                thisItem += '</div>\n'; // body
                thisItem += '</div>\n'; // collapse
                thisItem += '</div>\n'; // accordion item
                complete += thisItem;
            }
            complete += '</div>\n'; // full acoordion
            complete += '</div>\n'; // containing div
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