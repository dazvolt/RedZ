var global_debug = false;

$(document).ready(function () {
    $('body').controllerItem()
        .controllerLog()
        .controllerPath({skip: true})
        .controllerMainGame()
        .cprompt();

    $('.information .close').on('click', function () {
        $(this).parents('.information').hide();
    });
});

function randomArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
            result = prop;
    return result;
}
function checkChance(number) {
    if (number < chance.floating({min:0, max: 1})) {
        return false;
    } else if (number >= chance.floating({min:0, max: 1})) {
        return true;
    }
}
function isInt(n) {
    return n % 1 === 0;
}