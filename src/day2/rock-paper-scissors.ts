import { Game } from './row-schema';

const POINTS = {
  WIN: 6,
  DRAW: 3,
  LOSS: 0,
};

const HAND_VALUES = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const HAND_CONVERTIONS = {
  A: HAND_VALUES.ROCK,
  B: HAND_VALUES.PAPER,
  C: HAND_VALUES.SCISSORS,
  X: HAND_VALUES.ROCK,
  Y: HAND_VALUES.PAPER,
  Z: HAND_VALUES.SCISSORS,
};

const getHandValue = (
  input: Game['me'] | Game['opponent'],
): typeof HAND_VALUES[keyof typeof HAND_VALUES] => HAND_CONVERTIONS[input];

const getGameScore = (game: Game | null) => {
  if (game === null) {
    return 0;
  }
  const me = getHandValue(game.me);
  const opponent = getHandValue(game.opponent);

  if (
    (me === HAND_VALUES.ROCK && opponent === HAND_VALUES.SCISSORS) ||
    (me === HAND_VALUES.SCISSORS && opponent === HAND_VALUES.PAPER) ||
    (me === HAND_VALUES.PAPER && opponent === HAND_VALUES.ROCK)
  ) {
    return POINTS.WIN + me;
  }
  if (me === opponent) {
    return POINTS.DRAW + me;
  }
  return POINTS.LOSS + me;
};

export const getTotalScore = (games: (Game | null)[]) => {
  return games.map(getGameScore).reduce((curr, next) => curr + next, 0);
};

const chooseHand = (opponent: Game['opponent'], wantedOutcome: Game['me']) => {
  const opponentHand = getHandValue(opponent);

  const shouldWin = wantedOutcome === 'Z';
  const shouldDraw = wantedOutcome === 'Y';

  if (shouldDraw) {
    return opponentHand;
  }
  if (shouldWin) {
    if (opponentHand === HAND_VALUES.PAPER) {
      return HAND_VALUES.SCISSORS;
    }
    if (opponentHand === HAND_VALUES.SCISSORS) {
      return HAND_VALUES.ROCK;
    }
    return HAND_VALUES.PAPER;
  }
  if (opponentHand === HAND_VALUES.PAPER) {
    return HAND_VALUES.ROCK;
  }
  if (opponentHand === HAND_VALUES.SCISSORS) {
    return HAND_VALUES.PAPER;
  }
  return HAND_VALUES.SCISSORS;
};

const getGameScoreWithOutcome = (game: Game | null) => {
  if (game === null) {
    return 0;
  }
  const me = chooseHand(game.opponent, game.me);
  const opponent = getHandValue(game.opponent);

  if (
    (me === HAND_VALUES.ROCK && opponent === HAND_VALUES.SCISSORS) ||
    (me === HAND_VALUES.SCISSORS && opponent === HAND_VALUES.PAPER) ||
    (me === HAND_VALUES.PAPER && opponent === HAND_VALUES.ROCK)
  ) {
    return POINTS.WIN + me;
  }
  if (me === opponent) {
    return POINTS.DRAW + me;
  }
  return POINTS.LOSS + me;
};

export const getTotalScoreWithOutcome = (games: (Game | null)[]) => {
  return games
    .map(getGameScoreWithOutcome)
    .reduce((curr, next) => curr + next, 0);
};
