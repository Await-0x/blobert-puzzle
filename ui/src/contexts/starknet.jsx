import React from "react";

import { mainnet, sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
  useInjectedConnectors,
  voyager
} from "@starknet-react/core";
import { getProvider } from "../helpers/starknet";

export function StarknetProvider({ children }) {
  const { connectors } = useInjectedConnectors({
    recommended: [
      argent(),
      braavos(),
    ],
    includeRecommended: "onlyIfNoConnectors",
  });

  return (
    <StarknetConfig
      chains={[mainnet, sepolia]}
      provider={getProvider()}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}