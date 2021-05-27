export interface Archive{
    id: number;
    folderNo : string;
    name : string;
    archiveType : string;
    selfRow: number;
    shelfColumn:number
    letterId:number;

}

export interface SendTo{
    email_ID : string;
    letter_ID : string;
    org_ID : string;
    department_ID: string;
    stracture_Role_ID:string
    cc:string;

}

export interface ArchiveTypeForm
{
    nameType:string;
    description:string;
    room:string;
    site:String;
    blockFloor :number;
    shelfNo:number

}

export interface ArchiveType
{
    id:number
    nameType:string;
    description:string;
    room:string;
    site:String;
    blockFloor :number;
    shelfNo:number

}



