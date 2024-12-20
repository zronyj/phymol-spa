import Home from '../components/home.js';
import Phymol from '../components/phymol.js';
import Beneficiaries from '../components/beneficiaries.js';
import Partners from '../components/partners.js';
import Members from '../components/members.js';
import Projects from '../components/projects.js';
import Candidates from '../components/doctoral_candidates.js';
import Recruitment from '../components/recruitment.js';
import Events from '../components/events.js';
import Training from '../components/training.js';
import Impact from '../components/impact.js';
import Calendar from '../components/calendar.js';

const { createRouter, createWebHistory } = VueRouter;

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
const prePhy = await getData('./src/data/phymol.json');
const preBene = await getData('./src/data/beneficiaries.json');
const prePart = await getData('./src/data/partners.json');
const people = await getData('./src/data/people.json');
const preProjs = await getData('./src/data/projects.json');
const candi = await getData('./src/data/doctoral_candidates.json');
const recruits = await getData('./src/data/recruitment.json');
const preEvents = await getData('./src/data/events.json');

// Finished object construction
var events = preEvents;
events.pageContent = events.pageContent.reverse();

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

var part = {
  "pageContent": {
    "title" : prePart.pageContent.title,
    "type" : prePart.pageContent.type,
    "data" : []
  }
};

for (const [key, value] of Object.entries(prePart.pageContent.data)) {
  var par = [];
  var entry = value;
  console.log(value.keyPar);
  for (const item of value.keyPar) {
    par.push(people.rawContent[item]);
  }
  entry["members"] = par;
  part.pageContent.data.push(entry);
}

var projs = {
  "pageContent": {
    "title" : preProjs.pageContent.title,
    "type" : preProjs.pageContent.type,
    "description" : preProjs.pageContent.description,
    "data" : []
  }
}

for (const [key, value] of Object.entries(preProjs.pageContent.data)) {
  var entry = value;
  entry["host"] = preBene.pageContent.data[value.short_host];
  entry["supervisor"] = [];
  entry["cosupervisor"] = [];
  entry["mentor"] = [];
  for (const item of value.super) {
    entry["supervisor"].push(people.rawContent[item]);
  }
  for (const item of value.cosup) {
    entry["cosupervisor"].push(people.rawContent[item]);
  }
  for (const item of value.mento) {
    entry["mentor"].push(people.rawContent[item]);
  }
  projs.pageContent.data.push(entry);
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
  { path: '/project', component: Phymol, props: {'package': prePhy} },
  { path: '/beneficiaries', component: Beneficiaries, props: {'package': bene} },
  { path: '/partners', component: Partners, props: {'package': part} },
  { path: '/members', component: Members, props: {'package': bene} },
  { path: '/projects', component: Projects, props: {'package': projs} },
  { path: '/dcs/:dc', component: Candidates, props: {'package': candi} },
  { path: '/recruitment', component: Recruitment, props: {'package': recruits}},
  { path: '/recruitment.php', redirect: '/recruitment' },
  { path: '/events', component: Events, props: {'package': events}},
  { path: '/training', component: Training },
  { path: '/impact', component: Impact },
  { path: '/calendar', component: Calendar },
  { path: '/:pathMatch(.*)*', redirect: '/'}
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    var offset = document.getElementById("nav").offsetHeight;
    if (to.hash) {
      return {
        el: to.hash,
        top: offset
      }
    } else {
      return {
        top: 0
      }
    }
  }
})

export default router