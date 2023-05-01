class TopicsController < ApplicationController
  def index
    @topics = Topic.all
    @categories = Category.all
    @topic = Topic.new
  end

  def show
    @topic = Topic.find(params[:id])
  end

  def create
    @topic = Topic.new(topic_params)
    @topic.save
    redirect_to topics_path
    # redirect_to request.referer, notice: '作成されました'  # request.referer: 遷移元のURlを再取得
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private
    def topic_params
      params.require(:topic).permit(:name, :title, :description, :category_id)
    end
end
