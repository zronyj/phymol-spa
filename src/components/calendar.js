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
            complete += `<h2>Calendar</h2>\n`;
            complete += `<p>\n`;
            complete += `<iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Etc%2FGMT&showTitle=0&hl=en_GB&showTz=0&src=M2NhYmQyMTFkZDM0ZmU0NjhjMjU3YTBjMTlkMWM1NDY4MTQ5NDBjMmJhZDZjYzZmODJlN2UzZmU0NzlmMWVlZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23A79B8E" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>\n`;
            complete += `</p>\n`;
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