# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  sender_id  :bigint
#  chat_id    :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord

    belongs_to :sender,
        foreign_key: :sender_id,
        class_name: :User,
        inverse_of: :messages
    
    belongs_to :chat,
        foreign_key: :chat_id,
        class_name: :Chat
            

    def self.new_message(params)
        chat = Chat.find(params[:chat_id])
        message = Message.create!(sender_id: params[:sender_id], chat_id: params[:chat_id], body: params[:body])
        ActionCable.server.broadcast("chat_#{params[:chat_id]}", message)
        return message
    end
end
