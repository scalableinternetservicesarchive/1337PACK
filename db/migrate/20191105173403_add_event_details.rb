class AddEventDetails < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :title, :string
    add_column :events, :start_time, :datetime
    add_column :events, :end_time, :datetime
    add_column :events, :description, :string
    add_column :events, :host, :string
  end
end
