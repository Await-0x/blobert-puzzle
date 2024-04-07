export const getBloberts = async (owner) => {
  const blobertAddress = '0x00539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1'
  const url = `https://api.starkscan.co/api/v0/nfts?contract_address=${blobertAddress}&owner_address=${owner}&limit=100`

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'x-api-key': import.meta.env.VITE_STARKSCAN_KEY
      },
    });

    const data = await response.json();
    return data.data.map(nft => nft.token_id);
  } catch (error) {
    console.error("Error getting bloberts", error);
  }
};

export const getPiecesEvents = async (eventList, token) => {
  // const rpcUrl = import.meta.env.VITE_PUBLIC_NODE_URL;
  const rpcUrl = "https://starknet-mainnet.g.alchemy.com/v2/MG9LXo50DOJi4_g0qmtShuiJKY4KPQHF"

  try {
    const requestBody = {
      id: 1,
      jsonrpc: "2.0",
      method: "starknet_getEvents",
      params: [
        {
          from_block: { block_number: 630703 },
          to_block: 'latest',
          address: '0x06c8c9e32217065d14aeef18561b42111cb62b2164771e0ede8b2118e3773c32',
          chunk_size: 999
        }
      ]
    };

    if (token) {
      requestBody.params[0].continuation_token = token
    }

    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (data.result?.events) {
      eventList = [...eventList, ...data.result.events.map(event => event.data)]
    }

    if (data.result?.continuation_token) {
      return getPiecesEvents(eventList, data.result?.continuation_token);
    }

    return eventList;
  } catch (error) {
    console.error("Error getting pieces", error);
  }
}