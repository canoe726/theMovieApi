export default class Loading {
    constructor({$target}) {
        this.$target = $target;

        this.render();
    }

    toggleLoading() {
        const loadingWrapper = document.querySelector('.loading-wrapper');
        loadingWrapper.classList.toggle('hidden');
    }
    
    render() {
        const loadingWrapper = document.createElement('div');
        loadingWrapper.className = 'loading-wrapper';
        loadingWrapper.classList.add('hidden');

        const loadingImg = document.createElement('img');
        loadingImg.className = 'loading-img';
        loadingImg.src = './src/img/loading.gif';
        
        loadingWrapper.appendChild(loadingImg);

        this.$target.appendChild(loadingWrapper);
    }
}