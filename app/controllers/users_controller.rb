class UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def create
    user = User.create!(user_params)
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  def show
    user = find_user
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  def destory
    user = find_user
    user&.destroy
    render json: { message: 'User deleted!'}
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation, :first_name, :last_name)
  end

  def find_user
    @user ||= User.find(params[:id])
  end
end
