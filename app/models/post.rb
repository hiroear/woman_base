class Post < ApplicationRecord
  belongs_to :topic

  scope :latest, -> {order(updated_at: :desc)}
  scope :old, -> {order(updated_at: :asc)}
  
  validates :name, presence: true, length:{maximum: 20}
  validates :content, presence: true
end
