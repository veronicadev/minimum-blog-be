exports.getPosts = (req, res, next)=>{
    console.log('Get posts');
    res.json({
        posts:[{
            'title': "Hello"
        }]
    })
}