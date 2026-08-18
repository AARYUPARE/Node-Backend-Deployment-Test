const {validateSchema, checkAndReturnNumber} = require("../validators/validator.util")
const followService = require("../services/follow.service")
const { followRequestSchema, unfollowRequestSchema } = require("../validators/follow.validator");
const ValidationError = require("../exceptions/ValidationError");

const followUser = async (req, res) => {
    const followToCreate = validateSchema(followRequestSchema, req.body);
    const follow = await followService.followUser(followToCreate);
    return res.status(201).json(follow);
}

const unfollowUser = async (req, res) => {
    const unfollowRequestDTO = validateSchema(unfollowRequestSchema, req.body);
    followService.unfollowUser(unfollowRequestDTO);
    return res.status(204);
}

const getUserFollowers = async (req, res) => 
{
    if(req.params.id === null)
        throw new ValidationError("parameter: id needed");

    const id = checkAndReturnNumber(req.params.id);

    const followers = await followService.getUserFollowersById(id);

    return res.status(200).json(followers);
}

const getUserFollowing = async (req, res) => 
{
    if(req.params.id === null)
        throw new ValidationError("parameter: id needed");

    const id = checkAndReturnNumber(req.params.id);

    const following = await followService.getUserFollowingById(id);

    return res.status(200).json(following);
}

module.exports = {
    followUser,
    unfollowUser,
    getUserFollowers,
    getUserFollowing
}