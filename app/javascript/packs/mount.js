import React from 'react';
import { createRoot } from 'react-dom/client';
import { ReactTopics, ReactFavorites, CommentPost } from "./components";  //"./components.index"の省略形

// document.addEventListener('turbolinks:load', () => {
//   const mountNode = document.getElementById('react_index');
//   const message = mountNode.dataset.message;
//   const root = createRoot(mountNode);
//   root.render(<ReactIndex message={message} />);
// })

const mountIndex = (Component, mountNodeId) => {
  document.addEventListener('DOMContentLoaded', () => {
    const mountNode = document.getElementById(mountNodeId);         // id要素を取得
    const propsJSON = mountNode.getAttribute("data-react-props");   // data属性の値を取得
    const props = JSON.parse(propsJSON);  // JSON.parse(): 引数に文字列を受け取り、JavaScriptオブジェクトを返す
    const root = createRoot(mountNode);
    root.render(<Component {...props} />);  // {...props}: JSON.parse(propsJSON)で受け取った propsを展開
  })
};

mountIndex(ReactTopics, 'react_topics');
mountIndex(ReactFavorites, 'react_favorite');
mountIndex(CommentPost, 'react_post_comment');