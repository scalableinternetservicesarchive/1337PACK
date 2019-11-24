class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  # skip_before_action :verify_authenticity_token

  def index
    @users = User.order :last_name, :first_name
    render json: @users
  end

  def create
    @user = User.create!(user_params)
    if @user
      render json: @user
    else
      render json: @user.errors
    end
  end

  def show
    if @user
      render json: @user
    else
      render json: @user.errors
    end
  end

  def update
    authorize @user
    if @user.update(user_params)
      render json: { message: 'User updated!'}
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destory
    authorize @user
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
