class Post < ApplicationRecord
  belongs_to :topic

  scope :latest, -> {order(updated_at: :desc)}
  scope :old, -> {order(updated_at: :asc)}
  
end
