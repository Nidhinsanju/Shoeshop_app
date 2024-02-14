function PageError() {
  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center ",
        }}
      >
        Unexpected Error Occured
      </h1>
      <img
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center ",
          maxHeight: "30%",
          maxWidth: "30%",
        }}
        src="https://cdni.iconscout.com/illustration/premium/thumb/server-maintenance-6992111-5737550.png?f=webp"
        alt="image"
      />
    </div>
  );
}
export default PageError;
