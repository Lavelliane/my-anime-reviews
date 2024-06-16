'use client';
import { animeSeries } from '@/dummyData/dummy';
import { Form, Input, Button, Rate } from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '@/gql/animes/mutations';
import dayjs from 'dayjs';
import { GET_ANIME, GET_ANIMES } from '@/gql/animes/queries';

function ReviewForm({ id, closeForm, refetch }) {
  const [reviewForm] = Form.useForm();
  const [createReview] = useMutation(CREATE_REVIEW)
  const handleSubmit = async () => {
    const reviewData = reviewForm.getFieldsValue();
    try {
      const res = await createReview({
        variables: {
          data: { ...reviewData, Anime: id, publishedAt: dayjs().format() }
        }
      })
      if(res) {
        refetch()
        closeForm()
      }
    } catch (e) {
      console.error(e)
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
        <Rate allowHalf={true} count={10} />
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
