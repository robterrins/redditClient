import React from 'react';
import './Post.css';

export default function Post(props){
  return (
    <article className="post">
      <a href={'https://www.reddit.com' + props.post.permalink} target="_blank">
        <h3>{props.post.title}</h3>
        <img src={props.post.thumbnail}/>
      </a>
    </article>
  )
}
