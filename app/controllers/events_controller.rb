class EventsController < ApplicationController
    before_action :set_event, only: [:show, :edit, :update, :destroy]
    # TODO: Remove this check
    skip_before_action :verify_authenticity_token

    # POST /event
    def create
        # TODO: Take the user id from the current logged in user
        @event = Event.new(event_params.merge({user_id: event_params[:user_id
        ]}))
        if @event.save
            render json: @event, status: :created
        else
            render json: @event.errors, status: :unprocessable_entity
        end
    end

    # GET /events
    # get list of events which were recently created(top 10 events)
    # to get list of events of the LOGGED in user, look out for the user_id parameter in the API call
    def index
        # if the user_id is passed, return the events of that particular user
        if event_params[:user_id]
            render json: Event.where(user_id: event_params[:user_id])
        else
            # return 10 last recently created events
            render json: Event.order("updated_at DESC").limit(10)
        end
        render json: Event.all
    end

    # GET /event/{id}
    def show
        render json: Event.find(event_params[:id])
    end

    # PUT/Patch /event/{id}
    def update
        if @event.update(event_params)
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
            @event = Event.find(event_params[:id])
        end

        def event_params
            params.permit(:host_name, :user_id, :location_name, :street_address, :start_time, :end_time, :title, :description)
        end
end