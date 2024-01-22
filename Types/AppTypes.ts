export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export interface UserData {
  name: string;
  score: number;
}

export interface QuizQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizData {
  triviaQuestions: QuizQuestion[];
  answers: string[];
  selected: number | null;
  correct: number | null;
}

export interface WindowData {
  title:string
  data:string
}

export interface Values {
  id:number;
  title: string;
  positionX: number;
  positionY: number;
  type: string;
  data: {}
}

export interface AuthResponse {
  status: boolean;
  error: unknown;
}

export interface LoginResponse {
  data: UserData;
  status: boolean;
  error: unknown;
}

export interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
  isRegister: boolean;
}

export interface InputErrors {
  usernameError: string;
  passwordError: string;
}