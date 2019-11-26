class Api::RsvpsController < ApplicationController
    before_action :set_rsvp, only: [:show, :update, :destroy]
    before_action :set_event, only: [:index, :create]

    # TODO: Remove this check
    skip_before_action :verify_authenticity_token

    # POST /events/:event_id/rsvps
    def create
        @rsvp = @event.rsvps.build(rsvp_params)
        if @rsvp.save
            render json: @rsvp, status: :created
        else
            render json: @rsvp.errors, status: :unprocessable_entity
        end
    end

    # GET /rsvps/index
    def index
        if rsvp_params[:user_id]
            @user = set_user
            render json: @user.rsvps
        else
            render json: @event.rsvps
        end
    end

    # GET /rsvps/{id}
    def show
        if @rsvp
            render json: @rsvp
        else
            render json: @rsvp.errors
        end
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

    def set_event
        @event = Event.find(params[:event_id])
    end

    def set_user
        @user = User.find(params[:user_id])
    end
    
    def rsvp_params
        params.permit(:response, :num_guests, :guest_name, :event_id, :user_id)
    end
end