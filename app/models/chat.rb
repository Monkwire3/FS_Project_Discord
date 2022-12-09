# == Schema Information
#
# Table name: chats
#
#  id         :bigint           not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Chat < ApplicationRecord
    has_many :user_chat_joins,
        foreign_key: :chat_id,
        class_name: :UserChatJoin,
        dependent: :destroy
    
    has_many :members,
        through: :user_chat_joins,
        source: :user,
        dependent: :destroy
    
    has_many :messages,
        foreign_key: :chat_id,
        class_name: :Message,
        dependent: :destroy

    def self.new_chat(params)
        chat = Chat.create!(title: params[:title])
        # ChatsChannel.broadcast_to("chat_#{chat.id}")
        return chat
    end
end
