import {useDispatch, useSelector} from 'react-redux'
import {Comment} from "./Comment.js"
import './CommentList.css'

export const CommentList = (props) => {

  const commentStatus = useSelector(state => state.feed.showComments);
  const dispatch = useDispatch();

  // const getPostComments = async (permalink) => {
  //   const response = await fetch(`https://www.reddit.com/r/${permalink}.json`);
  //   const json = await response.json();
  //   return json[1].data.children.map((comment) => comment.data);
  // };

  // const renderComments = () => {
  //   if(commentStatus){
  //     return posts.map((post, index) => <Comment key={index} post={post.data}/>)
  //   } return <div>no comments</div>
  // }

  return(
    <div className="commentListContainer">
      comment List
      <button>Close X</button>
      <div>

      </div>
    </div>
  )
}
  // {getPostComments(props.post.permalink).map((comment, index) => <Comment key={index} id={index} comment={comment.data}/>)}
