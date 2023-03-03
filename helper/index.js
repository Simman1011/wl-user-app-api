
function getRefferalCode(){
    return('WLREFFER' + Math.random().toString(36).slice(-6).toUpperCase())
}

module.exports = { getRefferalCode }