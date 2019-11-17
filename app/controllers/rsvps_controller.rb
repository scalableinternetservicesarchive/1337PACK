class RsvpsController < ApplicationController
    before_action :set_rsvp, only: [:show, :edit, :update, :destroy]
    # TODO: Remove this check
    skip_before_action :verify_authenticity_token

    # POST /rsvps
    def create
        @rsvp = Rsvp.new(rsvp_params.merge({event_id: rsvp_params[:event_id], user_id: rsvp_params[:user_id]}))
        if @rsvp.save
            render json: @rsvp, status: :created
        else
            render json: @rsvp.errors, status: :unprocessable_entity
        end
    end

    # GET /rsvps
    def index
        render json: Rsvp.where(user_id: rsvp_params['user_id'])
    end

    # GET /rsvps/{id}
    def show
        render json: Rsvp.find(rsvp_params[:id])
    end

    # PUT/Patch /rsvps/{id}
    def update
        if @rsvp.update(rsvp_params)
            head :no_content
        else
            render json: @rsvp.errors, status: :unprocessable_entity
        end
    end

    def destroy
        if @rsvp.destroy
            head :no_content
        else
            render json: @rsvp.errors, status: :unprocessable_entity
        end
    end

    private
    def set_rsvp
        @rsvp = Rsvp.find(params[:id])
    end

    def rsvp_params
        params.permit(:response, :num_guests, :guest_name, :event_id, :user_id)
    end
end
