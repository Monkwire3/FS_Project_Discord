class Api::MessagesController < ApplicationController
    def create_message
        message = Message.new(params)
        render json: mesage, status: created
    end

end
