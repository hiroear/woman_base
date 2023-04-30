class CreateTopics < ActiveRecord::Migration[6.1]
  def change
    create_table :topics do |t|
      t.string :name,         null: false
      t.text :title,          null: false
      t.text :description,    null: false
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
