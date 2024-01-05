export class money{
    description:string = "";
    value:number = 0;
    operator:string;

    constructor(desc:string,val:number, operator:string){
        this.description = desc;
        this.value  = val
        this.operator =operator
    }

}