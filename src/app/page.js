'use client';

import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '@/gql/animes/mutations';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Righteous } from 'next/font/google';

const righteous = Righteous({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const App = () => {
  const router = useRouter();
  const [loginUser] = useMutation(LOGIN_USER);
  const [loginForm] = Form.useForm();
  const onFinish = async () => {
    try {
      const res = await loginUser({
        variables: {
          input: loginForm.getFieldsValue(),
        },
      });
      if (res) {
        const { jwt, user } = res.data.login;
        Cookies.set('jwt', jwt, { expires: 1 });
        router.push('/home');
      }
    } catch (error) {
      loginForm.setFields([
        {
          name: 'identifier',
          errors: ['Username or Email does not exists.'],
        },
      ]);
    }
  };

  return (
    <>
      <div className='flex justify-center items-center flex-col h-screen w-full max-w-[100%]'>
        <p className={`${righteous.className} text-royal-purple text-2xl mb-7`}>
          MyAnime
        </p>
        <Form
          form={loginForm}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="identifier"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default App;
