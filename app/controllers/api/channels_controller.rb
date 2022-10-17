class Api::ChannelsController < ApplicationController
    def show
        @channel = Server.find(params[:id])
        render 'api/channels/show'
    end
end
