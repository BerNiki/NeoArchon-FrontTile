export const HomePage = () => {
  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "bisque",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          width: "550px",
          height: "100px",
          borderRadius: "8px",
          border: "rgb(92, 137, 25) solid 2px",
          margin: "auto",
          fontSize: "38px",
          color: "red",
          textShadow: "1px 1px black",
        }}
      >
        Welcome to the world of Archon!
      </div>
      <img
        style={{
          width: "250px",
          height: "250px",
          margin: "auto",
          marginTop: "10px",
        }}
        src="/2366002-a5200_archon.jpg"
      ></img>
    </div>
  );
};
