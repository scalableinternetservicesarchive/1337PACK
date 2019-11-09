class AddCommentReferences < ActiveRecord::Migration[6.0]
  def change
    add_reference :comments, :user
    add_reference :comments, :event
  end
end
