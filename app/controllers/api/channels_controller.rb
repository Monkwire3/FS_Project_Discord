class Api::ChannelsController < ApplicationController
    def index
        @channels = Channel.where(server_id: params[:server_id]);
        puts 'CHANNELS ============================================================'
        puts @channels
        render 'api/channels/index'
    end

    def show
        @channel = Channel.find(params[:id])
        @messages = @channel.messages.order('messages.created_at')
        render 'api/channels/show'
    end

    def create
        @channel = Channel.new(channel_params)

        if @channel.save!
            render 'api/channels/show'
        else
            render json: { errors: @channel.errors.full_messages }
        end
    end

    def update
        debugger
        @channel = Channel.find(params[:id])
        if @channel
            if @channel.update(channel_params)
                render :show
            end
        else
            render json: { errors: @server.errors.full_messages, status: 422} 
        end
    end

    def destroy
        debugger
        @channel = Channel.find(params[:id])
        if @channel
            @channel.destroy
            render json: { message: 'server successfully deleted'}
        else
            render json: { errors: @channel.errors.full_messages }

        end
    end

    private

    def channel_params
        params.require(:channel).permit(:channel_name, :server_id)
    end

end
