

import { TableService } from '../service/service.js'

export class PostController {
    static tableName = "posts"
    static columns='id,title,body'
    getPosts(req, res, next) {
        if (Object.keys(req.query)[1] == "title") {
            PostController.getPostByTitle(req.query, res, next);
        }
        else {
            PostController.getAllPosts(req.query, res, next);
        }
    }

  static async getAllPosts(query, res, next) {
    try {
        let limit = Object.values(query).slice(1)
        const postService = new TableService();
        const resultItems = await postService.getAll(PostController.tableName,query.userId, limit,"userId",PostController.columns )
        return res.status(200).json({ status: 200, data: resultItems });
    }
    catch (ex) {
        const err = {}
        err.statusCode = 500;
        err.message = ex;
        next(err)
    }
}

static async getPostByTitle(query, res, next) {
    try {
        let limit = Object.values(query).slice(2);
        const postService = new TableService();
        const resultItem = await postService.getByAlphabet(PostController.tableName, query.userId, limit, query.title, PostController.columns);
        res.status(200).json({ status: 200, data: resultItem });
    }
    catch (ex) {
        const err = {}
        err.statusCode = 500;
        err.message = ex;
        next(err)
    }
}
    async getPostById(req, res, next) {
    try {
        const postsService = new TableService();
        const resultItem = await postsService.getById(PostController.tableName,PostController.columns, req.params.id);
        res.status(200).json({ status: 200, data: resultItem });
    }
    catch (ex) {
        const err = {}
        err.statusCode = 500;
        err.message = ex;
        next(err)
    }
}


    async addPost(req, res, next) {
    try {
        const postService = new TableService();
        const resultItem = await postService.addObject(PostController.tableName, req.body);
        res.status(200).json({ status: 200, data: resultItem.insertId });
    }
    catch (ex) {
        const err = {}
        err.statusCode = 500;
        err.message = ex;
        next(err)
    }
}


    async deletePost(req, res, next) {
    try {
        const postsService = new TableService();
        await postsService.deleteObject(PostController.tableName, req.params.id);
        res.status(200).json({ status: 200, data: req.params.id });
    }
    catch (ex) {
        const err = {}
        err.statusCode = 500;
        err.message = ex;
        next(err)
    }
}

    async updatePost(req, res, next) {
        try {
            const postService = new TableService();
            await postService.updateObject(PostController.tableName, req.params.id, req.body);
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
}




}