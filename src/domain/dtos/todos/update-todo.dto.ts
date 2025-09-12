
export class UpdateTodoDto {
    private constructor(// privado para que no se pasen los datos por la clase, si no por el metodo
        public readonly id: number,
        public readonly text?: string,
        public readonly date?:Date
    ){}

    get values() {// Solo actualiza los valores que nos ande la request
        const returnObj: {[key: string]: any} = {};
        if(this.text) returnObj.text = this.text;
        if(this.date) returnObj.date = this.date;
        return returnObj;
    }

    static create(props: {[key: string]: any}):[string?,UpdateTodoDto?]{// se regresa el mensaje de si salio bien o mal y la instancia  de la clase(el text verificado)
        const {id,text, date} = props;
        let newDate = date;
        if(!id || isNaN(Number(id))){
            return ['id must be a valid number']
        }
        if(date){
            newDate = new Date(date)
            if(newDate.toString() === 'Invalid Date'){
                return ['Date must be a valid date']
            }
        }
        return [undefined, new UpdateTodoDto(id,text, newDate)];
    }

}