class Api::ChatsController < ApplicationController
    def create
        @chat = Chat.new_chat(params)
        # Add code so that the creator is automatically added to the chat
        render :show
    end
end
