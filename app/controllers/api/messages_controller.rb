class Api::MessagesController < ApplicationController
    def create
        @message = Message.new_message(message_params)
        if @message.save!
            render json: @message, status: :created
        end
    end

    private

    def message_params
        params.require(:message).permit(:sender_id, :chat_id, :body)
    end

end
