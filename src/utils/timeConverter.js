export const timer = (time) => {
    let minute = "0" + Math.floor(time / 60);
    let seconde = Math.floor(time % 60);
    if(seconde < 10) { seconde = "0" + seconde}
    return `${minute}:${seconde}`
}