class PostsController < ApplicationController

  def create
    topic = Topic.find(params[:topic_id])
    post = topic.posts_new
    post.name = post_params[:name]
    post.content = post_params[:content]
    post.topic_id = post_params[:topic_id]
    post.save

    redirect_to topic_path(topic)
  end

  private
    def post_params
      params.require(:post).permit(:name, :content).
              merge(topic_id: params[:topic_id])
    end
end
