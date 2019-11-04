class CreateInvites < ActiveRecord::Migration[6.0]
  def change
    create_table :invites do |t|
      t.references :events, foreign_key: true
      t.references :rsvps, foreign_key: true
      # host_id
      t.references :users, foreign_key: true
      t.timestamps
    end
  end
end
