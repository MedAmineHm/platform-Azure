import React, { useEffect, useState } from "react";
import axios from "axios";
import { processBoardResources } from "../utils/terraform";

export const useTerraformCodeCost = (boardNodes, boardEdges) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [terraformCost, setTerraformCost] = useState();

  const refreshTerraformCost = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      // process board
      const processedBoardResources = processBoardResources(
        boardNodes,
        boardEdges
      );

      const code = await axios.post("http://localhost:3001/terraform/cost", {
        data: JSON.stringify(processedBoardResources),
      });
      setTerraformCost(code.data.data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return { terraformCost, isLoading, isError, refreshTerraformCost };
};
