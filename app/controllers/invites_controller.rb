class InvitesController < ApplicationController
    before_action :set_invites, only: [:show, :edit, :update, :destroy]
    # allow following to diable authentification
    skip_before_action :verify_authenticity_token

    # POST /invites
    def create
        @invite = Invite.new(invite_params)
        if @invite.save
            render json: @invite, status: :created
        else
            render json: @invite.errors, status: :unprocessable_entity
        end
    end

    # GET /invites
    def index
        if invite_params.keys?('event_id')
            to_render = Invite.where(event_id: invite_params[:event_id]).order("updated_at DESC")
        elsif invite_params.keys?('user_id')
            to_render = Invite.where(user_id: invite_params[:user_id]).order("updated_at DESC")
        else
            to_render = Invite.all
        end
        render json: to_render
        end
    end


    # GET /invites/{id}
    def show
        render json: Invite.find(invite_params[:id])
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

    def set_invite
        @invite = Invite.find(invite_params[:id])
    end

    def invite_params
        # params needed for create a invite
        params.permit(:id, :event_id, :guest_email, :user_id, :message)
    end

end
