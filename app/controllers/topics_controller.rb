class TopicsController < ApplicationController
  protect_from_forgery
  FIVE = 5

  def index
    # キーワード検索(内 昇順/降順)表示
    if params[:keyword].present?
      @keyword = params[:keyword].strip
      if params[:keyword_latest].present?                      # 降順
        @topics = Topic.include.search_topic(@keyword).latest.display_list(params[:page])
      else                                                     # デフォルト / 昇順(keyword_old)
        @topics = Topic.include.search_topic(@keyword).old.display_list(params[:page])
      end

    # カテゴリ一覧(内 昇順/降順)表示
    elsif params[:category].present?
      @category = Category.find(params[:category].to_i)
      if params[:category_latest].present?                            # 降順
        @topics = Topic.category_of(@category).latest.display_list(params[:page])
      else                                                            # デフォルト / 昇順(category_old)
        @topics = Topic.category_of(@category).old.display_list(params[:page])
      end

    else  # デフォルト(React)
      # @topics = Topic.include.latest.display_list(params[:page])       # Topics一覧 / 降順(recent)
      @topics = Topic.latest
      @topic_old = Topic.old
      @posts = Post.all
    end

    @newtopics = Topic.include.latest.take(FIVE)
    @ranktopics = Topic.include.most_posts
    @categories = Category.all      #react
    @topic = Topic.new
    @tags = ["結婚", "ダイエット", "職場", "美容", "妊娠", "育児", "ドラマ", "コロナ", "料理"]
  end


  def show
    @topic = Topic.find(params[:id])
    # @topic = Topic.includes(:category).where(id: topic.id)
    @alreadylike = @topic.likes.find_by(ip: request.remote_ip, topic_id: @topic)
    @posts_latest = Post.includes(:topic).where(topic_id: @topic.id).order(updated_at: :desc)  # デフォルト
    @posts_old = Post.includes(:topic).where(topic_id: @topic.id).order(updated_at: :asc)

    @categories = Category.all
    @show_topic = Topic.new
    @ranktopics = Topic.include.most_posts
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
      params.permit(:name, :title, :description, :category_id)
    end

end
