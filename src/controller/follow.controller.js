const followmodel = require("../models/follow.model");
const usermodel = require("../models/user.model");


async function followusercontroller(req,res) {
    const follower = req.user.username;
    const following = req.params.username;

    if(follower === following){
        return res.status(400).json({
            msg:"you cannot follow yourself"
        })
    }

    const isfollowing = await usermodel.findOne({username:following})

    if(!isfollowing){
        return res.status(404).json({
            msg:`this ${following} username not found`
        })
    }

    const isduplicate = await followmodel.findOne({
        follower:follower,
        following:following
    })

    if(isduplicate){
        return res.status(201).json({
            msg:`your already follows this ${following} username`
        })
    }

    const follow = await followmodel.create({
        follower:follower,
        following:following
    })

    res.status(200).json({
        msg:`your now following ${following} from this acccount ${follower}`,
        follow
    })
    
}

async function unfollowusercontroller(req,res) {
    const follower = req.user.username;
    const following = req.params.username

    if(follower === following){
        return res.status(400).json({
            msg:"you cannot follow or unfollow yourself"
        })
    }

    const isuser = await usermodel.findOne({username:following})

    if(!isuser){
        return res.status(404).json({
            msg:`this username is not avilable ${following}`
        })
    }

    const isfollow = await followmodel.findOne({
        follower:follower,
        following:following
    })

    if(!isfollow){
        return res.status(201).json({
            msg:`you dont follow this account ${following}`
        })
    }

    const unfollow = await followmodel.findByIdAndDelete(isfollow._id)


    res.status(200).json({
        msg:`unfollow sucessfully for this account ${following}` 
    })
    
}

module.exports = {
    followusercontroller,
     unfollowusercontroller
}