class UsersController < ApplicationController
  before_action :set_user, only: [:show, :destroy]
  
  def index
    @users = User.all
    render json: @users
  end
  
  def create
    @user = User.create!(user_params)
    if @user
      p @user
      render json: @user
    else
      render json: @user.errors
    end
  end

  def show
    authorize @user
    if @user
      render json: @user
    else
      render json: @user.errors
    end
  end

  def destroy
    @user.destroy
    render json: { message: 'User deleted!'}
  end
  
  private

    def user_params
      params.permit(:email, :password, :password_confirmation, :first_name, :last_name)
    end

    def set_user
      @user = User.find(params[:id])
    end
end
