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
            for (const desc of item.pageContent.description) {
                complete += `<p>${desc}</p>\n`;
            }
            complete += '<div class="accordion" id="accordionProjects">\n';
            for (const accoItem of item.pageContent.data) {
                var thisItem = '<div class="accordion-item">\n';
                thisItem += '<h4 class="accordion-header">\n';
                thisItem += `<button class="accordion-button collapsed accordionTitle" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${accoItem.info}" aria-expanded="false" aria-controls="collapse${accoItem.info}">${accoItem.title}</button>`;
                thisItem += '</h4>\n';
                thisItem += `<div id="collapse${accoItem.info}" class="accordion-collapse collapse">\n`;
                thisItem += '<div class="accordion-body">\n';
                thisItem += `<p class="memlinks"><b>Host:</b> <router-link to="/beneficiaries#${accoItem.host.website.name}">${accoItem.host.short} (${accoItem.host.website.name})</router-link></p>\n`;
                thisItem += `<p><b>PhD Enrollment:</b> ${accoItem.enrollment}</p>\n`;
                thisItem += `<p><b>Start Date:</b> ${accoItem.start}</p>\n`;
                thisItem += `<p><b>Duration:</b> ${accoItem.duration}</p>\n`;
                thisItem += `<p><b>Objectives:</b> ${accoItem.objectives}</p>\n`;
                thisItem += '<p class="memlinks"><b>Supervisor:</b> ';
                for (var i = 0; i < accoItem.supervisor.length; i++) {
                    thisItem += `<router-link to="/members#${accoItem.super[i]}">${accoItem.supervisor[i].name} (${accoItem.supervisor[i].host.toUpperCase()})</router-link> `;
                }
                thisItem += '</p>\n';
                thisItem += '<p class="memlinks"><b>Co-upervisor:</b> ';
                for (var j = 0; j < accoItem.cosupervisor.length; j++) {
                    thisItem += `<router-link to="/members#${accoItem.cosup[j]}">${accoItem.cosupervisor[j].name} (${accoItem.cosupervisor[j].host.toUpperCase()})</router-link> `;
                }
                thisItem += '</p>\n';
                thisItem += '<p class="memlinks"><b>Mentor:</b> ';
                for (var k = 0; k < accoItem.mentor.length; k++) {
                    thisItem += `<router-link to="/members#${accoItem.mento[k]}">${accoItem.mentor[k].name} (${accoItem.mentor[k].host.toUpperCase()})</router-link> `;
                }
                thisItem += '</p>\n';
                thisItem += '\n</div>\n'; // body
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