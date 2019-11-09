class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :host_name
      t.string :location_name
      t.string :street_address
      t.datetime :start_time
      t.datetime :end_time
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
