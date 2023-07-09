import React from 'react';
import { createRoot } from 'react-dom/client';
import { Topics, CreateTopic, Favorites, CommentPost } from "./components";  //"./components.index"の省略形
import 'react-toastify/dist/ReactToastify.css';

// document.addEventListener('turbolinks:load', () => {
//   const mountNode = document.getElementById('topics');
//   const message = mountNode.dataset.message;
//   const root = createRoot(mountNode);
//   root.render(<Topics message={message} />);
// })

const mount = (Component, mountNodeId) => {
  document.addEventListener('DOMContentLoaded', () => {
    const mountNode = document.getElementById(mountNodeId);         // id要素を取得
    const propsJSON = mountNode.getAttribute("data-react-props");   // data属性の値を取得
    const props = JSON.parse(propsJSON);  // JSON.parse(): 引数に文字列を受け取り、JavaScriptオブジェクトを返す
    const root = createRoot(mountNode);
    root.render(<Component {...props} />);  // {...props}: JSON.parse(propsJSON)で受け取った propsを展開
  })
};

mount(Topics, 'topics');
mount(CreateTopic, 'create_topic');
mount(CreateTopic, 'sp_create_topic');
mount(CreateTopic, 'sp_favorite_create_topic');
mount(CreateTopic, 'favorite_create_topic');
mount(Favorites, 'favorite');
mount(CommentPost, 'post_comment');