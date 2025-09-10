import { Request, Response } from "express"
import { prisma } from "../../data/postgres"


const todos = [
    {id: 1, text:'Buy milk',date: new Date()},
    {id: 2, text:'Buy water',date: null},
    {id: 3, text:'Buy butter',date: new Date()},
]

export class TodoController {

    constructor(){};

    public getTodos = (req: Request,res: Response)=>{
        return res.json(todos)
    }
    public getTodoById = (req: Request, res: Response) =>{
        const id = +req.params.id; // El + es para convertir el id de la request en un numero
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'})
        const todo = todos.find(todo => todo.id === id);
        (todo) 
            ? res.json(todo)
            : res.status(404).json({error: `Todo with id ${id} not found`})
    }

    public createTodo = async(req: Request, res: Response) =>{
        const { text } = req.body;
        if(!text) return res.status(400).json({error: 'Text property is required'});

        const todo = await prisma.todo.create({
            data: {text: text}
        })
        const newTodo = {
            id: todos.length + 1,
            text: text,
            date: null
        };
        
        todos.push(newTodo);
        res.json(newTodo);
    }

    public updatedTodo = (req: Request, res: Response) => {
        const id = +req.params.id; // El + es para convertir el id de la request en un numero
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});
        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(400).json({error: `Todo with id ${id} not found`});
        const {text, date} = req.body;

        todo.text = text || todo.text;// Esta pasando por referencia // tod.text se actualizara solo si viene el text
        (date === 'null')
            ? todo.date = null
            : todo.date = new Date(date || todo.date)

        
        res.json(todo);
        
    }

    public deleteTodo = (req: Request, res: Response)=>{
         const id = +req.params.id; // El + es para convertir el id de la request en un numero
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});
        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(400).json({error: `Todo with id ${id} not found`});
        todos.splice(todos.indexOf(todo),1);

        
        res.json(todo);
    }
}
    
