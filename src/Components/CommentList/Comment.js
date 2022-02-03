import {useDispatch, useSelector} from 'react-redux'
import './CommentList.css'

export const Comment = (props) => {

  return(
    <div className="comment">
      comment{props.id}
    </div>
  )
}
