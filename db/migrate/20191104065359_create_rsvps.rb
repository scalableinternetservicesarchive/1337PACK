class CreateRsvps < ActiveRecord::Migration[6.0]
  def change
    create_table :rsvps do |t|
      t.boolean :answer

      t.timestamps
    end
  end
end
