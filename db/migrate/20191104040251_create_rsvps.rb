class CreateRsvps < ActiveRecord::Migration[6.0]
  def change
    create_table :rsvps do |t|
      t.bool :answer
      t.timestamps

      t.references :users, foreign_key: true
      t.references :events, foreign_key: true
    end
  end
end
