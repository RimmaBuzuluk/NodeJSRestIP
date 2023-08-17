import jwt from 'jsonwebtoken'

export default(req, res, next)=>{
    const token =(req.headers.authorization || '').replace(/Bearer\s?/,'')

    if(token){
        try{
            const  decoded=jwt.verify(token, 'secret123')
            req.userId=decoded._id
            next()
        }catch(e){
            return res.status(403).json({
                message:'No access'
            })
        }
       
    }else {
        return res.json({
            message:'No access',
        });
      }

}

export const update=async(req, res)=>{
    try{

        const postId=req.params.id;

        await PostModel.updateOne(
            {
                _id:postId,
            },
            {
                title:req.body.title,
                text:req.body.text,
                imageUrl:req.body.imageUrl,
                tags:req.body.tags
            }
        )

        res.json({
            success:true
        })
    }catch{
        console.log(err)
        res.status(500).json({
            message:'Не удалось обновить статью'
        })

    }
}