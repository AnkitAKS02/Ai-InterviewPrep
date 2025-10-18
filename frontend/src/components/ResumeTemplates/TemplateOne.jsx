import React, { useEffect, useRef, useState } from 'react'
import { MapPinHouse, Mail, Phone, Rss, User, Github } from 'lucide-react'
import { LuGithub, LuRss } from 'react-icons/lu'
import { RiLinkedinLine } from 'react-icons/ri'
import ContactInfo from '../ResumeSection/ContactInfo';
import EducationInfo from '../ResumeSection/EducationInfo';
import { formatYearMonth } from '../../lib/helper';
import LanguagSection from '../ResumeSection/LanguagSection';
import { Link } from 'react-router-dom';
const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#FFF5E1", "#FFD6A5",
  "#E0BBE4", "#957DAD",
  "#D0F4DE", "#A9DEF9",
  "#FEE2F8", "#FCA3CC",
];
const Title = ({ text, color }) => {
  return (
    <div className='relative w-fit mb-2.5'>
      <span className='absolute bottom-0 left-0 w-full h-2' style={{ backgroundColor: color }}>

      </span>
      <h2 className={`relative text-sm font-bold`}>{text}</h2>
    </div>
  )
}
const TemplateOne = ({ resumeData,
  colorPalette,
  containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth);
    setScale(containerWidth / baseWidth);
  }, [containerWidth]);

  useEffect(() => {
    console.log(resumeData);
  }, [])
  return (
    <div ref={resumeRef}
      className='p-3 bg-white overflow-hidden'
      style={{
        transform: containerWidth > 0 ? `scale(${scale}}` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto"
      }} >
      <div className='grid grid-cols-12 gap-4'>
        <div className="col-span-3 py-6" style={{ backgroundColor: themeColors[0] }}>
          <div className="flex flex-col items-center px-2">
            <div
              className="w-[80px] h-[80px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: themeColors[1] }}
            >
              {resumeData?.profileInfo?.profilePreviewUrl ? (
                <img
                  src={resumeData.profileInfo.profilePreviewUrl}
                  className="w-[70px] h-[70px] rounded-full object-cover"
                />
              ) : (
                <div
                  className="w-[70px] h-[70px] flex items-center justify-center text-3xl rounded-full"
                  style={{ color: themeColors[4] }}
                >
                  <User />
                </div>
              )}
            </div>

            <h2 className="text-lg font-bold mt-2 text-center">
              {resumeData.profileInfo?.fullName}
            </h2>
            <p className="text-xs text-center">
              {resumeData.profileInfo?.designation}
            </p>
          </div>

          <div className="my-4 mx-4">
            <div className="flex flex-col gap-3">
              <ContactInfo
                icon={<MapPinHouse />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo?.location}
              />
              <ContactInfo
                icon={<Mail />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo?.email}
              />
              <ContactInfo
                icon={<Phone />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo?.phone}
              />

              {resumeData.contactInfo.linkedin && (
                <ContactInfo
                  icon={<RiLinkedinLine />}
                  iconBG={themeColors[2]}
                  value={resumeData.contactInfo?.linkedin}
                />
              )}

              {resumeData.contactInfo.github && (
                <ContactInfo
                  icon={<Github />}
                  iconBG={themeColors[2]}
                  value={resumeData.contactInfo?.github}
                />
              )}

              <ContactInfo
                icon={<LuRss />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo?.website}
              />
            </div>

            <div className="mt-4">
              <Title text="Education" color={themeColors[1]} />
              {resumeData?.education.map((data, index) => (
                <EducationInfo
                  key={`education_${index}`}
                  degree={data.degree}
                  institution={data.institution}
                  duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(
                    data.endDate
                  )}`}
                />
              ))}
            </div>

            <div className="mt-4">
              <Title text="Languages" color={themeColors[1]} />
              <LanguagSection
                languages={resumeData.languages}
                accentColor={themeColors[3]}
                bgColor={themeColors[2]}
              />
            </div>
          </div>
        </div>


        {/* Right side */}
        <div className="col-span-7 pt-10 pr-4 pb-5">
          {/* Professional Summary */}
          <div className="mb-5">
            <Title text="Professional Summary" color={themeColors[1]} />
            <p className="text-sm leading-5 text-gray-700">
              {resumeData?.profileInfo.summary}
            </p>
          </div>

          {/* Work Experience */}
          <div className="mb-5">
            <Title text="Work Experience" color={themeColors[1]} />
            {resumeData?.workExperience?.map((exp, index) => (
              <div key={`exp_${index}`} className="mb-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm">{exp.company}</h3>
                  <span className="text-xs text-gray-500">
                    {formatYearMonth(exp.startDate)} - {formatYearMonth(exp.endDate)}
                  </span>
                </div>
                <p className="text-xs italic">{exp.position}</p>
                <p className="text-xs text-gray-600 leading-5">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="mb-5">
            <Title text="Projects" color={themeColors[1]} />
            {resumeData?.projects?.map((proj, index) => (
              <div key={`proj_${index}`} className="mb-3">

                {/* ✅ Title on left, Links on right */}
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm">{proj.title}</h3>
                  <div className="flex gap-2 text-xs text-blue-600 shrink-0">
                    {proj.github && (
                      <Link
                        to={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        GitHub
                      </Link>
                    )}
                    {proj.liveDemo && (
                      <Link
                        to={proj.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        Live 
                      </Link>
                    )}
                  </div>
                </div>

                {/* ✅ Description below */}
                <p className="text-xs text-gray-600 leading-5 mt-1">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>


          {/* Skills */}
          <div className="mb-5">
            <Title text="Skills" color={themeColors[1]} />
            <div className="grid grid-cols-2 gap-1">
              {resumeData?.skills?.map((skill, index) => (
                <div key={`skill_${index}`} className="flex items-center gap-1">
                  <span className="text-xs">{skill.name}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${i < skill.level ? "bg-blue-500" : "bg-gray-300"
                          }`}
                      ></span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-5">
            <Title text="Certifications" color={themeColors[1]} />
            <div className="space-y-2">
              {resumeData?.certifications?.map((cert, index) => (
                <div
                  key={`cert_${index}`}
                  className="flex justify-between items-center border-b border-gray-100 pb-1"
                >
                  <div>
                    <h3 className="font-medium text-xs">{cert.title}</h3>
                    <p className="text-[10px] text-gray-500">Issued by {cert.issuer}</p>
                  </div>
                  <span className="text-[10px] text-gray-500">{cert.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default TemplateOne
