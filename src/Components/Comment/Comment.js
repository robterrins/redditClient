import { useDispatch, useSelector } from 'react-redux'
import { convertTimeStamp } from '../../utils/convertTimeStamp.js';
import ArrowUpward from '@mui/icons-material/ArrowUpward'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './Comments.css'

export function Comment(props) {
  const comment = props.comment
  const hasReplies = comment.replies ? true : false;
  const replyCount = hasReplies ? comment.replies.data.children.length : 0;
  console.log("has replies: ", hasReplies);
  // console.log(props.comment.replies.data)
  if (hasReplies) {
    console.log(props.comment)
  }
  return (
    <div className="comment">
      <span>{comment.author}</span>{comment.created_utc}
      <br />
      <hr />
      {comment.body}
      <br />
      <hr />
      <span><ArrowUpward /> {comment.score > 1000 ? `${(comment.score / 1000).toFixed(1)}k` : comment.score} <ArrowDownward /></span>{hasReplies ? <button><AddCircleOutlineIcon />{replyCount} Replies</button> : ""}
      {hasReplies ? comment.replies.data.children.map((reply) => { return <div>{reply.author}</div> }) : ""}
    </div>
  )
}
