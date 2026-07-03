import { Button } from "antd";
import {
  FileTextOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

const BoxQuizCardItem = ({ quiz, onStartQuiz }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3525CD]/10">
          {quiz.is_completed ? (
            <CheckCircleFilled className="text-[#0058be] text-[22px]" />
          ) : (
            <FileTextOutlined className="text-[#3525CD] text-[22px]" />
          )}
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">
            {quiz.title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {quiz.description ||
              "Hoàn thành bài kiểm tra để mở khóa chương học tiếp theo."}
          </p>

          <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
            {quiz.question_count && (
              <span>{quiz.question_count} câu hỏi</span>
            )}

            {quiz.duration && (
              <span>{quiz.duration} phút</span>
            )}
          </div>
        </div>
      </div>

      <Button
        type={quiz.is_completed ? "default" : "primary"}
        className="rounded-lg"
        onClick={() => onStartQuiz?.(quiz)}
      >
        {quiz.is_completed ? "Làm lại" : "Làm bài"}
      </Button>
    </div>
  );
};

export default BoxQuizCardItem;