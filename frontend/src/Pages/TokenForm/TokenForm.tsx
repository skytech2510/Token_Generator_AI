import pickImg from "Assets/Images/Icons/pick-img.png";
import classNames from "classnames";
import Modal from "Components/Modal";
import ProgressLoader from "Components/ProgressLoader/ProgressLoader";
import Stepper from "Components/Stepper";
import {
  TokenCookingScene,
  TokenFormStep1Scene,
  TokenFormStep2Scene,
  TokenFormStep3Scene,
} from "Components/StoryBoardScene";
import TokenTraits from "Components/TokenTraits/TokenTraits";
import React, { useRef, useState } from "react";
import backendServiceInstance from "Services/backendServices";
import useAppStore from "Store/appStore";
import useAuthStore from "Store/authStore";
import useCreateTokenStore from "Store/createTokenStore";
import useRouteStore from "Store/routeStore";
import useStoryStore, {
  coreTraitsEmptyErrorSamples,
  coreTraitsMoreThan4ErrorSamples,
  coreTraitsTriggerSamples,
  getRandomElement,
  symbolNameSelectedSamples,
  symbolNameSizeErrorSamples,
  symbolNameTriggerSamples,
  tokenFeeHigh,
  tokenFeeLow,
  tokenFeeMedium,
  tokenNameErrorSamples,
  tokenNameSelectedSamples,
  tokenNameTriggerSamples,
  tokenSupplyHigh,
  tokenSupplyLow,
  tokenSupplyMedium,
  tokenSupplyVeryHigh,
  tokenSupplyZero,
  symbolNameUniqueErrorSamples,
  tokenFeeZero,
} from "Store/storyStore";
import { useDebouncedCallback } from "use-debounce";
import { backendCanisterId } from "Utils/constants";
import style from "./tokenForm.module.scss";
import Tooltip from "Components/Tooltip/Tooltip";

const TokenFormStepper = React.memo(() => {
  const totalStep = useCreateTokenStore((s) => s.totalStep);
  const currentStep = useCreateTokenStore((s) => s.currentStep);

  return <Stepper totalStep={totalStep} currentStep={currentStep} />;
});

const NameField = () => {
  const name = useCreateTokenStore((s) => s.name);
  const setField = useCreateTokenStore((s) => s.setField);
  const setStage = useStoryStore((s) => s.setStage);

  const [message, setMessage] = useState("");

  const updateHelperMessage = useDebouncedCallback(async (value) => {
    const isUniqueName = await backendServiceInstance.uniqueTokenName(value);
    console.log("isUniqueName", isUniqueName);
    if (isUniqueName == false) {
      setMessage(getRandomElement(tokenNameErrorSamples));
      setStage("token_form_step_1_name_field_error");
    } else {
      setMessage(
        getRandomElement(
          value.length > 0 ? tokenNameSelectedSamples : tokenNameTriggerSamples
        )
      );
      value.length > 0
        ? setStage("token_form_step_1_name_field_selected")
        : setStage("token_form_step_1_name_missing");
    }
  }, 500);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setField("name", e.target.value.trim());
    updateHelperMessage(e.target.value.trim());
  };

  return (
    <div className={style.inputGroup}>
      <label>Token Name</label>
      <div
        className={style.inputContainer}
        data-isvalid={
          name.length == 0 ||
          tokenNameErrorSamples.includes(message) ||
          tokenNameTriggerSamples.includes(message)
            ? false
            : true
        }
      >
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
      </div>
      {/* {message.length > 0 ? <div>{message}</div> : null} */}
    </div>
  );
};

const SymbolField = () => {
  const symbol = useCreateTokenStore((s) => s.symbol);
  const setField = useCreateTokenStore((s) => s.setField);
  const setStage = useStoryStore((s) => s.setStage);

  const [message, setMessage] = useState("");

  const updateHelperMessage = useDebouncedCallback(async (value) => {
    const isUniqueSymbol = await backendServiceInstance.uniqueTokenSymbol(
      value
    );
    console.log("isUniqueSymbol", isUniqueSymbol);
    if (isUniqueSymbol == false) {
      setMessage(getRandomElement(symbolNameUniqueErrorSamples));
    } else {
      setMessage(
        getRandomElement(
          value.length > 6
            ? symbolNameSizeErrorSamples
            : value.length > 0
            ? symbolNameSelectedSamples
            : symbolNameTriggerSamples
        )
      );
      value.length > 6
        ? setStage("token_form_step_1_symbol_too_long")
        : value.length > 0
        ? setStage("token_form_step_1_symbol_selected")
        : setStage("token_form_step_1_symbol_missing");
    }
  }, 500);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setField("symbol", e.target.value.trim());
    updateHelperMessage(e.target.value.trim());
  };

  return (
    <div className={style.inputGroup}>
      <label data-isvalid={true}>Token Symbol</label>
      <div
        className={style.inputContainer}
        data-isvalid={
          symbol.length == 0 ||
          symbolNameSizeErrorSamples.includes(message) ||
          symbolNameUniqueErrorSamples.includes(message) ||
          symbolNameTriggerSamples.includes(message)
            ? false
            : true
        }
      >
        <input
          type="text"
          name="symbol"
          value={symbol}
          onChange={handleInputChange}
          minLength={1}
        />
      </div>
      {symbolNameSizeErrorSamples.includes(message) && (
        <Tooltip
          label="Yo Better keep it short! as Twitter/X. Tickers can only be 6 characters, MAX!"
          className={style.tooltip}
          bubbleClassName={style.tooltipBubble}
        />
      )}
      <div>
        {/* <span>{message.length > 0 ? message : ""}</span> */}
        {/* <span>Character Limit: 6 character</span> */}
      </div>
    </div>
  );
};

const CoreTraitsField = () => {
  const coreTraits = useCreateTokenStore((s) => s.coreTraits);
  const setField = useCreateTokenStore((s) => s.setField);

  const [message, setMessage] = useState("");

  const updateHelperMessage = useDebouncedCallback(async (value: string[]) => {
    console.log(value);
    setMessage(
      getRandomElement(
        value.length > 4
          ? coreTraitsMoreThan4ErrorSamples
          : value.length == 0
          ? coreTraitsEmptyErrorSamples
          : coreTraitsTriggerSamples
      )
    );
  }, 500);

  const handleInputChange = (e: string[]) => {
    setField("coreTraits", e);
    updateHelperMessage(e);
  };

  return (
    <div className="token-core-traits">
      <div className={style.inputGroup}>
        <label data-isvalid={true}>Token Core Traits:</label>

        <div
          className={style.inputContainer}
          data-isvalid={coreTraitsTriggerSamples.includes(message)}
        >
          <TokenTraits
            handleInputChange={handleInputChange}
            coreTraits={coreTraits}
          />
        </div>

        <div>
          <span>{message.length > 0 ? message : ""}</span>
          <span>Core Traits Limit: 4 traits</span>
        </div>
      </div>
    </div>
  );
};

// type ImageError = "incorrect_format" | "size_too_big";

const LogoField = () => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setField = useCreateTokenStore((s) => s.setField);
  const setStage = useStoryStore((s) => s.setStage);
  // const [error, setError] = useState<"" | ImageError>("");

  const processFile = (file: File | undefined) => {
    if (!file) {
      return;
    }
    // setError("");

    // check file validation
    // non-image files gets ignored
    const isInValidFormat = ![
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/svg",
    ].includes(file.type);

    // file size check 200 KB
    const isTooBigSize = file.size > 200 * 1024;
    if (isInValidFormat) {
      console.log(file.type, "unsupported");
      // setError("incorrect_format");
      setStage("token_form_step_2_logo_incorrect_format");
    }

    if (isTooBigSize) {
      console.log(file.size, "more than 200 KB");
      // setError("size_too_big");
      setStage("token_form_step_2_logo_too_big_size");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataurl = (e?.target?.result ?? "") as string;
      if (dataurl) {
        setField("logoFilePath", dataurl);
        setField("file", file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setNotDragging();
    let file: File | undefined = undefined;

    if (e.dataTransfer.items) {
      if (e.dataTransfer.items[0].kind === "file") {
        file = e.dataTransfer.items[0].getAsFile() ?? undefined;
      }
    } else {
      file = e.dataTransfer.files[0];
    }
    processFile(file);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    processFile(e?.target?.files?.[0]);
    console.log("file selected", e.target.files?.[0], e);
  };

  const setNotDragging = () => {
    setIsDraggingOver(false);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setIsDraggingOver(true)}
      onDragExit={setNotDragging}
      onDragEnd={setNotDragging}
      onDragLeave={setNotDragging}
      className={classNames(style.imgDropZone, {
        [style.activeImageDropZone]: isDraggingOver,
      })}
    >
      <div className={style.imgPickerControl}>
        <img src={pickImg} aria-hidden={true} />
        <div className={style.imgPickerLabelGroup}>
          <label className="ty-p1">
            Drag your logo here, or upload it, yo!
          </label>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              className="visually-hidden"
              accept=".png,.jpg,.jpeg,.svg"
              onChange={handleFileSelect}
            />
            <button onClick={openFilePicker}>Lock & Load Your Logo</button>
          </div>
          <span className="ty-p3">
            Only the best formats, yo! PNG, JPG, SVG.
            {/* {error === ""
              ? "Only the best formats, yo! PNG, JPG, SVG."
              : error === "incorrect_format"
              ? getRandomElement(logoIncorrectFormat)
              : getRandomElement(logoTooBigSize)} */}
          </span>
        </div>
      </div>
    </div>
  );
};

const SupplyConfig = {
  max: 18446744073709551615,
  min: 0,
  step: 1,
};

const SupplyField = () => {
  const supply = useCreateTokenStore((s) => s.supply);
  const setField = useCreateTokenStore((s) => s.setField);
  const setStage = useStoryStore((s) => s.setStage);
  const hasBeenTouched = useRef(false);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setField("supply", e.target.value);
    const supplyMap = mapTokenSupply(Number(e.target.value));
    if (supplyMap == tokenSupplyZero) {
      setStage("token_form_step_3_supply_zero");
    } else if (supplyMap == tokenSupplyVeryHigh) {
      setStage("token_form_step_3_supply_very_high");
    } else if (supplyMap == tokenSupplyLow) {
      setStage("token_form_step_3_supply_low");
    } else if (supplyMap == tokenSupplyMedium) {
      setStage("token_form_step_3_supply_medium");
    } else {
      setStage("token_form_step_3_supply_high");
    }
    hasBeenTouched.current = true;
  };

  const mapTokenSupply = (supply: number) => {
    if (supply == 0) {
      return tokenSupplyZero;
    } else if (supply >= SupplyConfig.max) {
      return tokenSupplyVeryHigh;
    } else if (supply <= SupplyConfig.max / 3) {
      return tokenSupplyLow;
    } else if (
      supply > SupplyConfig.max / 3 &&
      supply <= (2 * SupplyConfig.max) / 3
    ) {
      return tokenSupplyMedium;
    } else {
      return tokenSupplyHigh;
    }
  };

  return (
    <div className={style.sliderInputGroup}>
      <label>Set the token supply</label>
      <div className={style.sliderLabelRow}>
        <label className="ty-p3">Min Limit</label>
        <label className="ty-p3">Max Limit</label>
      </div>
      <input
        type="range"
        value={supply}
        onChange={onChange}
        min={SupplyConfig.min}
        max={SupplyConfig.max}
        step={SupplyConfig.step}
      />
      <input
        type="number"
        name="supply"
        value={supply}
        pattern="\d+"
        onChange={onChange}
        min={SupplyConfig.min}
        max={SupplyConfig.max}
        step={SupplyConfig.step}
      />
      <div className="ty-p2">
        How many tokens you wanna roll out, man?
        {/* {!hasBeenTouched.current
          ? "How many tokens you wanna roll out, man?"
          : getRandomElement(mapTokenSupply(supply))} */}
      </div>
    </div>
  );
};

const FeeConfig = {
  min: 0,
  max: SupplyConfig.max / 100000000,
  step: 0.00001,
};

const FeeField = () => {
  const fee = useCreateTokenStore((s) => s.fee);
  const supply = useCreateTokenStore((s) => s.supply);
  const setField = useCreateTokenStore((s) => s.setField);
  const setStage = useStoryStore((s) => s.setStage);

  const hasBeenTouched = useRef(false);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setField("fee", e.target.value);
    const feeMap = mapTokenFee(Number(e.target.value));
    if (feeMap == tokenFeeZero) {
      setStage("token_form_step_3_fee_zero");
    } else if (feeMap == tokenFeeHigh) {
      setStage("token_form_step_3_fee_high");
    } else if (feeMap == tokenFeeMedium) {
      setStage("token_form_step_3_fee_medium");
    } else {
      setStage("token_form_step_3_fee_low");
    }
    hasBeenTouched.current = true;
  };

  const mapTokenFee = (fee: number) => {
    if (fee == 0) {
      return tokenFeeZero;
    } else if (fee > supply / 2000000 && fee <= supply / 5000000) {
      return tokenFeeHigh;
    } else if (fee > supply / 1000000 && fee <= supply / 2000000) {
      return tokenFeeMedium;
    } else {
      // if (fee <= supply / 1000000) {
      return tokenFeeLow;
    }
  };

  return (
    <div className={style.sliderInputGroup}>
      <label>Set the token fee</label>
      <div className={style.sliderLabelRow}>
        <label className="ty-p3">Min Limit</label>
        <label className="ty-p3">Max Limit</label>
      </div>
      <input
        type="range"
        name="fee"
        min={FeeConfig.min}
        max={supply / 100000}
        step={FeeConfig.step}
        value={fee}
        onChange={onChange}
      />
      <input
        type="number"
        name="fee"
        min={FeeConfig.min}
        max={supply / 100000}
        step={FeeConfig.step}
        value={fee}
        onChange={onChange}
      />
      <div className="ty-p2">
        This is the cut that gets evaporated with every transaction, yo. Choose
        wisely!
        {/* {!hasBeenTouched.current
          ? "This is the cut that gets evaporated with every transaction, yo. Choose wisely!"
          : getRandomElement(mapTokenFee(fee))} */}
      </div>
    </div>
  );
};

const Step1 = () => {
  const goTo = useRouteStore((s) => s.goTo);
  const goToNextStep = useCreateTokenStore((s) => s.goToNextStep);
  const setStage = useStoryStore((s) => s.setStage);
  const valid = useCreateTokenStore(
    (s) =>
      s.name.length > 0 &&
      s.symbol.length > 0 &&
      s.symbol.length <= 6 &&
      s.coreTraits.length > 0 &&
      s.coreTraits.length <= 4
  );
  const resetForm = useCreateTokenStore((state) => state.resetForm);
  const setIsLoading = useAppStore((s) => s.setIsLoading);

  const goBack = () => {
    goTo("dashboard");
    resetForm();
  };

  const onNextClick = async () => {
    try {
      setIsLoading(true);
      const allPromise = [];
      console.log("Step1 - backendServiceInstance", backendServiceInstance);
      allPromise.push(
        backendServiceInstance.uniqueTokenName(
          useCreateTokenStore.getState().name
        )
      );
      allPromise.push(
        backendServiceInstance.uniqueTokenSymbol(
          useCreateTokenStore.getState().symbol
        )
      );
      const resp = await Promise.all(allPromise);
      console.log("Step1 - resp", resp);
      setIsLoading(false);

      if (resp[0] === true && resp[1] === true) {
        goToNextStep();
        setStage("token_form_step_2");
      } else {
        return;
      }
    } catch (e) {
      setIsLoading(false);
      throw e;
    }
  };

  return (
    <div className={style.stepContainer}>
      <div className={style.bodyContainer}>
        <div className={style.sceneContainer}>
          <TokenFormStep1Scene />
        </div>
        <div className={classNames([style.body, style.centerBody])}>
          <h6>The Recipe Starts Here Yo!</h6>
          <NameField />
          <SymbolField />
          <CoreTraitsField />
        </div>
      </div>
      <hr />
      <div className={style.stepFooter}>
        <button onClick={goBack}>Not Feelin' it? Go Back</button>
        <button onClick={onNextClick} disabled={!valid}>
          Next Up: Some Visual Stuff, Yo!
        </button>
      </div>
    </div>
  );
};

const Step2 = () => {
  const goToNextStep = useCreateTokenStore((s) => s.goToNextStep);
  const goBack = useCreateTokenStore((s) => s.goBack);
  const setStage = useStoryStore((s) => s.setStage);
  const isValid = useCreateTokenStore((s) => s.logoFilePath.length > 0);

  const onNextClick = () => {
    goToNextStep();
    setStage("token_form_step_3");
  };

  const handleBack = () => {
    goBack();
    setStage("token_form_step_1_return");
  };

  return (
    <div className={style.stepContainer}>
      <div className={style.bodyContainer}>
        <div className={style.sceneContainer}>
          <TokenFormStep2Scene />
        </div>
        <div className={style.body}>
          <h6>Yo, it's time to get that logo cookin'!</h6>
          <LogoField />
        </div>
      </div>
      <hr />
      <div className={style.stepFooter}>
        <button onClick={handleBack}>Miss Somethin'? Go Back</button>
        <button onClick={onNextClick} disabled={!isValid}>
          Next Up: Some Math Stuff, Yo!
        </button>
      </div>
    </div>
  );
};

const Step3 = () => {
  const showConfirmation = useCreateTokenStore((s) => s.showConfirmation);
  const goBack = useCreateTokenStore((s) => s.goBack);
  const setStage = useStoryStore((s) => s.setStage);
  const isValid = useCreateTokenStore(
    (s) =>
      s.fee >= FeeConfig.min &&
      s.fee <= s.supply / 100000 &&
      s.supply >= SupplyConfig.min &&
      s.supply <= SupplyConfig.max
  );

  const onNextClick = () => {
    showConfirmation();
  };

  const handleBack = () => {
    goBack();
    setStage("token_form_step_2_return");
  };

  return (
    <div className={style.stepContainer}>
      <div className={style.bodyContainer}>
        <div className={style.sceneContainer}>
          <TokenFormStep3Scene />
        </div>
        <div className={style.body}>
          <h6>Fuel the Fire & Set Your Limits Yo!</h6>
          <SupplyField />
          <FeeField />
        </div>
      </div>
      <hr />
      <div className={style.stepFooter}>
        <button onClick={handleBack}>Bored? Go Back</button>
        <button onClick={onNextClick} disabled={!isValid}>
          Confirm The Cook Yo!
        </button>
      </div>
    </div>
  );
};

const TokenConfirmation = () => {
  const goBack = useCreateTokenStore((s) => s.goBack);
  const cookToken = useCreateTokenStore((s) => s.cookToken);
  const setField = useCreateTokenStore((s) => s.setField);
  const setStage = useStoryStore((s) => s.setStage);
  const errorMessage = useCreateTokenStore((s) => s.errorMessage);
  const file = useCreateTokenStore((s) => s.file);
  const principalId = useAuthStore((state) => state.principalId);
  const [modal, setModal] = useState(0);

  const { name, symbol, coreTraits, supply, fee, image, radioOption } =
    useCreateTokenStore((s) => ({
      name: s.name,
      symbol: s.symbol,
      coreTraits: s.coreTraits,
      fee: s.fee,
      supply: s.supply,
      image: s.logoFilePath,
      radioOption: s.radioOption,
    }));

  const onConfirm = async () => {
    const token = {
      canisterId: backendCanisterId,
      evaporation: fee,
      mintedAt: new Date().toISOString(),
      image,
      name,
      symbol,
      coreTraits,
      supply,
      transaction: supply,
    };
    console.log("onConfirm - final token - file", token, file);
    console.log("onConfirm - principalId", principalId);

    if (!file) {
      return;
    }
    try {
      await cookToken(token, radioOption, file);
    } catch (e) {
      console.log("Error cooking token - ", e);
      setField("isCooking", false);
      setField(
        "errorMessage",
        "Token creation failed due to some error. Please try again."
      );
    }
  };

  return (
    <div className={style.container}>
      <h4>Yo, here's the mix we're about to cook up!</h4>
      <hr />
      <div className={style.infoGroupContainer}>
        <div className={style.imageContainer}>
          <img src={image} />
        </div>
        <div className={style.infoRow}>
          <div className={style.infoContainer}>
            <p>Name:</p>
            <p>{name}</p>
          </div>
          <div className={style.infoContainer}>
            <p>Symbol:</p>
            <p>{symbol}</p>
          </div>
        </div>
        <div className={style.infoRow}>
          <div className={style.infoContainer}>
            <p>Fee:</p>
            <p>{fee}</p>
          </div>
          <div className={style.infoContainer}>
            <p>Supply:</p>
            <p>{Intl.NumberFormat("en-US").format(supply)}</p>
          </div>
        </div>
      </div>
      <hr />

      <div className={style.stepFooterWrapper}>
        <div className={style.stepRadioFooter}>
          <div>
            <input
              type="radio"
              id="black_holed"
              name="radioOption"
              value="black_holed"
              onChange={() => {
                setModal(1);
                setField("radioOption", "black_holed");
              }}
            ></input>
            <label htmlFor="black_holed" className="ty-b1">
              Seal it Tight / Black Holed
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="go_pro"
              name="radioOption"
              value="go_pro"
              onChange={() => {
                setModal(2);
                setField("radioOption", "go_pro");
              }}
            ></input>
            <label htmlFor="go_pro" className="ty-b1">
              Go Pro
            </label>
          </div>
        </div>
        <div className={style.stepFooter}>
          <button
            onClick={() => {
              goBack();
              setStage("token_form_step_3_return");
            }}
            data-secondary
          >
            Head Back & Adjust!
          </button>
          <button onClick={onConfirm} disabled={radioOption === ""}>
            Let's Cook It! - $19.97 in ICP
          </button>
        </div>
        <div className={style.stepDisclaimer}>
          The price is stable, pegged to dollars but paid in ICP. We're talking
          $19.98, give or take in ICP, yo.
        </div>
        {errorMessage.length > 0 ? <div>{errorMessage}</div> : null}
      </div>
      {modal === 1 && (
        <Modal
          icon="1"
          title="Yo, Attention!"
          message="Yo! You sure you wanna seal it tight? Once it's done, there's no going back. Think twice, yo!"
          buttonMessage="Fuck it!"
          onClose={() => setModal(0)}
        />
      )}
      {modal === 2 && (
        <Modal
          icon="2"
          title="Heads Up!"
          message="Ready to go pro? The Lab's opening soon. Serious mints could join a DAO. Ready to cook something legendary and get that Lab stamp of approval? Let's do this!"
          buttonMessage="Hell Yeah!"
          onClose={() => setModal(0)}
        />
      )}
    </div>
  );
};

const TokenCooking = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h4>Let's Cook Jesse!</h4>
        <h4>Let's do it yo!</h4>
      </div>
      <TokenCookingScene />
      <div className={style.loader}>
        <ProgressLoader />
      </div>
    </div>
  );
};

const StepComponentMap: Record<string, React.FC> = {
  "1": Step1,
  "2": Step2,
  "3": Step3,
};

const TokenForm = () => {
  const currentStep = useCreateTokenStore((s) => s.currentStep);
  const isConfirmationVisible = useCreateTokenStore(
    (s) => s.isConfirmationVisible
  );
  const isCooking = useCreateTokenStore((s) => s.isCooking);

  if (isCooking) {
    return <TokenCooking />;
  }

  if (isConfirmationVisible) {
    return <TokenConfirmation />;
  }

  const CurrentStepComponent = StepComponentMap[currentStep.toString()];

  return (
    <div className={style.container}>
      <TokenFormStepper />
      <CurrentStepComponent />
    </div>
  );
};

export default TokenForm;
