import app from "../index";

const setPort = () => {
  app.listen(process.env.PORT, () => {
    console.log(`connected to ${process.env.PORT || 4000}`);
  });
};

export default setPort;
