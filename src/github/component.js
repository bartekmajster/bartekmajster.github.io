import { dom } from '@fortawesome/fontawesome-svg-core';
import { getRepos } from './service';

export class GitHubRepos extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  async render() {
    const repos = (await getRepos());
    this.shadowRoot.innerHTML = (`
			${this.renderStyles()}
			${this.renderHeader()}
				<table>
					<tbody>
						${repos.map((r) => r.toTableRow()).join('\n')}
					</tbody>
				</table>
			`);
    dom.i2svg({ node: this.shadowRoot });
  }

  renderStyles() {
    return (`
  		<style>
  			img{
  				height: 1em;
  			}
  			h2{
  				width: 20%;
  				margin:1em auto 0;
  				text-align: left;
  			}
  			td:hover{
  				cursor: pointer;
  				color: #999999;
  			}
  			table {
			    background-color: transparent;
			    border-spacing: 0;
			    border-collapse: collapse;
			    border-top: 1px solid #ddd;
			    width: 20%;
			    margin: 0 auto 20px;
			    font-weight: bold;
				}
				th, td {
				    padding: .5em 1em;
				    vertical-align: top;
				    text-align: left;
				    border-bottom: 1px solid #ddd;
				}
			</style>
  	`);
  }

  renderHeader() {
    const logo = document.getElementById('gh-logo')
      .content
      .cloneNode(true);
    const h2 = document.createElement('h2');
    h2.appendChild(logo);
    return h2.outerHTML;
  }
}
