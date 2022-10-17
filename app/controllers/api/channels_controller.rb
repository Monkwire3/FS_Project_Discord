class Api::ChannelsController < ApplicationController
    def index
        @channels = Channel.where(serverId: params[:serverId]);
        debugger
        render 'api/channels/index'
    end

    def show
        @channel = Channel.find(params[:id])
        render 'api/channels/show'
    end

end
