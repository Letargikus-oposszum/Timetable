import classes from "../data/data.js"
export const getClass= (req,res)=> {
    res.status(200).json(classes)

}
export const getClassById=  (req,res)=> {
    const id= req.params.id
    if (id<0 || id >= classes.length){
        return res.status(404).json({message:"Class not found" })
    }
    res.status(200).json(classes)

}

export const createClass= (req,res)=> {
    const {cim, rendezo, ev, oscar}=req.body
    if(!cim || !rendezo || !ev || !oscar){
        return res.status(404).json({message: "Missing data"})
    }
    const newClass={cim, rendezo, ev, oscar}
    classes.push(newClass)
    res.status(201).json(newClass)
}

export const updateClass =(req,res)=> {
    const id= req.params.id
    if (id<0 || id >= classes.length){
        return res.status(404).json({message:"Class not found" })
    }
    const {cim, rendezo, ev, oscar}=req.body
    if(!cim || !rendezo || !ev || !oscar){
        return res.status(404).json({message: "Missing data"})
    }
    classes[id]={cim, rendezo, ev, oscar}
    res.status(200).json(classes[id])
}
export const deleteClass=  (req,res)=> {
    const id=req.params.id
    if (id <0 || id >= classes.length){
        return res.status(404).json({message:"Class not found"})
    }
    classes.splice(id, 1)
    res.status(200).json({message:"Delete successful"})
}