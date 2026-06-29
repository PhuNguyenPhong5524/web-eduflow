import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const BoxAddQuestion = ({ quizId, refetch }) => {
  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
    >
      Thêm câu hỏi
    </Button>
  );
};

export default BoxAddQuestion;