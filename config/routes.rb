Rails.application.routes.draw do
  # get 'media/index'
  root :to => 'topics#index'

  resources :topics do
    resources :posts, only: [:create]
      # topic_posts_path	POST	/topics/:topic_id/posts
    resources :likes, only: %i[create destroy]
      # topic_likes_path	POST	/topics/:topic_id/likes  likes#create
      # topic_like_path	DELETE	/topics/:topic_id/likes/:id  likes#destroy
  end

  resources :mylikes, only: [:index]
    # mylikes_path	 GET	 /mylikes	 mylikes#index

  resources :media, only: [:index]
end
