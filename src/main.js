import HomePage from './views/homePage.js';
import MovieDetail from './views/movieDetail.js';
import Loading from './components/loading.js';
import Error from './components/error.js';

import { api } from './api/movieApi.js';

let app;

const router = async () => {
    const loading = new Loading({
        $target: document.querySelector('#main')
    });

    const error = new Error({
        $target: document.querySelector('#main')
    });
    
    const hash = window.location.hash;
    if(hash.length === 0) app = new HomePage(document.querySelector('#main'));
    else {
        const restUrl = hash.split('/');
        if(restUrl[1] == 'movie') {
            loading.toggleLoading();

            const movieId = restUrl[2];
            const data = await api.getMovieById(movieId);
            if(!data.isError) {
                app = new MovieDetail({
                    $target: document.querySelector('#main'),
                    data: data.data
                });
            } else {
                const status = data.data.status;
                if(status === 'FetchAbort') {
                    console.log(`${mode} fetchAborted!`);
                } else {
                    error.setState(data.data);
                }
            }
        }
    }
    window.scrollTo(0,0);
}

window.addEventListener('DOMContentLoaded', router);

export { router }