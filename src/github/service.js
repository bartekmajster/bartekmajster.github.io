import { Model } from './model';

const API_URL = 'https://api.github.com/users/bartekmajster/repos';
const POST_URL = 'https://raw.githubusercontent.com/bartekmajster/bartekmajster.github.io/master/blog/en/';
const ABOUTME_URL = 'https://raw.githubusercontent.com/bartekmajster/bartekmajster.github.io/master/blog/en/about-me.md';
const FILES_URL = 'https://api.github.com/repos/bartekmajster/bartekmajster.github.io/contents/blog/en/';

const conventer = ({
  name, stargazers_count: stars, license, html_url: url
}) => (
  new Model({
    name,
    stars,
    license: license ? license.spdx_id : 'no licence',
    url
  }));

async function getRawFile(url) {
  try {
    const response = await fetch(url);

    if (response.ok) {
      return (await response.text());
    }
    throw Error('Response not 200');
  } catch (error) {
    console.warn(error);
    return '';
  }
}

export async function getRepos() {
  try {
    const response = await fetch(API_URL);

    if (response.ok) {
      const array = await response.json();
      return (array.map((item) => conventer(item)));
    }
    throw Error('Response not 200');
  } catch (error) {
    console.warn(error);
    return [];
  }
}


export async function getBlogPost(name = '0') {
  const url = `${POST_URL}${name}`;
  return getRawFile(url);
}

export async function getAboutMe() {
  return getRawFile(ABOUTME_URL);
}

export async function getBlogPostNames() {
  try {
    const response = await fetch(FILES_URL);

    if (response.ok) {
      const POST_NAME = /(\d+)\.md/;
      const array = (await response.json()).filter((item) => POST_NAME.test(item.name)).map(({ name }) => name.slice(0, -3));
      return array;
    }
    throw Error('Response not 200');
  } catch (error) {
    console.warn(error);
    return [];
  }
}
