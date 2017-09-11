import Template from './index.handlebars';

export default class Avatar {
  constructor(imageURL) {
    this._imageURL = imageURL;
  }

  render() {
    return Template({
      imageURL: this._imageURL;
    })
  }
}