import getJoke from './service';

class Model {
  constructor({ type, setup, punchline }) {
    this.type = type;
    this.setup = setup;
    this.punchline = punchline;
  }

  toString() {
    return (`
		-${this.setup}
		-${this.punchline}
		`);
  }
}

export default async function () {
  let joke = await getJoke();
  if (Array.isArray(joke)) {
  	joke = joke[0];
  }
  alert(new Model(joke).toString());
}
