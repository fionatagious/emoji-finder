import React from "react";

interface SearchProps {
  name?: string;
  onChange?: (event: any) => void;
  placeholder: string;
  type: string;
  value?: string;
}

const Search = (props: SearchProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [data, setData] = React.useState<any[]>([]);
  const [message, setMessage] = React.useState("");

  const handleInputChange = (event: any) => {
    const input = event.target.value;
    console.log("handleInputChange", input);
    setSearchTerm(input);
  };

  const handleSubmit = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const key = process.env.REACT_APP_API_KEY;
    const url = `${baseUrl}?search=${searchTerm}&access_key=${key}`;

    // make the API call to get the emoji unicode
    const fetchPromise = fetch(url);
    fetchPromise
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "No results found") {
          setMessage("No results found");
          setData([]);
        } else {
          setMessage(`${data.length} results found`);
          setData(data);
        }
      });
  };

  const handleClick = async (character: any) => {
    try {
      await navigator.clipboard.writeText(character);
      alert("copied!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      {/* Search */}
      <div className="text-left">
        <div className="flex flex-row">
          <input
            className="rounded-md"
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            onChange={handleInputChange}
          />
          <button
            className="text-xl rounded-full px-3 ml-3 bg-slate-200 hover:opacity-80"
            type="submit"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
        {/* Message displaying number of results */}
        <div className="text-white">{message}</div>
      </div>
      {/* Emoji Results */}
      <div className="flex flex-row flex-wrap gap-2">
        {data &&
          data.map((d: any) => (
            <div
              key={d.character}
              onClick={(e: any) => handleClick(d.character)}
              className="my-4 text-5xl bg-slate-100 cursor-pointer hover:opacity-80 p-4 rounded-lg"
            >
              {d.character}
            </div>
          ))}
      </div>
    </>
  );
};

export default Search;
