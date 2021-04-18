export class Users {
    static data: Array<string> = ['admin', 'observer1', 'observer2', 'observer3', 'observer4'];
    static password: string ='p123';
}

export class TypeOfFormers {
    static data: Array<string> = ['UGFT', 'UGPT', 'GPT', 'GSFTT', 'MGPT', 'LGPT', 'MGFT', 'LGFT', 'STD', 'STC'];
}

export class Factory {
    static data: Array<string> = ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08', 'F09', 'F10',
        'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20',
        'F21', 'F22', 'F23', 'F24', 'F25', 'F26', 'F27', 'F28', 'F29', 'F30',
        'F31', 'F32', 'F33', 'F34', 'F35', 'F36', 'F37', 'F38', 'F39', 'F40',
        'F41', 'F42', 'F43', 'F44', 'F45', 'F46', 'F47', 'F48'];
}

export class FiringOrRework {
    static data: Array<string> = ['Firing 1', 'Rework 1', 'Rework 2', 'Rework 3'];
}

export class Size {
    static data: Array<string> = ['XS', 'S', 'M', 'L', 'L1', 'XL', 'XL2'];
}

export class Defetcs {
    static data: Array<string> = ['PinHole', 'SPM', 'FB', 'FR', 'GC', 'BS', 'Crackline', 'others'];
}



export class Observers{
    static category: Array<string>= ['All','Unsafe Act', 'Unsafe Condition', 'Positve Observation',
     'At risk behavior', 'Others'];
    static activityType: Array<string> = ['All',
        'PPE/Safety helmet', 'PPE/Safely glass', 'PPE/Respiratory protection',
        'PPE/Coverall', 'PPE/Safety shoe', 'PPE/Ear plug', 'PPE/Fullbody harness', 
        'PPE/Gloves', 'Housekeeping', 'Working at Height',
        'Scaffolding', 'Work Permit', 'HIRA/JSA',
         'Access and agrees', 'Electrical Hazard ', 'Lifting & Rigging' , 
         'Slip/Trip/fall Hazard', 'Position of People', 'Tools & Equipment',
        'Traffic Management', 'Driving Safety', 'Emergency Evacuation', 
        'Employee Welfare', 'Environmental Issue', 'Falling Object', 
        'Fire Hazard ', 'Safety Signs', 'Compressed gas cylinders', 'Painting',
        'Coating', 'Others'];
    static status:Array<string> =['Open','Inprogress','Closed']
    static projectList=["All","College","School","IT park", "Mall","Theater"];
    static observationInitialList:any=[];
    // =[
    //     {assignee:'admin',category:'Unsafe Act', activity:'PPE/Safety helmet', status:'Open', observerId:"Observation 1", dueDate:new Date().toISOString()},
    //     {assignee:'observer1',category:'Unsafe Condition', activity:'PPE/Safely glass', status:'Inprogress', observerId:"Observation 2", dueDate:new Date().toISOString()},
    //     {assignee:'observer2',category:'Positve Observation', activity:'PPE/Respiratory protection', status:'Open', observerId:"Observation 3", dueDate:new Date().toISOString()},
    //     {assignee:'admin',category:'At risk behavior', activity:'Housekeeping', status:'Closed', observerId:"Observation 4", dueDate:new Date().toISOString()},
    //     {assignee:'admin',category:'Others', activity:'HIRA/JSA', status:'Open', observerId:"Observation 5", dueDate:new Date().toISOString()},
    //     {assignee:'observer1',category:'Unsafe Act', activity:'Environmental Issue', status:'Inprogress', observerId:"Observation 6", dueDate:new Date("2021-04-01").toISOString()},
    //     {assignee:'observer2',category:'Unsafe Act', activity:'Compressed gas cylinders', status:'Open', observerId:"Observation 7", dueDate:new Date().toISOString()},
    //     {assignee:'observer3',category:'Unsafe Act', activity:'Painting', status:'Closed', observerId:"Observation 8", dueDate:new Date().toISOString()},
    //     {assignee:'admin',category:'Others', activity:'HIRA/JSA', status:'Open', observerId:"Observation 9", dueDate:new Date().toISOString()},
    //     {assignee:'observer1',category:'Unsafe Act', activity:'Environmental Issue', status:'Inprogress', observerId:"Observation 10", dueDate:new Date("2021-04-29").toISOString()},
    //     {assignee:'observer2',category:'Unsafe Act', activity:'Compressed gas cylinders', status:'Open', observerId:"Observation 11", dueDate:new Date("2021-04-17").toISOString()},
    //     {assignee:'observer3',category:'Unsafe Act', activity:'Painting', status:'Closed', observerId:"Observation 12", dueDate:new Date("2021-04-10").toISOString()},
    // ]
}