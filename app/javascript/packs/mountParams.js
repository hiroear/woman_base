import React from 'react';
import { createRoot } from 'react-dom/client';
import { CreateTopic } from "./components";

const mount = (Component, mountNodeId) => {
  document.addEventListener('DOMContentLoaded', () => {
    const mountNode = document.getElementById(mountNodeId);
    const propsJSON = mountNode.getAttribute("data-react-props");
    const props = JSON.parse(propsJSON);
    const root = createRoot(mountNode);
    root.render(<Component {...props} />);
  })
};

mount(CreateTopic, 'create_topic');