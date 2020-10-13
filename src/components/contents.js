import { router } from '../main.js';

import { lazyLoad } from '../util/lazyLoading.js';

export default class Contents {
    constructor({$target, data}) {
        this.$target = $target;
        this.data = data;

        this.contents = document.createElement('article');
        this.contents.className = 'movie-content';
        
        this.movieItems = document.createElement('div');
        this.movieItems.className = 'movie-items';

        this.contents.appendChild(this.movieItems);
        this.$target.appendChild(this.contents);

        this.render();
        lazyLoad();
    }

    setState(data) {
        this.data = data;
        this.render();
        lazyLoad();
    }

    render() {
        if(!this.data) return;

        this.movieItems.innerHTML = '';

        if(this.data.length > 0) {
            this.data.map(item => {
                const movieItem = document.createElement('div');
                movieItem.className = 'movie-item';

                const title = document.createElement('h2');
                title.className = 'title';
                title.innerText = item.title;

                const movieCard = document.createElement('div');
                movieCard.className = 'movie-card';

                const leftBlock = document.createElement('div');
                leftBlock.className = 'left-block';

                const img = document.createElement('img');
                img.className = 'image';
                img.classList.add('lazy');
                img.dataset.src = item.medium_cover_image;

                const rightBlock = document.createElement('div');
                rightBlock.className = 'right-block';

                const year = document.createElement('p');
                year.className = 'year';
                year.innerText = `개봉년도 : ${item.year}년`;

                const runtime = document.createElement('p');
                runtime.className = 'runtime';
                runtime.innerText = `러닝타임 : ${item.runtime}분`;

                const genres = document.createElement('p');
                genres.className = 'genres';
                genres.innerText = `장르 : ${item.genres}`;

                const rating = document.createElement('p');
                rating.className = 'rating';
                rating.innerText = `영화 평점 : ${item.rating}`;

                const desc = document.createElement('div');
                desc.className = 'desc';
                desc.innerText = `줄거리 요약 : ${item.summary}`;

                movieCard.addEventListener('click', () => {
                    history.pushState({}, 'movieDetail', `#/movie/${item.id}`);
                    history.go(1);
                    router();
                });

                leftBlock.appendChild(img);

                rightBlock.appendChild(year);
                rightBlock.appendChild(runtime);
                rightBlock.appendChild(genres);
                rightBlock.appendChild(rating);
                rightBlock.appendChild(desc);

                movieItem.appendChild(title);
                movieCard.appendChild(leftBlock);
                movieCard.appendChild(rightBlock);

                movieItem.appendChild(movieCard);

                this.movieItems.appendChild(movieItem);
            });

            const upBtn = document.createElement('p');
            upBtn.className = 'up-btn';
            upBtn.innerText = '☝ 위로가기';

            upBtn.addEventListener('click', () => {
                window.scrollTo(0,0);
            });

            this.movieItems.appendChild(upBtn)

        } else {
            const notice = document.createElement('div');
            notice.className = 'notice';

            const failMessage = document.createElement('h2');
            failMessage.className = 'fail-message';
            failMessage.innerText = '영화 API를 불러오는데 실패했습니다.';

            const refreshPage = document.createElement('p');
            refreshPage.className = 'refresh-page';
            refreshPage.innerText = '새로고침';

            refreshPage.addEventListener('click', () => {
                window.location.href = '/';
            });

            notice.appendChild(failMessage);
            notice.appendChild(refreshPage);

            this.contents.appendChild(notice);
        }
    }
}