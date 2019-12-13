class AddDefaultValues < ActiveRecord::Migration[6.0]
  def change
    change_column_default(:rsvps, :num_guests, from: nil, to: 1)
  end
end

