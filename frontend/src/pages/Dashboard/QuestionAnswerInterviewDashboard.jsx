import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useResumeStore } from '../../stores/useResumeStore.js';
import { LucideCirclePlus } from 'lucide-react';
import Modal from '../../components/Modal.jsx';
import moment from "moment";
import CreateQuesAnsInterviewForm from '../Forms/Interview/CreateQuesAnsInterviewForm.jsx';
function QuestionAnswerInterviewDashboard() {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    useEffect(() => {
        // fetchResumes();
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
                        <h3 className="font-medium text-gray-800">Add New Interview</h3>
                    </div>
                </div>
            </div>


            <Modal isOpen={openCreateModal}
                onClose={() => {
                    setOpenCreateModal(false);
                }}
                hideHeader>
                <div className=''>
                    <CreateQuesAnsInterviewForm />
                </div>
            </Modal>
        </div>
    )
}

export default QuestionAnswerInterviewDashboard
