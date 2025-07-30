import Group from "../models/Group.js";

export const joinGroup=async(req,res)=>{
    try {
        const {groupName}=req.body
        let group=await Group.findOne({name:groupName})
        if(!group){
            group=new Group({
                name:groupName,
                members:[req.user._id]
            })
        }
        else{
            if(!group.members.includes(req.user._id)){
                group.members.push(req.user._id)
            }
        }
        await group.save()
        res.status(200).json({message:'joined group successfully',group})
    } catch (err) {
        res.status(500).json({message:'Error joining group',error:err.message})
        
    }

}


export const viewGroups=async(req,res)=>{
    try {
        const groups=await Group.find({members:req.user._id})
        res.status(200).json(groups);


    } catch (err) {
        res.status(500).json({message:'Error fetching groups',error:err.message})
    }

}