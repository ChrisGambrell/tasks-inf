class TasksController < ApplicationController
  before_action :set_task, only: %i[ show update destroy ]
  before_action :parse_dates, only: [:create, :update]

  # GET /tasks
  def index
    @tasks = Task.all

    render json: @tasks
  end

  # GET /tasks/1
  def show
    render json: @task
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)

    if @task.save
      render json: @task, status: :created, location: @task
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { errors: ["Couldn't find Task with 'id'=#{params[:task_id]}"] }, status: :not_found
    end

    def parse_dates
      if params[:completed_when]
        params[:completed_when] = DateTime.parse(params[:completed_when])
      end
      if params[:when]
        params[:when] = DateTime.parse(params[:when])
      end
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.permit(:project_id, :header_id, :title, :notes, :completed, :completed_when, :when)
    end
end
