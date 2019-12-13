require 'will_paginate'

class Api::RsvpsController < ApplicationController
    before_action :set_rsvp, only: [:show, :update, :destroy]
    before_action :set_event, only: [:index]

    # TODO: Remove this check
    #skip_before_action :verify_authenticity_token

    # POST /events/:event_id/rsvps
    def create
        begin
        @rsvp = Rsvp.create!(rsvp_params)
        if @rsvp.save
            render json: @rsvp, status: :created
        else
            render json: @rsvp.errors, status: :unprocessable_entity
        end
        rescue ActiveRecord::RecordInvalid => invalid
            render json: invalid.record.errors, status: :conflict
        end
    end

    # GET /events/{:id}/rsvps/
    def index
        if rsvp_params[:user_id]
            @user = set_user
            last_modified = @user.rsvps.order(:updated_at).last
            if last_modified == nil
              all_rsvps = []
            else
                last_modified_str = last_modified.updated_at.utc.to_s(:number)

                cache_key = "all_rsvps/user:#{rsvp_params[:user_id]}/event:#{@event.id}/#{rsvp_params[:offset]}/#{last_modified_str}"
                all_rsvps = Rails.cache.fetch(cache_key) do
                    Rails.logger.info "{CACHE MISS FOR ALL RSVPs} - USER_ID: #{rsvp_params[:user_id]}  EVENT_ID:#{@event.id} "
                    @user.rsvps.order("updated_at DESC").paginate(:page=>rsvp_params[:offset], :per_page=>10)
                end
            end
        else
            last_modified = @event.rsvps.order(:updated_at).last
            if last_modified == nil
              all_rsvps = []
            else
              last_modified_str = last_modified.updated_at.utc.to_s(:number)
            
              cache_key = "all_rsvps/#{@event.id}/#{rsvp_params[:offset]}/#{last_modified_str}"
              all_rsvps = Rails.cache.fetch(cache_key) do
                Rails.logger.info "{CACHE MISS FOR RSVPs} - EVENT_ID: #{@event.id}"
                @event.rsvps.order("updated_at DESC").paginate(:page=>rsvp_params[:offset], :per_page=>10)
              end
            end
        end
        render json: all_rsvps
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
        @rsvp = Rails.cache.fetch("CACHE_KEY_RSVP:#{params[:id]}", expires_in: 1.hour) do
          Rsvp.find(params[:id])
        end
    end

    def set_event
        @event = Rails.cache.fetch("CACHE_KEY_EVENT:#{params[:event_id]}", expires_in: 1.hour) do
            Rails.logger.info "{CACHE MISS FOR EVENT} - EVENT_ID: #{params[:event_id]}"
            Event.find(params[:event_id])

        end
    end

    def set_user
        @user = Rails.cache.fetch("CACHE_KEY_USER:#{params[:user_id]}", expires_in: 1.hour) do
            User.find(params[:user_id])
        end
    end
    
    def rsvp_params
        params.permit(:offset, :response, :num_guests, :guest_name, :event_id, :user_id)
    end
end
