import Header from '../components/header.js';
import Contents from '../components/contents.js';
import Loading from '../components/loading.js';
import Error from '../components/error.js';

import { getLocal, setLocal } from '../util/localStorage.js';

import { api } from '../api/movieApi.js';

export default class HomePage {
    constructor($target) {
        this.$target = $target;
        this.movies = null;
        this.movies = getLocal('movies');

        this.render();
    }

    handleFetch(response, contents, loading, error, mode) {
        if(!response.isError) {
            const movies = response.data.data.movies;
            setLocal('movies', movies, 1000 * 60 * 5);
            contents.setState(movies);
        } else {
            const status = response.data.status;
            if(status === 'FetchAbort') {
                console.log(`${mode} fetchAborted!`);
            } else {
                error.setState(response.data);
            }
        }  
        loading.toggleLoading();
    }

    render() {
        const header = new Header({
            $target: this.$target,
            onClick: async mode => {
                loading.toggleLoading();

                if(mode === 'title') {
                    const response = await api.getMoviesByTitle();
                    this.handleFetch(response, contents, loading, error, 'title');
                }
                if(mode === 'rating') {
                    const response = await api.getMoviesByRating();
                    this.handleFetch(response, contents, loading, error, 'rating');
                }
            }
        });

        const contents = new Contents({
            $target: this.$target,
            data: this.movies
        });

        const loading = new Loading({
            $target: document.querySelector('.movie-content')
        });

        const error = new Error({
            $target: document.querySelector('.movie-items')
        });
    }
}