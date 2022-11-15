class Api::MessagesController < ApplicationController
    def create_message
        @message = Message.new_message(params)
        render :show
    end
end
