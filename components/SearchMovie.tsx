import Card from 'antd/lib/card';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Input from 'antd/lib/input';

const SearchMovie = ({ initialValue, onSearch }) => {
  const [form] = useForm();

  const onSubmit = () => {
    const { s: newS = '' } = form.getFieldsValue();
    onSearch && onSearch({ s: newS });
  }

  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{ s: initialValue }}
      >
        <FormItem
          label="Search"
          name="s"
          colon={false}
          rules={[{ required: true, message: 'Please input to search!' }]}
        >
          <Input />
        </FormItem>
      </Form>
    </Card>
  );
};

export default SearchMovie;
