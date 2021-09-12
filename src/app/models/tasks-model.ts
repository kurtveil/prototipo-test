export class Task{
    constructor(
        public  id = '',
        public createdAt = new Date(),
        public state = false,
        public title = '' 
    ){}
}