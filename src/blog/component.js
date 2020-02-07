import {dom} from '@fortawesome/fontawesome-svg-core';
import style from './style.css';
import {getBlogPost} from '../github/service';
import {getNextPosts} from "../github/generator";

class HTMLElementWithCntent extends HTMLElement {
	constructor(tag, tagStyle, content) {
		super();
		const element = document.createElement(tag);
		element.className = tagStyle;
		element.innerHTML = `
		<div class="${style.container}">
		${content}
		</div>
		`;
		this.appendChild(element);
	}
}

export class Header extends HTMLElementWithCntent {
	constructor() {
		super('header', style.header, `
        <h1 class="${style['header-heading']}">Blog</h1>
    `);
	}
}

export class Navigation extends HTMLElementWithCntent {
	constructor() {
		super('nav', style.navBar, `
        <ul class="${style.nav}">
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="../index.html">About me</a></li>
        </ul>
    `);
	}
}

export class Footer extends HTMLElementWithCntent {
	constructor() {
		super('footer', style.footer, '&copy; Copyright bartekmajster 2020');
	}
}

export class Body extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'});
		this.render();
	}

	async render(name = null) {
		this.posts = getNextPosts();
		const fullPost = !!name;
		const names = fullPost ? [name] : (await this.posts.next()).value;
		this.shadowRoot.innerHTML = (`
        <section>
            ${this.renderStyle()}
              <div class="container">
                  <main>
                      ${this.renderPostComponents(names, fullPost)}
                  </main>
                  <aside>
                      <slot name="side-menu"></slot>
                  </aside>
              </div>
        </section>
    `);
		this.attachClickCallbacks(names, fullPost = false);
	}

	async uprender() {
		const generated = await this.posts.next();
		const names = generated.value;
		if (names.length) {
			const main = this.shadowRoot.querySelector('main');
			const nextPosts = document.createElement('div');
			nextPosts.className = 'next-posts';
			nextPosts.innerHTML = `<hr>${this.renderPostComponents(names)}`;
			main.appendChild(nextPosts);
			this.attachClickCallbacks(names);
		}
		if (generated.done) {
			this.shadowRoot.getElementById('load-more').remove();
		}
	}

	renderPostComponents(names, fullPost = false) {
		const postComponents = names.map((postName, index) => (`
      <blog-post post-name="${postName}" full-post="${fullPost}"></blog-post>
      <button id="${index}-${postName}">${fullPost ? 'Back' : 'Read more...'}</button>
    `)).join('<hr>');

		return fullPost ? postComponents : postComponents + `<button style="display: block; padding: 1em; margin: 0 auto;" id="load-more">Load more...</button>  `
	}

	attachClickCallbacks(names, fullPost = false) {
		names.forEach((postName, index) => {
			this.shadowRoot.getElementById(`${index}-${postName}`)
				.onclick = () => {
				if (!fullPost) this.render(postName);
				else this.render();
			}
		});
		if (!fullPost) {
			const loadMoreBtn = this.shadowRoot.getElementById('load-more');
			loadMoreBtn.onclick = () => {
				loadMoreBtn.remove();
				this.uprender();
			}
		}
	}

	renderStyle() {
		return (`
     <style>
        .container{
        max-width: 70em;
        margin: 0 auto;
        }
        section{
        overflow: hidden;
        padding: 1em 1.25em;
        background-color: #fff;
        }
        main {
            float: left;
            width: 65%;
            margin-right: 5%;
            margin-bottom: 1em;
        }
        aside {
            float: left;
            width: 30%;
            margin-bottom: 1em;
        }
        </style>
    `);
	}
}

export class BlogPost extends HTMLElement {
	static get observedAttributes() {
		return ['post-name', 'full-post'];
	}

	constructor() {
		super();
		this.attachShadow({mode: 'open'});
	}

	// eslint-disable-next-line no-unused-vars
	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.render();
		}
	}

	async render() {
		this.loading();
		const name = this.getAttribute('post-name');
		const fullPost = this.getAttribute('full-post') === 'true';
		const content = await getBlogPost(`${name}.md`);
		this.shadowRoot.innerHTML = (`
    <article>
        <mark-down>
            ${fullPost ? content : `${content.substr(0, 300)}...`} 
        </mark-down>
    </article>
    `);
	}

	loading() {
		this.shadowRoot.innerHTML = '';
		this.shadowRoot.appendChild(document.getElementById('blog-loading').content.cloneNode(true).firstElementChild);
		dom.i2svg({node: this.shadowRoot});
	}
}
