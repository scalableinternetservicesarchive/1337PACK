class EventsController < ApplicationController
    before_action :set_event, only: [:show, :edit, :update, :destroy]

    # POST /event
    def create
        @event = Event.new(params.merge({user_id: current_user.id}))
        if @event.save
            render json: @event, status: :created
        else
            render json: @event.errors, status: :unprocessable_entity
        end
    end

    # GET /events
    def index
        render json: Event.all
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
            @event = Event.find(params[:id])
        end

        def event_params
            params.require(:event).permit(:host_name, :location_name, :street_address, :start_time, :end_time, :title, :description)
        end
end