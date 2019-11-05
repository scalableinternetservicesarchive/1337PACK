class AddInviteDetails < ActiveRecord::Migration[6.0]
  def change
    add_column :invites, :message, :string
    add_column :invites, :guest_email, :string
  end
end
