import { StarOutlined } from '@ant-design/icons'
function Review({ title, rating, body, author }) {
  return (
    <div className='mb-8'>
        <p className="font-bold">{author}</p>
        <p className="text-light-gray">{title}</p>
        <p>{body}</p>
        <div>
        <StarOutlined className="text-md text-star-yellow" />{' '}
        <span className="font-semibold text-md">{rating}</span>
        </div>
    </div>
  )
}
export default Review