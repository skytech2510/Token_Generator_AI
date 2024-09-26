import style from "./progressLoader.module.scss";

const ProgressLoader = () => {
  return (
    <div className={"window " + style.container}>
      <div className={style.loader} />
    </div>
  );
};

export default ProgressLoader;
