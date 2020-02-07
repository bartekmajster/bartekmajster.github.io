const API_JOKES_GENERAL = 'http://official-joke-api.appspot.com/jokes/random';
const API_JOKES_PROGRAMMING = 'https://official-joke-api.appspot.com/jokes/programming/random';

const type = () => {
  const index = Math.floor(Math.random() * 2);
  console.log(index);
  return index;
};

const getJoke = async () => {
  try {
    if (type()) {
      const response = await fetch(API_JOKES_GENERAL);
      if (response.ok) {
        const joke = response.json();
        return joke;
      }
      throw Error('Response not 200');
    } else {
      const response = await fetch(API_JOKES_PROGRAMMING);
      if (response.ok) {
        const joke = response.json();
        return joke;
      }
      throw Error('Response not 200');
    }
  } catch (error) {
    console.warn(error);
  }
};

export default getJoke;
