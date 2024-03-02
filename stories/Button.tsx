type Props = {
  onClick: VoidFunction;
};

export function Button(props: Props) {
  return <button onClick={props.onClick}>Click me</button>;
}
