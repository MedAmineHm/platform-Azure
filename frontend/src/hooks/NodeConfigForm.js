import React, { useEffect, useState } from "react";
import axios from "axios";
import { includes } from "ramda";

const isNodeWithOptions = (node) => includes(node?.type, ["DiscNode"]);

const nodeTypeOptionUrls = {
  DiscNode: "http://localhost:3001/azure/vm-sizes/",
};

const makeUrl = (nodeTypeOptionUrl = "", location = "") =>
  `${nodeTypeOptionUrl}${location}/options`;

const useLoadNodeConfigFormOptions = (node, location) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [options, setOptions] = useState();

  useEffect(() => {
    if (node && location) {
      if (isNodeWithOptions(node)) {
        setIsLoading(true);
        setIsError(false);
        const loadOptions = async () => {
          try {
            const options = await axios.get(
              makeUrl(nodeTypeOptionUrls?.[node.type], location)
            );
            setOptions(options.data.data.options);
            setIsLoading(false);
            setIsError(false);
          } catch (e) {
            console.error(e);
            setIsLoading(false);
            setIsError(true);
          }
        };

        loadOptions();
      }
    }
  }, []);

  return { options, isLoading, isError };
};

export { useLoadNodeConfigFormOptions };
