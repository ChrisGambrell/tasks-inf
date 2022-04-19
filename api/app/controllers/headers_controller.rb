class HeadersController < ApplicationController
  before_action :set_header, only: %i[ show update destroy ]

  # GET /headers
  def index
    @headers = Header.all

    render json: @headers
  end

  # GET /headers/1
  def show
    render json: @header
  end

  # POST /headers
  def create
    @header = Header.new(header_params)

    if @header.save
      render json: @header, status: :created, location: @header
    else
      render json: { errors: @header.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /headers/1
  def update
    if @header.update(header_params)
      if params['completed'] and params['completed'] == true
        @header.update(completed_when: Time.current)
      elsif params['completed'] and params['completed'] == false
        @header.update(completed_when: nil)
      end

      render json: @header
    else
      render json: { errors: @header.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /headers/1
  def destroy
    @header.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_header
      @header = Header.find(params[:header_id])
    rescue ActiveRecord::RecordNotFound
      render json: { errors: ["Couldn't find Header with 'id'=#{params[:header_id]}"] }, status: :not_found
    end

    # Only allow a list of trusted parameters through.
    def header_params
      params.permit(:project_id, :title, :completed)
    end
end
