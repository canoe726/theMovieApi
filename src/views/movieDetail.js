import { router } from '../main.js';

export default class MovieDetail {
    constructor({$target, data}) {
        this.$target = $target;
        this.item = data.data.movie;
        this.render();
    }

    render() {
        this.$target.innerHTML = '';

        const detailWrapper = document.createElement('div');
        detailWrapper.className = 'detail-wrapper';

        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';

        const title = document.createElement('h2');
        title.className = 'title';
        title.innerText = this.item.title;

        const movieWrapper = document.createElement('div');
        movieWrapper.className = 'movie-wrapper';

        const leftBlock = document.createElement('div');
        leftBlock.className = 'left-block';

        const img = document.createElement('img');
        img.className = 'image';
        img.classList.add('lazy');
        img.src = this.item.medium_cover_image;

        const rightBlock = document.createElement('div');
        rightBlock.className = 'right-block';

        const year = document.createElement('p');
        year.className = 'year';
        year.innerText = `개봉년도 : ${this.item.year}년`;

        const runtime = document.createElement('p');
        runtime.className = 'runtime';
        runtime.innerText = `러닝타임 : ${this.item.runtime}분`;

        const genres = document.createElement('p');
        genres.className = 'genres';
        genres.innerText = `장르 : ${this.item.genres}`;

        const rating = document.createElement('p');
        rating.className = 'rating';
        rating.innerText = `영화 평점 : ${this.item.rating}`;

        const desc = document.createElement('div');
        desc.className = 'desc';
        desc.innerText = `줄거리 요약 : ${this.item.summary}`;

        const goHome = document.createElement('p');
        goHome.className = 'go-home';
        goHome.innerText = '돌아가기';

        leftBlock.addEventListener('click', () => {
            window.open(this.item.url, '_blank');
        });

        goHome.addEventListener('click', () => {
            window.location.href = '/';
        });

        window.addEventListener('popstate', router);

        leftBlock.appendChild(img);

        rightBlock.appendChild(year);
        rightBlock.appendChild(runtime);
        rightBlock.appendChild(genres);
        rightBlock.appendChild(rating);
        rightBlock.appendChild(desc);
        rightBlock.appendChild(goHome);

        movieItem.appendChild(title);
        movieWrapper.appendChild(leftBlock);
        movieWrapper.appendChild(rightBlock);

        movieItem.appendChild(movieWrapper);

        detailWrapper.appendChild(movieItem);

        this.$target.appendChild(detailWrapper);
    }
}