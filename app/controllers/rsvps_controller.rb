class RsvpsController < ApplicationController
    before_action :set_rsvp, only: [:show, :edit, :update, :destroy]

    # POST /rsvp
    def create
        @rsvp = Rsvp.new(rsvp_params.merge({user_id: current_user.id, event_id: rsvp_params[:event_id]}))
        if @rsvp.save
            render json: @rsvp, status: :created
        else
            render json: @rsvp.errors, status: :unprocessable_entity
        end
    end

    # GET /rsvp
    def index
        render json: Rsvp.all
    end

    # GET /rsvp/{id}
    def show
        render json: Rsvp.find(rsvp_params[:id])
    end

    # PUT/Patch /rsvp/{id}
    def update
        if @event.update(rsvp_params)
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
        params.require(:rsvp).permit(:response, :num_guests, :guest_name, :event_id, :guest_id)
    end
end
