import React, { useState,useEffect } from 'react'
import { Plus } from 'lucide-react';
import toast from "react-hot-toast";
import { CARD_BG } from '../../utils/data.js'
import { useAuthStore } from '../../stores/useAuthStore.js';
import { useSessionStore } from '../../stores/useSessionStore.js';
import { useNavigate } from 'react-router-dom';
import SummaryCard from '../../components/Cards/SummaryCard.jsx';
import moment from "moment";
import CreateSessionForm from '../Forms/QuestionForm/CreateSessionForm.jsx';
import Modal from '../../components/Modal.jsx'
// import {CARD_BG} from ''
const QuestionDashboard = () => {
    const navigate = useNavigate();
    const { authUser } = useAuthStore();
    const { sessions = [] ,fetchMySessions} = useSessionStore();

    const [openCreateModal, setOpenCreateModal] = useState();
    const [openDeleteAlert, setDeleteAlert] = useState({
        open: false,
        data: null,
    });

    useEffect(() => {
        fetchMySessions();
        console.log(sessions);
    }, []);
    return (
      <>
      <div className='container mx-auto pt-4 pb-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-6'>
              {sessions?.map((data, index) => (
                  <SummaryCard
                      key={data?._id}
                      colors={CARD_BG[index % CARD_BG.length]}
                      role={data?.role || ""}
                      topicsToFocus={data?.topicsToFocus || ""}
                      experience={data?.experience || ""}
                      questions={data?.questions || []}
                      description={data?.description || ""}
                      lastUpdated={
                          data?.updatedAt
                              ? moment(data.updatedAt).format("Do MM YYYY")
                              : ""
                      }
                      onSelect={() => navigate(`/inteview-question/${data?._id}`)}
                      onDelete={() => setDeleteAlert({ open: true, data })}
                  />
              ))}
          </div>

          <button className='h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-6 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20'
              onClick={() => setOpenCreateModal(true)}
          >
              <Plus className='text-2xl text-white' />
              Add Now
          </button>
      </div>

            <Modal isOpen={openCreateModal}
                onClose={() => {
                    setOpenCreateModal(false);
                }}
                hideHeader
            >
                <div>
                    <CreateSessionForm/>
                </div>
            </Modal>
            </>
      
      
  )
}

export default QuestionDashboard
