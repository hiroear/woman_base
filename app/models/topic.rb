class Topic < ApplicationRecord
  belongs_to :category

  validates :name, presence: true
  validates :title, presence: true
  validates :description, presence: true
end
