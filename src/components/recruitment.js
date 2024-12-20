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
        buildList: function(content, orderedList) {
            var that = this;
            var lT = (orderedList ? 'o' : 'u' );
            var littleList = `<${lT}l>\n`;
            for (const item of content) {
                if (typeof item === 'string') {
                    littleList += `<li>${item}</li>\n`;
                } else {
                    littleList += that.buildList(item, orderedList);
                }
            }
            littleList += `</${lT}l>\n`;
            return littleList;
        },
        buildAccordion: function(content) {
            var acco = '<div class="accordion" id="accordionProjects">\n';
            var ctrl = 0;
            for (const [key, value] of Object.entries(content)) {
                acco += `<div class="accordion-item">\n`;
                acco += '<h4 class="accordion-header">\n';
                acco += `<button class="accordion-button collapsed accordionTitle" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${ctrl}" aria-expanded="false" aria-controls="collapse${ctrl}">${key}</button>`;
                acco += '</h4>\n';
                acco += `<div id="collapse${ctrl}" class="accordion-collapse collapse">\n`;
                acco += '<div class="accordion-body">\n';
                for (const [key2, value2] of Object.entries(value)) {
                    if (typeof value2 === 'string') {
                        acco += `<p>${value2}</p>\n`;
                    } else {
                        if (key2 === "data") {
                            acco += this.buildList(value2, false);
                        } else if (key2 === "odata") {
                            acco += this.buildList(value2, true);
                        } else {
                            var jump = ((value2.description.length != 0) ? '<br>' : '');
                            acco += `<p><b>${key2}:</b><br>${value2.description}${jump}</p>\n`;
                            acco += this.buildList(value2.data, false);
                        }
                    }
                }
                acco += '</div>\n'; // body
                acco += '</div>\n'; // collapse
                acco += '</div>\n'; // item
                ctrl += 1;
            }
            acco += '</div>\n';
            return acco;
        },
        buildComponent: function(item) {
            var complete = '<div>\n';
            complete += `<h2>${item.pageContent.title}</h2>\n`;
            complete += `<p>${item.pageContent.description}</p>\n`;
            complete += this.buildList(item.pageContent.data, false);
            complete += this.buildAccordion(item.pageContent.accordion);
            complete += '<br>\n';
            complete += `<p class="memlinks"><b>Contact:</b> ${item.pageContent.contact}</p>\n`;
            complete += `<span class="memlinks"><b>Timeline:</b>\n`;
            complete += this.buildList(item.pageContent.timelines, false);
            complete += '</span>\n';
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