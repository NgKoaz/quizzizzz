export const clockString = (dur) => {
    const sec = dur % 60;
    const min = Math.floor(dur /= 60) % 60;
    const hour = Math.floor(dur /= 60) % 24;
    return [hour, min, sec]
        .map(e => e < 10 ? `0${e}` : `${e}`)
        .filter((e, index) => e !== "00" || index > 0)
        .join(":")
}

export const dateFormat = (str_date) => {
    const date = new Date(str_date);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}