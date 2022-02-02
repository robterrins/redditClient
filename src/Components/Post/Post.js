import React from 'react';
import './Post.css';



export default function Post(props){
  const convertTimeStamp = (timestamp)=>{
    const milliseconds = timestamp * 1000;
    const dateObj = new Date(milliseconds);
    return dateObj.toLocaleString('en-GB')
  }

  return (
    <article className="post">
    <span className="author">Posted by {props.post.author} on {convertTimeStamp(props.post.created_utc)}</span>
      <a href={'https://www.reddit.com' + props.post.permalink} target="_blank">
        <h3>{props.post.title}</h3>
        {(props.post.thumbnail.length > 6) ? <img src={props.post.url} /> : <a>{props.post.thumbnail}</a>}
      </a>
      <hr></hr>
      <div className="postScore">
        <button>Up</button>
        {props.post.score}
        ||
        {props.post.upvote_ratio}
        <button>Down</button>
      </div>
        <button type="button">
          Comments ({props.post.num_comments})
        </button>
    </article>
  )
}
