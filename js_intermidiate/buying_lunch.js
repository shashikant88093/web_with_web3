

function whoIsPaying(name) {
    var names = name.split(", ");
    var random = Math.floor(Math.random() * names.length);
    return names[random] + " is going to buy lunch today!";
}
whoIsPaying("Jenny")