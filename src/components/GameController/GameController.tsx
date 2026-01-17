import { useState } from "react";
import { Stage } from "./types";
import HomeScreen from "../HomeScreen/HomeScreen";
import Stage1_FirstMemory from "../stages/Stage1_FirstMemory/Stage1_FirstMemory";
import Stage2_MiniQuiz from "../stages/Stage2_MiniQuiz/Stage2_MiniQuiz";
import Stage3_Song from "../stages/Stage3_Song/Stage3_Song";
import Stage4_Emoji from "../stages/Stage4_Emoji/Stage4_Emoji";
import Stage5_OurCode from "../stages/Stage5_OurCode/Stage5_OurCode";
import Stage6_Cipher from "../stages/Stage6_Cipher/Stage6_Cipher";
import FinalScreen from "../FinalScreen/FinalScreen";

const GameController = () => {
  const [currentStage, setCurrentStage] = useState<Stage>(Stage.HOME);

  const nextStage = () => {
    setCurrentStage((prev) => (prev + 1) as Stage);
  };

  const restartGame = () => {
    setCurrentStage(Stage.HOME);
  };

  return (
    <>
      {currentStage === Stage.HOME && <HomeScreen onStart={nextStage} />}
      {currentStage === Stage.FIRST_MEMORY && (
        <Stage1_FirstMemory onComplete={nextStage} />
      )}
      {currentStage === Stage.MINI_QUIZ && (
        <Stage2_MiniQuiz onComplete={nextStage} />
      )}
      {currentStage === Stage.SONG && <Stage3_Song onComplete={nextStage} />}
      {currentStage === Stage.EMOJI_GAME && (
        <Stage4_Emoji onComplete={nextStage} />
      )}
      {currentStage === Stage.OUR_CODE && (
        <Stage5_OurCode onComplete={nextStage} />
      )}
      {currentStage === Stage.CIPHER && (
        <Stage6_Cipher onComplete={nextStage} />
      )}
      {currentStage === Stage.FINAL && <FinalScreen onRestart={restartGame} />}
    </>
  );
};

export default GameController;
