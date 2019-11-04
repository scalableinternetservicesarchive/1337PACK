class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password

      t.timestamps
      t.references :events, foreign_key: true
    end
  end
end
