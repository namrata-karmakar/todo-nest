import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todos } from './todos.entity';

@Injectable()
export class TodosService {
  @InjectRepository(Todos)
  private todosRepository: Repository<Todos>;

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todos> {
    try {
      console.log('createTodoDto service', createTodoDto);
      return this.todosRepository.save({
        description: createTodoDto.description,
        status: createTodoDto.status,
      });
    } catch (error) {
      throw error;
    }
  }

  async getTodosByUserId() {
    try {
    } catch (error) {
      throw error;
    }
  }

  async getTodoById(id: number): Promise<Todos> {
    try {
      const todo = this.todosRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!todo) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }
      return todo;
    } catch (error) {
      throw error;
    }
  }

  async updateTodoById(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<UpdateResult> {
    try {
      return this.todosRepository
        .createQueryBuilder()
        .update(Todos)
        .set({
          description: updateTodoDto.description,
          status: updateTodoDto.status,
        })
        .where('id=:id', { id })
        .execute();
    } catch (error) {
      throw error;
    }
  }

  async deleteTodoById(id: number): Promise<DeleteResult> {
    try {
      return this.todosRepository.delete({ id });
    } catch (error) {
      throw error;
    }
  }
}
