import inquirer from "inquirer"


const question = [
    {
        type:"input",
        name:"firstName",
        message:"Cual es tu nombre?:",
    },
    {
        type:"input",
        name:"nameSpent",
        message:"Nombre del gasto?:",
    },
    {
        type:"input",
        name:"costSpent",
        message:"Importe del gasto?: $",
    },
];


export const promptUser = async () =>{
    return await inquirer.prompt(question)
}
