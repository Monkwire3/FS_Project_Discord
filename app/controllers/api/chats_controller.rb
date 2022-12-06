class Api::ChatsController < ApplicationController
    def create
        @chat = Chat.where(members: params[:members]);
        @chat = Chat.new_chat(params) if !@chat
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
end
