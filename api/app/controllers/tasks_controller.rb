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
      if params['completed'] and params['completed'] == true
        @task.update(completed_when: Time.current)
      elsif params['completed'] and params['completed'] == false
        @task.update(completed_when: nil)
      elsif params['category'] and params['category'] == 'inbox'
        @task.update(area_id: nil, project_id: nil, header_id: nil, when: nil)
      elsif params['category'] and params['category'] == 'someday'
        @task.update(when: nil)
      elsif params['area_id'] and params['area_id'] != nil
        @task.update(category: nil)
      elsif params['project_id'] and params['project_id'] != nil
        @task.update(category: nil)
      elsif params['header_id'] and params['header_id'] != nil
        @task.update(category: nil)
      elsif params['when'] and params['when'] != nil
        @task.update(category: nil)
      end

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
      @task = Task.find(params[:task_id])
    rescue ActiveRecord::RecordNotFound
      render json: { errors: ["Couldn't find Task with 'id'=#{params[:task_id]}"] }, status: :not_found
    end

    def parse_dates
      if params[:when]
        params[:when] = Time.at(params[:when] / 1000)
      end
      if params[:deadline]
        params[:deadline] = Time.at(params[:deadline] / 1000)
      end
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.permit(:area_id, :project_id, :header_id, :title, :notes, :completed, :when, :deadline, :category)
    end
end
