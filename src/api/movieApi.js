const BASE_MOVIE_URL = 'https://yts.mx/api/v2/';
const GET_TITLE = 'list_movies.json?sort=title&page=3&limit=10';
const GET_RATING = 'list_movies.json?sort=rating&page=4&limit=10';
const GET_ID = 'movie_details.json?movie_id=';

// fetch가 진행중인지 검사하는 boolean 변수
let whileFetching = false;
// AbortController 객체를 담는 변수
let abortController;

const request = async url => {
    try {
        // fetch가 진행중이면 abort() 메소드로 취소시킴
        if(whileFetching) abortController.abort();

        abortController = new AbortController;
        whileFetching = true;

        // abort 기능을 사용하기 위해 fetch 메소드의 signal 파라미터에 AbortController signal 속성 대입
        const response = await fetch(url, {
            signal: abortController.signal
        });

        if(response.ok) {
            const result = await response.json();
            // fetch를 통해 데이터를 가져오는데 성공한 경우 fetch가 끝났기 때문에 변수 whileFetch에 false 대입
            whileFetching = false;
            return result;
        } else {
            const err = await response.json();
            throw err;
        }
    } catch(e) {
        // abort 메소드 호출시 'AbortError'로 예외처리됨
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

const getResponse = async url => {
    try {
        const response = await request(url);
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

const api = {
    getMoviesByTitle: () => getResponse(BASE_MOVIE_URL + GET_TITLE),
    getMoviesByRating: () => getResponse(BASE_MOVIE_URL + GET_RATING),
    getMovieById: movieId => getResponse(BASE_MOVIE_URL + GET_ID + movieId)
};

export { api };