class CommentsController < ApplicationController
    # do :set_comment function only just before show, edit ... actions
    before_action :set_comment, only: [:show, :edit, :update, :destroy]
    # allow following to diable authentification
    skip_before_action :verify_authenticity_token

    # POST /comment
    def create
        # require user_id, event_id
        @comment = Comment.new(params.merge({user_id: current_user.id}))
        if @comment.save
            render json: @comment, status: :created
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    # GET /comments
    def index
        render json: comment.all
    end

    # GET /comment/{id}
    def show
        render json: comment.find(params[:id])
    end

    # update content if failed show error message
    # PUT/Patch /comment/{id}
    def update
        if @comment.update(params)
            head :no_content
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    def destroy
        if @comment.destroy
            head :no_content
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    private
        def set_comment
            @comment = Comment.find(params[:id])
        end

        def comment_params
            # params needed for create a comment
            params.require(:comment).permit(:id, :event_id, :user_id, :user_name, :content, :create_at, :last_update_at)
        end
end
