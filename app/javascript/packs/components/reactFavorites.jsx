import React, { useState, useEffect } from 'react';
import { Pagination, Topic } from "./index";

const ReactFavorites = ({likedTopics, categories, posts}) => {
  const [searchLikeTopics, setSearchLikeTopics] = useState(likedTopics);
  const [currentPage, setCurrentPage] = useState(1);
  const [topicsPerPage] = useState(20);


  // ページネーション
  useEffect(() => {
    const indexOfLastTopic = currentPage * topicsPerPage;
    const indexOfFirstTopic = indexOfLastTopic - topicsPerPage;
    setSearchLikeTopics(likedTopics.slice(indexOfFirstTopic, indexOfLastTopic));
  }, [currentPage]);

  // ページ切り替え
  const paginate = pageNumber => setCurrentPage(pageNumber);


  // キーワード検索 & ページ表示
  const handleSearch = (e) => {
    const inputValue = e.target.value;
    if (inputValue) {
      setSearchLikeTopics(
        likedTopics.filter((topic) =>
        topic.title.toLowerCase().includes(inputValue)
        || topic.description.toLowerCase().includes(inputValue)
      ));
    } else {
      const lastTopic = currentPage * topicsPerPage;
      const firstTopic = lastTopic - topicsPerPage;
      setSearchLikeTopics(likedTopics.slice(firstTopic, lastTopic));
    }
  };

  // それぞれのトピックに紐づく Post数を取得
  const returnPostNum = (topic) => {
    const postNum = posts.filter(post => post.topic_id === topic.id).length;
    return `${postNum}`;
  }


  return (
    <>
      <div className='favorite-topic-title'>
        <h3>お気に入りトピック一覧&nbsp;&nbsp;{likedTopics.length}件</h3>
      </div>
      <div className='keyword-form'>
        <input className='form-control me-2' placeholder='キーワードを入力' type='text' onChange={(e) => handleSearch(e)}/>
      </div>
      <div className='topic-area'>
        <Topic topics={searchLikeTopics} categories={categories} returnPostNum={returnPostNum}/>
        <Pagination topicsPerPage={topicsPerPage} totalTopics={likedTopics.length} paginate={paginate} />
      </div>
    </>
  );
};

export default ReactFavorites;