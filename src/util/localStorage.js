const getLocal = keywords => {
    const data = localStorage.getItem(keywords);
    if(keywords === 'movies') {
        const jsonData = JSON.parse(data);
        return jsonData;
    }
}

const setLocal = (keywords, data, timeOut) => {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(keywords, jsonData);

    setTimeout(() => {
        localStorage.removeItem(keywords);
    }, timeOut);
}

export { getLocal, setLocal }