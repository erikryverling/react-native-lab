import {Float} from 'react-native/Libraries/Types/CodegenTypes';

export type Response = {
  name: string;
  main: Main;
  wind: Wind;
};

type Main = {
  temp: string;
};

type Wind = {
  speed: Float;
  deg: Float;
};
