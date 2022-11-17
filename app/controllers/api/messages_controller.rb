class Api::MessagesController < ApplicationController
    def create
        debugger
        @message = Message.new_message(params)
        if @message.save!
            render :show
        end
    end


end
