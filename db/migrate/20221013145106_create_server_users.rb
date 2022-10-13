class CreateServerUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :server_users do |t|
      t.references :server, foreign_key: { to_table: :servers }
      t.references :user, foreign_key:  { to_table: :users }

      t.timestamps
    end
  end
end
