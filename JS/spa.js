'use strict'
window.onhashchange = switchToStateFromURLHash;

var SPAState = {};


function switchToStateFromURLHash() {
    var URLHash = window.location.hash; // якорь, закладка, включая сам значок #

    var stateStr = URLHash.slice(1);

}


function switchToState(newState) {
    var stateStr = newState.pagename;
    location.hash = stateStr;
}

function switchToPlay() {
    switchToState({ pagename: 'Play' });
}

function switchToMain() {
    switchToState({ pagename: 'Main' });
}
function switchToRules() {
    switchToState({ pagename: 'Rules' });
}

switchToStateFromURLHash();


function renderMain() {
    return (
        renderConva()
    )

}
renderMain();


function hideMenu() {
    const menu = document.getElementById('menu');
    menu.classList.add('hide');
    const close = document.getElementById('X');
    close.classList.add('X_active');
    const container = document.getElementById('container');
    container.classList.add('container_active');

}
function showRules() {
    const menu = document.getElementById('menu');
    menu.classList.add('hide');
    const rules = document.getElementById('gameRules');
    rules.classList.add('rules_active')

}
function hideRules() {
    const rules = document.getElementById('gameRules');
    rules.classList.add('rules_hide');
    rules.classList.remove('rules_active')
    const menu = document.getElementById('menu');
    menu.classList.add('active')
    menu.classList.remove('hide')

}
function hideGame() {
    const game = document.getElementById('container');
    game.classList.add('container_hide');
    game.classList.remove('container_active')
    const menu = document.getElementById('menu');
    menu.classList.add('active')
    menu.classList.remove('hide')
    const close = document.getElementById('X');
    close.classList.remove('X_active');

}
