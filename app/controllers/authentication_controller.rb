class AuthenticationController < ApplicationController
  def login
    @user = User.find_by(email: params[:user][:email].downcase)
    if @user && @user.authenticate(params[:user][:password])
      # create and return jwt
      token = JsonWebToken.encode(user_id: @user.id)
      render json: {
               token: token,
               first_name: @user.first_name,
               last_name: @user.last_name
             }
    else
      # login error
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end
end
