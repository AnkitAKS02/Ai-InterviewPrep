export const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (
  `You are an AI trained to generate technical interview questions and answers.
  
  Task:
  - Role: ${role}
  - Candidate Experience: ${experience} years
  - Focus Topics: ${topicsToFocus}
  - Write ${numberOfQuestions} interview questions.
  - For each question, generate a detailed but beginner-friendly answer.
  - If the answer needs a code example, add a small code block inside.
  - Keep formatting very clean.
  - Return a pure JSON array like:
    [
      {
        "question": "Question here?",
        "answer": "Answer here."
      }
    ]

  Important: Do NOT add any extra text. Only return valid JSON.
  `
);

export const conceptExplainPrompt = (question) => (`
You are an AI trained to generate explanations for a given interview question.

Task:
- Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
- Question: "${question}"
- After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
- If the explanation includes a code example, provide a small code block.
- Keep the formatting very clean and clear.
- Return the result as a valid JSON object in the following format:

{
  "title": "Short title here?",
  "explanation": "Explanation here."
}

Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
`);

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";
          tip: string; //give 3-4 tips
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
    }`;

export const prepareInstructions = ({ jobTitle, text }) => (
  `You are an expert in ATS (Applicant Tracking System) and resume analysis.
      Please analyze and rate this resume and suggest how to improve it.
      The rating can be low if the resume is bad.
      Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
      If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
      If available, use the job title for the job user is applying to to give more detailed feedback.
      If provided, take the job title into consideration.
      The job title is: ${jobTitle}
      The resume is:
      ${text}
      Provide the feedback using the following format:
      ${AIResponseFormat}
      Return the analysis as an JSON object, without any other text and without the backticks.
      Do not include any other text or comments.`
);

export const generateInterviewPrompt = (role, jobDescription, experience, topicsToFocus) =>( `
You are an AI specialized in creating realistic technical interview questions.

Task:
- Job Role: ${role}
- Candidate Experience: ${experience} years
- Job Description: ${jobDescription}
${topicsToFocus ? `- Additional Focus Areas: ${topicsToFocus}` : ""}
- Generate 10 unique, relevant interview questions that match the job role and description.
- Make sure the difficulty suits the experience level.
- Return questions only — no answers, no explanations.
- Keep the formatting clean and concise.
- Respond strictly in pure JSON format:
  [
    { "question": "Your question here?" },
    { "question": "Next question?" }
  ]

Important: Return only valid JSON. Do NOT include extra text, markdown, or commentary.
`
);

