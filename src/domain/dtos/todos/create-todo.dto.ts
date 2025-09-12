// Los dtos nos permiten pasar las request a una clase como esta que permite validar las request
export class CreateTodoDto {
    private constructor(// privado para que no se pasen los datos por la clase, si no por el metodo
        public readonly text: string
    ){}

    static create(props: {[key: string]: any}):[string?,CreateTodoDto?]{// se regresa el mensaje de si salio bien o mal y la instancia  de la clase(el text verificado)
        const {text} = props;
        if(!text) return ['Text property is required', undefined]
        
        return [undefined,new CreateTodoDto(text)];
    }
}

