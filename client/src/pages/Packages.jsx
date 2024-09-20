import { PageHeading, Button } from "../components";

const Packages = () => {
  return (
    <>
      <div className="flex justify-between">
        <PageHeading title="Packages" />
        <Button
          text="Create Package"
          icon="document"
          onClick={() => navigate("/users/signup")}
        />
      </div>
    </>
  );
};

export default Packages;
