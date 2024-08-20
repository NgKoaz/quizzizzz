export const clockString = (dur) => {
    const sec = dur % 60;
    const min = Math.floor(dur /= 60) % 60;
    const hour = Math.floor(dur /= 60) % 24;
    return [hour, min, sec]
        .map(e => e < 10 ? `0${e}` : `${e}`)
        .filter((e, index) => e !== "00" || index > 0)
        .join(":")

}