const { ethers } = require("ethers");

// Dirección del contrato desplegado
const contractAddress = "TU_DIRECCION_DE_CONTRATO";

// ABI del contrato generado con Solidity
const contractABI = [
  // Añade aquí el ABI generado para tu contrato
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

// Aquí configuramos el Signer para interactuar con la red de Ethereum (o la red donde esté desplegado el contrato)
const signer = new ethers.Wallet("TU_CLAVE_PRIVADA");

// Crear instancia del contrato
const contract = new ethers.Contract(contractAddress, contractABI, signer);

async function stakeBNB(amount) {
  const tx = await contract.stake({ value: ethers.utils.parseEther(amount.toString()) });
  console.log("Transacción enviada:", tx.hash);
  await tx.wait();
  console.log("Stake completado");
}

async function unstakeBNB(amount) {
  const tx = await contract.unstake(ethers.utils.parseEther(amount.toString()));
  console.log("Transacción enviada:", tx.hash);
  await tx.wait();
  console.log("Unstake completado");
}

async function claimRewards() {
  const tx = await contract.claimRewards();
  console.log("Transacción enviada:", tx.hash);
  await tx.wait();
  console.log("Recompensas reclamadas");
}

async function distributeRewards() {
  const tx = await contract.distributeRewards();
  console.log("Transacción enviada:", tx.hash);
  await tx.wait();
  console.log("Recompensas distribuidas");
}

async function getTopStakers() {
  const [topStakers, topAmounts] = await contract.getTopStakers();
  console.log("Top Stakers:", topStakers);
  console.log("Top Amounts:", topAmounts);
}

async function getTimeUntilNextReward() {
  const timeRemaining = await contract.getTimeUntilNextReward();
  console.log("Tiempo restante para la próxima recompensa:", timeRemaining);
}

async function getDailyRewardAmount() {
  const dailyReward = await contract.getDailyRewardAmount();
  console.log("Recompensa diaria a distribuir:", ethers.utils.formatEther(dailyReward));
}

// Ejemplo de uso
(async () => {
  await stakeBNB(1); // Stake 1 BNB
  await unstakeBNB(0.5); // Unstake 0.5 BNB
  await claimRewards(); // Reclamar recompensas
  await distributeRewards(); // Distribuir recompensas
  await getTopStakers(); // Obtener los mejores 10 stakers
  await getTimeUntilNextReward(); // Ver tiempo restante para recompensas
  await getDailyRewardAmount(); // Ver recompensa diaria
})();
