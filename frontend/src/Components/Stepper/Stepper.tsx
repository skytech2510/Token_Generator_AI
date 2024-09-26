import style from "./stepper.module.scss";

interface StepperProps {
  currentStep: number;
  totalStep: number;
}

const Stepper = (props: StepperProps) => {
  const { currentStep, totalStep } = props;

  return (
    <div className={"window " + style.container}>
      {Array(totalStep)
        .fill(1)
        .map((_v, i) => {
          return (
            <div key={i} className={style.step} data-active={currentStep > i} />
          );
        })}
      <div className={style.stepInfo}>
        Step {currentStep} / {totalStep}
      </div>
    </div>
  );
};

export default Stepper;
