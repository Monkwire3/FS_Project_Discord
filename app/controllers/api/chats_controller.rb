class Api::ChatsController < ApplicationController
    def create
        # @chat = Chat.new_chat({title: params[:title]})
        # debugger

        @chat = Chat.create!({title: chat_params[:title]})

        UserChatJoin.create!({user_id: chat_params[:user_1], chat_id: @chat.id})
        UserChatJoin.create!({user_id: chat_params[:user_2], chat_id: @chat.id})

        render :show
    end

    def show
        @chat = Chat.find(params[:id])
        render :show
    end

    def index
        @chats = current_user.chats
        render :index
    end

    def destroy
        @chat = Chat.find(params[:id])
        if @chat
            @chat.delete()
            render json: {message: 'chat successfully deleted'}
        else
            render json: { errors: @chat.errors.full_messages}
        end
    end

    def chat_params
        params.require(:chat).permit(:title, :user_1, :user_2)
    end
end
