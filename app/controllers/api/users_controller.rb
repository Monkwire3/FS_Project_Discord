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
    @request = Friend.new(requester_id: params[:requester_id], requestee_id: params[:requestee_id])
    @request.save!
    @user = User.find(params[:requester_id])
    render :show
  end

  def accept_friend_request
    @request = Friend.where(requestee_id: params[:requestee_id], requester_id: params[:requester_id])[0]
    @request.update(accepted: true)
  end

  def remove_friend
    @friend = Friend.where(requestee_id: params[:id_a], requester_id: params[:id_b]).or(Friend.where(requestee_id: params[:id_b], requester_id: params[:id_a]))[0];
    if @friend
      @friend.delete
    end

    render :index
  end
  


  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end



end
