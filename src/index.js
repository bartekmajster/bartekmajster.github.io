/* import getRepos from './github/index';
getRepos(); */

// eslint-disable-next-line no-unused-vars
import game from './game/index';
import getJoke from './jokes/index';
import initInfo from './blog/index';
import initAbout from './about-me/index';
import initGithub from './github/index';
import {getNextPosts} from "./github/generator";

initAbout();
initInfo();
initGithub();

window.controls = {
	game,
	getJoke
};

const posts = getNextPosts();
posts.next().then(r => {
	console.log(r);
	posts.next().then(r2 => {
		console.log(r2)
		posts.next().then(r3 => {
			console.log(r3)
		})
	});

})
