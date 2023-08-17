import PostModel from '../models/Post.js'


export const create=async(req, res)=>{
    try{
        const doc =new PostModel({
            title:req.body.title,
            text:req.body.text,
            imageUrl:req.body.imageUrl,
            tags:req.body.tags,
            user:req.userId
        })

        const post =await doc.save()
        res.json(post)
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:'не удалось создать статью'
        })
    }
}

export const getAll= async(req, res)=>{
    try{
        const posts = await PostModel.find().populate("user").exec()

        res.json(posts)
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"не вдалось отримати всі статті"
        })
    }
}


export const getOne= async(req, res)=>{
    try{
        const postId=req.params.id
        
        const updatedDocument=await PostModel.findOneAndUpdate(
            {
                _id:postId,
            },
            {
                $inc:{viewsCount:1},
            },
            {
                returnDocument:'after',
            },
              
        ).exec()

        if (!updatedDocument) {
            return res.status(404).json({
                message: "Не вдалось знайти статтю"
            });
        }

        res.json(updatedDocument)
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"не вдалось отримати статтю"
        })
    }
}

export const remove= async(req, res)=>{
    try{
        const postId=req.params.id
        
        const RemoveDocument=await PostModel.findOneAndDelete(
            {
                _id:postId,
            }
              
        ).exec()

        if (!RemoveDocument) {
            return res.status(404).json({
                message: "Не вдалось видалити  статтю"
            });
        }

        res.json({
            success: true
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"не вдалось видалити статті"
        })
    }
}