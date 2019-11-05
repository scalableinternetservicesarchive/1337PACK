class AddRsvpDetails < ActiveRecord::Migration[6.0]
  def change
    add_column :rsvps, :num_guests, :integer
  end
end
