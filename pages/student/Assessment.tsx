import { useEffect, useState } from "react";
import {
  getAssessment,
  submitAssessment,
  type submitAssessmentDTO,
} from "../../api/assessment";
import { Link, useParams } from "react-router-dom";
import type { Assessment } from "../../types/assessment";
import Loader from "../../components/Loader";

interface breakdown {
  questionId: string;
  answer: string;
  isCorrect: boolean;
  correctAnswer: "a" | "b" | "c" | "d";
}

interface SubmittedResult {
  score: number;
  percentage: number;
  passed: boolean;
  breakdown: breakdown[];
}

export default function Assessment() {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [time, setTime] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, "a" | "b" | "c" | "d">>(
    {},
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedResult, setSubmittedResult] =
    useState<SubmittedResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();

  const currentQuestion = assessment?.questions[currentQuestionIndex];

  const nextQuestion = () => {
    if (
      assessment?.questions &&
      currentQuestionIndex < assessment?.questions.length - 1
    ) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };
  const setAnswer = (answer: "a" | "b" | "c" | "d") => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion?.id]: answer,
    }));
  };

  useEffect(() => {
    if (!id) return;
    getAssessment(id).then((assessment) => {
      setAssessment(assessment);
      setTime(assessment.timeLimit * 60);
    });
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
      if (time === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const mins = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const secs = (time % 60).toString().padStart(2, "0");

  const payload: submitAssessmentDTO = {
    answers: Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    })),
  };

  const handleSubmit = () => {
    setIsLoading(true);
    submitAssessment(id!, payload)
      .then((res) => {
        setSubmittedResult(res.data);
        setIsSubmitted(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRetakeCourse = () => {
    setIsSubmitted(false);
    setSubmittedResult(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTime(assessment!.timeLimit * 60);
  };

  if (!assessment || isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-3 flex flex-col items-center justify-center min-h-screen">
      {isSubmitted ? (
        <div className="max-w-4xl mx-auto w-full min-h-[90vh] flex flex-col items-center px-4 py-8 rounded-lg bg-[#fb6d56]/15">
          <div className="w-full h-full flex flex-col items-center gap-5 justify-center">
            <h1 className="text-2xl font-medium">Your result</h1>

            {/* Score Circle */}
            <div className="w-28 h-28 rounded-full border-4 border-[#fb6d56] bg-white flex flex-col items-center justify-center">
              <span className="text-3xl font-medium text-[#fb6d56]">
                {submittedResult?.score}%
              </span>
              <span className="text-xs text-gray-400">score</span>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex flex-col gap-1">
                <span className="text-2xl font-medium">
                  {
                    submittedResult?.breakdown?.filter((r) => r.isCorrect)
                      .length
                  }
                  /{assessment?.questions.length}
                </span>
                <span className="text-xs text-gray-500">correct answers</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex flex-col gap-1">
                <span className="text-2xl font-medium">
                  {
                    submittedResult?.breakdown?.filter((r) => !r.isCorrect)
                      .length
                  }
                  /{assessment?.questions.length}
                </span>
                <span className="text-xs text-gray-500">wrong answers</span>
              </div>
            </div>

            {/* Pass/Fail Badge */}
            <span
              className={`py-2 px-6 rounded-lg text-white font-medium ${submittedResult?.passed ? "bg-green-600" : "bg-red-600"}`}
            >
              {submittedResult?.passed ? "Passed ✓" : "Failed ✗"}
            </span>

            {/* Buttons */}
            <div className="flex gap-3 flex-wrap justify-center">
              <Link
                to="/student"
                className="text-sm sm:text-base font-medium text-[#fb5d56] bg-white border border-[#fb5d56] py-2 px-5 rounded-lg hover:bg-[#fb5d56]/80 hover:text-white transition-colors duration-200"
              >
                Back to dashboard
              </Link>
              <button
                onClick={handleRetakeCourse}
                className="text-sm sm:text-base font-medium text-[#fb5d56] bg-white border border-[#fb5d56] py-2 px-5 rounded-lg hover:bg-[#fb5d56]/80 hover:text-white transition-colors duration-200"
              >
                Retake course
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 w-full max-w-2xl mx-auto px-4 py-6">
          {/* Question Card */}
          <div className="w-full bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-5">
            {/* Meta row */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 bg-[#fb6d56]/10 rounded-lg px-3 py-1.5">
                <svg
                  className="w-4 h-4 text-[#fb6d56]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium text-[#fb6d56]">
                  {mins}:{secs}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                <span className="text-gray-800 font-medium">
                  {currentQuestionIndex + 1}
                </span>{" "}
                / {assessment?.questions.length}
              </span>
              <span className="text-xs text-gray-400">
                {assessment?.timeLimit} min
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#fb6d56] rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / (assessment?.questions.length ?? 1)) * 100}%`,
                }}
              />
            </div>

            {/* Question text */}
            <p className="text-base sm:text-lg font-medium text-center leading-relaxed text-gray-800">
              {currentQuestion?.text}
            </p>

            {/* Options */}
            <div className="flex flex-col gap-2.5 w-full">
              {Object.entries(currentQuestion!.options).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    setAnswer(key as "a" | "b" | "c" | "d");
                    nextQuestion();
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm sm:text-base text-left transition-all duration-150
            ${
              answers[currentQuestion!.id] === key
                ? "border-[#fb6d56] bg-[#fb6d56]/10 text-[#c94535] font-medium"
                : "border-gray-200 bg-white text-gray-700 hover:border-[#fb6d56]/50 hover:bg-[#fb6d56]/5"
            }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between w-full">
            <button
              onClick={previousQuestion}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 text-sm hover:border-[#fb6d56]/40 hover:text-[#fb6d56] transition-all duration-150"
            >
              ← Previous
            </button>
            <button
              onClick={
                assessment?.questions.length === currentQuestionIndex + 1
                  ? handleSubmit
                  : nextQuestion
              }
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#fb6d56] text-white text-sm font-medium hover:bg-[#e05a44] transition-all duration-150"
            >
              {assessment?.questions.length === currentQuestionIndex + 1
                ? "Submit"
                : "Next →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
