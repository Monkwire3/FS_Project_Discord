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

  def get_friend_requests
    @requests = Friend.where(requester_id: current_user.id, accepted: false).or(Friend.where(requestee_id: current_user.id, accepted: false))
    render :friend_requests
  end

  def send_friend_request
    @request = Friend.new(requester_id: params[:requester_id], requestee_id: params[:requestee_id])
    @request.save!
    @user = User.find(params[:requester_id])
    render :show
  end

  def accept_friend_request
    @request = Friend.where(requestee_id: params[:requestee_id], requester_id: params[:requester_id])
    @request.update(accepted: true)
    @requests = Friend.where(requester_id: current_user.id, accepted: false).or(Friend.where(requestee_id: current_user.id, accepted: false)) 
    render :friend_requests
  end

  def remove_friend
    @friend = Friend.where(requestee_id: params[:id_a], requester_id: params[:id_b]).or(Friend.where(requestee_id: params[:id_b], requester_id: params[:id_a]))[0];
    if @friend
      @friend.delete
    end

    render :index
  end

  def friends
    @users = User.find(Friend.where(requester_id: current_user.id, accepted: true).pluck(:requestee_id)) + (User.find(Friend.where(requestee_id: current_user.id, accepted: true).pluck(:requester_id)))
    render :index
  end
  


  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end



end
