class EventsController < ApplicationController
    before_action :set_rsvp, only: [:show, :edit, :update, :destroy]

    # POST /event
    def create
        @event = Rsvp.new(params.merge({event_id: params[:event_id]}))
        if @event.save
            render json: @event, status: :created
        else
            render json: @event.errors, status: :unprocessable_entity
        end
    end

    # GET /events
    def index
        render json: Rsvp.all
    end

    # GET /event/{id}
    def show
        render json: Event.find(params[:id])
    end

    # PUT/Patch /event/{id}
    def update
        if @event.update(params)
            head :no_content
        else
            render json: @event.errors, status: :unprocessable_entity
        end
    end

    def destroy
        if @event.destroy
            head :no_content
        else
            render json: @event.errors, status: :unprocessable_entity
        end
    end

    private
    def set_event
        @rsvp = Rsvp.find(params[:id])
    end

    def event_params
        params.require(:rsvp).permit(:response, :num_guests, :guest_name, :event_id)
    end
end
