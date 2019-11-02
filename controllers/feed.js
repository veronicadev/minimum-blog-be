exports.getPosts = (req, res, next) => {
    console.log('Get posts');
    res.status(200).json({
        posts: [{
            'title': "Hello"
        }]
    })
}

exports.postPost = (req, res, next) => {
    res.status(201).json({
        message: "Post added successfully!",
        post: {
            title: req.body.title,
            description: req.body.description
        }
    })
}