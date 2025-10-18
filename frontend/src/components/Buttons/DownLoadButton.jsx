import React from 'react';
import { ArrowRight } from "lucide-react";
import jsPDF from 'jspdf';

const DownloadButton = ({ feedbackData }) => {
  const handleDownloadPDF = () => {
    // Create new PDF instance
    const doc = new jsPDF();
    
    // Set document properties
    doc.setProperties({
      title: 'Resume Analysis Report',
      subject: 'Detailed resume feedback and improvement suggestions',
      author: 'ATS Score Tool'
    });

    // Add content to PDF
    let yPosition = 20;
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(41, 128, 185);
    doc.text('Resume Analysis Report', 20, yPosition);
    yPosition += 15;
    
    // Date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, yPosition);
    yPosition += 20;
    
    // Overall Score
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`Overall Score: ${feedbackData.overallScore}/100`, 20, yPosition);
    yPosition += 15;
    
    // Score Breakdown
    doc.setFontSize(12);
    doc.text('Score Breakdown:', 20, yPosition);
    yPosition += 10;
    
    const scores = [
      `• ATS Compatibility: ${feedbackData.ATS.score}/100`,
      `• Content Quality: ${feedbackData.content.score}/100`,
      `• Skills Presentation: ${feedbackData.skills.score}/100`,
      `• Tone & Style: ${feedbackData.toneAndStyle.score}/100`,
      `• Structure & Layout: ${feedbackData.structure.score}/100`
    ];
    
    scores.forEach(score => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(score, 25, yPosition);
      yPosition += 7;
    });
    
    yPosition += 10;
    
    // Key Recommendations
    doc.setFontSize(14);
    doc.setTextColor(41, 128, 185);
    doc.text('Key Recommendations:', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    // Add recommendations from all categories
    Object.entries(feedbackData).forEach(([category, data]) => {
      if (category !== 'overallScore' && data.tips) {
        data.tips.forEach(tip => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          
          if (tip.type === 'improve') {
            doc.setTextColor(231, 76, 60); // Red for improvements
            doc.text(`🔧 ${tip.tip}`, 25, yPosition);
            yPosition += 5;
            doc.text(`   ${tip.explanation}`, 25, yPosition);
            yPosition += 10;
          } else {
            doc.setTextColor(39, 174, 96); // Green for good points
            doc.text(`✅ ${tip.tip}`, 25, yPosition);
            yPosition += 5;
            doc.text(`   ${tip.explanation}`, 25, yPosition);
            yPosition += 10;
          }
        });
      }
    });
    
    // Save the PDF
    doc.save(`Resume-Analysis-Report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="text-center mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
      <h3 className="text-2xl font-bold mb-4">Ready to Improve Your Resume?</h3>
      <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
        Start implementing these suggestions today and watch your resume score improve dramatically.
      </p>
      <button 
        onClick={handleDownloadPDF}
        className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2 shadow-lg"
      >
        <span>Download Detailed Report</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
};


export default DownloadButton;