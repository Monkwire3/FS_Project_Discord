class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.text :body, null: false
      t.references :sender, foreign_key: {to_table: :users}
      t.references :chat, foreign_key: {to_table: :chats}
      t.references :channel, foreign_key: {to_table: :channels}

      t.timestamps
    end
  end
end
