import { enableBodyScroll, disableBodyScroll } from './body-scroll-lock.js';

/**
 * @property {HTMLElement} element 
 * @property {string[]} medias chemin des medias de la lightbox
 * @property {string} src medias actuellement affiché
*/

class Lightbox {

    static init() {

        const links = Array.from(document.querySelectorAll('#img-container img, #img-container video'));
        const gallery = links.map(link => link.getAttribute('src'));
        links.forEach(el => {
            el.addEventListener('click', e => {
                e.preventDefault()
                new Lightbox(e.currentTarget.getAttribute('src'), gallery)
            })
        })
    }

    /**
     * @param {string} url url de l'media
     * @param {string[]} medias chemin des medias de la lightbox
     */

    constructor(url, medias, title) {
        this.element = this.buildDOM(url);
        this.medias = medias
        this.title = medias.title
        console.log(medias.title)
        this.loadmedia(url)
        this.onKeyUp = this.onKeyUp.bind(this)
        document.body.appendChild(this.element)
        disableBodyScroll(this.element)
        document.addEventListener('keyup', this.onKeyUp.bind(this))
    };

    loadmedia(url) {
        this.url = null
        const isVideo = url.substr(-4) === '.mp4'

        const medias = isVideo ? document.createElement('video') : new Image();
        const container = this.element.querySelector('.lightbox_container');
        const loader = document.createElement('div');
        loader.className = 'lightbox_loader';
        container.innerHTML = "";
        if (!isVideo) {
            container.appendChild(loader);
            medias.onload = () => {
                container.removeChild(loader);
                container.appendChild(medias);
                this.url = url;
            }
        }
        medias.src = url;
        if (isVideo) {
            container.appendChild(medias);
            this.url = url;
        }
    };

    // close modal echap
    onKeyUp(e) {
        if (e.key === 'Escape') {
            this.close(e);
        } else if (e.key === 'ArrowLeft') {
            this.prev(e);
        }
        else if (e.key === 'ArrowRight') {
            this.next(e);
        };
    };

    // ferme la lightbox 
    close(e) {
        e.preventDefault();
        this.element.className = 'fadeout';
        enableBodyScroll(this.element);
        window.setTimeout(() => {
            this.element.remove();
        }, 200);
        document.removeEventListener('keyup', this.onKeyUp);
    };

    /**
     * @param {MouseEvent || keyboradEvent} e 
     */

    prev(e) {
        e.preventDefault();
        let i = this.medias.findIndex(media => media === this.url);
        if (i === 0) {
            i = this.medias.length;
        };
        this.loadmedia(this.medias[i - 1]);
    };

    /**
     * @param {MouseEvent || keyboradEvent} e 
     */

    next(e) {
        e.preventDefault();
        let i = this.medias.findIndex(media => media === this.url);
        if (i === this.medias.length - 1) {
            i = -1;
        }
        this.loadmedia(this.medias[i + 1]);
    };

    buildDOM(url) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `
        <button class="lightbox_close">Fermer</button>
        <button class="lightbox_prev lightbox_arrow">Suivant</button>
        <button class="lightbox_next lightbox_arrow">Précédent</button>
        <div class="lightbox_container">`
        // add controls bug??
        if (url.substr(-4) === '.mp4') {
            `<video src="${url}" alt=""></video>`
        } else {
            `<img src="${url}" alt="" />`
        }
        `</div>`

        dom.querySelector('.lightbox_close').addEventListener('click',
            this.close.bind(this));
        dom.querySelector('.lightbox_prev').addEventListener('click',
            this.prev.bind(this));
        dom.querySelector('.lightbox_next').addEventListener('click',
            this.next.bind(this));
        return dom;
    };
};
export default Lightbox;