import fs from "fs"

export const get = (file)=>{
    return new Promise ((resolve, reject) =>{
       fs.readFile(file, "utf-8", (error, cont)=>{
        if(error){
            reject(error)
        }else{
            resolve(JSON.parse(cont))
        }
       })
    })

}

export const save =(file, newCont) =>{
    return new Promise ((resolve, reject) =>{
        fs.writeFile(file, JSON.stringify(newCont), (error)=>{
            if(error){
                reject(error)
            }else{
                resolve("Se escribio el archivo correctamente")
            }
        })
    })

}

