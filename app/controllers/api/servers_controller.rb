class Api::ServersController < ApplicationController

    def index
        @servers = Server.all
        render 'api/servers/index'
    end

    def show
        @server = Server.find(params[:id])
        render 'api/servers/show'
    end

    def create
        @server = Server.new(server_name: server_params[:server_name], owner: User.find(current_user.id))
        if @server.save!
            render 'api/servers/show'
        else
            render json: { errors: @server.errors.full_messages }
        end
    end

    def update
        if @server.update(server_params)
            render :show
        else
            render json: @server.errors.full_messages, status: 422
        end
    end


    def destroy
        @server = Server.find(params[:id])
        if @server
            if @server.owner == current_user
                @server.delete()
                render json: {message: 'server successfully deleted'}
            end
        else
            render json { errors; @server.errors.full_messages}
        end
    end

    private

    def server_params
        params.require(:server).permit(:server_name)
    end
end
