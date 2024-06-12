'use client';
import { animeSeries } from '@/dummyData/dummy';
import { Form, Input, Button, Rate } from 'antd';

function ReviewForm({ id, closeForm }) {
  const [reviewForm] = Form.useForm();
  const handleSubmit = () => {
    const reviewData = reviewForm.getFieldsValue();
    const targetIndex = animeSeries.findIndex(obj => obj.id === id)
    if(targetIndex !== -1){
        animeSeries[targetIndex].reviews.push({...reviewData, animeId: id})
    }
    closeForm()
  };
  return (
    <Form form={reviewForm} name="reviewForm" layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please enter a title' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="body"
        label="Body"
        rules={[
          { required: true, message: 'Please enter the body of the review' },
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="rating"
        label="Rating"
        rules={[{ required: true, message: 'Please rate the anime' }]}
      >
        <Rate />
      </Form.Item>

      <Form.Item
        name="author"
        label="Author"
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Review
        </Button>
      </Form.Item>
    </Form>
  );
}
export default ReviewForm;
