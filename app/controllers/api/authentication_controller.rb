class Api::AuthenticationController < ApplicationController
  skip_before_action :verify_authenticity_token

  def login
    @user = User.find_by(email: params[:email].downcase)
    if @user && @user.authenticate(params[:password])
      # create and return jwt
      token = JsonWebToken.encode(user_id: @user.id)
      render json: {
               token: token,
               first_name: @user.first_name,
               last_name: @user.last_name,
               uid: @user.id,
             }
    else
      # login error
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end
end
