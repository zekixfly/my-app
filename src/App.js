import { useState } from "react";
import "./App.scss";
import NotificaitonList from "./components/NotificationList";
import { v4 as uuidv4 } from "uuid"

function App() {
  const title = "通知清單";

  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      id: uuidv4(),
      name: "黃俊翔",
      email: "d34723@tier.org.tw",
    },
    {
      key: "2",
      id: uuidv4(),
      name: "施威廷",
      email: "d34333@tier.org.tw",
    },
  ]);

  return (
    <div className="App">
      <NotificaitonList
        title={title}
        dataSource={dataSource}
        setDataSource={setDataSource}
      />
    </div>
  );
}

export default App;
