import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  CartesianGrid,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Step3SetUp = ({ report }) => {
  const navigate = useNavigate();

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading Report...</p>
      </div>
    );
  }

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = []
  } = report;

  const percentage = (finalScore / 10) * 100;
  const avgSkill = ((confidence + communication + correctness) / 3).toFixed(1);
  const bestScore = Math.max(...questionWiseScore.map(q => q.score || 0));
  const worstScore = Math.min(...questionWiseScore.map(q => q.score || 0));

  const grade =
    finalScore >= 9 ? "A+" :
    finalScore >= 8 ? "A" :
    finalScore >= 7 ? "B+" :
    finalScore >= 6 ? "B" :
    finalScore >= 5 ? "C" : "D";

  const readiness =
    finalScore >= 8 ? "Job Ready" :
    finalScore >= 6 ? "Almost Ready" :
    "Needs Practice";

  const radarData = [
    { skill: "Confidence", score: confidence },
    { skill: "Communication", score: communication },
    { skill: "Correctness", score: correctness }
  ];

  const questionScoreData = questionWiseScore.map((q, i) => ({
    name: `Q${i + 1}`,
    score: q.score || 0
  }));

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness }
  ];

  const insights = [
    finalScore >= 8
      ? "You demonstrate strong clarity and confidence."
      : "Focus on structuring answers more clearly.",
    communication < 6
      ? "Improve articulation and speaking pace."
      : "Your communication is strong.",
    correctness < 6
      ? "Review core technical concepts."
      : "Your technical correctness is good."
  ];

  const recommendations = [
    "Practice mock interviews weekly",
    "Use STAR method for structured answers",
    "Reduce filler words while speaking",
    "Explain technical concepts clearly"
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = 20;

    doc.setFillColor(16, 185, 129);
    doc.rect(0, 0, pageWidth, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("AI Interview Performance Report", pageWidth / 2, 18, { align: "center" });

    y = 40;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Performance Summary", margin, y);

    y += 5;

    autoTable(doc, {
      startY: y + 5,
      head: [["Metric", "Value"]],
      body: [
        ["Final Score", `${finalScore} / 10`],
        ["Confidence", confidence],
        ["Communication", communication],
        ["Correctness", correctness],
        ["Average Skill", avgSkill],
        ["Grade", grade],
        ["Readiness", readiness]
      ],
      theme: "grid",
      styles: { fontSize: 11, cellPadding: 4, halign: "center", valign: "middle" },
      headStyles: { fillColor: [16, 185, 129], textColor: 255, fontStyle: "bold", halign: "center" },
      alternateRowStyles: { fillColor: [245, 255, 250] },
      columnStyles: {
        0: { halign: "left", fontStyle: "bold" },
        1: { halign: "center" }
      },
      margin: { left: margin, right: margin }
    });

    y = doc.lastAutoTable.finalY + 12;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Question-wise Analysis", margin, y);

    y += 5;

    autoTable(doc, {
      startY: y + 5,
      head: [["#", "Question", "Score", "Feedback"]],
      body: questionWiseScore.map((q, i) => [
        i + 1,
        q.question,
        `${q.score}/10`,
        q.feedback || "No feedback"
      ]),
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 4, overflow: "linebreak", valign: "middle" },
      headStyles: { fillColor: [34, 197, 94], textColor: 255, fontStyle: "bold", halign: "center" },
      alternateRowStyles: { fillColor: [245, 255, 250] },
      columnStyles: {
        0: { halign: "center", cellWidth: 12 },
        1: { cellWidth: 80 },
        2: { halign: "center", cellWidth: 20 },
        3: { cellWidth: "auto" }
      },
      margin: { left: margin, right: margin }
    });

    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setDrawColor(200);
    doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);

    doc.setFontSize(9);
    doc.setTextColor(120);

    doc.text("Generated by AI Interview Analyzer", margin, pageHeight - 12);

    doc.text(
      `Generated on ${new Date().toLocaleDateString()}`,
      pageWidth - margin,
      pageHeight - 12,
      { align: "right" }
    );

    doc.save("AI_INTERVIEW_REPORT.pdf");
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-linear-to-br from-gray-50 to-green-50 px-6 lg:px-10 py-8"
    >
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/history")}
            className="p-3 rounded-full bg-white shadow"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Interview Analytics Dashboard
            </h1>
            <p className="text-gray-500">
              AI Powered Performance Insights
            </p>
          </div>
        </div>

        <button
          onClick={downloadPDF}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow"
        >
          Download PDF
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Final Score", value: finalScore, color: "text-green-600" },
          { title: "Average Skill", value: avgSkill },
          { title: "Best Question", value: bestScore },
          { title: "Lowest Score", value: worstScore, color: "text-red-500" }
        ].map((c, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow p-5"
          >
            <p className="text-gray-500 text-sm">{c.title}</p>
            <p className={`text-2xl font-bold ${c.color || ""}`}>
              <CountUp end={c.value} duration={2} />
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-3xl shadow-lg p-8 text-center"
          >
            <h3 className="text-gray-500 mb-6">Overall Performance</h3>

            <div className="w-36 h-36 mx-auto">
              <CircularProgressbar
                value={percentage}
                text={`${finalScore}/10`}
                styles={buildStyles({
                  pathColor: "#10b981",
                  textColor: "#ef4444",
                  trailColor: "#e5e7eb"
                })}
              />
            </div>

            <p className="text-gray-400 mt-3 text-sm">Out of 10</p>

            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-3 inline-block px-4 py-1 rounded-full bg-green-100 text-green-600 text-sm font-semibold"
            >
              {readiness}
            </motion.span>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-white rounded-3xl shadow p-8"
          >
            <h3 className="font-semibold mb-6">Skill Evaluation</h3>

            <div className="space-y-5">
              {skills.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span>{s.label}</span>
                    <span className="text-green-600 font-semibold">
                      {s.value}
                    </span>
                  </div>

                  <div className="bg-gray-200 h-3 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.value * 10}%` }}
                      transition={{ duration: 1 }}
                      className="bg-green-500 h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-white rounded-3xl shadow p-6"
          >
            <h3 className="font-semibold mb-4">AI Insights</h3>

            <ul className="space-y-3 text-sm">
              {insights.map((i, index) => (
                <li key={index}>💡 {i}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-3xl shadow p-8"
          >
            <h3 className="font-semibold mb-6">Skill Radar</h3>

            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis domain={[0, 10]} />
                <Radar
                  dataKey="score"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-white rounded-3xl shadow p-8"
          >
            <h3 className="font-semibold mb-6">Performance Trend</h3>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionScoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#22c55e"
                    fill="#bbf7d0"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-white rounded-3xl shadow p-8"
          >
            <h3 className="font-semibold mb-6">Question Analysis</h3>

            <div className="space-y-5">
              {questionWiseScore.map((q, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">
                      Q{i + 1}. {q.question}
                    </h4>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        (q.score || 0) >= 8
                          ? "bg-green-100 text-green-700"
                          : (q.score || 0) >= 5
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      Score: {q.score || 0}/10
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm">
                    💬 {q.feedback || "No feedback available"}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-white rounded-3xl shadow p-6"
          >
            <h3 className="font-semibold mb-4">AI Recommendations</h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {recommendations.map((r, i) => (
                <div
                  key={i}
                  className="bg-green-50 border border-green-200 p-3 rounded-lg text-sm"
                >
                  ✅ {r}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Step3SetUp;