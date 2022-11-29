class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

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
    @request = Friend.new(requester_id: params[:requesterId], requestee_id: params[:requestee_id])
  end

  def accept_friend_request
    @request = Friend.find(params[:id])
    @request.accepted = True
  end

  def remove_friend

  end


  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end



end
