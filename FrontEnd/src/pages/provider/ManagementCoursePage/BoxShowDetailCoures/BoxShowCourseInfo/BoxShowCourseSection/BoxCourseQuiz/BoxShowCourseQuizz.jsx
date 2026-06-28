import { Card, Button, Typography, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import BoxEditCourseQuiz from "./BoxEditCourseQuiz";

const { Title, Paragraph } = Typography;

const BoxShowCourseQuiz = ({ quiz }) => {
  return (
    <Card
      size="small"
      className="mt-3 border border-blue-200 bg-blue-50"
    >
      <Space direction="vertical" className="w-full">
        <Title level={5} className="!mb-0">
          <FileTextOutlined /> {quiz.title}
        </Title>

        <Paragraph className="!mb-2 text-gray-500">
          {quiz.description}
        </Paragraph>

        <Space>
          
          <Button type="primary">
            Quản lý câu hỏi
          </Button>

          <BoxEditCourseQuiz quiz={quiz} />

        </Space>
      </Space>
    </Card>
  );
};

export default BoxShowCourseQuiz;