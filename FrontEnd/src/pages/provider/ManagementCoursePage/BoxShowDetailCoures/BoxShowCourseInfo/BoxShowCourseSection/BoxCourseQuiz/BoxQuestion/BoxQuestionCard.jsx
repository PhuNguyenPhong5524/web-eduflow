import { Card, Typography, Tag, Space, Button, Divider } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const BoxQuestionCard = ({ question, onEdit, onDelete }) => {
  return (
    <Card
      hoverable
      className="shadow-sm"
      style={{
        borderRadius: 10,
      }}
    >
      <div className="flex justify-between items-start">

        <div>

          <Title level={5}>
            {question.order}. {question.question}
          </Title>

          <Divider style={{ margin: "12px 0" }} />

          <div className="space-y-3">

            {question.answers?.map((answer) => (

              <div
                key={answer._id}
                className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                  answer.is_correct
                    ? "bg-green-50 border border-green-300"
                    : "bg-gray-50 border"
                }`}
              >
                <div>

                  <Text strong>
                    {answer.answer_label}.
                  </Text>

                  <Text className="ml-2">
                    {answer.answer_text}
                  </Text>

                </div>

                {answer.is_correct && (
                  <Tag color="green">
                    Đáp án đúng
                  </Tag>
                )}

              </div>

            ))}

          </div>

        </div>

        <Space direction="vertical">

          <Button
            icon={<EditOutlined />}
            onClick={onEdit}
          >
            Sửa
          </Button>

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={onDelete}
          >
            Xóa
          </Button>

        </Space>

      </div>
    </Card>
  );
};

export default BoxQuestionCard;