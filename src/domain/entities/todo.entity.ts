
export class TodoEntity {
    constructor(
        public id: number,
        public text: string,
        public date?: Date | null
    ){}

    get isCompleted(){
        return !!this.date;// Si tiene un valor va a ser true
    }
    public static fromObject(object: {[key: string]:any}): TodoEntity{
        const {id, text, date} = object;
        if(!id) throw 'Id is required';
        if(!text) throw 'text is required';
        let newDate;
        if(date){
            newDate = new Date(date);
            if(isNaN(newDate.getTime())){
                throw 'date is not a valid date'
            }
        }
        return new TodoEntity(id,text,date);
    }
}

