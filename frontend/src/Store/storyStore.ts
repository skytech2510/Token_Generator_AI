import { create } from "zustand";
import useCreateTokenStore from "./createTokenStore";

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export type Stage =
  | "initial"
  | "welcome"
  | "welcome_idle"
  | "welcome_info"
  | "connect_wallet"
  | "no_tokens"
  | "token_form_step_1"
  | "token_form_step_2"
  | "token_form_step_3"
  | "token_cooking"
  | "no_wallet_connected"
  | "token_form_step_1_name_field_selected"
  | "token_form_step_1_name_missing"
  | "token_form_step_1_name_field_error"
  | "token_form_step_1_symbol_selected"
  | "token_form_step_1_symbol_missing"
  | "token_form_step_1_symbol_too_long"
  | "token_form_step_1_return"
  | "token_form_step_2_logo_incorrect_format"
  | "token_form_step_2_logo_too_big_size"
  | "token_form_step_2_return"
  | "token_form_step_3_supply_zero"
  | "token_form_step_3_supply_very_high"
  | "token_form_step_3_supply_low"
  | "token_form_step_3_supply_medium"
  | "token_form_step_3_supply_high"
  | "token_form_step_3_fee_zero"
  | "token_form_step_3_fee_high"
  | "token_form_step_3_fee_medium"
  | "token_form_step_3_fee_low"
  | "token_form_step_3_return";

interface BubbleContent {
  type: "text" | "img";
  content: string;
}

interface Character {
  expression: "neutral" | "smile";
  bubbleContent?: BubbleContent;
  inverted: boolean;
  styleOverride?: React.CSSProperties;
  bubbleStyleOverride?: React.CSSProperties;
  visible: boolean;
}

interface StoryStore {
  stage: Stage;
  jesse: Character;
  white: Character;
  setStage: (s: Stage) => void;
  setImageDataUrl: (s: string) => void;
}

interface StorySequenceFrame {
  delay?: number; // in ms
  jesse?: Character;
  white?: Character;
}

const welcomeMessageSamples = [
  "Let's cook!",
  "Yo, welcome!",
  "Ready, yo?",
  "Start here!",
  "Let's roll!",
  "Get ready!",
  "Hey there!",
  "Let's begin!",
];
const welcomeIdleMessageSamples = [
  "Yo, you still with me? Let's keep this cookin'!",
  "Yo, you still there? Let's keep this rolling!",
  "Yo, snap out of it! Time to hustle!",
  "Hey, you zoning out? We got tokens to cook up!",
  "Don't bail on me, man! Keep cooking!",
  "Yo, snap back to it! We got work to do!",
  "Hey, stay sharp! We gotta finish this!",
];
const welcomeInfoMessageSamples = [
  "Listen up!",
  "Check it out!",
  "Here's the deal!",
  "Stay cool!",
  "Ready to rock!",
  "Let's do this!",
  "Keeping it real!",
  "Stay sharp!",
];
const walletMissingSamples = [
  "Yo, you forgot to hook up your wallet!",
  "Wallet's missing, yo! Connect it up!",
  "Yo, no wallet detected! Plug it in!",
  "Hey, connect your wallet, yo!",
  "Wallet's not connected, man! Fix that!",
  "Yo, where's your wallet at? Connect it!",
  "Don't forget the wallet, yo! Get it connected!",
  "Yo, you need to connect your wallet first!",
  "Wallet connection missing, yo! Sort it out!",
  "Yo, wallet's gotta be connected! Do it now!",
];
const tokenFormStep1Samples = [
  "Vision, yo!",
  "Let's get cookin'!",
  "Time to create, yo!",
  "Here we go, yo!",
  "Starting strong, yo!",
  "Let's kick this off, yo!",
  "Let's make some magic, yo!",
  "Ready to roll, yo!",
  "Let's do this, yo!",
  "Game on, yo!",
];

const tokenFormStep2Samples = [
  "Let's see it!",
  "Show me, yo!",
  "Bring it, yo!",
  "Get that logo!",
  "Cook it up!",
];

const tokenFormStep1BackSamples = [
  "Yo, forgot something? Need to jazz up that name or symbol?",
  "Back at it, huh? Still not happy with the name or symbol?",
  "Yo, tweaking the name? You a perfectionist or what?",
  "What’s up, yo? Got another genius idea for the name or symbol?",
  "Back for more? What, the name didn’t pass the vibe check?",
];

const tokenFormStep2BackSamples = [
  "Yo, what’s up? Logo not pretty enough?",
  "Back to the logo, huh? Did it offend your artistic sensibilities?",
  "Yo, still fiddling with the logo? It better be worth it!",
  "What’s up, yo? Your logo not Instagram-ready yet?",
  "Back for a logo remix? Did it clash with your color scheme?",
];

const tokenFormStep3BackSamples = [
  "Yo, supply or fee got you trippin'? Let’s sort it out!",
  "Back again, huh? Did the numbers keep you up at night?",
  "Yo, crunching numbers? Did the calculator break?",
  "What’s up, yo? Did the supply and fee have a fight?",
  "Back for more number magic? Let’s make those digits dance!",
];

export const tokenNameTriggerSamples = [
  "Yo, enter a unique and catchy name!",
  "Time to get creative, yo! Name your token!",
  "Think big, man! What's your token called?",
  "Hit me with a dope name, yo!",
  "Yo, what's the name? Make it pop!",
  "Cook up a cool name, yo!",
  "Let's hear it, man! What's your token's name?",
  "Name time, yo! Make it count!",
  "Yo, give your token a standout name!",
  "What's the name, dude? Make it fly!",
];
export const tokenNameSelectedSamples = [
  "Solid name, yo! You're killin' it!",
  "Nice choice, yo! That's a winner!",
  "Cool tag, man! Lookin' good!",
  "Yo, that name's dope! Great pick!",
  "Sweet choice, yo! You're on fire!",
  "Nice pick, yo! That's gonna stand out!",
  "Yo, that name rocks! Well done!",
  "Lookin' good, yo! Name's perfect!",
  "Dope name, man! You're nailing it!",
  "Yo, solid pick! That name's fly!",
];

export const tokenNameErrorSamples = [
  "Yo, that name's popular! You sure you wanna roll with it?",
  "Taken, yo! But hey, your call!",
  "Name's already out there, dude! Still wanna use it?",
  "Yo, that name's on someone else's list. Go for it if you want!",
];
export const symbolNameTriggerSamples = [
  "Yo, keep it short and sweet, yo!",
  "Hey, keep it tight and simple!",
  "Yo, keep it brief, yo!",
  "Short and sweet, yo!",
  "Hey, keep it quick and catchy!",
  "Yo, make it short and snappy!",
  "Keep it simple, yo!",
  "Hey, keep it concise!",
  "Yo, keep it sharp and simple!",
  "Short and punchy, yo!",
];
export const symbolNameSelectedSamples = [
  "Solid Ticker, yo! You're killin' it!",
  "Nice choice, yo! That's a winner!",
  "Cool tag, man! Lookin' good!",
  "Yo, that Ticker's dope! Great pick!",
  "Sweet choice, yo! You're on fire!",
  "Nice pick, yo! That's gonna stand out!",
  "Yo, that Ticker rocks! Well done!",
  "Lookin' good, yo! Ticker's perfect!",
  "Dope Ticker, man! You're nailing it!",
  "Yo, solid pick! That Ticker's fly!",
];
export const symbolNameSizeErrorSamples = [
  "Yo, keep it short! 6 characters is ideal, but your call!",
  "6 characters or less works best, your choice!",
  "Yo, 6 characters is best! Up to you, though!",
  "Too long! 6 characters is better, but you decide!",
  "Keep it tight! 6 or less is best, your pick!",
  "6 characters is a good idea, but it's your choice!",
  "Yo, brief it up! 6 characters is ideal, your call!",
  "Too many! 6 is the limit that works well, but it's up to you!",
  "Trim it down! 6 only works best, your choice!",
  "Yo, 6 characters is ideal! Your decision!",
];

export const symbolNameUniqueErrorSamples = [
  "Yo, that ticker's popular! You sure you wanna roll with it?",
  "Taken, yo! But hey, your call!",
  "Ticker's already out there, dude! Still wanna use it?",
  "Yo, that ticker's on someone else's list. Go for it if you want!",
];

export const coreTraitsMoreThan4ErrorSamples = [
  "Yo, you can't have more than four core traits.",
];

export const coreTraitsEmptyErrorSamples = [
  "Yo, you need at least one trait, no empty hands here!",
];

export const coreTraitsTriggerSamples = ["Looks like you nailed it"];

const tokenNameFieldErrorSamples = ["Name's missing!", "Name, yo!", "Name it!"];
const symboldMissingSamples = ["Tag's missing!", "Fix the tag!"];
// const symboldTooLongSamples = ["Tag's too long!", "Shorten the tag!"];
const mathSamples = [
  "Math, yo!",
  "Crunch it!",
  "Numbers, yo!",
  "Do the math!",
  "Set it up!",
];
// const supplyFeeSuccessSamples = [
//   "Nice work!",
//   "Good pick!",
//   "All set!",
//   "Lookin' good!",
//   "Ready, yo!",
// ];
// const supplyMissingSamples = ["Need a number!", "Supply missing!"];
// const supplyTooHighSamples = ["Check supply!", "Fix the number!"];
// const feeMissingSamples = ["Set the fee!", "Fee missing!"];
// const feeTooHighSamples = ["Check the fee!", "Fix the fee!"];

export const logoIncorrectFormat = [
  "Wrong format, yo! Try a different file.",
  "Yo, that file ain't right! Use a supported format.",
  "Format fail, yo! Pick a legit file type.",
  "Nah, man! That file won't work. Check the format!",
  "Yo, wrong file type! Choose a different format.",
  "Hey, check your file! Wrong format, yo!",
  "Yo, that format's whack! Get the right one.",
];

export const logoTooBigSize = [
  "Yo, that file's too big! Keep it under 200KB!",
  "Whoa, that's a hefty file! Max size is 200KB, yo!",
  "Too big, yo! 200KB or less, got it?",
  "Yo, slim it down! File's gotta be under 200KB!",
  "That logo's huge, yo! Make it 200KB or less!",
];

export const logoIncorrectFormatAndSize = [
  "Yo, that file’s a beast and the format’s all wrong!",
  "Hey, come on! Too big and unsupported? No way, man!",
  "Yo, that file’s huge and the format’s a no-go!",
  "What’s up, yo? That file’s a giant and the format’s whack!",
  "Double trouble, man! Too big and wrong format!",
];

export const tokenSupplyZero = [
  "Yo, zero tokens? You tryna make invisible money?",
  "No supply, yo! You gotta add some tokens!",
  "Zero? Yo, you serious? Give it a number!",
  "Come on, man! Zero tokens? Fix that!",
];

// ⅓ and lower of maximum supply
export const tokenSupplyLow = [
  "Low supply, yo! Keeping it rare, huh?",
  "Yo, small batch! Those tokens are exclusive!",
  "Low numbers, man! You're making 'em scarce!",
  "Yo, limited edition! That supply's tight!",
];

// between ⅓ and ⅔ is medium of maximum supply
export const tokenSupplyMedium = [
  "Nice balance, yo! Just right!",
  "Solid choice! Not too many, not too few.",
  "Yo, sweet spot! That's a good call!",
  "Balanced supply, yo! That works!",
  "Right in the middle, man! Perfect pick!",
  "Yo, that supply's on point!",
  "Good call, yo! That supply's just right!",
  "Nice pick, man! Right in the zone!",
];

// above ⅔ is high of maximum supply
export const tokenSupplyHigh = [
  "High supply, yo! Flooding the market, huh?",
  "Whoa, lots of tokens! You're going big!",
  "Yo, massive supply! Everyone's gonna have some!",
  "Big numbers, man! You're aiming high!",
];

// token supply manually entered is more than or equals 1 quadrillion = 1,000,000,000,000,000
export const tokenSupplyVeryHigh = [
  "Yo, that supply is massive! You tryna take over the world?",
  "Whoa, that's a humongous supply! You sure about this, man?",
  "Yo, you serious? That's like a billion-zillion tokens!",
  "Hey, come on! Are you printing money or what?",
  "Yo, that supply is huge! You're gonna flood the market!",
  "Man, that's a monster supply! Thik you can handle it?",
  "Whoa, dude! That's a ton of tokens! Feeling ambitious?",
  "Yo, that's a mountain of tokens! You got big plans, huh?",
  "Hey, that's a crazy supply! You aiming for infinity or what?",
  "Yo, you tryna make history with that supply? It's gigantic!",
];

export const tokenFeeZero = [
  "Zero fees? No burn, man!",
  "Free trades, no supply burn!",
  "Zero fees, yo! Tokens stayin' put.",
  "No burn with no fee, dude!",
  "Zero fee? No rarity boost!",
  "Free trades, but no burn, yo!",
  "No fee? No tokens burned!",
];

export const tokenFeeLow = [
  "Low fee, yo! Your tokens will be flying!",
  "Cheap burns, man! That fee's barely there!",
  "Yo, that fee's low! Tokens will trade like crazy!",
];

export const tokenFeeMedium = [
  "Medium fee, nice balance, yo!",
  "Solid burn rate! Not too high, not too low.",
  "Yo, medium fee! Right in the sweet spot for trading!",
];

export const tokenFeeHigh = [
  "High fee, yo! Those trades better be worth it!",
  "Whoa, big burn rate! Tokens will be rare!",
  "Yo, that's a high fee! Trading's gonna cost!",
];

const StageSequenceMap: Record<Stage, () => StorySequenceFrame[]> = {
  initial: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        inverted: false,
        visible: false,
      },
      white: {
        expression: "neutral",
        inverted: false,
        visible: false,
      },
    },
  ],
  welcome: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(welcomeMessageSamples),
        },
        inverted: false,
        visible: true,
      },
    },
  ],
  welcome_idle: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(welcomeIdleMessageSamples),
        },
        inverted: false,
        visible: true,
      },
    },
  ],
  welcome_info: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(welcomeInfoMessageSamples),
        },
        bubbleStyleOverride: { top: "-40%", right: "-90%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  connect_wallet: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        bubbleContent: { type: "text", content: "Guide yo!" },
        inverted: false,
        visible: true,
      },
    },
  ],
  no_wallet_connected: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(walletMissingSamples),
        },
        inverted: false,
        visible: true,
      },
    },
  ],
  no_tokens: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        inverted: false,
        visible: false,
      },
      white: {
        expression: "neutral",
        inverted: false,
        visible: false,
      },
    },
    {
      delay: 500,
      jesse: {
        expression: "neutral",
        bubbleContent: { type: "text", content: "So empty yo!" },
        inverted: false,
        visible: true,
      },
    },
    {
      delay: 1700,
      white: {
        expression: "neutral",
        bubbleContent: { type: "text", content: "Let him cook!" },
        inverted: true,
        visible: true,
      },
    },
  ],
  token_form_step_1: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        inverted: false,
        visible: false,
      },
      white: {
        expression: "neutral",
        inverted: false,
        visible: false,
      },
    },
    {
      delay: 500,
      jesse: {
        expression: "neutral",
        inverted: false,
        visible: true,
      },
    },
    {
      delay: 3000,
      jesse: {
        expression: "smile",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenFormStep1Samples),
        },
        bubbleStyleOverride: { right: "-85%", top: "-40%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_1_name_field_selected: () => [
    {
      delay: 1000,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenNameSelectedSamples),
        },
        bubbleStyleOverride: { right: "-85%", top: "-20%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_1_name_missing: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenNameFieldErrorSamples),
        },
        bubbleStyleOverride: { right: "-85%", top: "-20%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_1_name_field_error: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenNameErrorSamples),
        },
        bubbleStyleOverride: { right: "-85%", top: "-20%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_1_symbol_selected: () => [
    {
      delay: 1000,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(symbolNameSelectedSamples),
        },
        bubbleStyleOverride: { right: "-85%", top: "-20%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_1_symbol_missing: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(symboldMissingSamples),
        },
        bubbleStyleOverride: { right: "-85%", top: "-20%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_1_symbol_too_long: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(symbolNameSizeErrorSamples),
        },
        bubbleStyleOverride: { right: "-85%", top: "-20%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_1_return: () => [
    {
      delay: 1000,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenFormStep1BackSamples),
        },
        bubbleStyleOverride: { right: "-85%", top: "-20%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_2: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        inverted: false,
        visible: false,
      },
      white: {
        expression: "neutral",
        inverted: false,
        visible: false,
      },
    },
    {
      delay: 500,
      jesse: {
        expression: "neutral",
        inverted: false,
        visible: true,
      },
    },
    {
      delay: 1000,
      jesse: {
        expression: "smile",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenFormStep2Samples),
        },
        bubbleStyleOverride: { right: "-85%", top: "-40%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_2_logo_incorrect_format: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(logoIncorrectFormat),
        },
        bubbleStyleOverride: { right: "-85%", top: "-20%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_2_logo_too_big_size: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(logoTooBigSize),
        },
        bubbleStyleOverride: { right: "-85%", top: "-20%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_2_return: () => [
    {
      delay: 1000,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenFormStep2BackSamples),
        },
        bubbleStyleOverride: { right: "-85%", top: "-20%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_3: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        inverted: false,
        visible: false,
      },
      white: {
        expression: "neutral",
        inverted: false,
        visible: false,
      },
    },
    {
      delay: 500,
      jesse: {
        expression: "neutral",
        inverted: false,
        visible: true,
      },
    },
    {
      delay: 1000,
      jesse: {
        expression: "smile",
        bubbleContent: { type: "text", content: getRandomElement(mathSamples) },
        bubbleStyleOverride: { right: "-65%", top: "-30%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_3_supply_zero: () => [
    {
      delay: 3000,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenSupplyZero),
        },
        bubbleStyleOverride: { right: "-65%", top: "-30%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_3_supply_very_high: () => [
    {
      delay: 3000,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenSupplyVeryHigh),
        },
        bubbleStyleOverride: { right: "-65%", top: "-30%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_3_supply_low: () => [
    {
      delay: 3000,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenSupplyLow),
        },
        bubbleStyleOverride: { right: "-65%", top: "-30%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_3_supply_medium: () => [
    {
      delay: 3000,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenSupplyMedium),
        },
        bubbleStyleOverride: { right: "-65%", top: "-30%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_3_supply_high: () => [
    {
      delay: 3000,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenSupplyHigh),
        },
        bubbleStyleOverride: { right: "-65%", top: "-30%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_3_fee_zero: () => [
    {
      delay: 3000,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenFeeZero),
        },
        bubbleStyleOverride: { right: "-65%", top: "-30%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_3_fee_high: () => [
    {
      delay: 3000,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenFeeHigh),
        },
        bubbleStyleOverride: { right: "-65%", top: "-30%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_3_fee_medium: () => [
    {
      delay: 3000,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenFeeMedium),
        },
        bubbleStyleOverride: { right: "-65%", top: "-30%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_3_fee_low: () => [
    {
      delay: 3000,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenFeeLow),
        },
        bubbleStyleOverride: { right: "-65%", top: "-30%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_form_step_3_return: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        bubbleContent: {
          type: "text",
          content: getRandomElement(tokenFormStep3BackSamples),
        },
        bubbleStyleOverride: { right: "-65%", top: "-30%" },
        inverted: false,
        visible: true,
      },
    },
  ],
  token_cooking: () => [
    {
      delay: 0,
      jesse: {
        expression: "neutral",
        inverted: true,
        visible: true,
      },
      white: {
        expression: "neutral",
        inverted: false,
        visible: true,
      },
    },
  ],
};

const getImageJesseFrame = (dataUrl: string): Character => {
  return {
    expression: dataUrl.length > 0 ? "smile" : "neutral",
    bubbleContent:
      dataUrl.length > 0
        ? {
            type: "img",
            content: dataUrl,
          }
        : undefined,
    inverted: false,
    visible: true,
  };
};

const useStoryStore = create<StoryStore>()((set, get) => ({
  stage: "welcome",
  jesse: StageSequenceMap.welcome()[0].jesse as Character,
  white: StageSequenceMap.welcome()[0].white as Character,
  setStage: async (s: Stage) => {
    const sequenceFrames = StageSequenceMap[s]();
    const currentStage = get().stage;

    set({ stage: s });

    if (s === "token_form_step_2" && currentStage === "token_form_step_3") {
      sequenceFrames.push({
        delay: 1000,
        jesse: getImageJesseFrame(useCreateTokenStore.getState().logoFilePath),
      });
    }
    // todo potential race condition fix
    sequenceFrames.forEach(async (f) => {
      if (f.delay !== 0 || f.delay !== undefined) {
        await new Promise((resolve) => setTimeout(resolve, f.delay));
      }
      if (f.jesse) {
        set({ jesse: f.jesse });
      }
      if (f.white) {
        set({ white: f.white });
      }
    });
  },
  setImageDataUrl: (dataUrl) => {
    set({
      jesse: getImageJesseFrame(dataUrl),
    });
  },
}));

export default useStoryStore;
