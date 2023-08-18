import React, { useState } from "react";

const AuthContext = React.createContext({
  groupId: "",
  oneBuyInToChips: "",
  oneBuyInToDollers: "",
  oneChipCost: "",
});

export const AuthContextProvider = (props) => {
  const [oneBuyInToChips, setOneBuyInToChips] = useState(50);
  const [oneBuyInToDollers, setOneBuyInToDollers] = useState(50);
  const oneChipCost = oneBuyInToDollers / oneBuyInToChips;
  return (
    <AuthContext.Provider
      value={{
        groupId: "TEST_1",
        oneBuyInToChips: oneBuyInToChips,
        oneBuyInToDollers: oneBuyInToDollers,
        oneChipCost: oneChipCost,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
