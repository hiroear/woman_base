class LikesController < ApplicationController
  before_action :set_topic, only: %i[ create destroy ]

  def create
    like = @topic.likes.create(topic_id: @topic.id, ip: request.remote_ip)
    @liked = Like.find_by(topic_id: @topic.id, ip: request.remote_ip)
  end

  def destroy
    like = Like.find_by(topic_id: @topic.id, ip: request.remote_ip)
    like.destroy
  end

  private
    def set_topic
      @topic = Topic.find(params[:topic_id])
    end
end
