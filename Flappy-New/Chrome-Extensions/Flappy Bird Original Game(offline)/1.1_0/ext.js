const manifest = chrome.runtime.getManifest();
const configHomepageURL = manifest.homepage_url;
const configTitle = manifest.name;
const configVersionName = manifest.version_name;

class MyGame {
    constructor() {
        this.configHomepageURL = configHomepageURL;
        this.configTitle = configTitle;
        this.configVersionName = configVersionName;
        this.setTitle();
        this.setupNavigation();
        this.loadMenuItems();
    }

    setupNavigation() {
        const fragment = new DocumentFragment();
        const nav = fragment.appendChild(document.createElement("nav"));
        const sideNavigationDiv = nav.appendChild(document.createElement("div"));
        sideNavigationDiv.id = "side-navigation";
        const menuToggleDiv = sideNavigationDiv.appendChild(document.createElement("div"));
        menuToggleDiv.id = "menuToggle";
        const inputElem = menuToggleDiv.appendChild(document.createElement("input"));
        inputElem.type = "checkbox";
        inputElem.setAttribute("aria-label", "Show or Hide Menu");
        inputElem.id = "checkbox1";
        for (let i = 0; i < 3; i++) {
            menuToggleDiv.appendChild(document.createElement("span"));
        }
        const menuContainerDiv = menuToggleDiv.appendChild(document.createElement("div"));
        menuContainerDiv.id = "menu-container";
        const scrollableContainerDiv = menuContainerDiv.appendChild(document.createElement("div"));
        scrollableContainerDiv.id = "scrollable-container";
        const leftColumnDiv = scrollableContainerDiv.appendChild(document.createElement("div"));
        const ul = document.createElement("ul");
        ul.id = "menu1";
        leftColumnDiv.appendChild(ul);
        const menuBottomDiv = scrollableContainerDiv.appendChild(document.createElement("div"));
        menuBottomDiv.id = "menu-bottom";
        menuBottomDiv.appendChild(document.createElement("p"));
        const bodyTag = document.body;
        bodyTag.appendChild(nav);

        const checkbox1 = document.getElementById("checkbox1");
        checkbox1.addEventListener("click", () => {
            const dataContainer = document.getElementById("menu1");
            if (checkbox1.checked) {
                this.loadMenuItems(dataContainer);
            } else {
                dataContainer.innerHTML = "";
            }
        });
    }

    loadMenuItems(dataContainer) {
        const url = "https://ubg4all.github.io/data.json";

        fetch(url)
            .then(response => response.json())
            .then(data => {
                dataContainer.innerHTML = data.map(item => `
                    <li>
                        <img src="${item.thumb}" height="30" width="30">
                        <a href="${item.link}" target="_blank">${item.name}</a>
                    </li>
                `).join('');
            })
            .catch(error => console.error(error));
    }

    setTitle() {
        document.title = `${this.configTitle} ${this.configVersionName}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.createElement('iframe');
    const configGameURL = "game/index.html";
    iframe.src = configGameURL;
    iframe.classList.add('iframe');
    iframe.scrolling = 'no';

    const container = document.getElementById('iframe-container');
    container.appendChild(iframe);

    const myGame = new MyGame();

    function openFullscreenURL() {
        window.open('https://flappybird.ee', '_blank', 'fullscreen=yes');
    }

    function openExtensionRateLink() {
        const extensionId = chrome.runtime.id;
        const extensionRateLink = `https://chrome.google.com/webstore/detail/${extensionId}/reviews`;
        window.open(extensionRateLink, '_blank');
    }

    document.getElementById('fullscreenButton').addEventListener('click', openFullscreenURL);
    document.getElementById('rateButton').addEventListener('click', openExtensionRateLink);
});
