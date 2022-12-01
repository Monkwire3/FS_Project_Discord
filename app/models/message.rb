# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  sender_id  :bigint
#  chat_id    :bigint
#  channel_id :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord
    # validates :chat_id, :channel_id, allow_nil: true

    belongs_to :sender,
        foreign_key: :sender_id,
        class_name: :User,
        inverse_of: :messages
    
    belongs_to :chat,
        foreign_key: :chat_id,
        class_name: :Chat
    
    belongs_to :channel,
        foreign_key: :channel_id,
        class_name: :Channel
    

            

    def self.new_message(params)
        if params[:chat_id] != nil
            chat = Chat.find(params[:chat_id])
            message = Message.create!(sender_id: params[:sender_id], chat_id: params[:chat_id], body: params[:body])
            ActionCable.server.broadcast("chat_#{params[:chat_id]}", message)
        else
            debugger
            channel = Channel.find(params[:channel_id])
            message = Message.create!(sender_id: params[:sender_id], channel_id: params[:channel_id], body: params[:body])
            # ActionCable.server.broadcast("channel_#{params[:channel_id]}", message)
        end
        return message
    end

end
