import React from 'react';

const Topic = ({topics, categories, returnPostNum}) => {
  return (
    <>
    {topics.map(topic => {
      return (
        <div className='topic-item' key={topic.id}>
          <span className='item-title'>
            <a href={`/topics/${topic.id}`}>{topic.title}</a>
          </span>
          <span className='item-day'>{moment(topic.created_at).format('YY/MM/DD HH:mm')}</span>
          {categories.map(category => (
            topic.category_id === category.id &&
            <span className='item-comment' key={category.id}>
              {category.name}
              <span className="comment"></span>
              <span>{returnPostNum(topic)}</span>
            </span>
          ))}
        </div>
      )
    })}
    </>
  );
};

export default Topic;