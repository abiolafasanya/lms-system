import React from 'react';

const ProgressBar = ({
  bgcolor,
  progress,
  height,
  align,
  className,
  color,
}: any) => {
  const Parentdiv = {
    height: height,
    width: '100%',
    // backgroundColor: 'whitesmoke',
    borderRadius: 40,
    // margin: 50,
    // border: '1px solid black',
  };

  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: align,
  };

  const progresstext = {
    padding: 10,
    color: color || 'black',
    fontWeight: 900,
  };

  return (
    <div style={Parentdiv} className={className as string}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
