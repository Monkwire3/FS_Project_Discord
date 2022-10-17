class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.string :channel_name, null: false

      t.references :server, foreign_key: { to_table: :servers }

      t.timestamps
    end
  end
end
