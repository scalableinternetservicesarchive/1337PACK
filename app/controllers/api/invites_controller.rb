require 'will_paginate'

class Api::InvitesController < ApplicationController
    before_action :set_invite, only: [:show, :update, :destroy]
    before_action :set_event, only: [:index]

    # allow following to diable authentification
    skip_before_action :verify_authenticity_token

    # POST /events/:event_id/invites
    def create
        @invite = Invite.create!(invite_params)
        if @invite.save
            render json: @invite, status: :created
        else
            render json: @invite.errors, status: :unprocessable_entity
        end
    end

    # GET /invites
    def index
        if params[:user_id]
            @user = set_user
            render json: @user.invites.order("updated_at DESC").paginate(:page=>invite_params[:offset], :per_page=>100)
        else
            render json: @event.invites.paginate(:page=>invite_params[:offset], :per_page=>100)
        end
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
        @event = Event.find(params[:event_id])
    end

    def set_user
        @user = User.find(params[:user_id])
    end

    def set_invite
        @invite = Invite.find(params[:id])
    end

    def invite_params
        # params needed for create a invite
        params.permit(:id, :offset, :event_id, :guest_email, :user_id, :message)
    end

end
