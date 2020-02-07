// eslint-disable-next-line import/prefer-default-export
export class Model {
  constructor({
    name, stars, license, url
  }) {
    this.name = name;
    this.stars = stars;
    this.license = license;
    this.url = url;
  }

  get starsInfo() {
    return this.stars > 0 ? this.stars : '';
  }

  toString() {
    return `User ${this.name} has ${this.starsInfo} stars. || license:${this.license}`;
  }

  toTableRow() {
    return (`
    <tr onclick="location.assign('${this.url}')">
       <td>
        ${this.name}
       </td>
       <td>
       ${this.starsInfo}
       </td>
    </tr>  
    `);
  }
}
