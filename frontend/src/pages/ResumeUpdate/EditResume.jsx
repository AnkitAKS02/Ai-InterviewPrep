import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useResumeStore } from '../../stores/useResumeStore';
import {
  ArrowLeft,
  ArrowRight,
  CircleAlert,
  Download,
  Palette,
  Save,
  Trash2,
} from "lucide-react";
import toast from 'react-hot-toast';
import TiteleInput from '../../components/Input/TiteleInput';
import { useReactToPrint } from "react-to-print";
import StepProgress from '../../components/StepProgress';
import ProfileInfoForm from '../Forms/ProfileInfoForm';
import ContactInfoForm from '../Forms/ContactInfoForm';
import WorkExperienceForm from '../Forms/WorkExperienceForm';
import EducationDetailsForm from '../Forms/EducationDetailsForm';
import SkillsInfoForm from '../Forms/SkillsInfoForm';
import ProjectsInfoForm from '../Forms/ProjectsInfoForm';
import CertificationInfoForm from '../Forms/CertificationInfoForm';
import AdditionalInfoForm from '../Forms/AdditionalInfoForm';
import RenderResume from '../../components/ResumeTemplates/RenderResume';

const EditResume = () => {
  const { error, isLoading, fetchResumeById, uploadResumeImage, deleteResume, updateResume, selectedResume } = useResumeStore();

  const { id } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null)
  const [baseWidth, setBaseWidth] = useState(800);
  const [openPreviewModel, setOpenPreviewModel] = useState(false);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [errorMessage, setErrorMessage] = useState(error || null);
  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);

  //changed a lil bit to save it permantly will chnage it later
  const [resumeData, setResumeData] = useState(() => {
    const savedData = localStorage.getItem("resumeData");
    return savedData
      ? JSON.parse(savedData)
      : {
        title: "",
        thumbnailLink: "",
        profileInfo: {
          profileImg: null,
          profilePreviewUrl: "",
          fullName: "",
          designation: "",
          summary: "",
        },
        template: {
          theme: "",
          colorPalette: "",
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
        languages: [
          {
            name: "",
            progress: 0,
          },
        ],
        interests: [""],
      };
  });
  const saveResumeToDB = async () => {
    { console.log(id) }
    if (!id) {
      toast.error("No resume selected to update");
      return;
    }

    try {
      // Optionally save locally first
      localStorage.setItem("resumeData", JSON.stringify(resumeData));

      // Call your store function to update backend
      await updateResume(id, resumeData);

      toast.success("Resume saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save resume");
    }
  };

  const validateAndNext = () => {
    const error = [];

    switch (currentPage) {
      case "profile-info": {
        const { fullName, designation, summary } = resumeData.profileInfo;
        if (!fullName.trim()) error.push("Full Name is required");
        if (!designation.trim()) error.push("Designation is required");
        if (!summary.trim()) error.push("Summary is required");
        break;
      }

      case "contact-info": {
        const { email, phone } = resumeData.contactInfo;
        if (!email.trim()) error.push("Email is required");
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
          error.push("Email is invalid");

        if (!phone.trim()) error.push("Phone is required");
        break;
      }

      case "work-experience": {
        if (
          !resumeData.workExperience.length ||
          resumeData.workExperience.some(
            (exp) => !exp.company.trim() || !exp.role.trim()
          )
        ) {
          error.push("Each work experience must have a company and role");
        }
        break;
      }

      case "education": {
        if (
          !resumeData.education.length ||
          resumeData.education.some(
            (edu) => !edu.degree.trim() || !edu.institution.trim()
          )
        ) {
          error.push("Each education entry must have a degree and institution");
        }
        break;
      }

      case "skills": {
        if (
          !resumeData.skills.length ||
          resumeData.skills.some((skill) => !skill.name.trim())
        ) {
          error.push("Each skill must have a name");
        }
        break;
      }

      case "projects": {
        if (
          !resumeData.projects.length ||
          resumeData.projects.some((proj) => !proj.title.trim())
        ) {
          error.push("Each project must have a title");
        }
        break;
      }

      case "certifications": {
        if (
          resumeData.certifications.length &&
          resumeData.certifications.some(
            (cert) => !cert.title.trim() || !cert.issuer.trim()
          )
        ) {
          error.push("Each certification must have a title and issuer");
        }
        break;
      }

      case "additionalInfo": {
        if (
          resumeData.languages.length &&
          resumeData.languages.some((lang) => !lang.name.trim())
        ) {
          error.push("Each language must have a name");
        }

        if (
          resumeData.interests.length &&
          resumeData.interests.some((interest) => !interest.name.trim())
        ) {
          error.push("Each interest must have a name");
        }
        break;
      }

      default:
        break;
    }

    if (error.length > 0) {
      setErrorMessage(error.join(", "));
      return; // ⛔ stop here if errors exist
    }

    // ✅ No errors → move to next step
    setErrorMessage("");
    localStorage.setItem("resumeData", JSON.stringify(resumeData)); // <-- save here
    goToNextStep();
  };


  const goToNextStep = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];
    if (currentPage == "additionalInfo") setOpenPreviewModel(true);

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex != -1 && currentIndex < pages.length - 1) {
      setCurrentPage(pages[currentIndex + 1]);
      const percent = Math.round(((currentIndex + 1) / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];
    if (currentPage === "profile-info") navigate('/dashboard');

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) {
      setCurrentPage(pages[currentIndex - 1]);
      const percent = Math.round(((currentIndex - 1) / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) => {
              updateSection("profileInfo", key, value);
            }}
            onNext={validateAndNext}
          />
        );
      case "contact-info":
        console.log(resumeData);
        return (
          <ContactInfoForm
            contactInfo={resumeData?.contactInfo}
            updateSection={(key, value) => {
              updateSection("contactInfo", key, value);
            }}
            onNext={validateAndNext}
          />
        );
      case "work-experience":
        return (
          <WorkExperienceForm
            workExperience={resumeData?.workExperience}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("workExperience", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
            removeArrayItem={(index) => {
              removeArrayItem("workExperience", index)
            }}
            onNext={validateAndNext}
          />
        );
      case "education":
        return (
          <EducationDetailsForm
            educationInfo={resumeData?.education}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("education", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("education", newItem)}
            removeArrayItem={(index) => removeArrayItem("education", index)}
            onNext={validateAndNext}
          />
        );
      case "skills":
        return (
          <SkillsInfoForm
            skillsInfo={resumeData?.skills}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("skills", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("skills", newItem)}
            removeArrayItem={(index) => removeArrayItem("skills", index)}
            onNext={validateAndNext}
          />
        );
      case "projects":
        return (
          <ProjectsInfoForm
            projectInfo={resumeData?.projects}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("projects", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("projects", newItem)}
            removeArrayItem={(index) => removeArrayItem("projects", index)}
            onNext={validateAndNext}
          />
        );
      case "certifications":
        return (
          <CertificationInfoForm
            certificationInfo={resumeData?.certifications}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("certifications", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
            removeArrayItem={(index) => removeArrayItem("certifications", index)}
            onNext={validateAndNext}
          />
        );
      case "additionalInfo":
        return (
          <AdditionalInfoForm
            languages={resumeData?.languages}
            interests={resumeData?.interests}
            updateArrayItem={(section, index, key, value) => {
              updateArrayItem(section, index, key, value);
            }}
            addArrayItem={(section, newItem) => addArrayItem(section, newItem)}
            removeArrayItem={(section, index) => removeArrayItem(section, index)}
            onNext={validateAndNext}
          />
        );
      default:
        return null
    }
  };

  const updateSection = (section, key, value) => {
    setResumeData((prev) => {
      const updated = {
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      };
      console.log(updated);
      return updated;
    });
  };

  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];

      if (key === null) {
        updatedArray[index] = value;
      } else {
        updatedArray[index] = {
          ...updatedArray[index],
          [key]: value,
        }
      }
      return {
        ...prev,
        [section]: updatedArray,
      }
      // console.log(updated)
    });
  };

  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray.splice(index, 1);
      return { ...prev, [section]: updatedArray };
    });
  };

  const uploadResumeImages = async () => {

    fixTailwindColors(resumeRef.current);
    const imageDataUrl = await captureElementAsImage(resumeRef.current);

    const newThumbnail = imageDataUrl; // base64 string
    const newProfileImage = resumeData?.profileInfo?.profileImg || null;

    await uploadResumeImage(resumeId, { newThumbnail, newProfileImage });

  };


  // const updateResumeDetails = async (thubnailLink, profilePreviewUrl) => {

  // }
  // const handleDeleteResume = async () => {

  // }

  const reactToPrintFn = useReactToPrint({ contentRef: resumeDownloadRef });

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };


  //SETTING THE RESUME DATA :
  useEffect(() => {
    if (selectedResume) {
      setResumeData(prev => ({
        ...prev,
        ...selectedResume, // spread selected resume
      }));
    }
    console.log("resume:", resumeData);
  }, [selectedResume]);

  // to check whether updated or not:
  // useEffect(() => {
  //   console.log("Resume data changed:", resumeData);
  // }, [resumeData]);

  // useEffect(() => {
  //   localStorage.setItem("resumeData", JSON.stringify(resumeData));
  // }, [resumeData]);

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    if (id) {
      fetchResumeById(id);
      console.log("called")
    }

    return () => {
      window.removeEventListener('resize', updateBaseWidth);
    }
  }, []);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);
  return (
    <>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4'>
          <TiteleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prevState) => ({
                ...prevState,
                title: value,
              }))
            }
          />

          <div className='flex items-center gap-4'>
            {/* Change Theme */}
            <button
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 
               bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition'
              onClick={() => setOpenThemeSelector(true)}
            >
              <Palette className='w-4 h-4' />
              <span className='hidden md:block'>Change Theme</span>
            </button>

            {/* Delete */}
            <button
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 
               bg-red-100 rounded-lg shadow-sm hover:bg-red-200 transition'
              onClick={() => deleteResume(id)}
            >
              <Trash2 className='w-4 h-4' />
              <span className='hidden md:block'>Delete</span>
            </button>

            {/* Preview & Download */}
            <button
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 
               bg-blue-100 rounded-lg shadow-sm hover:bg-blue-200 transition'
              onClick={() => setOpenPreviewModel(true)}
            >
              <Download className='w-4 h-4' />
              <span className='hidden md:block'>Preview & Download</span>
            </button>
          </div>

        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {/* Left Card */}
          <div className='bg-white rounded-lg border border-purple-100 overflow-hidden flex flex-col'>
            <div className='mx-5 mt-5 flex-1'>

              <StepProgress progress={progress} />
              {renderForm()}

              {errorMessage && (
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-600 
              bg-amber-100 px-2 py-1 my-2 rounded"
                >
                  <CircleAlert className="text-md" />
                  {errorMessage}
                </div>
              )}

              <div className='mx-5 mb-5 mt-5'>
                <div className='flex items-center justify-end gap-4'>

                  <button
                    className='flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 
                  bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition disabled:opacity-50'
                    onClick={goBack}
                    disabled={isLoading}
                  >
                    <ArrowLeft className='w-4 h-4' />
                    <span>Back</span>
                  </button>

                  <button
                    className='flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-green-700 
                  bg-green-100 rounded-lg shadow-sm hover:bg-green-200 transition disabled:opacity-50'
                    onClick={saveResumeToDB && uploadResumeImage}
                    disabled={isLoading}
                  >
                    <Save className='w-4 h-4' />
                    <span>{isLoading ? "Updating..." : "Save & Exit"}</span>
                  </button>

                  <button type="button" className='flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg shadow-sm hover:bg-blue-200 transition disabled:opacity-50'
                    onClick={validateAndNext} disabled={isLoading}> {currentPage == "additionalInfo" && (<Download className='w-4 h-4' />)} {currentPage === "additionalInfo" ? "Preview & Download" : "Next"} {currentPage != "additionalInfo" && (<ArrowRight className='w-4 h-4' />)} </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-start w-full overflow-y-auto overflow-x-hidden">
            <div
              ref={resumeRef}
              className="bg-white shadow-lg rounded-md p-4 border border-gray-200 w-full max-w-[800px] min-h-[1123px]"
            >
              <RenderResume
                templateId={resumeData?.template?.theme || ""}
                resumeData={resumeData}
                colorPalette={resumeData?.template?.colorPalette || []}
                containerWidth={baseWidth}
              />
            </div>
          </div>


        </div>


      </div>

    </>
  )
}



export default EditResume;
