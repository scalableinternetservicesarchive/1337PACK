require 'will_paginate'

class Api::UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]
    #skip_before_action :verify_authenticity_token


    def index
        last_modified = User.order(:updated_at).last
        if last_modified == nil
            render json: {"message": "no user exists"}, status: :ok
        else
            last_modified_str = last_modified.updated_at.utc.to_s(:number)

            cache_key = "all_users/#{user_params[:offset]}/#{last_modified_str}"
            all_users = Rails.cache.fetch(cache_key) do
                Rails.logger.info '{CACHE MISS FOR ALL USERS}'
                User.order(:last_name, :first_name).paginate(:page => user_params[:offset], :per_page => 10)
            end
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
            render json: {message: 'User updated!'}
        else
            Rails.logger.info(@user.errors.inspect)
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    def destroy
        authorize @user
        @user.destroy
        render json: {message: 'User deleted!'}
    end

    private

    def user_params
        params.permit(:offset, :email, :password, :password_confirmation, :first_name, :last_name)
    end

    def set_user
        @user = User.find(params[:id])
    end
end
