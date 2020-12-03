import * as React from 'react';

interface UserTabProps {
  name: string
}

const tabStyle = {
  marginBottom: 10,
  padding: 10,
  textAlign: 'center',
  width: "100%",
  position: "relative",
  backgroundColor: '#e8e8e8',
} as React.CSSProperties

export function UserTab ({name}: UserTabProps) {
  return (
    <div className="usertab" style={tabStyle}>
      <h1>{name}</h1>
    </div>
  );
}