class Api::ServersController < ApplicationController

    def index
        @servers = Server.all.select{|server| server.members.include?(current_user)}
        render 'api/servers/index'
    end

    def show
        @server = Server.find(params[:id])
        render 'api/servers/show'
    end

    def create
        @server = Server.new(server_name: server_params[:server_name], owner: User.find(current_user.id))
        if @server.save!

            @server_user = ServerUser.new(server_id: params[:server_id], user_id: current_user.id)

            @servers = Server.all.select{|server| server.members.include?(current_user)} 
            render :index
        else
            render json: { errors: @server.errors.full_messages }
        end
    end

    def undiscovered
        @servers = Server.all.select{|server| !server.members.include?(current_user)}
        render 'api/servers/index'
    end

    def update
        @server = Server.find(params[:id])
        if @server
            if @server.update(server_params)
                @servers = Server.all.select{|server| server.members.include?(current_user)}
                render 'api/servers/index' 
            end
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
            render json: { errors: @server.errors.full_messages}
        end
    end

    def join
        @server_user = ServerUser.new(server_id: params[:server_id], user_id: current_user.id)
        if @server_user.save!
            @servers = Server.all.select{|server| server.members.include?(current_user)} 
            render :index
        end
    end

    private

    def server_params
        params.require(:server).permit(:server_name)
    end
end
