import counterpart from "counterpart";
import hirestime from "hirestime";
import { shuffle } from "lodash";
import { ConnectionManager } from "peerplaysjs-lib";
import { useCallback, useRef } from "react";

import { useSettingsContext } from "../../providers";
import {
  ApiLatencies,
  ApiServer,
  ConnectionManagerType,
  LatencyPreferences,
  Node,
  NodeTree,
  NodeTreeBranch,
} from "../../types";

import {
  NodeTransitionCallbackType,
  UseNodeTransitionResult,
} from "./useNodeTransition.types";

const CONNECTION_ATTEMPTS = 8;

export function useNodeTransition(): UseNodeTransitionResult {
  // NodeTransition
  const willTransitionToInProgress = useRef<
    boolean | string | { background: boolean; key: string }
  >(false);
  const isAutoSelection = useRef<boolean>(false);
  const statusCallback = useRef<NodeTransitionCallbackType>();
  const connectionManager = useRef<ConnectionManagerType>(
    new ConnectionManager({ url: "", urls: [] as string[] })
  );

  // Pinger
  const pingerBeSatisfiedWith = useRef<{
    instant: number;
    low: number;
    medium: number;
  }>({ instant: 0, low: 0, medium: 0 });
  const pingerCounter = useRef<{
    instant: number;
    low: number;
    medium: number;
  }>({ instant: 0, low: 0, medium: 0 });
  const suitableNodeFound = useRef<boolean>(false);
  const pingInBackGround = useRef<boolean>(false);
  const updateTransitionTargetKey = useRef<string>();
  const pingerNodeURLs = useRef<string[]>([]);
  const currentNode = useRef<number>(0);
  const localLatencyCache = useRef<ApiLatencies>({});
  const callbackWasCalled = useRef<boolean>(false);
  const range = useRef<number>(3);
  const callback = useRef<() => void>();

  //DirectPinger
  const directPingerUrls = useRef<
    {
      url: string;
      latency: number | undefined;
    }[]
  >([]);
  const directPingerTimeout = useRef<number>(2000);

  // PingerStrategy
  const pingerStrategyNodesList = useRef<ApiServer[]>([]);
  const pingerStrategyCallback = useRef<() => void>();
  const nodeTree = useRef<NodeTree>({});
  const preferences = useRef<LatencyPreferences>({} as LatencyPreferences);

  const {
    apiSettings,
    setLatencyChecks,
    updateLatencies,
    setLatencyPreferences,
  } = useSettingsContext();

  const isTransitionInProgress = useCallback(() => {
    return (
      willTransitionToInProgress.current &&
      typeof willTransitionToInProgress !== "object"
    );
  }, [willTransitionToInProgress, willTransitionToInProgress.current]);

  const apiUrlSecuritySuitable = useCallback(
    (apiNodeUrl: string) => {
      if (
        typeof window !== "undefined" &&
        window.location.protocol === "https:"
      ) {
        return apiNodeUrl.indexOf("ws://") == -1;
      } else {
        return true;
      }
    },
    [window]
  );

  const getLastNode = useCallback(() => {
    return apiSettings.activeUrl;
  }, [apiSettings, apiSettings.activeUrl]);

  const getAllApiServers = useCallback(() => {
    return apiSettings.apiServers.filter((apiServer) => {
      // Remove all but the whitelisted ones
      const filteredApiServers = apiSettings.filteredApiServers;
      if (filteredApiServers.length > 0) {
        // list may contain urls or regions
        if (filteredApiServers.indexOf(apiServer.node.url) !== -1) {
          return true;
        }
        if (
          apiServer.node.region &&
          filteredApiServers.indexOf(apiServer.node.region) !== -1
        ) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    });
  }, [apiSettings, apiSettings.apiServers, apiSettings.filteredApiServers]);

  // Pinger Strategy

  const getNodes: (
    latenciesMap?: ApiLatencies,
    latencies?: boolean,
    hidden?: boolean,
    unsuitableSecurity?: boolean
  ) => ApiServer[] = useCallback(
    (
      latenciesMap,
      latencies = true,
      hidden = false,
      unsuitableSecurity = false
    ) => {
      let filledLatenciesMap: ApiLatencies;
      if (!latenciesMap) {
        filledLatenciesMap = apiSettings.apiLatencies;
      } else {
        filledLatenciesMap = latenciesMap;
      }
      if (latencies) {
        // if there are no latencies, return all that are left after filtering
        latencies = Object.keys(filledLatenciesMap).length > 0;
      }
      let filteredApiServers = getAllApiServers().filter((apiServer) => {
        // Skip hidden nodes
        if (!hidden && apiServer.hidden) return false;

        // remove the automatic fallback dummy url
        if (apiServer.node.url.indexOf("fake.automatic-selection") !== -1)
          return false;

        // Remove insecure websocket urls when using secure protocol
        if (
          !unsuitableSecurity &&
          !apiUrlSecuritySuitable(apiServer.node.url)
        ) {
          return false;
        }
        // we don't know any latencies, return all
        if (!latencies) return true;

        // only keep the ones we were able to connect to
        return filledLatenciesMap[apiServer.node.url];
      });
      // create more info in the entries
      filteredApiServers = filteredApiServers.map((apiServer) => {
        apiServer.name = apiServer.node.location || "Unknown";
        if (apiServer.node.url in filledLatenciesMap) {
          apiServer.latency = filledLatenciesMap[apiServer.node.url];
        } else {
          apiServer.latency = undefined;
        }
        return apiServer;
      });
      // now sort
      filteredApiServers = filteredApiServers.sort((a, b) => {
        // if both have latency, sort according to that
        if (a.latency && b.latency) {
          return a.latency - b.latency;
          // sort testnet to the bottom
        } else if (!a.latency && !b.latency) {
          return 1;
          // otherwise prefer the pinged one
        } else if (a.latency && !b.latency) {
          return -1;
        } else if (b.latency && !a.latency) {
          return 1;
        }
        return 0;
      });

      /*
       * We've somehow filtered out all nodes, revert to the full list of
       * nodes in that case
       */
      if (!filteredApiServers.length) {
        console.warn("No nodes length, returning all of them");
        return getAllApiServers();
      }
      return filteredApiServers;
    },
    [
      apiSettings,
      apiSettings.apiLatencies,
      getAllApiServers,
      apiUrlSecuritySuitable,
    ]
  );

  const getNodesToConnectTo: (
    all?: boolean,
    latenciesMap?: ApiLatencies,
    keepObject?: boolean
  ) => ApiServer[] | string[] = useCallback(
    (all = false, latenciesMap, keepObject = false) => {
      const nodeList = getNodes(latenciesMap, !all); // drop location, only urls in list
      if (!keepObject) {
        const urls = nodeList.map((apiServer) => apiServer.node.url);
        return urls;
      } else {
        return nodeList;
      }
    },
    [getNodes]
  );

  const getFirstToTry = useCallback(
    (urls: string[]) => {
      let tryThisNode = getLastNode();
      // fallback to the best of the pre-defined URLs ...

      // ... if there is no preset connectionString fallback to lowest latency
      if (!tryThisNode) tryThisNode = urls[0];

      // ... if auto selection is on (is also ensured in initConnection, but we don't want to ping
      //     a unreachable url)
      if (isAutoSelection.current) {
        tryThisNode = urls[0];
        console.log("auto selecting to " + tryThisNode);
      }

      if (!tryThisNode) {
        // something went horribly wrong, no node to connect to
        throw "No node to connect to found, this should not happen.";
      }

      // ... if insecure websocket url is used when using secure protocol
      //    (the list urls only contains matching ones)
      if (!apiUrlSecuritySuitable(tryThisNode)) tryThisNode = urls[0];

      return tryThisNode;
    },
    [
      getLastNode,
      isAutoSelection,
      isAutoSelection.current,
      apiUrlSecuritySuitable,
    ]
  );

  const initConnectionManager: (urls?: string[]) => void = useCallback(
    (urls) => {
      if (!urls) {
        urls = getNodesToConnectTo(true) as string[];
      }
      // decide where to connect to first
      const connectionString = getFirstToTry(urls);
      willTransitionToInProgress.current = connectionString;
      const _connectionManager = new ConnectionManager({
        url: connectionString,
        urls: urls,
        // closeCb: this._onConnectionClose.bind(this),
        // optionalApis: { enableOrders: true },
        // urlChangeCallback: (url) => {
        //   console.log("fallback to new url:", url);
        //   if (!!url) {
        //     // Update connection status
        //     this.updateTransitionTarget(
        //       counterpart.translate("app_init.connecting", {
        //         server: url,
        //       })
        //     );
        //   }
        //   SettingsActions.changeSetting({
        //     setting: "activeNode",
        //     value: url,
        //   });
        // },
      });
      connectionManager.current = _connectionManager;
    },
    [
      getNodesToConnectTo,
      getFirstToTry,
      willTransitionToInProgress,
      connectionManager,
    ]
  );

  const updateTransitionTarget = useCallback(
    (update: string | { background: boolean; key: string } | boolean) => {
      willTransitionToInProgress.current = update;
      if (statusCallback.current !== undefined) {
        statusCallback.current(update);
      }
    },
    [willTransitionToInProgress, statusCallback]
  );

  const clearLatencies = useCallback(() => {
    updateLatencies({} as ApiLatencies);
  }, [updateLatencies]);

  const transitionDone = useCallback(
    (resolveOrReject?: () => void) => {
      if (resolveOrReject) {
        resolveOrReject();
      }
      willTransitionToInProgress.current = false;
      statusCallback.current = undefined;
    },
    [willTransitionToInProgress, statusCallback]
  );

  const enableBackgroundPinging = useCallback(() => {
    pingerBeSatisfiedWith.current = { instant: 0, low: 0, medium: 0 };
    pingerCounter.current = { instant: 0, low: 0, medium: 0 };
    suitableNodeFound.current = false;
    pingInBackGround.current = true;
  }, [
    pingerBeSatisfiedWith,
    pingerBeSatisfiedWith.current,
    pingerCounter,
    pingerCounter.current,
    suitableNodeFound,
    suitableNodeFound.current,
    pingInBackGround,
    pingInBackGround.current,
  ]);

  // TODO: Originally was addNodes
  const addPingerNodes: (
    nodes: string[],
    reset?: boolean,
    translationKey?: string
  ) => void = useCallback(
    (nodes, reset = true, translationKey = undefined) => {
      updateTransitionTargetKey.current = translationKey;
      if (reset || pingerNodeURLs.current.length === 0) {
        pingerNodeURLs.current = nodes;
        currentNode.current = 0;
        pingerCounter.current = { instant: 0, low: 0, medium: 0 };
        localLatencyCache.current = {};
        suitableNodeFound.current = false;
        pingInBackGround.current = false;
      } else {
        const notAddedNodeURLs: string[] = [];
        nodes.forEach((node) => {
          if (pingerNodeURLs.current.indexOf(node) === -1) {
            notAddedNodeURLs.push(node);
          }
        });
        pingerNodeURLs.current = [
          ...pingerNodeURLs.current,
          ...notAddedNodeURLs,
        ];
      }
    },
    [
      updateTransitionTargetKey,
      pingerNodeURLs,
      pingerNodeURLs.current,
      currentNode,
      currentNode.current,
      pingerCounter,
      pingerCounter.current,
      localLatencyCache,
      localLatencyCache.current,
      suitableNodeFound,
      suitableNodeFound.current,
      pingInBackGround,
      pingInBackGround.current,
    ]
  );

  const continueToPing = useCallback(() => {
    return (
      currentNode.current < pingerNodeURLs.current.length &&
      (!suitableNodeFound.current || pingInBackGround.current)
    );
  }, [
    currentNode,
    currentNode.current,
    pingerNodeURLs,
    pingerNodeURLs.current,
    pingerNodeURLs.current.length,
    suitableNodeFound,
    suitableNodeFound.current,
    pingInBackGround,
    pingInBackGround.current,
  ]);

  const notifyCallback = useCallback(() => {
    if (callbackWasCalled.current) {
      return false;
    } else {
      return (
        suitableNodeFound.current ||
        currentNode.current == pingerNodeURLs.current.length
      );
    }
  }, [
    callbackWasCalled,
    callbackWasCalled.current,
    suitableNodeFound,
    suitableNodeFound.current,
    currentNode.current,
    pingerNodeURLs,
    pingerNodeURLs.current,
    pingerNodeURLs.current.length,
  ]);

  const addDirectPingerURL = useCallback(
    (url: string) => {
      directPingerUrls.current = [
        ...directPingerUrls.current,
        { url, latency: NaN },
      ];
    },
    [
      directPingerUrls,
      directPingerUrls.current,
      directPingerUrls.current.length,
    ]
  );

  const checkURL = useCallback(
    (url: string) => {
      return new Promise<undefined | number>((resolve) => {
        setTimeout(function () {
          resolve(undefined);
        }, directPingerTimeout.current);
        try {
          let closeTime = 0;
          const connection = new WebSocket(url);
          const openTime = hirestime();
          connection.onerror = () => {
            resolve(undefined);
          };
          connection.onopen = () => {
            connection.onmessage = function () {
              closeTime = openTime.ms();
              connection.close();
              resolve(closeTime);
            };
            connection.onmessage.bind(connection);
            connection.send(
              '{"id":1,"method":"call","params":[1,"login",["",""]]}'
            );
          };
        } catch (e) {
          console.log(e);
          resolve(undefined);
        }
      });
    },
    [directPingerTimeout, directPingerTimeout.current]
  );

  const runCheck = useCallback(async () => {
    const latencyPromises: Promise<number | undefined>[] = [];
    for (let i = 0; i < directPingerUrls.current.length; i++) {
      const latencyPromise = checkURL(directPingerUrls.current[i].url);
      latencyPromises.push(latencyPromise);
    }
    const latencies = await Promise.all(latencyPromises);
    directPingerUrls.current = directPingerUrls.current.map((url, index) => {
      return {
        url: url.url,
        latency: latencies[index],
      };
    });
    directPingerUrls.current.sort((a, b) => {
      return Number(a.latency) - Number(b.latency);
    });
    return directPingerUrls.current.slice();
  }, [
    directPingerUrls,
    directPingerUrls.current,
    directPingerUrls.current.length,
    checkURL,
  ]);

  const checkUrlsPings = useCallback(
    async (urls: string[]) => {
      urls.forEach((url) => {
        addDirectPingerURL(url);
      });
      const _all = {} as ApiLatencies;
      try {
        const result = await runCheck();
        result.forEach((item) => {
          _all[item.url] = item.latency;
        });
        return _all;
      } catch (err) {
        console.error(err);
      }
    },
    [addDirectPingerURL, runCheck]
  );

  const checkIfSuitableFound = useCallback(() => {
    if (
      pingerCounter.current.instant > 0 ||
      pingerCounter.current.low >= 2 ||
      pingerCounter.current.medium >= 3
    ) {
      suitableNodeFound.current = true;
    }
  }, [
    pingerCounter,
    pingerCounter.current,
    suitableNodeFound,
    suitableNodeFound.current,
  ]);

  const updateSuitabilityCounter = useCallback(
    (res: ApiLatencies) => {
      for (const nodeUrl in Object.keys(res)) {
        if ((res[nodeUrl] as number) < pingerBeSatisfiedWith.current.instant) {
          pingerCounter.current.instant = pingerCounter.current.instant + 1;
        } else if (
          (res[nodeUrl] as number) < pingerBeSatisfiedWith.current.low
        ) {
          pingerCounter.current.low = pingerCounter.current.low + 1;
        } else if (
          (res[nodeUrl] as number) < pingerBeSatisfiedWith.current.medium
        ) {
          pingerBeSatisfiedWith.current.medium =
            pingerBeSatisfiedWith.current.medium + 1;
        }
      }
      checkIfSuitableFound();
    },
    [
      pingerBeSatisfiedWith,
      pingerBeSatisfiedWith.current,
      pingerCounter,
      pingerCounter.current,
      checkIfSuitableFound,
    ]
  );

  const _updateLatencies: (
    mapOfPings: ApiLatencies,
    force: boolean,
    container?: ApiLatencies
  ) => void = useCallback(
    (mapOfPings, force = true, container = undefined) => {
      const apiLatencies = { ...apiSettings.apiLatencies };

      for (const node in mapOfPings) {
        if (!force && node in apiLatencies) {
          continue;
        }
        apiLatencies[node] = mapOfPings[node];
        if (container !== undefined) {
          container[node] = mapOfPings[node];
        }
      }
      updateLatencies(apiLatencies);
    },
    [apiSettings, apiSettings.apiLatencies, updateLatencies]
  );

  const handlePingResult = useCallback(
    (res?: ApiLatencies) => {
      if (res && Object.keys(res).length > 0) {
        console.log("Latency result:", res);
        updateSuitabilityCounter(res);
        // build additional ping cache
        _updateLatencies(res, true, localLatencyCache.current);
      }
    },
    [
      updateSuitabilityCounter,
      _updateLatencies,
      localLatencyCache,
      localLatencyCache.current,
    ]
  );

  const pingNodesInBatches = useCallback(async () => {
    // cache the value, callback might change something
    const _continueToPing = continueToPing();

    if (notifyCallback()) {
      callbackWasCalled.current = true;
      if (continueToPing()) {
        console.log(
          "Node with sufficient latency found, continueing to ping the rest in background"
        );
      }
      if (callback.current) {
        callback.current();
      }
    }

    if (_continueToPing) {
      const pingNow = pingerNodeURLs.current.slice(
        currentNode.current,
        currentNode.current + range.current
      );
      const key =
        updateTransitionTargetKey.current === undefined
          ? "app_init.check_latency_feedback"
          : updateTransitionTargetKey.current;
      if (pingInBackGround.current) {
        updateTransitionTarget(
          counterpart.translate(key, {
            pinged: currentNode.current,
            totalToPing: pingerNodeURLs.current.length,
          })
        );
      } else {
        updateTransitionTarget({
          background: true,
          key: counterpart.translate(key, {
            pinged: currentNode.current,
            totalToPing: pingerNodeURLs.current.length,
          }),
        });
      }
      try {
        const localApiLatencies = await checkUrlsPings(pingNow);
        handlePingResult(localApiLatencies);
      } catch (err) {
        console.error("doLatencyUpdate error", err);
      } finally {
        //TODO: check this part
        currentNode.current = currentNode.current + pingNow.length;
        setTimeout(pingNodesInBatches, 500);
      }
    } else {
      // show message for seconds, then finished
      updateTransitionTarget(false);
    }
  }, [
    continueToPing,
    notifyCallback,
    callbackWasCalled,
    callbackWasCalled.current,
    callback,
    callback.current,
    pingerNodeURLs,
    pingerNodeURLs.current,
    pingerNodeURLs.current.length,
    currentNode,
    currentNode.current,
    range,
    range.current,
    updateTransitionTargetKey,
    updateTransitionTargetKey.current,
    pingInBackGround,
    pingInBackGround.current,
    updateTransitionTarget,
    checkUrlsPings,
  ]);

  const pingNodes: (callbackFunc?: () => void, nodes?: string[]) => void =
    useCallback(
      (callbackFunc, nodes = undefined) => {
        if (nodes) {
          addPingerNodes(nodes, true);
        }

        callbackWasCalled.current = false;
        callback.current = callbackFunc;

        // defaults
        range.current = 3;

        pingNodesInBatches();
      },
      [
        addPingerNodes,
        callbackWasCalled,
        callbackWasCalled.current,
        callback,
        range,
        range.current,
        pingNodesInBatches,
      ]
    );

  const updateBeSatisfiedWith = useCallback(
    (pingAll: boolean) => {
      if (pingAll) {
        pingerBeSatisfiedWith.current = { instant: 0, low: 0, medium: 0 };
      } else {
        pingerBeSatisfiedWith.current = {
          instant: 500,
          low: 800,
          medium: 1500,
        };
      }
    },
    [pingerBeSatisfiedWith, pingerBeSatisfiedWith.current]
  );

  const sortNodesToTree = useCallback(
    (nodesToPing: ApiServer[]) => {
      const _nodeTree = {} as NodeTree;

      nodesToPing.forEach((_node) => {
        const region = _node.node.region as string;
        const country = _node.node.country as string;
        if (_nodeTree[region] === undefined) {
          _nodeTree[region] = { all: [] as Node[] } as NodeTreeBranch;
        }
        if (_nodeTree[region] === undefined) {
          (_nodeTree[region] as NodeTreeBranch)[country] = [];
        }

        (_nodeTree[region] as NodeTreeBranch).all.push(_node.node);
        ((_nodeTree[region] as NodeTreeBranch)[country] as Node[]).push(
          _node.node
        );
      });

      nodeTree.current = _nodeTree;
    },
    [nodeTree]
  );

  const pingTheRest = useCallback(() => {
    addPingerNodes(
      pingerStrategyNodesList.current.map((a) => a.node.url),
      false,
      "app_init.check_latency_feedback_rest"
    );
    pingNodes(pingerStrategyCallback.current);
  }, [
    addPingerNodes,
    pingNodes,
    pingerStrategyNodesList,
    pingerStrategyNodesList.current,
    pingerStrategyCallback,
    pingerStrategyCallback.current,
  ]);

  const getLocalLatencyMap = useCallback(() => {
    return localLatencyCache.current;
  }, [localLatencyCache, localLatencyCache.current]);

  const getFromRegion: (
    regionKey: string,
    countryKey?: string,
    amount?: number,
    randomOrder?: boolean
  ) => Node[] = useCallback(
    (regionKey, countryKey = undefined, amount = 10, randomOrder = true) => {
      const filtered: Node[] = [];

      let countryKeys: string[] = [];
      if (!countryKey) {
        countryKeys = ["all"];
      } else {
        countryKeys = [countryKey];
      }

      countryKeys.forEach((_countryKey) => {
        if (
          !nodeTree.current[regionKey] ||
          !(nodeTree.current[regionKey] as NodeTreeBranch)[_countryKey]
        ) {
          return;
        }

        const allFromRegion = (nodeTree.current[regionKey] as NodeTreeBranch)[
          _countryKey
        ] as Node[];

        const shuffled = randomOrder ? shuffle(allFromRegion) : allFromRegion;

        let i;
        for (i = 1; i <= amount; i++) {
          if (shuffled.length >= i) filtered.push(shuffled[i - 1]);
        }
      });

      return filtered;
    },
    [nodeTree, nodeTree.current]
  );

  const pingAllFromOneRegion: (region?: string) => void = useCallback(
    (region = undefined) => {
      if (region === undefined) {
        const bestOne = getNodes(getLocalLatencyMap());
        region = bestOne && bestOne[0].node.region;
      }
      if (region) {
        addPingerNodes(
          getFromRegion(region).map((a) => a.url),
          false,
          "app_init.check_latency_feedback_region"
        );
      }
      pingNodes(pingTheRest);
    },
    [
      getNodes,
      getLocalLatencyMap,
      addPingerNodes,
      getFromRegion,
      pingNodes,
      pingTheRest,
    ]
  );

  const pingAllFromOneCountry: (region?: string, country?: string) => void =
    useCallback(
      (region = undefined, country = undefined) => {
        if (region === undefined) {
          const bestOne = getNodes(getLocalLatencyMap());
          region = bestOne && bestOne[0].node.region;
          country = bestOne && bestOne[0].node.country;
        }
        if (region && country) {
          addPingerNodes(
            getFromRegion(region, country).map((a) => a.url),
            false,
            "app_init.check_latency_feedback_country"
          );
        }
        pingNodes(pingAllFromOneRegion);
      },
      [
        getNodes,
        getLocalLatencyMap,
        addPingerNodes,
        getFromRegion,
        pingNodes,
        pingAllFromOneRegion,
      ]
    );

  const getFromEachRegion: (amount?: number, randomOrder?: boolean) => Node[] =
    useCallback(
      (amount = 2, randomOrder = true) => {
        const filtered: Node[] = [];

        Object.keys(nodeTree.current).forEach((regionKey) => {
          const allFromRegion = (nodeTree.current[regionKey] as NodeTreeBranch)[
            "all"
          ];
          let i;
          for (i = 1; i <= amount; i++) {
            if (allFromRegion.length >= i) filtered.push(allFromRegion[i - 1]);
          }
        });

        console.log("Node tree", filtered);

        if (randomOrder) {
          return shuffle(filtered);
        } else {
          return filtered;
        }
      },
      [nodeTree, nodeTree.current]
    );

  const pingTheWorld = useCallback(() => {
    addPingerNodes(
      getFromEachRegion().map((a) => a.url),
      false,
      "app_init.check_latency_feedback_world"
    );
    pingNodes(pingAllFromOneCountry);
  }, [addPingerNodes, getFromEachRegion, pingNodes, pingAllFromOneCountry]);

  const decideNext = useCallback(() => {
    if (preferences.current.region && preferences.current.country) {
      pingAllFromOneCountry(
        preferences.current.region,
        preferences.current.country
      );
    } else if (preferences.current.region) {
      pingAllFromOneRegion(preferences.current.region);
    } else {
      pingTheWorld();
    }
  }, [
    preferences,
    preferences.current,
    pingAllFromOneCountry,
    pingAllFromOneRegion,
    pingTheWorld,
  ]);

  const ping: (firstURL?: string, _preferences?: LatencyPreferences) => void =
    useCallback(
      (firstURL, _preferences = {} as LatencyPreferences) => {
        preferences.current = _preferences;

        if (firstURL) {
          addPingerNodes(
            [firstURL],
            false,
            "app_init.check_latency_feedback_last"
          );
          pingNodes(decideNext);
        } else {
          decideNext();
        }
      },
      [preferences, preferences.current, addPingerNodes, pingNodes, decideNext]
    );

  const doLatencyUpdate: (
    discardOldLatencies?: boolean,
    pingAll?: boolean,
    pingInBackground?: number
  ) => void = useCallback(
    (discardOldLatencies = false, pingAll = false, pingInBackground = 5000) => {
      updateTransitionTarget(counterpart.translate("app_init.check_latency"));
      return new Promise<void>((resolve) => {
        // if for some reason this method is called before connections are setup via willTransitionTo,
        // initialize the manager
        if (!connectionManager.current) {
          initConnectionManager();
        }
        const nodeList = getNodesToConnectTo(
          true,
          undefined,
          true
        ) as ApiServer[];
        pingerStrategyNodesList.current = nodeList;
        if (discardOldLatencies) {
          clearLatencies();
        }

        const originalURL = connectionManager.current.url;
        updateBeSatisfiedWith(pingAll);
        sortNodesToTree(nodeList);
        function donePinging() {
          // resort the api nodes with the new pings
          const apiServers = getNodesToConnectTo(
            false,
            undefined,
            true
          ) as ApiServer[];
          connectionManager.current.urls = apiServers.map((a) => a.node.url);
          // update preferences
          setLatencyPreferences({
            region: apiServers[0].node.region,
            country: apiServers[0].node.country,
          } as LatencyPreferences);

          if (
            isAutoSelection.current &&
            originalURL !== connectionManager.current.urls[0]
          ) {
            connectionManager.current.url = connectionManager.current.urls[0];
            console.log(
              "auto selecting to " +
                connectionManager.current.url +
                " after latency update"
            );
          } else {
            connectionManager.current.url = originalURL;
          }
          transitionDone(resolve);

          if (pingInBackground > 0) {
            const _func = function () {
              // wait for transition to be completed
              if (!willTransitionToInProgress.current) {
                enableBackgroundPinging();
                pingNodes(() => {
                  const _nodes = getNodesToConnectTo(
                    false,
                    undefined,
                    true
                  ) as ApiServer[];
                  connectionManager.current.urls = _nodes.map(
                    (a) => a.node.url
                  );
                  transitionDone();
                });
              } else {
                setTimeout(_func, 2000);
              }
            };
            setTimeout(_func, pingInBackground);
          }
        }
        pingerStrategyCallback.current = donePinging;

        ping(
          isAutoSelection.current ? undefined : getLastNode(),
          apiSettings.latencyPreferences
        );
      });
    },
    [
      updateTransitionTarget,
      connectionManager,
      connectionManager.current,
      initConnectionManager,
      getNodesToConnectTo,
      clearLatencies,
      pingerStrategyNodesList,
      pingerStrategyNodesList.current,
      updateBeSatisfiedWith,
      sortNodesToTree,
      setLatencyPreferences,
      isAutoSelection,
      isAutoSelection.current,
      transitionDone,
      willTransitionToInProgress,
      willTransitionToInProgress.current,
      enableBackgroundPinging,
      pingNodes,
      pingerStrategyCallback,
      pingerStrategyCallback.current,
      getLastNode,
      apiSettings,
      apiSettings.latencyPreferences,
    ]
  );

  /*
      appInit true when called via router, false false when node is manually selected in access settings
      statusCallback null function  can be given by the requesting component to notify the user of status changes
  */
  const willTransitionTo = useCallback(
    async (appInit = true, _statusCallback: NodeTransitionCallbackType) => {
      if (isTransitionInProgress()) {
        return new Promise<void>((resolve) => {
          resolve();
        });
      }
      statusCallback.current = _statusCallback;
      willTransitionToInProgress.current = true;
      return new Promise(() => {
        // dict of apiServer url as key and the latency as value
        const apiLatencies = apiSettings.apiLatencies;
        let latenciesEstablished = Object.keys(apiLatencies).length > 0;

        const latencyChecks = apiSettings.latencyChecks;
        if (latencyChecks >= CONNECTION_ATTEMPTS) {
          // every x connect attempts we refresh the api latency list
          // automatically
          setLatencyChecks(0);
          latenciesEstablished = false;
        } else {
          // otherwise increase the counter
          if (appInit) setLatencyChecks(latencyChecks + 1);
        }

        const urls = getNodesToConnectTo(false, apiLatencies) as string[];

        const lastNode = getLastNode();
        // set auto selection flag
        const _isAutoSelection =
          lastNode !== undefined &&
          lastNode.indexOf("fake.automatic-selection") !== -1;
        isAutoSelection.current = _isAutoSelection;

        initConnectionManager(urls);

        if (!latenciesEstablished || Object.keys(apiLatencies).length == 0) {
          console.log("do latency update");
          doLatencyUpdate();
          // doLatencyUpdate()
          //   .then(this._initiateConnection.bind(this, appInit, resolve, reject))
          //   .catch((err) => {
          //     console.log("catch doLatency", err);
          //   });
        } else {
          console.log("initiate connection");
          // this._initiateConnection(appInit, resolve, reject);
        }
      });
    },
    []
  );

  return {
    getNodes,
    willTransitionTo,
  };
}
