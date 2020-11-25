import * as React from 'react';

interface UserTabProps {
  name: string
}

const tabStyle = {
  height: "10vh",
  width: "100%",
  border: "2px solid #000",
  position: "relative"
} as React.CSSProperties

export function UserTab ({name}: UserTabProps) {
  return (
    <div className="usertab" style={tabStyle}>
      <h1>{name}</h1>
    </div>
  );
}