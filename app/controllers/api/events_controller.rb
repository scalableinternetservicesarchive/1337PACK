class Api::EventsController < ApplicationController
    before_action :set_event, only: [:show, :edit, :update, :destroy]
    # TODO: Remove this check
    skip_before_action :verify_authenticity_token

    # POST /events
    def create
        @event = Event.new(event_params.merge({user_id: event_params[:user_id]}))
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
        if event_params[:user_id]
            @user = set_user
            last_modified = @user.events.order(:updated_at).last
            last_modified_str = last_modified.updated_at.utc.to_s(:number)

            cache_key = "all_events/user:#{event_params[:user_id]}/#{last_modified_str}"
            all_events = Rails.cache.fetch(cache_key) do
                p "cache miss for GET all events of user: #{params[:user_id]}"
                @user.events
            end

        else
            last_modified = Event.order(:updated_at).last
            last_modified_str = last_modified.updated_at.utc.to_s(:number)
            
            cache_key = "all_events/#{last_modified_str}"
            all_events = Rails.cache.fetch(cache_key) do
                p "cache miss for GET ALL events"
                Event.order("updated_at DESC")
            end
        end
        render json: all_events
    end

    # GET /event/{id}
    def show
        if @event
            render json: @event
        else
            render json: @event.errors
        end
    end

    # PUT/Patch /event/{id}
    def update
        if @event.update(event_params)
            render json: @event
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

    def set_user
        @user = Rails.cache.fetch("CACHE_KEY_USER:#{params[:user_id]}", expires_in: 1.hour) do
            User.find(params[:user_id])
        end
    end

    def set_event
        @event = Rails.cache.fetch("CACHE_KEY_EVENT:#{params[:id]}", expires_in: 1.hour) do
            p "EVENT CACHE MISS"
            Event.find(params[:id])
        end
    end

    def event_params
        params.permit(:host_name, :user_id, :location_name, :street_address, :start_time, :end_time, :title, :description, :id)
    end
end
