import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Post } from "./index";

toast.configure()

const CommentPost = ({topic, postsLatest}) => {
  const [commentPost, setCommentPost] = useState({
    name: '',
    content: '',
    topic_id: topic.id
  });
  const [disabled, setDisabled] = useState(true);
  const [posts, setPosts] = useState(postsLatest);


  console.log(posts, commentPost, disabled);

  // toast
  const notify = () => {
    toast.success("コメントを投稿しました！", {
      position: "bottom-left",
      hideProgressBar: true
    })
  };

  // commentPostにコメント入力値を入れて更新
  const handleTextInput = e => {
    setCommentPost({ ...commentPost, [e.target.name]: e.target.value });
  };

  // コメント投稿ボタンをクリック後 dataを axiosで postsコントローラーcreateアクションへ送信
  const savePost = () => {
    // e.preventDefault()
    const data = {
      name:  commentPost.name,
      content: commentPost.content,
      topic_id: topic.id
    };
    axios.post(`/topics/${topic.id}/posts`, data)
    .then(resp => {
      setCommentPost({
        id: resp.data.id,
        name: resp.data.name,
        content: resp.data.content,
        topic_id: resp.data.topic_id
      });
      const newPost = [commentPost, ...posts];
      setPosts(newPost);
      notify();
      setCommentPost({
        id: null,
        name: '',
        content: '',
        topic_id: topic.id
      });
      document.getElementById('commentText').value='';
    })
    .catch(err => console.log(err))
  };

  // 新着順ボタン
  const showPostsLatest = () => {
    let currentPosts = Array.from(posts);
    currentPosts.sort((a,b) => {
      if (a.created_at < b.created_at) return 1;
      if (a.created_at > b.created_at) return -1;
      return 0;
    })
    setPosts(currentPosts);
  }

  // 投稿順ボタン
  const showPostsOld = () => {
    let currentPosts = Array.from(posts);
    currentPosts.sort((a,b) => {
      if (a.created_at < b.created_at) return -1;
      if (a.created_at > b.created_at) return 1;
      return 0;
    })
    setPosts(currentPosts);
  }


  // コメント投稿入力欄に記入しないとボタンを押せない
  useEffect(() => {
    const space = /^\s*$/;
    if (!commentPost.content || space.test(commentPost.content) && commentPost.name) {
      setDisabled(true);
    } else if (commentPost.content && !commentPost.name || space.test(commentPost.name)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [commentPost]);


  return (
    <>
      <ToastContainer icon={'😃'} toastStyle={{ color: 'white', backgroundColor: '#8cbcdb', fontWeight: 'bold'}} />
      <div className="comment-title">
        <h3>コメントする</h3>
      </div>
      <div className="comment-detail">
        {/* <form onSubmit={savePost}> */}
          <textarea className='form-control w-90 mb-3' id='commentText' placeholder='コメントを入力' rows='5' required onChange={handleTextInput} defaultValue={commentPost.content} name="content"></textarea>
          <input className='form-control w-90 mb-3' placeholder='ニックネーム(20文字以内)' type='text' required onChange={handleTextInput} value={commentPost.name} name="name"/>
          <button className={`comment-button ${disabled && "button-disabled"}`} {...(disabled && {disabled})} onClick={savePost}>投稿する</button>
        {/* </form> */}
      </div>

      <div className="bbs-title">
        <h3 className='me-2'>みんなの声</h3>
        <p>投稿されたコメントを表示しています</p>
      </div>
      <div className="d-flex">
        <button className='topic-button my-2 ms-4' onClick={showPostsLatest}>新着順</button>
        <button className='topic-button my-2' onClick={showPostsOld}>投稿順</button>
      </div>
      <div className="bbs-content">
        <Post posts={posts} />
        <button className="end-comment-button">コメントする</button>
      </div>
    </>
  )
};

export default CommentPost;