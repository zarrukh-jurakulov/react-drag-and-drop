import "./styles.css";
import DnDBox from "./components/DnDBox";
import DragAndDrop from "./components/DragAndDrop";

export default function App() {
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <DnDBox />
        <DragAndDrop />
      </div>
      ,
    </div>
  );
}
