import React, { useEffect, useRef, useState } from "react";
import Timer from "./Timer";
import { motion } from "framer-motion";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import axios from "axios";
import { ServerUrl } from "../App";
import { BsArrowRight } from "react-icons/bs";

const Step2SetUp = ({ interviewData, onFinish }) => {
  const { interviewId, questions = [], userName = "Candidate" } =
    interviewData || {};

  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const [timeLeft, setTimeLeft] = useState(
    questions?.[0]?.timeLimit || 60
  );

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voiceGender, setVoiceGender] = useState("female");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subtitle, setSubtitle] = useState("");

  const recognitionRef = useRef(null);
  const videoRef = useRef(null);

  const currentQuestion = questions?.[currentIndex];

  // Video source from PUBLIC folder
  const videoSource =
    voiceGender === "male"
      ? "/videos/male-ai.mp4"
      : "/videos/female-ai.mp4";

  // ------------------ Load Voices ------------------

  useEffect(() => {
    const loadVoices = () => {
      if (!window.speechSynthesis) return;

      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      const femaleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("samantha")
      );

      const maleVoice = voices.find((v) =>
        v.name.toLowerCase().includes("david")
      );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
      } else if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
      } else {
        setSelectedVoice(voices[0]);
      }
    };

    loadVoices();

    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // ------------------ Speak Function ------------------

  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic();
        videoRef.current?.play();
        setSubtitle(text);
      };

      utterance.onend = () => {
        setIsAIPlaying(false);

        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }

        if (isMicOn) startMic();

        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  // ------------------ Intro + Question ------------------

  useEffect(() => {
    if (!selectedVoice) return;

    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, welcome to your AI interview.`
        );
        await speakText(
          "I will ask a few questions. Please answer naturally."
        );
        setIsIntroPhase(false);
      } else if (currentQuestion) {
        await new Promise((r) => setTimeout(r, 800));
        await speakText(currentQuestion.question);

        if (isMicOn) startMic();
      }
    };

    runIntro();
  }, [selectedVoice, isIntroPhase, currentIndex]);

  // ------------------ Timer ------------------

  useEffect(() => {
    if (isIntroPhase || !currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isIntroPhase]);

  useEffect(() => {
    if (!isIntroPhase && currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit || 60);
    }
  }, [currentIndex]);

  // ------------------ Speech Recognition ------------------

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;

      setAnswer((prev) => prev + " " + transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  const startMic = () => {
    if (!recognitionRef.current || isAIPlaying) return;

    try {
      recognitionRef.current.start();
    } catch (err) {}
  };

  const stopMic = () => {
    recognitionRef.current?.stop();
  };

  const toggleMic = () => {
    if (isMicOn) stopMic();
    else startMic();

    setIsMicOn(!isMicOn);
  };

  // ------------------ Submit Answer ------------------

  const submitAnswer = async () => {
    if (isSubmitting) return;

    stopMic();
    setIsSubmitting(true);

    try {
      const result = await axios.post(
        `${ServerUrl}/api/interview/submit-answer`,
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
          timeTaken:
            (currentQuestion?.timeLimit || 60) - timeLeft,
        },
        { withCredentials: true }
      );

      setFeedback(result.data.feedback);
      speakText(result.data.feedback);
    } catch (err) {
      console.log(err);
    }

    setIsSubmitting(false);
  };

  // ------------------ Next Question ------------------

  const handleNext = async () => {
    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }

    await speakText("Let's move to the next question.");

    setCurrentIndex((prev) => prev + 1);
  };

  // ------------------ Finish Interview ------------------

  const finishInterview = async () => {
  stopMic();
  setIsMicOn(false);

  try {
    const result = await axios.post(
      `${ServerUrl}/api/interview/finish`,
      { interviewId },
      { withCredentials: true }
    );

    // send report data to InterviewPage
    onFinish?.(result.data);

  } catch (err) {
    console.log(err);
  }
};

  // ------------------ Auto Submit ------------------

  useEffect(() => {
    if (isIntroPhase || !currentQuestion) return;

    if (timeLeft === 0 && !feedback) {
      submitAnswer();
    }
  }, [timeLeft]);

  // ------------------ Cleanup ------------------

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-4">

      <div className="w-full max-w-7xl min-h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">

        {/* VIDEO SECTION */}

        <div className="lg:w-[35%] p-6 border-r">

          <video
            src={videoSource}
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            className="w-full rounded-xl"
          />

          {subtitle && (
            <div className="mt-4 bg-gray-50 p-4 rounded-xl">
              <p className="text-center">{subtitle}</p>
            </div>
          )}

          <div className="mt-6">
            <Timer
              timeLeft={timeLeft}
              totalTime={currentQuestion?.timeLimit || 60}
            />
          </div>
        </div>

        {/* TEXT SECTION */}

        <div className="flex-1 p-6 flex flex-col">

          {!isIntroPhase && currentQuestion && (
            <div className="mb-6 bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-400">
                Question {currentIndex + 1} of {questions.length}
              </p>
              <p className="text-lg font-semibold">
                {currentQuestion.question}
              </p>
            </div>
          )}

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="flex-1 bg-gray-100 p-4 rounded-xl resize-none"
          />

          {!feedback ? (
            <div className="flex gap-4 mt-6">

              <motion.button
                onClick={toggleMic}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center"
              >
                {isMicOn ? (
                  <FaMicrophone />
                ) : (
                  <FaMicrophoneSlash />
                )}
              </motion.button>

              <button
                onClick={submitAnswer}
                className="flex-1 bg-emerald-500 text-white rounded-xl"
              >
                Submit Answer
              </button>

            </div>
          ) : (
            <div className="mt-6 bg-emerald-50 p-4 rounded-xl">

              <p className="mb-4">{feedback}</p>

              <button
                onClick={handleNext}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
              >
                Next Question <BsArrowRight />
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Step2SetUp;
