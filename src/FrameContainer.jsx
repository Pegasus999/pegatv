
const FrameContainer = ({ url }) => {

  return (
    <>
      <iframe key={url} src={url} title="I'm an outdated piece of technology!" />
    </>
  );
}

export default FrameContainer;