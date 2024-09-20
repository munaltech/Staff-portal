import { PageHeading, Button } from "../components"

const Services = () => {
  return (
    <>
    <div className="flex justify-between">
      <PageHeading title="Services" />
      <Button text="Add Service" icon="service" onClick={() => navigate("/users/signup")}/>
    </div>

    
      
    </>
  )
}

export default Services