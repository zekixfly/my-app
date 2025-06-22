import { useState } from "react";
import "./App.scss";
import NotificaitonList from "./components/NotificationList";

function App() {
  const title = "通知清單";

  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      id: "nl1",
      name: "黃俊翔",
      email: "d34723@tier.org.tw",
    },
    {
      key: "2",
      id: "nl2",
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
