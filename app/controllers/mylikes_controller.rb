class MylikesController < ApplicationController
  def index
    # キーワード検索(内 昇順/降順)表示
    if params[:keyword].present?
      @keyword = params[:keyword].strip
        # @topics = Topic.search_topic(@keyword).old.display_list(params[:page])
        # includes(:category, :posts).where("name LIKE ? OR title LIKE ? OR description LIKE ?", "%#{keyword}%", "%#{keyword}%", "%#{keyword}%")
      topics = Topic.eager_load(:likes, :category, :posts).where(likes: {ip: request.remote_ip}).order("likes.created_at DESC").display_list(params[:page])
      # @topics = Like.includes(:topic).where(topics: {"name LIKE ? OR title LIKE ? OR description LIKE ?", "%#{@keyword}%", "%#{@keyword}%", "%#{@keyword}%"}).display_list(params[:page])
    

    else
      @topics = Topic.eager_load(:likes, :category, :posts).where(likes: {ip: request.remote_ip}).order("likes.created_at DESC").display_list(params[:page])
    end

    # @ranktopics = Topic.include.most_posts
    # @topic = Topic.new
  end
end
