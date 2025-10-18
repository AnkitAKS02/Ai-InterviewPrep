import React, { useEffect,useState } from 'react'
import { useParams } from "react-router-dom";
import moment from 'moment';
import { AnimatePresence, motion } from "framer-motion"
import { CircleAlert, ListCollapse } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useSessionStore } from '../../stores/useSessionStore.js';
import { useAIStore } from '../../stores/useAIStore';
import { useQuestionStore } from '../../stores/useQuestionStore.js';
import RoleInfoHeader from '../../components/QuestionComponents/RoleInfoHeader.jsx';
import QuestionCard from '../../components/Cards/QuestionCard.jsx';
const InterviewQuestion = () => {
  const {fetchSessionById} = useSessionStore();
  const {generateConceptExplanation} = useAIStore();
  const {togglePinQuestion} = useQuestionStore();
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMoreDrawer, setLearnMoreDrawer] = useState(false);
  const [explaination, setExplanation] = useState(null);

  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = async () => {
    const res = await fetchSessionById(sessionId);
    setSessionData(res);
  }

  const generateTheConceptExplanation = (question)=>{generateConceptExplanation(question);}

  const toggleThePinQuestion = (id) => {
    // togglePinQuestion(id);
  }

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }

    return () => { }
  }, []);
  return (
    <div className='mt-6 gap-6 flex flex-col'>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={sessionData?.updatedAt ? moment(sessionData?.updatedAt).format("Do MMM YYYY") : ""}
      />

      <div className='container mx-auto pt-4 pb-4 md:px-8'>
        <h2 className='text-lg font-semibold text-black-500 '>Interview Q&A</h2>

        <div className='grid grid-cols-12 gap-4 mt-5 mb-10'>
          <div className={`col-span-12 ${openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"} `}>
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 100, delay: index * 0.1, damping: 15 }}
                    layout
                    layoutId={`question-${data._id || index}`}
                  >
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      onLearnMore={() => generateTheConceptExplanation(data.question)}
                      isPinned={data?.isPinned}
                      onTogglePin={() => toggleThePinQuestion(data?._id)}
                    />
                  </motion.div>
                )
              
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterviewQuestion
