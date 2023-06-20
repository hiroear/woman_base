class Topic < ApplicationRecord
  belongs_to :category
  has_many :posts
  has_many :likes, dependent: :destroy
  
  validates :name, presence: true, length:{maximum: 20}
  validates :title, presence: true, length:{maximum: 48}
  validates :description, presence: true

  PER = 10
  FIVE = 5

  def posts_new
    posts.new
  end

  scope :latest, -> {order(created_at: :desc)}
  scope :old, -> {order(created_at: :asc)}
  scope :include, -> {includes(:category, :posts)}
  scope :display_list, -> (page) {page(page).per(PER)}

  # キーワード検索
  scope :search_topic, -> (keyword) {
    include.where("name LIKE ? OR title LIKE ? OR description LIKE ?", "%#{keyword}%", "%#{keyword}%", "%#{keyword}%")
  }

  #カテゴリーで探す
  scope :category_of, -> (category) {include.where(category_id: category)}

  # コメント数ランキング
  scope :most_posts, -> {
    left_joins(:posts).select(:id, "COUNT(posts.id) AS posts_count").group(:id).order('posts_count DESC').select('topics.*').take(PER)
  }

end
