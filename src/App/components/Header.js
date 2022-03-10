import Button from "./Button";

function Header() {
  return (
    <header className="bg-transparent h-[6vh] flex flex-row items-center ">
      <div className="flex flex-row p-2 items-center">
        <h1 className="font-extrabold text-xl mr-4">Trello</h1>
        <Button isBlue>Dashboard</Button>
      </div>
    </header>
  );
}

export default Header;
