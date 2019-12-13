class AddUserToInvite < ActiveRecord::Migration[6.0]
  def change
    add_reference :invites, :user
  end
end
