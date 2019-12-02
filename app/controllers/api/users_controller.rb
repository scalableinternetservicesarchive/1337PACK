class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  skip_before_action :verify_authenticity_token


  def index
    last_modified = User.order(:updated_at).last
    last_modified_str = last_modified.updated_at.utc.to_s(:number)

    cache_key = "all_users/#{last_modified_str}"
    all_users = Rails.cache.fetch(cache_key) do
        p "cache miss for GET all users"
        User.order :last_name, :first_name
    end

    render json: all_users
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
    if @user.update_attributes(user_params)
      render json: { message: 'User updated!'}
    else
      Rails.logger.info(@user.errors.inspect)
      render json: @user.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
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
