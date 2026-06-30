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
          quiz.questions.length === 0 && (
            <Empty
              description="Quiz chưa có câu hỏi"
            />
          )}

        {/* List */}

        {!isLoading &&
          quiz.questions.length > 0 && (
            <Space
              orientation="vertical"
              size={16}
              className="w-full"
            >
              {quiz.questions.map((question) => (
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