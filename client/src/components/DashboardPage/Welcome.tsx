interface WelcomeProps {
  username: string;
}

const Welcome = (props: WelcomeProps) => {
  if (!props.username) return null;

  return (
    <div>
      <h1>Welcome {props.username}</h1>
    </div>
  )
};

export default Welcome;