class CreateUserChatJoins < ActiveRecord::Migration[7.0]
  def change
    create_table :user_chat_joins do |t|
      t.references :user, foreign_key: {to_table: :users}
      t.references :chat, foreign_key: {to_table: :chats}

      t.timestamps
    end
  end
end
