import {getBlogPostNames} from "./service";

const MAX_PARALLEL_POSTS = 2;

export async function* getNextPosts() {
	const postNames = await getBlogPostNames();
	let index = 0;
	while (index < postNames.length) {
		const result = postNames.slice(index, index + MAX_PARALLEL_POSTS);
		index += MAX_PARALLEL_POSTS;
		if(result.length < MAX_PARALLEL_POSTS) {
			return result;
		}
		yield result;
	}
}