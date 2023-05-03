class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :name,      null: false
      t.text :content,     null: false
      t.references :topic, foreign_key: true

      t.timestamps
    end
  end
end
