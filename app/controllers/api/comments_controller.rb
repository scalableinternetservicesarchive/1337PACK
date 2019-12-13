require "will_paginate"

class Api::CommentsController < ApplicationController
    # do :set_comment function only just before show, edit ... actions
    before_action :set_event, only: [:index]
    before_action :set_comment, only: [:show, :update, :destroy]

    # allow following to diable authentification
    #skip_before_action :verify_authenticity_token

    # POST /events/:event_id/comments
    def create
        @comment = Comment.create!(comment_params)
        if @comment.save
            render json: @comment, status: :created
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    # GET /events/:event_id/comments
    def index
        if @event
            last_modified = @event.comments.order(:updated_at).last
            if last_modified == nil
                render json: [], status: :ok
            else
            last_modified_str = last_modified.updated_at.utc.to_s(:number)

            cache_key = "comments/#{comment_params[:offset]}/#{last_modified_str}"
            all_comments = Rails.cache.fetch(cache_key) do
                Rails.logger.info "{CACHE MISS FOR ALL COMMENTS} - EVENT_ID: #{@event.id}"
                Comment.order("updated_at DESC").paginate(:page=>comment_params[:offset], :per_page=>10)
            end
            render json: all_comments
            end
        else
            render json: @comment.errors
        end
    end

    # GET /comment/:id
    def show
        if @comment
            render json: @comment
        else
            render json: @comment.errors
        end
    end

    # update content if failed show error message
    # PUT/Patch /comments/{id}
    def update
        if @comment.update(comment_params)
            render json: @comment
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    # DELETE /comments/{id}
    def destroy
        if @comment.destroy
            head :no_content
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    private
        def set_event
            @event = Rails.cache.fetch("CACHE_KEY_EVENT:#{params[:event_id]}", expires_in: 1.hour) do
                Rails.logger.info "{COMMENT CACHE NOT FOUND} - EVENT_ID: #{params[:event_id]}"
                Event.find(params[:event_id])
            end
        end

        def set_comment
            @comment = Rails.cache.fetch("CACHE_KEY_COMMENT:#{params[:id]}", expires_in: 1.hour) do
              Comment.find(params[:id])
            end
        end

        def comment_params
            # params needed for create a comment
            params.permit(:id, :offset, :event_id, :user_id, :user_name, :content, :parent_id)
        end
end
