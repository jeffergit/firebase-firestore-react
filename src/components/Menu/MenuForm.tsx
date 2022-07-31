import { useRef, useState, useEffect } from "react";

/**type */
import { Imenu } from "../../types/menu";
import { Icategory } from "../../types/category";

/**service */
import { menuSave, menuUpdate } from "../../services/menu";

/**antd */
import { Button, Form, Input, InputNumber, Select, message } from "antd";
/**antd-icon */
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

function MenuForm({
  categories,
  formUpdateId,
  modalClose,
  formData,
}: {
  categories: Array<Icategory>;
  formUpdateId: string | null;
  modalClose: VoidFunction;
  formData: Imenu;
}) {
  /**var/state */
  const formRef: any = useRef();
  const [submitLoad, setSubmitLoad] = useState<boolean>(false);

  useEffect(() => {
    if (formData) {
      const { name, category, cost, price, stock, options } = formData;
      formRef?.current?.setFieldsValue({
        name,
        category: category?.id,
        cost,
        price,
        stock,
        options,
      });
    } else {
      formRef?.current?.resetFields();
    }
  }, [formData]);

  const onFinish = async (payload: Imenu) => {
    if (formUpdateId) {
      try {
        await menuUpdate(payload, formUpdateId);
        modalClose();
        message.success({
          content: "Submit success!",
          key: "menuSave",
          duration: 3,
        });
        setSubmitLoad(false);
      } catch (error) {
        console.log(error);
        message.error({
          content: "Submit failed!",
          key: "menuSave",
          duration: 3,
        });
        setSubmitLoad(false);
      }
    } else {
      try {
        await menuSave(payload);
        modalClose();
        message.success({
          content: "Submit success!",
          key: "menuUpdate",
          duration: 3,
        });
        setSubmitLoad(false);
      } catch (error) {
        console.log(error);
        message.error({
          content: "Submit failed!",
          key: "menuUpdate",
          duration: 3,
        });
        setSubmitLoad(false);
      }
    }
  };

  return (
    <div className="form__container">
      <Form
        id="form"
        className={`form form--vertical`}
        ref={formRef}
        name="form-modal"
        layout="vertical"
        size="middle"
        requiredMark={false}
        scrollToFirstError={true}
        onFinish={onFinish}
      >
        <div className="form__items_container">
          <div className="form__item">
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "required" },
                { max: 30, message: "30 characters allowed" },
              ]}
            >
              <Input placeholder="Input..." />
            </Form.Item>
          </div>
          <div className="form__item">
            <Form.Item
              name="categoryId"
              label="Category"
              rules={[{ required: true, message: "required" }]}
            >
              <Select
                placeholder="Select..."
                showSearch
                optionFilterProp="children"
              >
                {categories?.map(({ id, name }: any) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="form__item">
            <Form.Item
              name="cost"
              label="Cost"
              rules={[{ required: true, message: "required" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </div>
          <div className="form__item">
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "required" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </div>
          <div className="form__item">
            <Form.Item
              name="stock"
              label="Stock"
              rules={[{ required: true, message: "required" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </div>
        </div>
        <div className="form__item form__item--list">
          <Form.List name="options" rules={[]}>
            {(fields, { add, remove }, { errors }) => (
              <>
                <div className="ant-col ant-form-item-label">
                  <label>Options :</label>
                </div>
                {fields.map((field: any) => (
                  <div className="form__space" key={field.key}>
                    <div className="form__item">
                      <Form.Item
                        {...field}
                        name={[field.name, "name"]}
                        fieldKey={[field.fieldKey, "name"]}
                        rules={[
                          {
                            required: true,
                            message: "required",
                          },
                        ]}
                      >
                        <Input placeholder="Input..." />
                      </Form.Item>
                    </div>
                    <span className="btn__icon btn__icon--delete">
                      <DeleteOutlined onClick={() => remove(field.name)} />
                    </span>
                  </div>
                ))}
                <div className="form__item form__item--view">
                  <Form.Item>
                    <Button
                      className="btn__cascader"
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add
                    </Button>
                  </Form.Item>
                </div>
                <Form.ErrorList errors={errors} />
              </>
            )}
          </Form.List>
        </div>
        <div className="form__item form__item--btn form__item--view">
          <Form.Item>
            <Button
              data-testid="submit"
              loading={submitLoad}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default MenuForm;
