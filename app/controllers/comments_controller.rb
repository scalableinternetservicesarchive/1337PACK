class CommentsController < ApplicationController
    before_action :set_comment, only: [:show, :edit, :update, :destroy]

    # POST /comment
    def create
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
            params.require(:comment).permit(:id, :event_id, :user_id, :content, :create_time, :last_edit_time)
        end
end
