import {useDispatch, useSelector} from 'react-redux'
import { convertTimeStamp } from '../../utils/convertTimeStamp.js'
import './Comments.css'

export function Comment(props){
  const comment = props.comment
  return(
    <div className="comment">
      <span>{comment.author}</span>
      <br/>
      {comment.body}
      <br/>
      <span>{comment.ups} {comment.downs} {comment.score}</span>
    </div>
  )
}
