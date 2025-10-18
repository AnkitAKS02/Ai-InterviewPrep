import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useResumeStore } from '../../stores/useResumeStore.js';
import { LucideCirclePlus } from 'lucide-react';
import moment from "moment";
import Modal from '../../components/Modal.jsx';
import CreateResumeForm from '../Home/CreateResumeForm.jsx';
import ResumeSummaryCard from '../../components/Cards/ResumeSummaryCard.jsx'
const ResumeDashBoard = () => {
  const navigate = useNavigate();
  const { resumes = [], isLoading, fetchResumes } = useResumeStore();

  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div>
      <div className="p-6 m-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
          {/* Add New Resume Card */}
          <div
            className="h-[300px] flex flex-col gap-5 items-center justify-center bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50/5 cursor-pointer p-6 m-2"
            onClick={() => setOpenCreateModal(true)}
          >
            <div className="w-12 h-12 flex items-center justify-center bg-purple-200/60 rounded-2xl">
              <LucideCirclePlus className="text-xl text-purple-500" />
            </div>
            <h3 className="font-medium text-gray-800">Add New Resume</h3>
          </div>

          {/* Resume Cards */}
          {resumes?.map((resume) => (
            <ResumeSummaryCard
              key={resume?._id}
              imgUrl={resume?.thumbnailLink || null}
              title={resume.title}
              lastUpdated={
                resume?.updatedAt
                  ? moment(resume.updatedAt).format("DD MMM YYYY")
                  : ""
              }
              onSelect={() => navigate(`/resume/${resume?._id}`)}
            />
          ))}
        </div>
      </div>


      <Modal isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader>
        <div className=''>
          <CreateResumeForm />
        </div>
      </Modal>
    </div>
  )
}

export default ResumeDashBoard
