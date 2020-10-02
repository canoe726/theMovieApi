const BASE_MOVIE_URL = 'https://yts.mx/api/v2/';
const GET_TITLE = 'list_movies.json?sort=title&page=3&limit=10';
const GET_RATING = 'list_movies.json?sort=rating&page=4&limit=10';

let whileFetching = false;
let abortController;

const request = async url => {
    try {
        if(whileFetching) abortController.abort();

        abortController = new AbortController;
        whileFetching = true;

        const response = await fetch(url, {
            signal: abortController.signal
        });

        if(response.ok) {
            const result = await response.json();
            whileFetching = false;
            return result;
        } else {
            const err = await response.json();
            throw err;
        }
    } catch(e) {
        if(e.name === 'AbortError') {
            throw {
                status: 'FetchAbort'
            }
        }
        throw {
            message: e.message,
            status: e.status
        }
    }
};

const api = {
    getMoviesByTitle: async () => {
        try {
            const response = await request(BASE_MOVIE_URL + GET_TITLE);
            return {
                isError: false,
                data: response
            }
        } catch(e) {
            return {
                isError: true,
                data: e
            }
        }
    },
    getMoviesByRating: async () => {
        try {
            const response = await request(BASE_MOVIE_URL + GET_RATING);
            return {
                isError: false,
                data: response
            }
        } catch(e) {
            return {
                isError: true,
                data: e
            }
        }
    }
};

export { api };