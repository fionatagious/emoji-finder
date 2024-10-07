import Search from "./components/Search";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <div className="text-3xl mb-4">Find your favorite emojis.</div>
      </header>
      <main>
        <Search
          placeholder="Describe the emoji"
          type="search"
          name="emoji-search"
        />
      </main>
    </>
  );
}

export default App;
