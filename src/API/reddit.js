export const API_ROOT = 'https://www.reddit.com';

export const getSubredditPosts = async (subreddit) => {
  const response = await fetch(`${API_ROOT}${subreddit}.json`);
  const json = await response.json();

  return json.data.children.map((post) => post.data);
};

export const getSubreddits = async () => {
  const response = await fetch(`${API_ROOT}/subreddits.json`);
  const json = await response.json();

  return json.data.children.map((subreddit) => subreddit.data);
};

export const getPostComments = async (permalink) => {
  const response = await fetch(`${API_ROOT}${permalink}.json`);
  const json = await response.json();
  // console.log(json)
  return json[1].data.children.map((subreddit) => subreddit.data);
};

export const getRandomSubreddit = async(subreddit) => {
  // const response = await fetch(`${API_ROOT}/r/random.json`);
  const response = await fetch(`api.reddit.com/r/random.json`);
  console.log(response)
  // const body = JSON.parse(response.body);
  // console.log(body)
  const json = await response.json();
  console.log(json)
}

//http://www.reddit.com/r/subreddit/new.json?sort=new