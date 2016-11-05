function send(message) {
    socket.send(message);
}
var socket = new WebSocket("ws://128.199.142.235:9000");
socket.onopen = function () {
    socket.send("supbro")
}, socket.onmessage = function (message) {
    var data = message.data;
    if ("ping" != data && "fever" != data) {
        var json = JSON.parse(data);
        document.getElementById("clicks").textContent = "Wumpuses: " + json.clicks;
        document.getElementById("cps").textContent = "Wumpuses Per Second: " + json.cps;
        document.getElementById("users").textContent = "SoftSoap Enthusiasts Online: " + json.users;
        document.getElementById("levelBar").style.width = 100 - (parseInt(json.max) - parseInt(json.exp)) / (10 * parseInt(json.level)) + "%";
        if (json.fever == "false") document.getElementById("level").textContent = "Level: " + json.level;
        if (json.fever == "true") document.getElementById("level").textContent = "FEVER MODE! x2 WUMPUSES PER CLICK!";
        if (json.fever == "true" && feverr == false) fever();
    }
}, window.addEventListener("keydown", function (a) {
    32 === a.keyCode && send("click")
}, !1);
var feverr = false;
function fever() {
    feverr = true;
    var audio = new Audio('assets/wumpus.mp3');
    audio.play();
    window.setTimeout(function () {
        document.getElementById('title').textContent = "TAP FAST NOW!";
        document.getElementById('title').style.animationName = 'memes';
        document.getElementById('levelBar').style.animationName = 'bidoof, woot';
        window.setTimeout(function () {
            document.getElementById('title').textContent = "Click The Wumpus!";
            document.getElementById('title').style.animationDuration = '1s';
            document.getElementById('title').style.animationName = 'test';
            document.getElementById('levelBar').style.animationName = '';
            document.getElementById('levelBar').style.width = '0%';
    }, 27000);
    }, 3000);
}