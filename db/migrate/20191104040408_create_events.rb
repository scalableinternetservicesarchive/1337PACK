class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :venue

      t.timestamps
      t.references :comments, foreign_key: true
      t.references :users, foreign_key: true
    end
  end
end
