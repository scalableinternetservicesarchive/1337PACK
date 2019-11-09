class AddRsvpAssociation < ActiveRecord::Migration[6.0]
  def change
    add_reference :rsvps, :user
  end
end
