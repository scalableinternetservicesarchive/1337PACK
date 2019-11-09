class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.string :content
      t.string :username
      t.integer :parent_id

      t.timestamps
    end
  end
end
