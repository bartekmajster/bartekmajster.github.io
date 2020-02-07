// eslint-disable-next-line no-unused-vars
import {getAboutMe} from '../github/service';

export class AboutMe extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'});
		this.render();
	}

	async render() {
		const content = await getAboutMe();
		this.shadowRoot.innerHTML = (`
    <mark-down>
    ${content}
    </mark-down>      
    `)
	}
}
