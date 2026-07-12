import CodeUpload from "./components/CodeUpload";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Arial",
      }}
    >
      <div>
        <h1>🛡️ CodeGuardian AI</h1>
        <CodeUpload />
      </div>
    </div>
  );
}

export default App;