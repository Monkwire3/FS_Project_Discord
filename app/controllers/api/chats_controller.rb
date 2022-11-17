class Api::ChatsController < ApplicationController
    def create
        debugger
        @chat = Chat.new_chat(params)
        # Add code so that the creator is automatically added to the chat
        render :show
    end

    def show
        @chat = Chat.find(params[:id])
        render :show
    end

    def index
        debugger
        @chats = current_user.chats
        render :index
    end
end
