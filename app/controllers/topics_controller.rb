class TopicsController < ApplicationController
  def index
    @topics = Topic.all
    @categories = Category.all

    @topic = Topic.new
  end
end
