import { Text } from "react-native";

export interface ShortenedWordProps {
  word: string;
  maxLength: number;
}


export function ShortenedWord({ word, maxLength }: ShortenedWordProps) {
  function shortenWord(word: string, maxLength: number): string {
    if (word.length > maxLength) {
      return word.substring(0, maxLength) + ' ...';
    }
    return word;
  }

  return <Text>{shortenWord(word, maxLength)}</Text>;
}