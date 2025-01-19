// Asegúrate de que Metamask esté instalado en el navegador y que el usuario esté conectado

const contractAddress = "0xcdcB074b154e0d9f2d4A0f92a087EEF6F9D2b8e6"; // Dirección del contrato desplegado
const contractABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstaked","type":"event"},{"inputs":[],"name":"DAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARD_RATE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distributeRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getDailyRewardAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTimeUntilNextReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTopStakers","outputs":[{"internalType":"address[]","name":"","type":"address[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRewardTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stake","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalGoo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"stakedAmount","type":"uint256"},{"internalType":"uint256","name":"gooProduced","type":"uint256"},{"internalType":"uint256","name":"lastClaimed","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];

let signer, contract;

// Verifica que el navegador tenga Metamask instalado y habilitado
if (typeof window.ethereum !== 'undefined') {
    console.log("Metamask está disponible");

    // Establece el proveedor de Ethers.js usando Metamask
    const provider = new ethers.BrowserProvider(window.ethereum);

    // Conecta con Metamask
    provider.send("eth_requestAccounts", []).then(() => {
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("Conectado al contrato");
    }).catch((err) => {
        console.error("Error al conectar con Metamask:", err);
    });
} else {
    console.log("Metamask no está instalado");
}

// Función para hacer stake de BNB
async function stakeBNB(amount) {
    if (!signer) {
        alert("Conéctate con Metamask");
        return;
    }

    try {
        const tx = await contract.stake({
            value: ethers.parseEther(amount.toString())
        });
        console.log("Transacción enviada:", tx.hash);
        await tx.wait();
        console.log("Stake completado");
    } catch (error) {
        console.error("Error al hacer stake:", error);
    }
}

// Función para hacer unstake de BNB
async function unstakeBNB(amount) {
    if (!signer) {
        alert("Conéctate con Metamask");
        return;
    }

    try {
        const tx = await contract.unstake(ethers.parseEther(amount.toString()));
        console.log("Transacción enviada:", tx.hash);
        await tx.wait();
        console.log("Unstake completado");
    } catch (error) {
        console.error("Error al hacer unstake:", error);
    }
}

// Función para reclamar recompensas
async function claimRewards() {
    if (!signer) {
        alert("Conéctate con Metamask");
        return;
    }

    try {
        const tx = await contract.claimRewards();
        console.log("Transacción enviada:", tx.hash);
        await tx.wait();
        console.log("Recompensas reclamadas");
    } catch (error) {
        console.error("Error al reclamar recompensas:", error);
    }
}

// Función para distribuir recompensas
async function distributeRewards() {
    if (!signer) {
        alert("Conéctate con Metamask");
        return;
    }

    try {
        const tx = await contract.distributeRewards();
        console.log("Transacción enviada:", tx.hash);
        await tx.wait();
        console.log("Recompensas distribuidas");
    } catch (error) {
        console.error("Error al distribuir recompensas:", error);
    }
}

// Función para obtener los top 10 stakers
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
        console.error("Error al obtener top stakers:", error);
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
        console.error("Error al obtener tiempo restante:", error);
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
        console.error("Error al obtener recompensa diaria:", error);
    }
}
