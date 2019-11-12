class InvitesController < ApplicationController
    # do :set_comment function only just before show, edit ... actions
    before_action :set_invites, only: [:show, :edit, :update, :destroy]
    # allow following to diable authentification
    skip_before_action :verify_authenticity_token

    # POST /invites
    def create
        @invite = Invites.new(invite_params)
        if @invite.save
            render json: @invite, status: :created
        else
            render json: @invite.errors, status: :unprocessable_entity
        end
    end

    # GET /invites
    def index
        render json: Invites.all
    end

    # GET /invites/{id}
    def show
        render json: Invites.find(invite_params[:id])
    end

    # PUT/Patch /invites/{id}
    def update
        if @invite.update(invite_params)
            head :no_content
        else
            render json: @invite.errors, status: :unprocessable_entity
        end
    end

    # DELETE /comment/{id}
    def destroy
        if @invite.destroy
            nvite.where(parent_id: commen
            head :no_content
        else
            render json: @invite.errors, status: :unprocessable_entity
        end
    end

    private
        def set_invite
            @invite = Invites.find(invite_params[:id])
        end

        def invite_params
            # params needed for create a comment
            params.permit(:id, :event_id, :guest_email, :message)
        end
end
