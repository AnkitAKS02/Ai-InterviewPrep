import mongoose from 'mongoose';
import Resume from '../models/resume.model.js';
import cloudinary from "../lib/cloudinary.js";

// Create a new resume
export const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required to create a resume" });
        }

        const defaultResumeData = {
            profileInfo: {
                profilePreviewUrl: "",
                fullName: "",
                designation: "",
                summary: "",
            },
            contactInfo: {
                email: "",
                phone: "",
                location: "",
                linkedin: "",
                github: "",
                website: "",
            },
            workExperience: [
                {
                    company: "",
                    role: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                },
            ],
            education: [
                {
                    degree: "",
                    institution: "",
                    startDate: "",
                    endDate: "",
                },
            ],
            skills: [
                {
                    name: "",
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: "",
                    description: "",
                    github: "",
                    liveDemo: "",
                },
            ],
            certifications: [
                {
                    title: "",
                    issuer: "",
                    year: "",
                },
            ],
            languages: [{
                name: "",
                progress: 0,
            }],
            interests: [""],
        };

        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
        });

        res.status(201).json(newResume);
    } catch (error) {
        console.log("error in creating Resume controller", error.message);
        res.status(500).json({ message: "Error creating resume", error: error.message });
    }
};

// Get all resumes for a user
export const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({
            updatedAt: -1,
        });

        if (resumes.length === 0) {
            return res.status(200).json({ message: "No resumes found", resumes: [] });
        }
        console.log("resumes");
        res.status(200).json(resumes);
    } catch (error) {
        console.log("error in getting Resumes controller", error.message);
        res.status(500).json({ message: "Error fetching user resumes", error: error.message });
    }
};

// Get a resume by its ID

export const getResumeById = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if id is a valid Mongo ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(401).json({ message: "Invalid resume ID" });
        }

        const resume = await Resume.findOne({ _id: id, userId: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found in DB" });
        }

        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ message: "Error fetching resume by ID", error: error.message });
    }
};


// Update a resume
export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found " });
        }

        Object.assign(resume, req.body);//merge into the existing object

        const savedResume = await resume.save();

        res.status(200).json(savedResume);
    } catch (error) {
        console.log("error in updating Resume controller:", error.message);
        res.status(500).json({ message: "Error updating resume", error: error.message });
    }
};

// Delete a resume
export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found " });
        }

        if (resume.profileInfo?.profilePreviewUrl) {
            // Extract public_id from the stored link (only works if you saved public_id)
            // Example: resume.profileInfo.cloudinaryId
            if (resume.profileInfo.cloudinaryId) {
                await cloudinary.uploader.destroy(resume.profileInfo.cloudinaryId);
            }
        }
        console.log("delete");
        const deleted = await Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!deleted) {
            return res.status(404).json({ message: "Resume not found or unauthorised" });
        }

        res.json({ message: "Resume deleted successfully" });
    } catch (error) {
        console.log("error in deletion of resume", error.message);
        res.status(500).json({ message: "Error deleting resume", error: error.message });
    }
};

export const uploadResumeImage = async (req, res) => {
    try {
        const { newThumbnail, newProfileImage } = req.body;

        const resumeId = req.params.id;
        const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        const updateData = {};

        // Upload thumbnail if provided
        if (newThumbnail) {
            const uploadThumb = await cloudinary.uploader.upload(newThumbnail, {
                folder: "resumes/thumbnails",
            });
            updateData.thumbnailLink = uploadThumb.secure_url;
        }

        // Upload profile picture if provided
        if (newProfileImage) {
            const uploadProfile = await cloudinary.uploader.upload(newProfilePicture, {
                folder: "resumes/profile_pictures",
            });
            updateData.profileInfo.profilePreviewUrl = uploadProfile.secure_url;
        }

        // Update DB only if something was uploaded
        if (Object.keys(updateData).length > 0) {
            const updatedResume = await Resume.findByIdAndUpdate(
                resumeId,
                { $set: updateData },
                { new: true }
            );
            return res.status(200).json({
                message: "Images uploaded successfully",
                thumbnailLink: updatedResume.thumbnailLink,
                profilePreviewUrl:updateData.profileInfo.profilePreviewUrl,
            });
        }

        return res.status(200).json({ message: "No image Provided" });

    } catch (error) {
        console.log("error uploading the image in resume", error.message);
        res.status(500).json({ message: "Error in image updation of resume", error: error.message });
    }
}

