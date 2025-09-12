import { Router } from "express";
import { TodoController } from "./todo-controller";
import { TodoDataSourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { TodoReposotoryImpl } from "../../infrastructure/repositories/todo.reposotiry.impl";

export class TodoRoutes {

    static get routes(): Router{
        const router = Router();
        const datasource = new TodoDataSourceImpl();
        const todoRepository = new TodoReposotoryImpl(datasource);

        const todoController = new TodoController(todoRepository);
        router.get(`/`,todoController.getTodos);
        router.get('/:id',todoController.getTodoById);
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updatedTodo);
        router.delete('/:id', todoController.deleteTodo);
        return router;
    }
}

