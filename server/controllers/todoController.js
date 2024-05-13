
import { TableService } from '../service/service.js'
export class TodoController {
    static tableName = "todos";
    static columns = 'id,title,completed';
    getTodos(req, res, next) {
        switch (Object.keys(req.query)[1]) {
            case 'completed':
                TodoController.getTodoByCompleted(req.query, res, next);
                break;
            case 'title':
                TodoController.getTodoByTitle(req.query, res, next);
                break;
            case 'sort':
                TodoController.sortTodos(req, res, next);
                break;
            default:
                TodoController.getAllTodos(req.query, res, next);
                break;
        }
    }
    static async getAllTodos(query, res, next) {
        try {
            let limit = Object.values(query).slice(1);
            const todoService = new TableService();
            const resultItems = await todoService.getAll(TodoController.tableName, query.userId, limit,"userId", TodoController.columns)
            return res.status(200).json({ status: 200, data: resultItems });
        }
        catch (ex) {

            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getTodoById(req, res, next) {
        try {

            const todoService = new TableService();
            const resultItem = await todoService.getById(TodoController.tableName, TodoController.columns, req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    static async getTodoByCompleted(query, res, next) {
        try {
            let limit = Object.values(query).slice(2);
            const todoService = new TableService();
            const resultItem = await todoService.getByValue(TodoController.tableName, query.userId, limit, "completed", query.completed, TodoController.columns);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    static async getTodoByTitle(query, res, next) {
        try {
            let limit = Object.values(query).slice(2);
            const todoService = new TableService();
            const resultItem = await todoService.getByAlphabet(TodoController.tableName, query.userId, limit, query.title, TodoController.columns);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addTodo(req, res, next) {
        try {
            const todoService = new TableService();
            const resultItem = await todoService.addObject(TodoController.tableName, req.body);
            res.status(200).json({ status: 200, data: resultItem.insertId });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async deleteTodo(req, res) {
        try {
            const todoService = new TableService();
            await todoService.deleteObject(TodoController.tableName, req.params.id);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateTodo(req, res, next) {
        try {
            const todoService = new TableService();
            await todoService.updateObject(TodoController.tableName, req.params.id, req.body);
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    static async sortTodos(req, res, next) {
        let sortedKey
        switch (req.query.sort) {
            case 'Alphabetical':
                sortedKey = 'title';
                break;
            case 'completed':
                sortedKey = "completed";
                break;
            default:
                sortedKey = 'id';

        }
        try {
            const todoService = new TableService();
            let limit = Object.values(req.query).slice(2);
            let resultItem = await todoService.sort(TodoController.tableName, req.query.userId, limit, sortedKey, 'id,title,completed');
            console.log(resultItem)
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

}

