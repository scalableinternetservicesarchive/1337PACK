class AddForeignKey < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :invites, :events
    add_foreign_key :rsvps, :events
    add_foreign_key :comments, :events
  end
end
