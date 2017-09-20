export default class Comment {
  constructor(options) {
    this.text = options.text || '';
    this.user = options.user || null;
  }
}