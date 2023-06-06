import fs from "fs"

const contenido = fs.readFileSync("./archivo.txt", "utf-8")



fs.readFile("./archivo.txt", "utf-8", function(error, contenido){
    if(error){
        console.error(error.message)
    }else{
        console.log(contenido)
    }
    
})