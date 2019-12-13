require "will_paginate"

class Api::InvitesController < ApplicationController
    before_action :set_invite, only: [:show, :update, :destroy]
    before_action :set_event, only: [:index]

    # allow following to diable authentification
    #skip_before_action :verify_authenticity_token

    # POST /events/:event_id/invites
    def create
        @invite = Invite.create!(invite_params)
        if @invite.save
            render json: @invite, status: :created
        else
            render json: @invite.errors, status: :unprocessable_entity
        end
    end

    # GET /events/:event_id/invites
    # TODO: figure out the logic behind the GETs for invites(user based or invite based - check the endpoint)
    def index
        if invite_params[:user_id]
            @user = set_user
            last_modified = @user.invites.order(:updated_at).last
            if last_modified == nil
                render json: {"message": "no invite exists for the event: #{@event.id}"}, status: :ok
            else
                last_modified_str = last_modified.updated_at.utc.to_s(:number)

                cache_key = "user_invites/#{invite_params[:user_id]}/#{@event.id}/#{invite_params[:offset]}/#{last_modified_str}"
                all_invites = Rails.cache.fetch(cache_key) do
                    Rails.logger.info "{CACHE MISS FOR INVITE} - USER_ID: #{invite_params[:user_id]} EVENT_ID: #{@event.id}"
                    @user.invites.order("updated_at DESC").paginate(:page => invite_params[:offset], :per_page => 10)
                end
            end

        else
            last_modified = @event.invites.order(:updated_at).last
            last_modified_str = last_modified.updated_at.utc.to_s(:number)

            cache_key = "all_invites/#{@event.id}/#{invite_params[:offset]}/#{last_modified_str}"
            all_invites = Rails.cache.fetch(cache_key) do
                Rails.logger.info "{CACHE MISS FOR ALL INVITES} - EVENT_ID: #{@event.id}"
                @event.invites.order("updated_at DESC").paginate(:page => invite_params[:offset], :per_page => 10)
            end
        end
        render json: all_invites
    end

    # GET /invites/{id}
    def show
        if @invite
            render json: @invite
        else
            render json: @invite.errors
        end
    end

    # PUT/Patch /invites/{id}
    def update
        if @invite.update(invite_params)
            head :no_content
        else
            render json: @invite.errors, status: :unprocessable_entity
        end
    end

    # DELETE /invites/{id}
    def destroy
        if @invite.destroy
            head :no_content
        else
            render json: @invite.errors, status: :unprocessable_entity
        end
    end

    private

    def set_event
        @event = Rails.cache.fetch("CACHE_KEY_EVENT:#{params[:event_id]}", expires_in: 1.hour) do
            Rails.logger.info "{INVITE CACHE NOT FOUND} - EVENT_ID: #{params[:id]}"
            Event.find(params[:event_id])
        end
    end

    def set_user
        @user = Rails.cache.fetch("CACHE_KEY_USER:#{params[:user_id]}", expires_in: 1.hour) do
            User.find(params[:user_id])
        end
    end

    def set_invite
        @invite = Rails.cache.fetch("CACHE_KEY_INVITE:#{params[:id]}", expires_in: 1.hour) do
            Invite.find(params[:id])
        end
    end

    def invite_params
        # params needed for create a invite
        params.permit(:id, :offset, :event_id, :guest_email, :user_id, :message)
    end

end
