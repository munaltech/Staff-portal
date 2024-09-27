import Button from "./Button";
import Card from "./Card";

const Error = ({ title, description, error }) => {
    const hide = () => {
      error(false);
    }
  return (
    <div className={`absolute top-0 left-0 bg-black/20 w-full h-screen ${error ? "" : "hidden"}`}>
      <Card className={"flex flex-col justify-center items-center"}>
        <h1 className="space-grotesk-semibold text-lg text-center">
          {title || "Something went wrong"}
        </h1>
        <h3 className="text-center inter-medium text-sm">
          {description || "Please try again later"}
        </h3>
        <Button text="Try Again" onClick={hide} />
      </Card>
    </div>
  );
};

export default Error;
