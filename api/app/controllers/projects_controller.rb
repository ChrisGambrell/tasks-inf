class ProjectsController < ApplicationController
  before_action :set_project, only: %i[ show update destroy ]
  before_action :parse_dates, only: [:create, :update]

  # GET /projects
  def index
    @projects = Project.all

    render json: @projects
  end

  # GET /projects/1
  def show
    render json: @project
  end

  # POST /projects
  def create
    @project = Project.new(project_params)

    if @project.save
      render json: @project, status: :created, location: @project
    else
      render json: { errors: @project.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /projects/1
  def update
    if @project.update(project_params)
      render json: @project
    else
      render json: { errors: @project.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:project_id])
    rescue ActiveRecord::RecordNotFound
      render json: { errors: ["Couldn't find Project with 'id'=#{params[:project_id]}"] }, status: :not_found
    end

    def parse_dates
      if params[:deadline]
        params[:deadline] = Time.at(params[:deadline] / 1000)
      end
      if params[:when]
        params[:when] = Time.at(params[:when] / 1000)
      end
    end

    # Only allow a list of trusted parameters through.
    def project_params
      params.permit(:area_id, :title, :description, :icon, :when, :deadline)
    end
end
