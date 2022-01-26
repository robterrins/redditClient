import react, {useState, useEffect} from 'react'
import './Feed.css';
import Post from '../Post/Post.js';

export default function Feed () {
  const [posts, setPosts] = useState([])
  const [subreddit, setSubreddit] = useState(['pics'])

  useEffect(() => {
    fetch(`https://www.reddit.com/r/${subreddit}.json`).then(res => {
      if(res.status!=200){
        console.log('error')
        return;
      }
      res.json().then(data => {
        if(data!=null){
          console.log(data)
          setPosts(data.data.children);
        }
      });
    })
  }, [subreddit]);

  return (
    <div>
      <h2 className="subredditName">r/{subreddit}</h2>
      <div className="feed">
        <div className="posts">
          {(posts != null) ? posts.map((post, index) => <Post key={index} post={post.data} />) : ''}
        </div>
      </div>
    </div>
  )
}
