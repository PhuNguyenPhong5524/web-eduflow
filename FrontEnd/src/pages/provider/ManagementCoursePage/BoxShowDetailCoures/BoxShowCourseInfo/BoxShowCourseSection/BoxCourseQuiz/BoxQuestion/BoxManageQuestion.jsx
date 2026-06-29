import { useState } from "react";
import {
  Drawer,
  Button,
  Empty,
  Spin,
  Space,
  Typography,
} from "antd";
import {
  FileTextOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import BoxQuestionCard from "./BoxQuestionCard";
import BoxAddQuestion from "./BoxAddQuestion";

// hook sẽ làm sau
// import useGetQuestionByQuiz from "../../../../../../../hooks/useQuiz/useGetQuestionByQuiz";

const { Title, Text } = Typography;

const BoxManageQuestion = ({
  quiz,
  refetchQuiz,
}) => {
  const [open, setOpen] = useState(false);

  // Sau sẽ dùng API này
  // const {
  //   data,
  //   isLoading,
  //   isFetching,
  //   refetch,
  // } = useGetQuestionByQuiz(quiz._id);

  // Fake data trước để build UI
  const questions = [
  {
    _id: "1",
    order: 1,
    question: "HTML là viết tắt của gì?",
    answers: [
      {
        _id: "1",
        answer_label: "A",
        answer_text: "Hyper Text Markup Language",
        is_correct: true,
      },
      {
        _id: "2",
        answer_label: "B",
        answer_text: "Hyper Tool Markup Language",
      },
      {
        _id: "3",
        answer_label: "C",
        answer_text: "Home Tool Markup Language",
      },
      {
        _id: "4",
        answer_label: "D",
        answer_text: "Hyper Type Markdown Language",
      },
    ],
  },

  {
    _id: "2",
    order: 2,
    question: "CSS dùng để làm gì?",
    answers: [
      {
        _id: "5",
        answer_label: "A",
        answer_text: "Tạo Database",
      },
      {
        _id: "6",
        answer_label: "B",
        answer_text: "Thiết kế giao diện",
        is_correct: true,
      },
      {
        _id: "7",
        answer_label: "C",
        answer_text: "Lưu dữ liệu",
      },
      {
        _id: "8",
        answer_label: "D",
        answer_text: "Quản lý Server",
      },
    ],
  },
];

  const isLoading = false;
  const isFetching = false;

  const refetch = () => {};

  return (
    <>
      <Button
        type="primary"
        icon={<FileTextOutlined />}
        onClick={() => setOpen(true)}
      >
        Quản lý câu hỏi
      </Button>

      <Drawer
        open={open}
        size={600}
        destroyOnHidden
        title={
          <div>
            <Title
              level={4}
              style={{ marginBottom: 2 }}
            >
                Tiêu đề: {quiz.title}
            </Title>

            <Text type="secondary">
                Mô tả: {quiz.description}
            </Text>
          </div>
        }
        onClose={() => setOpen(false)}
      >
        {/* Header */}

        <div className="flex justify-between mb-6">

          <Button
            icon={<ReloadOutlined spin={isFetching} />}
            onClick={refetch}
            loading={isFetching}
          >
            Làm mới
          </Button>

          <BoxAddQuestion
            quizId={quiz._id}
            refetch={refetch}
          /> 

        </div>

        {/* Loading */}

        {isLoading && (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        )}

        {/* Empty */}

        {!isLoading &&
          questions.length === 0 && (
            <Empty
              description="Quiz chưa có câu hỏi"
            />
          )}

        {/* List */}

        {!isLoading &&
          questions.length > 0 && (
            <Space
              orientation="vertical"
              size={16}
              className="w-full"
            >
              {questions.map((question) => (
                <BoxQuestionCard
                  key={question._id}
                  question={question}
                  refetch={refetch}
                />
              ))}
            </Space>
          )}
      </Drawer>
    </>
  );
};

export default BoxManageQuestion;