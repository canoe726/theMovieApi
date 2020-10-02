export default class Error {
    constructor({$target}) {
        this.$target = $target;
        this.data = null;

        this.render();
    }

    setState(data) {
        this.data = data;
        this.render();
    }

    render() {
        if(!this.data) return;

        this.$target.innerHTML = '';

        const errorWrapper = document.createElement('div');
        errorWrapper.className = 'error-wrapper';

        const errorStatus = document.createElement('h2');
        errorStatus.className = 'error-status';
        errorStatus.innerText = `Error status : ${this.data.status}`;

        const errorMessage = document.createElement('h2');
        errorMessage.className = 'error-message';
        errorMessage.innerText = `Error message : ${this.data.message}`;

        const errorImg = document.createElement('img');
        errorImg.className = 'error-img';
        errorImg.src = './src/img/404-not-found.png';

        errorWrapper.appendChild(errorStatus);
        errorWrapper.appendChild(errorMessage);
        errorWrapper.appendChild(errorImg);

        this.$target.appendChild(errorWrapper);
    }
}