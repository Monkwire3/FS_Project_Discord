class Api::MessagesController < ApplicationController
    def create
        @message = Message.new_message(params)
        render :show
    end
end
