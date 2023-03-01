import React from 'react';

interface progressDoc {
 
}

type progressProps = {
  bgcolor: string;
  progress: number;
  height: string;
  align: CanvasTextAlign;
  className: string;
  color: string;
};

const ProgressBar: React.FC<progressProps> = ({
  bgcolor,
  progress,
  height,
  align,
  className,
  color,
}) => {
  const Parentdiv = {
    height: height,
    width: '100%',
    borderRadius: 40,
  };

  const Childdiv: React.CSSProperties | undefined = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: align,
  };

  const progresstext = {
    padding: 10,
    color: color || 'black',
    fontWeight: 700,
  };

  return (
    <div style={Parentdiv} className={className}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
