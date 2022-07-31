import { useEffect, useState } from "react";

/**firebase */
import { db } from "../../firebase-config";
import { collection, onSnapshot } from "firebase/firestore";

/**service */
import { menuFind, menuFindOne, menuDelete } from "../../services/menu";
import { categoryFind } from "../../services/category";

/**component */
import MenuTable from "./MenuTable";
import MenuForm from "./MenuForm";
import MenuView from "./MenuView";

/**antd */
import { Button, Typography, Card, Modal, message } from "antd";
/**antd-icon */
import { PlusOutlined } from "@ant-design/icons";
/**antd-var */
const { Title } = Typography;

function Menu() {
  /**var/state */

  const [menus, setMenus] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [tableLoad, setTableLoad] = useState<boolean>(true);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [formUpdateId, setFormUpdateId] = useState<null | string>(null);
  const [viewData, setViewData] = useState<any>({});
  const [viewVisible, setViewVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const unsubscribeCategories = onSnapshot(
      collection(db, "categories"),
      (snapshot) => {
        getCategories();
      },
      (error) => {
        console.log(error);
      }
    );
    const unsubscribeMenus = onSnapshot(
      collection(db, "menus"),
      (snapshot) => {
        getMenus();
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsubscribeCategories();
      unsubscribeMenus();
    };
    // eslint-disable-next-line
  }, []);

  const getMenus = async () => {
    try {
      const data: unknown = await menuFind();
      if (data) {
        if (!Array.isArray(data)) {
          throw new Error("not valid array");
        }
        setMenus(data);
        setTableLoad(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const data = await categoryFind();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const create = () => {
    modalOpen();
    setFormUpdateId(null);
  };

  const edit = async (id: string, view?: true | false) => {
    setFormUpdateId(id);
    setViewVisible(false);
    message.loading({
      content: "Loading...",
      key: "edit",
      duration: 0,
    });
    try {
      const data: any = await menuFindOne(id);
      if (data) {
        modalOpen();
        setFormData(data);
        message.loading({
          content: "Loading...",
          key: "edit",
          duration: 0.1,
        });
      }
    } catch (error) {
      console.log(error);
      message.error({
        content: "Get Data Failed!",
        key: "edit",
        duration: 1,
      });
    }
  };

  const view = async (id: string) => {
    message.loading({
      content: "Loading...",
      key: "view",
      duration: 0,
    });
    try {
      const data = await menuFindOne(id);
      if (data) {
        modalOpen();
        setViewData(data);
        setViewVisible(true);
        message.loading({
          content: "Loading...",
          key: "view",
          duration: 0.1,
        });
      }
    } catch (error) {
      console.log(error);
      message.error({
        content: "Get Data Failed!",
        key: "view",
        duration: 1,
      });
    }
  };

  const destroy = async (id: string) => {
    try {
      await menuDelete(id);
      message.success({
        content: "Delete Success!",
        key: "destroy",
        duration: 3,
      });
    } catch (error) {
      console.log(error);
      message.error({
        content: "Delete Failed!",
        key: "destroy",
        duration: 1,
      });
    }
  };

  const modalOpen = () => {
    setViewData({});
    setViewVisible(false);
    setModalVisible(true);
  };

  const modalClose = () => {
    setModalVisible(false);
    setFormData(null);
  };

  return (
    <div className="content">
      <Card className="content__card">
        <div className="content__wrap">
          <div className="table__panel">
            <Title level={3}>Menu List</Title>
            <Button
              data-testid="add"
              onClick={create}
              type="primary"
              icon={<PlusOutlined />}
            />
          </div>
          <MenuTable
            menus={menus}
            categories={categories}
            tableLoad={tableLoad}
            edit={edit}
            view={view}
            destroy={destroy}
          />
        </div>
      </Card>

      <Modal
        className="modal"
        title={viewVisible ? `View` : formUpdateId ? `Update` : `Add`}
        centered
        visible={modalVisible}
        footer={null}
        onCancel={modalClose}
        transitionName=""
      >
        {!viewVisible && (
          <MenuForm
            formUpdateId={formUpdateId}
            categories={categories}
            modalClose={modalClose}
            formData={formData}
          />
        )}
        {viewVisible && <MenuView viewData={viewData} />}
      </Modal>
    </div>
  );
}

export default Menu;
