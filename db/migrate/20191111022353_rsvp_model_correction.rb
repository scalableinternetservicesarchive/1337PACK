class RsvpModelCorrection < ActiveRecord::Migration[6.0]
  def change
    add_reference :rsvps, :event
  end
end