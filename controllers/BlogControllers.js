const Blog = require('../models/blogModel');

const getAllBlog = (req,res)=>{
    Blog.find().then(result =>{
        if(result){
            if(result.length===0){
                res.status(200).json({
                    status : 'Create Blogs',
                });
            }
            else{
                res.status(200).json({
                    status : 'Found',
                    message : result
                });
            }
            
        }
        else{
            res.status(404).json({
                status : 'Blogs Not Found'
            });
        }
    })
    .catch(err=>{
        res.status(500).json({
            status : 'Error in findingAllBlogs',
            message : err
        });
    })
}

const getOneBlog = (req,res)=>{
    console.log(req.params.id);
    Blog.findOne({_id : req.params.id}).then(result =>{
        if(result){
            res.status(200).json({
                status : 'Found',
                message : result
            });
        }
        else{
            res.status(404).json({
                status : 'Blog Not Found'
            });
        }
    })
    .catch(err=>{
        res.status(500).json({
            status : 'Error in findingOneBlog',
            message : err
        });
    })
}

const createBlog = async (req,res)=>{
    let blog = await new Blog({
        bannerImage : req.body.bannerImage,
        author : req.body.author,
        date : req.body.date,
        title : req.body.title,
        mainDesc : req.body.mainDesc,
        contentImages : req.body.contentImages,
        content : req.body.content,
        categories : req.body.categories,
        quotes : req.body.quotes,
        metaDesc : req.body.metaDesc,
        keywords : req.body.keywords,
    })
    blog.save().then(result =>{
        res.status(201).json({
            status : 'Created',
            message : result
        })
    })
    .catch(err =>{
        res.status(500).json({
            status : 'Error in Creating Blog',
            message : err
        })
    })
}

const updateBlog = (req,res)=>{
    Blog.updateOne(
        {_id:req.params.id},
        {
            $set:{
                bannerImage : req.body.bannerImage,
                author : req.body.author,
                date : req.body.date,
                title : req.body.title,
                mainDesc : req.body.mainDesc,
                contentImages : req.body.contentImages,
                content : req.body.content,
                categories : req.body.categories,
                quotes : req.body.quotes,
                metaDesc : req.body.metaDesc,
                keywords : req.body.keywords,
            }
        })
        .then(result =>{
            if(result.modifiedCount){
                res.status(200).json({
                    status : 'Updated',
                    message : result
                });
            }
            else{
                res.status(404).json({
                    status : 'Not Updated'
                });
            }
        })
        .catch(err =>{
            res.status(500).json({
                status : 'Error in Updating Blog',
                message : err
            })
        })
}

const deleteBlog = (req,res)=>{
    Blog.deleteOne({_id : req.params.id})
    .then(result =>{
        if(result.deletedCount){
            res.status(200).json({
                status : 'Success',
                message : result
            });
        }
        else{
            res.status(404).json({
                status : 'Failed Deletion'
            });
        }
    })
    .catch(err =>{
        res.status(500).json({
            status : 'Error in Deletion',
            message : err
        })
    })
}

const getCategoriesCount = (req,res)=>{
    // Blog.find({categories : req.body.category}).then(result =>{
    //     res.status(200).json({
    //         count : result.length
    //     })
    // })
    // .catch(err =>{
    //     res.status(500).json({
    //         Error : err
    //     })
    // })
    // Blog.
    Blog.aggregate([{
        $group :{
            _id: "$categories",
            count: {
            $count: {}
            }
        }
    }])
    .then(result =>{
        if(result)
        {
            res.status(200).json({
                message : result
            })
        }
        else{
            res.status(404).json({
                status : 'Failed'
            });
        }
    }).catch(err =>{
        res.status(500).json({
            status : 'Error in findingCount',
            message : err
        })
    })
}

const recentBlog = (req,res)=>{
    Blog.aggregate(
        [
            { $sort : { createdAt : -1 } }
        ]
    )
    .then(result =>{
        if(result){
            res.status(200).json({
                status : 'Success',
                message : result
            });
        }
        else{
            res.status(404).json({
                status : 'Failed Sorting'
            });
        }
    })
    .catch(err =>{
        res.status(500).json({
            status : 'Error in Sorting',
            message : err
        })
    })
}

module.exports = {
    getAllBlog : getAllBlog,
    getOneBlog : getOneBlog,
    createBlog : createBlog,
    updateBlog : updateBlog,
    deleteBlog : deleteBlog,
    getCategoriesCount : getCategoriesCount,
    recentBlog : recentBlog
}