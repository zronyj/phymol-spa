import Home from '../components/home.js';
import Beneficiaries from '../components/beneficiaries.js';
import Partners from '../components/partners.js';
import Members from '../components/members.js';
import Projects from '../components/projects.js';

const { createRouter, createWebHashHistory } = VueRouter;

async function getData(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', url, true);
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            resolve(JSON.parse(xhr.response));
        } else {
            reject(status);
        }
    };
    xhr.send();
  });
}

// Object retrieval
const preHome = await getData('./src/data/home.json');
const preBene = await getData('./src/data/beneficiaries.json');
const part = await getData('./src/data/partners.json');
const people = await getData('./src/data/people.json');
const preProjs = await getData('./src/data/projects.json');

// Finished object construction
var bene = {
  "pageContent": {
    "title" : preBene.pageContent.title,
    "type" : preBene.pageContent.type,
    "data" : []
  }
};

for (const [key, value] of Object.entries(preBene.pageContent.data)) {
  var mem = [];
  var entry = value;
  for (const item of value.keyMem) {
    mem.push(people.rawContent[item]);
  }
  entry["members"] = mem;
  bene.pageContent.data.push(entry);
}

var home = {
  "pageContent": [
    {
      "title" : preHome.pageContent.title,
      "type" : "text",
      "data" : preHome.pageContent.data
    },
    {
      "title": "PARTNERS",
      "type": "images",
      "data": []
    },
    {
      "title": "BENEFICIARIES",
      "type": "images",
      "data": []
    }
  ]
};

for (const [key, item] of Object.entries(preBene.pageContent.data)) {
  home.pageContent[2].data.push({
    "name" : item.short,
    "img" : item.img,
    "link" : item.website.link
  });
}

for (const item of part.pageContent.data) {
  home.pageContent[1].data.push({
    "name" : item.website.name,
    "img" : item.img,
    "link" : item.website.link
  });
}

// Setting the routes in place
const routes = [
  { path: '/', component: Home, props: {'package': home} },
  { path: '/beneficiaries', component: Beneficiaries, props: {'package': bene} },
  { path: '/partners', component: Partners, props: {'package': part} },
  { path: '/members', component: Members, props: {'package': bene} },
  { path: '/projects', component: Projects, props: {'package': preProjs} }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router