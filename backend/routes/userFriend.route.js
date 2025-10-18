import express from "express";
import { getRecommendedUsers, getMyFriends,sendFriendRequest,acceptFriendRequest,getFriendRequests,getOutgoingFriendReqs } from '../controllers/userFriend.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protectRoute);

router.get('/', getRecommendedUsers);//
router.get('/friends', getMyFriends);
router.post('/friend-request/:id', sendFriendRequest);//
router.post('/friend-request/:id/accept', acceptFriendRequest);
//TOD0 - friend -req-reject
router.get("/friend-requests", getFriendRequests);//
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;
