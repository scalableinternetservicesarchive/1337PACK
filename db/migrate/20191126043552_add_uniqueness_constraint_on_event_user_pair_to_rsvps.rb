class AddUniquenessConstraintOnEventUserPairToRsvps < ActiveRecord::Migration[6.0]
  def change
    add_index(:rsvps, [:event_id, :user_id], :unique => true)
  end
end
