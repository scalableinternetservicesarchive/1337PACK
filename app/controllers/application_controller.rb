class ApplicationController < ActionController::Base
  include Pundit
  protect_from_forgery
  
  def current_user
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      @current_user = nil
    rescue JWT::DecodeError => e
      @current_user = nil
    end
  end
end
