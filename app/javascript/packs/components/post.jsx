import React from 'react'

const Post = ({posts}) => {
  return (
    <div>
      {posts.map((post, index) => {
        return (
          <div key={index}>
            <div className="bbs-parts my-1">
              <div className="parts-number">
                <p>No.{index + 1}</p>
              </div>
              <div className="parts-username">
                <p>{post.name}</p>
              </div>
              <div className="parts-time">
                <p>{moment(post.created_at).format('YY/MM/DD HH:mm')}</p>
              </div>
            </div>
            <div className="bbs-detail">
              {post.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Post;