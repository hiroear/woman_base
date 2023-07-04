import React, { useState, useEffect } from 'react';
import { Pagination, Topic } from "./index";

const ReactTopics = ({ topics, categories, posts, topicOld }) => {
  const [searchTopics, setSearchTopics] = useState(topics);
  const [currentPage, setCurrentPage] = useState(1);
  const [topicsPerPage] = useState(15);
  const [sortClicked, setSortClicked] = useState(false);

  // console.log(sortClicked);

  useEffect(() => {
    const topicArea = document.getElementById('topic_area');
    topicArea.style.display="block" && (topicArea.style.display="none");
  }, []);


  // ページネーション
  useEffect(() => {
    const indexOfLastTopic = currentPage * topicsPerPage;        // 1ページ目 * 15 = 15     2ページ目 * 15 = 30
    const indexOfFirstTopic = indexOfLastTopic - topicsPerPage;  // 15 - 15 = 0            30 - 15 = 15
    if (sortClicked) {
      setSearchTopics(topicOld.slice(indexOfFirstTopic, indexOfLastTopic));
    } else {
      setSearchTopics(topics.slice(indexOfFirstTopic, indexOfLastTopic));  // 例(1ページ目): 全topic一覧から 0〜15番目までをピックアップ
    }
  }, [currentPage]);


  // キーワード検索 & ページ表示
  const handleSearch = (e) => {
    const inputValue = e.target.value;
    if (inputValue) {
      setSearchTopics(
        topics.filter((topic) =>
        topic.title.toLowerCase().includes(inputValue)
        || topic.description.toLowerCase().includes(inputValue)
      ));
    } else {
      const lastTopic = currentPage * topicsPerPage;
      const firstTopic = lastTopic - topicsPerPage;
      setSearchTopics(topics.slice(firstTopic, lastTopic));
    }
  };

  //ページ切り替え
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // それぞれのトピックに紐づく Post数を取得
  const returnPostNum = (topic) => {
    const postNum = posts.filter(post => post.topic_id === topic.id).length;
    return `${postNum}`;
  }

  // 新着順ボタン
  const sortLatestButton = () => {
    setSortClicked(false);
    setSearchTopics(topics.slice(0, 15));
  };

  // 投稿順ボタン
  const sortOldButton = () => {
    setSortClicked(true);
    setSearchTopics(topicOld.slice(0, 15));
  };

  return (
    <>
      <div className='keyword-form'>
        <input className='form-control me-2' placeholder='キーワードを入力' type='text' onChange={(e) => handleSearch(e)}/>
      </div>
      <div className='topic-area'>
        <div className='topic-title'>
          <h3>トピック一覧&nbsp;&nbsp;{topics.length}件</h3>
        </div>
        <input className='topic-button' type='submit' value='新着順' onClick={sortLatestButton} />
        <input className='topic-button' type='submit' value='投稿順' onClick={sortOldButton} />

        <Topic topics={searchTopics} categories={categories} returnPostNum={returnPostNum}/>
        <Pagination topicsPerPage={topicsPerPage} totalTopics={topics.length} paginate={paginate} />
        {/* topicsPerPage={15} totalTopics={43} paginate={paginate関数} */}
      </div>
    </>
  )
};

export default ReactTopics;