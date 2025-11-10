import React from "react";
import * as Icons from "../../lib/Icons";

interface Props {
  name: string;
  size?: number;
}

const NavIcon: React.FC<Props> = ({ name, size }) => {
  const Component = Icons[name as keyof typeof Icons];
  return Component ? <Component size={size || 24} color="white" /> : null;
};

export default NavIcon;
