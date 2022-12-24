class Api::MessagesController < ApplicationController
    def create
        @message = Message.new_message(message_params)
        if @message.save!
            render json: @message, status: :created
        end
    end

    # def update
    #     @message = Message.find(params[:id])

    #     if @message
    #         if @message(update(message_params))
    #             render json: @message, status: :updated
    #         else
    #             render json: { errors: @message.errors.full_messages}
    #         end
    #     end
    # end

    def destroy
        @message = Message.find(params[:id])
        if @message
            @message.destroy
            render json: {mesage: 'message deleted'}
        else
            render json: { errors: @message.errors.full_messages }
        end
    end

    private

    def message_params
        params.require(:message).permit(:sender_id, :chat_id, :body, :channel_id)
    end

end
