import {useDispatch, useSelector} from 'react-redux'
import './Comments.css'

export function Comment(props){

  return(
    <div className="comment">
      {props.id}
    </div>
  )
}
