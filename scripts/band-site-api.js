/* {
    "api_key": "fcb695a7-499c-4df9-a259-10354602d489"
} */

export class BandSiteApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com";
  }

  async postComment(comment) {
    try {
      const postComment = await axios.post(`${this.baseUrl}/comments?api_key=${this.apiKey}`, comment);
      return postComment.data;
    } catch (err) {
      console.error(`Failed to post comment: ${err}`);
    }
  }

  async getComments() {
    try {
      const commentsData = await axios.get(`${this.baseUrl}/comments?api_key=${this.apiKey}`);
      return commentsData.data.sort((a, b) => b.timestamp - a.timestamp);
    } catch (err) {
      console.error(`Failed to get comments: ${err}`);
    }
  }

  async getShows() {
    try {
      const showData = await axios.get(`${this.baseUrl}/showdates?api_key=${this.apiKey}`);
      return showData.data;
    } catch (err) {
      console.error(`Failed to get shows: ${err}`);
    }
  }
}
