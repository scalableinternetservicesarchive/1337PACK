class CreateRsvps < ActiveRecord::Migration[6.0]
  def change
    create_table :rsvps do |t|
      t.string :response
      t.integer :num_guests
      t.string :guest_name

      t.timestamps
    end
  end
end
