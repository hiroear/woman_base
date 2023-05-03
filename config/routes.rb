Rails.application.routes.draw do
  # get 'media/index'
  root :to => 'topics#index'

  resources :topics do
    resources :posts, only: [:create]
    # topic_posts_path	POST	/topics/:topic_id/posts(.:format)
  end

  resources :media, only: [:index]
end
