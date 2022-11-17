class Api::MessagesController < ApplicationController
    def create
        debugger
        @message = Message.new_message(message_params)
        if @message.save!
            render :show
        end
    end

    private

    def message_params
        params.require(:message).permit(:body, :sender_id, :chat_id)
    end
end
