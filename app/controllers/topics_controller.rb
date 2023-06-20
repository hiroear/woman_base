class TopicsController < ApplicationController
  FIVE = 5

  def index
    # キーワード検索(内 昇順/降順)表示
    if params[:keyword].present?
      @keyword = params[:keyword].strip
      if params[:keyword_latest].present?                      # 降順
        @topics = Topic.search_topic(@keyword).latest.display_list(params[:page])
      else                                                     # デフォルト / 昇順(keyword_old)
        @topics = Topic.search_topic(@keyword).old.display_list(params[:page])
      end

    # カテゴリ一覧(内 昇順/降順)表示
    elsif params[:category].present?
      @category = Category.find(params[:category].to_i)
      if params[:category_latest].present?                            # 降順
        @topics = Topic.category_of(@category).latest.display_list(params[:page])
      else                                                            # デフォルト / 昇順(category_old)
        @topics = Topic.category_of(@category).old.display_list(params[:page])
      end

    else  # デフォルト
      if params[:ascend].present?
        @topics = Topic.include.old.display_list(params[:page])          # 昇順
      else
        @topics = Topic.include.latest.display_list(params[:page])       # Topics一覧 / 降順(recent)
      end
    end

    @newtopics = Topic.include.latest.take(FIVE)
    @ranktopics = Topic.include.most_posts
    @categories = Category.all
    @topic = Topic.new
    @tags = ["結婚", "ダイエット", "職場", "美容", "妊娠", "育児", "ドラマ", "コロナ", "料理"]
  end


  def show
    @topic = Topic.find(params[:id])
    @alreadylike = @topic.likes.find_by(ip: request.remote_ip, topic_id: @topic)

    if params[:latest]
      @posts = Post.includes(:topic).where(topic_id: @topic.id).order(updated_at: :desc)
    else
      @posts = Post.includes(:topic).where(topic_id: @topic.id).order(updated_at: :asc) # デフォルト / params[:old]
    end

    @post = @posts.new
    @categories = Category.all
    @show_topic = Topic.new
    @ranktopics = Topic.include.most_posts
  end


  def create
    @topic = Topic.new(topic_params)
    respond_to do |format| #リクエストされたレスポンスの形式によって分岐させる文
      if @topic.save
        format.html { redirect_to topics_path, notice: '新しいトピックが作成されました' }
        # format.json { render :show, status: :created, location: @topic }
      else
        format.html { render :index }
        # format.json { render json: @topic.errors, status: :unprocessable_entity }
      end
    end
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
