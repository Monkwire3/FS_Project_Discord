class Api::ChannelsController < ApplicationController
    def index
        @channels = Channel.where(server_id: params[:server_id]);
        puts 'CHANNELS ============================================================'
        puts @channels
        render 'api/channels/index'
    end

    def show
        @channel = Channel.find(params[:id])
        render 'api/channels/show'
    end

end
