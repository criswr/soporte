import { appsData } from "./appsData.js";

const baseUrl = "https://certi.cl/soporte/"
const params = new URLSearchParams(window.location.search);
const apps = ["locu", "certi"];
let app = "locu";

let appData = appsData.locu;


// Check for "app" query
apps.includes(params.get("app")) ? app = params.get("app") : false;


// Asign app data according to "app" value
app === "certi" ? appData = appsData.certi : false;


// Update appearance and next value
const updateInfo = () => {
    const root = document.querySelector(":root");
    const appHeader = document.querySelector("#appHeader");
    const favicon = document.querySelector("link[rel~='icon']");
    const next = document.querySelector("#next");
    const alert = document.querySelector("#alert");

    // Root vars
    root.style.setProperty("--accent", appData.accentColor);

    //Header
    appHeader.childNodes[0].src = appData.logo;
    appHeader.childNodes[2].innerText = appData.name;

    // Favicon
    favicon.href = appData.logo;

    // Next (confirmation redirection)
    next.value = `${baseUrl}?app=${app}&sent`;

    // Show confirmation on submit
    params.has("sent") ? alert.classList.remove("invisible") : false;
};
updateInfo();


// Update subject select options
const updateOptions = () => {
    const subject = document.querySelector("#subject");
    const opt = document.createElement("option");

    appData.subjects.forEach(el => {
        opt.value = `[${appData.name}] ` + el;
        opt.innerHTML = el;
        subject.appendChild(opt.cloneNode(true));
    });

};
updateOptions();


// Links section
const insertLinks = () => {
    const linksSection = document.querySelector("#links");
    for (const app of Object.entries(appsData)) {
        linksSection.innerHTML += `<div class="link"><a href="./?app=${app[0]}"><img src="${app[1].logo}" alt="${app[1].name}">${app[1].name}</a></div>`;
    };
};
insertLinks();