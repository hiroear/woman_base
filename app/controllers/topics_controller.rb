class TopicsController < ApplicationController
  PER = 10
  def index
    # キーワード検索(内 昇順/降順)表示
    if params[:keyword].present?
      @keyword = params[:keyword].strip
      if params[:keynew].present?                              # 降順
        @topics = Topic.search_topic(@keyword).latest.page(params[:page]).per(PER)
        @newtopics = Topic.latest.limit(5)
        @ranktopics = Topic.most_posts.limit(PER)
      elsif params[:keyold].present?                           # 昇順
        @topics = Topic.search_topic(@keyword).old.page(params[:page]).per(PER)
        @newtopics = Topic.latest.limit(5)
        @ranktopics = Topic.most_posts.limit(PER)
      else                                                     # デフォルト表示
        @topics = Topic.search_topic(@keyword).page(params[:page]).per(PER)
        @newtopics = Topic.latest.limit(5)
        @ranktopics = Topic.most_posts.limit(PER)
      end

    # カテゴリ一覧(内 昇順/降順)表示
    elsif params[:category].present?
      @category = Category.find(params[:category].to_i)
      if params[:cate_new].present?                            # 降順
        @topics = Topic.where(category_id: @category).latest.page(params[:page]).per(PER)
        @newtopics = Topic.latest.limit(5)
        @ranktopics = Topic.most_posts.limit(PER)
      elsif params[:cate_old].present?                         # 昇順
        @topics = Topic.where(category_id: @category).old.page(params[:page]).per(PER)
        @newtopics = Topic.latest.limit(5)
        @ranktopics = Topic.most_posts.limit(PER)
      else                                                     # デフォルト表示
        @topics = Topic.where(category_id: @category).page(params[:page]).per(PER)
        @newtopics = Topic.latest.limit(5)
        @ranktopics = Topic.most_posts.limit(PER)
      end

    else  # デフォルト
      if params[:newest].present?
        @topics = Topic.latest.page(params[:page]).per(PER)                             # 降順
        @newtopics = Topic.latest.limit(5)
        @ranktopics = Topic.most_posts.limit(PER)
      elsif params[:oldest].present?
        @topics = Topic.old.page(params[:page]).per(PER)                                # 昇順
        @newtopics = Topic.latest.limit(5)
        @ranktopics = Topic.most_posts.limit(PER)
      else                                            # Topics一覧
        @topics = Topic.latest.page(params[:page]).per(PER)
        @newtopics = Topic.latest.limit(5)
        @ranktopics = Topic.most_posts.limit(PER)
      end
    end

    @categories = Category.all
    @topic = Topic.new
    @tags = ["結婚", "ダイエット", "職場", "美容", "妊娠", "育児", "ドラマ", "コロナ", "料理"]
  end


  def show
    @topic = Topic.find(params[:id])

    if params[:latest]
      @posts = @topic.posts.latest #order(updated_at: :desc)
    elsif params[:old]
      @posts = @topic.posts.old #order(updated_at: :asc)
    else
      @posts = @topic.posts.all #where.not(topic_id: nil)
    end

    @post = @posts.new
    @categories = Category.all
    @show_topic_new = Topic.new
    @ranktopics = Topic.most_posts.limit(PER)
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
