import { Card, Button, Typography, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import BoxEditCourseQuiz from "./BoxEditCourseQuiz";
import BoxManageQuestion from "./BoxQuestion/BoxManageQuestion";

const { Title, Paragraph } = Typography;

const BoxShowCourseQuiz = ({ quiz }) => {
  return (
    <Card
      size="small"
      className="mt-3 border border-blue-200 bg-blue-50"
    >
      <Space orientation="vertical" className="w-full">
        <Title level={5} className="!mb-0">
          <FileTextOutlined /> Tiêu đề quiz: <span className="text-[20px] font-bold">{quiz.title}</span>
        </Title>

        <Paragraph className="!mb-2 !ml-5 text-gray-500">
          Mô tả: <span  className="text-[15px] font-semibold">{quiz.description}</span>
        </Paragraph>

        <Space>
          
          <BoxManageQuestion quiz={quiz} />

          <BoxEditCourseQuiz quiz={quiz} />

        </Space>
      </Space>
    </Card>
  );
};

export default BoxShowCourseQuiz;