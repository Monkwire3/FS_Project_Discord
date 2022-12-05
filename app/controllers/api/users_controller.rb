class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def index
     @users = User.all
     render :index
  end

  def create
    @user = User.new(user_params)

    if @user.save!
      login(@user)
      render :show 
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  def send_friend_request
    debugger
    @request = Friend.new(requester_id: params[:requester_id], requestee_id: params[:requestee_id])
    @request.save!
  end

  def accept_friend_request
    @request = Friend.find(params[:id])
    @request.accepted = True
  end

  def remove_friend
    @friend = Friend.find(params[:id])
    if @friend
      @friend.delete
    end

  end
  


  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end



end
