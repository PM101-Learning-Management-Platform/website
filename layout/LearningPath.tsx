import { useEffect } from "react";
import { getLearningPathThunk } from "../redux/slices/learningPath";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ErrorMessage from "../components/ErrorMessage";

export default function LearningPath() {
  const dispatch = useAppDispatch();
  const { learningPaths, error } = useAppSelector((state) => state.learningPath);

  useEffect(() => {
    dispatch(getLearningPathThunk());
  }, [dispatch]);

  if (error) return <ErrorMessage message={error} />

  return (
    <div className="flex items-center justify-center w-screen bg-gray-200">
      {!learningPaths || learningPaths.length === 0 ? (
        <div className="flex items-center justify-center w-screen h-10">
          <p>No learning paths found. We are working on it!</p>
        </div>
      ) : (
        <div className="flex justify-center items-center w-screen p-2 gap-4">
          {learningPaths.map((learningPath) => (
            <div key={learningPath.id} className="h-10 px-2 flex items-center justify-center hover:cursor-pointer hover:bg-[#fb6d56] hover:text-white transition-colors duration-300 rounded-xl">
              <p>{learningPath.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
