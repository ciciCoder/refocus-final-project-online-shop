declare module 'join-path' {
  export default function join(
    ...parts: (string | undefined | null | number)[]
  ): string
}
