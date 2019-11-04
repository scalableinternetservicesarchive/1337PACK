class AddAssociations < ActiveRecord::Migration[6.0]
  def change
    add_reference :invites, :event, index: true
    add_reference :invites, :rsvp, index: true
    add_reference :invites, :user, index: true

    add_reference :comments, :user, index: true
    add_reference :comments, :event, index: true

    add_reference :rsvps, :user, index: true
    add_reference :rsvps, :event, index: true

    add_reference :events, :comment, index: true
    add_reference :events, :user, index: true

    add_reference :users, :event, index: true
  end
end
