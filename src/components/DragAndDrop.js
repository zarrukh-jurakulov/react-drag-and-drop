import React from "react";

class Sections extends React.Component {
  initialState = {
    elementsA: [
      "UI/UX дизайнер",
      "Маркетолог",
      "Менеджер по продажам",
      "PHP Developer",
      "Freshers",
      "Joomla Developer",
      "Python",
      "Developer",
      "UX Architect",
      "Human Resource"
    ],
    elementsB: [],
    elementsC: [],
    elementsD: [],
    dragSource: null,
    dragTarget: null
  };
  constructor(props) {
    super(props);
    this.init();
    this.state = this.initialState;
    this.onDrop = this.onDrop.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDragExit = this.onDragExit.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.isDragSource = this.isDragSource.bind(this);
    this.isValidDragTarget = this.isValidDragTarget.bind(this);
    this.isDragTarget = this.isDragTarget.bind(this);
    this.moveElement = this.moveElement.bind(this);
  }

  init() {
    require("./DragAndDrop.css");
  }

  onDrop(e) {
    if (this.isValidDragTarget(this.state.dragTarget)) {
      e.preventDefault();
      const elementId = e.dataTransfer.getData("text/plain");
      this.moveElement(elementId);
    }
  }

  moveElement(id) {
    const sourceElements = this.state[this.state.dragSource].filter(
      (e) => e !== id
    );
    this.setState((state) => ({
      [this.state.dragTarget]: [...state[this.state.dragTarget], id],
      [this.state.dragSource]: sourceElements,
      dragSource: null,
      dragTarget: null
    }));
  }

  onDragStart(source) {
    this.setState({ dragSource: source });
  }

  onDragEnter(e, id) {
    if (this.isValidDragTarget(id)) {
      console.log("set target: " + id);
      this.setState({ dragTarget: id });
    }
  }

  onDragOver(e, id) {
    if (this.isDragTarget(id)) {
      e.preventDefault(); // activate drop zone
    }
  }

  onDragLeave(e, id) {
    if (id === this.state.dragTarget) {
      this.setState({ dragTarget: null });
    }
  }

  onDragExit() {}

  onDragEnd() {
    this.setState({ dragSource: null, dragTarget: null });
  }

  isValidDragTarget(id) {
    return id !== this.state.dragSource;
  }

  isDragTarget(id) {
    return id === this.state.dragTarget && this.state.dragTarget !== null;
  }

  isDragSource(id) {
    return id === this.state.dragSource;
  }

  render() {
    return (
      <>
        <div className="wrapper">
          <div style={{ display: "inline-block" }}>
            <DragAndDrop
              elements={this.state.elementsA}
              id={"elementsA"}
              onDrop={this.onDrop}
              onDragStart={this.onDragStart}
              onDragEnter={this.onDragEnter}
              onDragOver={this.onDragOver}
              onDragLeave={this.onDragLeave}
              onDragExit={this.onDragExit}
              onDragEnd={this.onDragEnd}
              isDragTarget={this.isDragTarget}
              isDragSource={this.isDragSource}
            />
            <DragAndDrop
              elements={this.state.elementsB}
              id={"elementsB"}
              onDrop={this.onDrop}
              onDragStart={this.onDragStart}
              onDragEnter={this.onDragEnter}
              onDragOver={this.onDragOver}
              onDragLeave={this.onDragLeave}
              onDragExit={this.onDragExit}
              onDragEnd={this.onDragEnd}
              isDragTarget={this.isDragTarget}
              isDragSource={this.isDragSource}
            />
            <DragAndDrop
              elements={this.state.elementsC}
              id={"elementsC"}
              onDrop={this.onDrop}
              onDragStart={this.onDragStart}
              onDragEnter={this.onDragEnter}
              onDragOver={this.onDragOver}
              onDragLeave={this.onDragLeave}
              onDragExit={this.onDragExit}
              onDragEnd={this.onDragEnd}
              isDragTarget={this.isDragTarget}
              isDragSource={this.isDragSource}
            />
            <DragAndDrop
              elements={this.state.elementsD}
              id={"elementsD"}
              onDrop={this.onDrop}
              onDragStart={this.onDragStart}
              onDragEnter={this.onDragEnter}
              onDragOver={this.onDragOver}
              onDragLeave={this.onDragLeave}
              onDragExit={this.onDragExit}
              onDragEnd={this.onDragEnd}
              isDragTarget={this.isDragTarget}
              isDragSource={this.isDragSource}
            />
          </div>
        </div>
      </>
    );
  }
}

class DragAndDrop extends React.Component {
  constructor(props) {
    console.log("Creating component " + props.id);
    super(props);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
  }

  onDragOver(e) {
    this.props.onDragOver(e, this.props.id);
  }

  onDragEnter(e) {
    this.props.onDragEnter(e, this.props.id);
  }

  onDragLeave(e) {
    if (e.target.id === this.props.id) {
      this.props.onDragLeave(e, this.props.id);
    }
  }

  onDragExit(e) {}

  onDragStart(e) {
    this.props.onDragStart(this.props.id);
  }

  onDragEnd(e) {
    this.props.onDragEnd();
  }

  onDrop(e) {
    this.props.onDrop(e);
  }

  render() {
    const focused = this.props.isDragTarget(this.props.id) ? "drag-enter" : "";
    return (
      <div
        id={this.props.id}
        key={this.props.id}
        className={"drag-and-drop-wrapper " + focused}
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        onDragEnter={this.onDragEnter}
        onDragLeave={(e) => this.onDragLeave(e)}
        onDrop={this.onDrop}
        onDragOver={this.onDragOver}
      >
        {this.props.elements.map((e) => (
          <DragAndDropElement key={e} element={e} />
        ))}
      </div>
    );
  }
}

const DragAndDropElement = ({ element }) => {
  const onDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.dropEffect = "move";
  };
  return (
    <div
      key={element}
      id={element}
      className={"row"}
      draggable={true}
      onDragStart={onDragStart}
    >
      <Drag /> {element}
    </div>
  );
};

const Drag = () => {
  return <div className={"drag"}>||| </div>;
};

export default Sections;
