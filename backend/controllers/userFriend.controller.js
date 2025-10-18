import User from "../models/user.model.js";
import FriendRequest from "../models/friendRequests.model.js";

export async function getRecommendedUsers(req, res) {
    try {
        const currentUserId = req.user._id;
        const currentUser = req.user;

        const recommnededUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },
                { _id: { $nin: currentUser.friends } },
                { isOnboarded: true },
            ]
        });
        res.status(200).json(recommnededUsers);
    } catch (error) {
        console.log("Error in getRecommendedUsers:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// we willl show the skilllevel and tech Intersets of the friends as the card
export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user._id).
        select("friends").
        populate("friends", "fullName profilePic techIntrest skillLevel ");
    
        res.status(200).json(user.friends);
    } catch (error) {
        console.log("Error in getMyFriends:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
        
    }

}

export async function sendFriendRequest(req, res) {
    try {
        const myId = req.user._id;
        const { id: recipientId } = req.params;
        
        //prevent sending friend request to self
        if(myId === recipientId) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself." });
        }

        const recepient = await User.findById(recipientId);
        if (!recepient) {
            return res.status(404).json({ message: "Recipient not found." });
        }

        if(recepient.friends.includes(myId)) {
            return res.status(400).json({ message: "You are already friends with this user." });
        }
        
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recepient: recipientId },
                { sender: recipientId, recepient: myId }
            ],
        });

        if (existingRequest) {
            return res.status(400).json({ message: "A friend request already exists between you and this user" });
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });

        res.status(201).json(friendRequest);
    } catch (e) {
        console.log("Error in sending FriendRequest:", e.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const { id: requestId } = req.params;//this is the id of the friendRequest

        const friendRequest = await FriendRequest.findById(requestId);

        if(!friendRequest) {
            return res.status(404).json({ message: "Friend request not found." });
        }

        //verify the current user is the recpeint
        if(friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to accept this friend request." });
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        //add the sender to the recipient's friends list
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient },
        });

        //add the recipient to the sender's friends list
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender },
        });

        res.status(200).json({ message: "Friend request accepted" });
    } catch (error) {
        console.log("Error in acceptFriendRequest:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//getting both the fields with one go
export async function getFriendRequests(req, res) {
    try {
        const incomingRequests = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending"
        }).populate("sender", "fullName profilePicture techIntrest skillLevel");//senders data to get
        
        const acceptedRequest = await FriendRequest.find({
            sender: req.user.id,
            status: "accepted"
        }).populate("recipient", "fullName profilePicture ");
        console.log("accepted from frontend");
        res.status(200).json({incomingRequests,acceptedRequest})
    } catch (error) {
        console.log("error in getpendingFriendRequests:", error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getOutgoingFriendReqs(req, res) {
    try {
        const outgoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status:"pending",
        }).populate("recipient", "fullName profilePicture techIntrest skillLevel");
    } catch (error) {
        console.log("Error in getOutgoingFriendReqs:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}