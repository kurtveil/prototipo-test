export class Task{
    constructor(
        public createdAt = new Date().setUTCSeconds(1234567890),
        public state = false,
        public title = '', 
        public  id = '',
    ){}
}