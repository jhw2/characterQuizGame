
//template
import templates from '../template';
document.body.innerHTML = document.body.innerHTML + templates.join("");



class Title extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<h2 class="title">${this.title}</h2>`;
    }
}
window.customElements.define('title-ele', Title);

class MenuUl extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        this.render();
    }
    chMenuHandler(e, target) {
        e.preventDefault();
        document.getElementById(target).setAttribute('pageid', e.target.getAttribute('pageid'))
    }
    render() {
        //console.log(this.chMenuHandler)
        this.innerHTML =  `<ul class="nav justify-content-center">${this.innerHTML}</ul>`;
        this.addEventListener('click', (e)=>{
            this.chMenuHandler(e, this.getAttribute('target'));
        });
    }
}
window.customElements.define('menu-ul', MenuUl);




class MenuList extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        const pageid = this.getAttribute('pageid');
        this.innerHTML =  `<li class="nav-item"><a href='#${pageid}' pageid='${pageid}' class="nav-link">${this.innerHTML}</a></li>`
    }
}

window.customElements.define('menu-list', MenuList);


class Page extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        this.render();
    }
    //커스텀 엘리먼트 생성될때 실행
    connectedCallback() {
        this.render();

    }
    //해당요소가 새로운 문서로 이동 될 때마다 호출
    adoptCallback() {}

    //bservedAttributes 속성에 나열된 특성에서만 호출된다.
    attributeChangedCallback(arrName, oldVal, newVal){
        this.render();

    }
    static get observedAttributes() {
        return ['pageid']
    }
    get pageid() {
        this.classList.remove('onGameStart');
        this.classList.remove('puseOn');
        return this.getAttribute('pageid');
    }
    //커스텀 엘리먼트 제거시 호출
    disconnectedCallback() {
        alert('bye bye');
    }
    render() {
        const pageid = this.pageid;
        this.innerHTML = '<div class="group">' + document.getElementById(pageid).innerHTML + '</div>';
        //this.shadowRoot.innerHTML = this.innerHTML;
    }
}
window.customElements.define('page-ele', Page);



