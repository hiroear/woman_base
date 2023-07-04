class MylikesController < ApplicationController
  def index
    # @like_topics = Topic.eager_load(:likes, :category, :posts).where(likes: {ip: request.remote_ip}).order("likes.created_at DESC").page(params[:page]).per(20)

    # ↓ react
    @liked_topics = Topic.eager_load(:likes).where(likes: {ip: request.remote_ip}).order("likes.created_at DESC")
    @posts = Post.all

    @ranktopics = Topic.include.most_posts
    @categories = Category.all
    @show_topic = Topic.new
  end
end
