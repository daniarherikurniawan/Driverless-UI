var Post = require('../../../dbhelper/post_model');

module.exports = { 
	showPostPage: function(req, res){
		Post.model
			.findById(req.params.id)
			.populate('creator')
			.populate( 'original_creator')
			.exec(function (err,dataPost){
				// console.log(dataPost);
				if(err){
					console.log(err);
					res.send("404");
				}else if(dataPost != null){
					id = req.session.profile._id;
					if(dataPost.like.indexOf(id) != -1){
						 dataPost.liked = true;
					}
					if(dataPost.share.indexOf(id) != -1){
						dataPost.shared = true;
					}
					if((dataPost.creator == null) &&
					 (dataPost.post_shared != null)  && (dataPost.post_shared.share.indexOf(id) != -1)){
						dataPost.post_shared.shared = true;
					}
					if(dataPost.creator._id == req.session.profile._id)
						myPost = true;
					else
						myPost = false;

					res.render('post', {profile: req.session.profile, posts: dataPost, 
						rec_topic : req.session.rec_topic, myPost : myPost,
					partials: { topNavigation:'topNavigation',
						share_modal: 'modal/share_modal', edit_post_modal: 'modal/edit_post_modal'
					}});	
				}else{
					console.log(err);
					res.send("404");
				}
			});
	}
}



