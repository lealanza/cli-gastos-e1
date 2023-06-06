import { get, save } from "./readPromises.js";
import inquirer from "inquirer";
import { promptUser } from "./promptCli.js";

const capitalize = (word) => {
    if(typeof(word) !== 'string') {
      return 'Invalid input';
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
  

const createNewSpent = async () => {
  const user = await promptUser();
  const cliSpentJson = await get("./cliSpent.json");
  const newUser = {
    ...user,
    firstName: capitalize(user.firstName),
    nameSpent: capitalize(user.nameSpent)
  };
  const newCliSpent = [...cliSpentJson, newUser];
  save("./cliSpent.json", newCliSpent);
};

const showSpent = async () => {
  const spent = await get("./cliSpent.json");
  if(spent.length === 0){
    console.log("No hay ningun gasto cargado")
  }else
  {console.log(spent);}
};

const showTotalByPerson = async () => {
  const data = await get("./cliSpent.json");
  if(data.length===0){
    console.log("No hay ningun gasto cargado")
  }else{
  const costByPerson = data.reduce((acc, expense) => {
    const firstName = expense.firstName;
    const costSpent = parseFloat(expense.costSpent);
    acc[firstName] = (acc[firstName] || 0) + costSpent;
    return acc;
  }, {});
  for (let firstName in costByPerson) {
    console.log(`${firstName}: $${costByPerson[firstName].toFixed(2)}`);
  }}
};


const deleteSpent = async () => {
  const data = await get("./cliSpent.json");
  if(data.length===0){
    console.log("No hay nada para borrar")
  }else{
    const searchOptions = [
        { value: "name", name: "Nombre de Usuario" },
        { value: "cost", name: "Nombre del Gasto" }
      ];
      const { search } = await inquirer.prompt({
        type: "list",
        name: "search",
        message: "¿Cómo desea buscar el gasto a eliminar?",
        choices: searchOptions
      });
      const searchKey = search === 'name' ? 'firstName' : 'nameSpent';
      const { searchTerm } = await inquirer.prompt({
        type: "input",
        name: "searchTerm",
        message: `Ingrese el ${searchKey} del gasto que desea eliminar:`
      });
      const spentToDelete = data.find(
        (expense) => expense[searchKey] && expense[searchKey].toUpperCase() === searchTerm.toUpperCase()
      );
      if (!spentToDelete) {
        console.log(`No se encontró un gasto con ${searchKey} igual a "${searchTerm}".`);
        return;
      }
      const { deleteConfirmation } = await inquirer.prompt({
        type: "confirm",
        name: "deleteConfirmation",
        message: `¿Está seguro de que desea eliminar el gasto ${spentToDelete.nameSpent} (${spentToDelete.costSpent}) de ${spentToDelete.firstName}?`
      });
      if (deleteConfirmation) {
        const newSpents = data.filter((expense) => expense !== spentToDelete);
        save("./cliSpent.json", newSpents);
        console.log(`El gasto ${spentToDelete.nameSpent} ha sido eliminado.`);
      } else {
        console.log("Eliminación cancelada.");
      }
  }
};

const menu = async () => {
  while (true) {
    const { choices } = await inquirer.prompt([
      {
        type: "list",
        name: "choices",
        message: "Seleccione una opción...",
        choices: [
          { value: 1, name: "Cargar gastos" },
          { value: 2, name: "Mostar gastos" },
          { value: 3, name: "Mostar total gastado por persona" },
          { value: 4, name: "Borrar Gasto" },
          { value: 99, name: "Salir" }
        ]
      }
    ]);
    switch (choices) {
      case 1:
        await createNewSpent();
        break;
      case 2:
        await showSpent();
        break;
      case 3:
        await showTotalByPerson();
        break;
      case 4:
        await deleteSpent();
        break;
      default:
        return;
    }
  }
};

menu();
