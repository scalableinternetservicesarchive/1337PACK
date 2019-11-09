class AddInviteAssociation < ActiveRecord::Migration[6.0]
  def change
    add_reference :invites, :event
  end
end
