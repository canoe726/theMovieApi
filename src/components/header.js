export default class Header {
    constructor({$target, onClick}) {
        this.$target = $target;
        this.onClick = onClick;

        this.render();
    }

    render() {
        this.$target.innerHTML = '';

        const header = document.createElement('header');

        const title = document.createElement('h2');
        title.className = 'title';
        title.innerText = '🎬 추천 영화 리스트';
        
        const btnWrapper = document.createElement('div');
        btnWrapper.className = 'btn-wrapper';

        const getTItleBtn = document.createElement('button');
        getTItleBtn.className = 'get-title-btn';
        getTItleBtn.innerText = '📝 타이틀순';

        const getRatingBtn = document.createElement('button');
        getRatingBtn.className = 'get-rating-btn';
        getRatingBtn.innerText = '⭐ 평점순';

        getTItleBtn.addEventListener('click', () => {
            this.onClick('title');
        });

        getRatingBtn.addEventListener('click', () => {
            this.onClick('rating');
        });
        
        btnWrapper.appendChild(getTItleBtn);
        btnWrapper.appendChild(getRatingBtn);

        header.appendChild(title);
        header.appendChild(btnWrapper);

        this.$target.appendChild(header);
    }
}