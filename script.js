let provider, signer, contract;

// Dirección del contrato y ABI del contrato (completos y correctos)
const contractAddress = "0xcdcB074b154e0d9f2d4A0f92a087EEF6F9D2b8e6";
const contractABI = [
  // ABI del contrato generado con Solidity
  {
    "inputs": [],
    "name": "stake",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_amount", "type": "uint256"}],
    "name": "unstake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "distributeRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTopStakers",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTimeUntilNextReward",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDailyRewardAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "receive",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

// Verifica que Metamask esté disponible
if (typeof window.ethereum !== 'undefined') {
    console.log("Metamask está disponible");

    // Establece el proveedor usando Metamask
    provider = new ethers.BrowserProvider(window.ethereum);

    // Solicita la conexión a Metamask (solo una vez)
    provider.send("eth_requestAccounts", []).then(() => {
        signer = provider.getSigner();  // Obtén el firmante de Metamask
        console.log("Cuenta conectada:", signer);

        // Conecta al contrato
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("Contrato conectado");
    }).catch((error) => {
        console.error("Error al conectar con Metamask:", error);
        alert("Error al conectar con Metamask. Asegúrate de que Metamask esté instalado y conectado.");
    });
} else {
    console.log("Metamask no está instalado");
    alert("Metamask no está instalado. Instálalo para interactuar con el contrato.");
}

// Función para hacer stake
async function stakeBNB(amount) {
    if (!signer) {
        alert("Conéctate con Metamask");
        return;
    }

    try {
        console.log("Iniciando transacción de stake...");

        // Realiza el stake (conviértelo en un formato adecuado)
        const tx = await contract.stake({
            value: ethers.parseEther(amount.toString())
        });
        console.log("Transacción enviada:", tx.hash);

        // Espera la confirmación de la transacción
        await tx.wait();
        console.log("Stake completado");
    } catch (error) {
        console.error("Error al hacer stake:", error);
        alert("Error al hacer stake. Intenta nuevamente.");
    }
}

// Función para hacer unstake
async function unstakeBNB(amount) {
    if (!signer) {
        alert("Conéctate con Metamask");
        return;
    }

    try {
        console.log("Iniciando transacción de unstake...");

        // Realiza el unstake
        const tx = await contract.unstake(ethers.parseEther(amount.toString()));
        console.log("Transacción enviada:", tx.hash);

        // Espera la confirmación
        await tx.wait();
        console.log("Unstake completado");
    } catch (error) {
        console.error("Error al hacer unstake:", error);
        alert("Error al hacer unstake. Intenta nuevamente.");
    }
}

// Función para reclamar recompensas
async function claimRewards() {
    if (!signer) {
        alert("Conéctate con Metamask");
        return;
    }

    try {
        console.log("Reclamando recompensas...");

        // Llama a la función de reclamar recompensas
        const tx = await contract.claimRewards();
        console.log("Transacción enviada:", tx.hash);

        // Espera la confirmación
        await tx.wait();
        console.log("Recompensas reclamadas");
    } catch (error) {
        console.error("Error al reclamar recompensas:", error);
        alert("Error al reclamar recompensas. Intenta nuevamente.");
    }
}

// Función para distribuir recompensas
async function distributeRewards() {
    if (!signer) {
        alert("Conéctate con Metamask");
        return;
    }

    try {
        console.log("Distribuyendo recompensas...");

        // Llama a la función para distribuir recompensas
        const tx = await contract.distributeRewards();
        console.log("Transacción enviada:", tx.hash);

        // Espera la confirmación
        await tx.wait();
        console.log("Recompensas distribuidas");
    } catch (error) {
        console.error("Error al distribuir recompensas:", error);
        alert("Error al distribuir recompensas. Intenta nuevamente.");
    }
}

// Función para obtener los top stakers
async function getTopStakers() {
    if (!signer) {
        alert("Conéctate con Metamask");
        return;
    }

    try {
        const [topStakers, topAmounts] = await contract.getTopStakers();
        console.log("Top Stakers:", topStakers);
        console.log("Top Amounts:", topAmounts);
    } catch (error) {
        console.error("Error al obtener los top stakers:", error);
        alert("Error al obtener los top stakers.");
    }
}

// Función para obtener el tiempo hasta la próxima recompensa
async function getTimeUntilNextReward() {
    if (!signer) {
        alert("Conéctate con Metamask");
        return;
    }

    try {
        const timeRemaining = await contract.getTimeUntilNextReward();
        console.log("Tiempo restante para la próxima recompensa:", timeRemaining);
    } catch (error) {
        console.error("Error al obtener el tiempo restante:", error);
        alert("Error al obtener el tiempo restante.");
    }
}

// Función para obtener la recompensa diaria
async function getDailyRewardAmount() {
    if (!signer) {
        alert("Conéctate con Metamask");
        return;
    }

    try {
        const dailyReward = await contract.getDailyRewardAmount();
        console.log("Recompensa diaria a distribuir:", ethers.formatEther(dailyReward));
    } catch (error) {
        console.error("Error al obtener la recompensa diaria:", error);
        alert("Error al obtener la recompensa diaria.");
    }
}
