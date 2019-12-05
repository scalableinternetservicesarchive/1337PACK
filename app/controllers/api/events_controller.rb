require 'will_paginate'

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
            render json: @user.events.paginate(:page=>event_params[:offset],:per_page=>100)
        else
            render json: Event.order("updated_at DESC").paginate(:page=>event_params[:offset], :per_page=>100)
        end
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
            @user = User.find(params[:user_id])
        end

        def set_event
            @event = Event.find(params[:id])
        end

        def event_params
            params.permit(:host_name, :offset, :user_id, :location_name, :street_address, :start_time, :end_time, :title, :description, :id)
        end
end
