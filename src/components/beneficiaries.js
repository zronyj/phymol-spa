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
            await this.readTextFile('./src/data/beneficiaries.json', function(text){
                var data = JSON.parse(text);
                thecomponent.content = data;
            })
        },
        buildComponent: function(item) {
            var complete = '<div>\n';
            complete += `<h2>${item.pageContent[0].title}</h2>\n`;
            for (const beneCard of item.pageContent[0].data) {
                var thisCard = '<div class="card benelistcard">\n';
                thisCard += '<div class="row">\n';
                thisCard += '<div class="col-md-3 imgcard">\n';
                thisCard += '<img class="benelistimg" title="' + beneCard.website.name + '" src="' + beneCard.img + '" >\n';
                thisCard += '</div>\n';
                thisCard += '<div class="col-md-9">\n';
                thisCard += '<div class="card-header"><h5>';
                thisCard += beneCard.title;
                thisCard += '</h5></div>\n';
                thisCard += '<div class="card-body">\n';
                thisCard += `<p class="card-text">${beneCard.content}</p>\n`;
                thisCard += '<p class="card-text">Website: ';
                thisCard += `<a href="${beneCard.website.link}" target="_blank">${beneCard.website.name}</a>\n`;
                thisCard += '</p>\n';
                thisCard += '<p class="card-text">PHYMOL Members:</p>\n';
                thisCard += '<ul class="memlinks">\n';
                for (const mem of beneCard.members) {
                    thisCard += `<li><a href="${mem.profile}" target="_blank">${mem.name}</a></li>\n`;
                }
                thisCard += '</ul>\n';
                thisCard += '</div>\n'; // Body
                thisCard += '</div>\n'; // Column
                thisCard += '</div>\n'; // Row
                thisCard += '</div>\n'; // Card
                complete += thisCard;
            }
            complete += '</div>';
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