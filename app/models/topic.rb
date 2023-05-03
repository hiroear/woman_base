class Topic < ApplicationRecord
  belongs_to :category
  has_many :posts

  def posts_new
    posts.new
  end

  scope :latest, -> {order(created_at: :desc)}
  scope :old, -> {order(created_at: :asc)}

  # キーワード検索
  scope :search_topic, -> (keyword) {
    where("name LIKE ? OR title LIKE ? OR description LIKE ?", "%#{keyword}%", "%#{keyword}%", "%#{keyword}%")
  }

  # コメント数ランキング
  scope :most_posts, -> {
    left_joins(:posts).select(:id, "COUNT(posts.id) AS posts_count").group(:id).order('posts_count DESC').select('topics.*')
  }

  validates :name, presence: true
  validates :title, presence: true
  validates :description, presence: true
end
