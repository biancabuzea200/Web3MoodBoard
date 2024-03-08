const MoodContractAddress = '0xe8dd69c5ab5c7f9b340e75a097c4e3cbe3571872';

const MoodContractABI = [{
        "inputs": [],
        "name": "getMood",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "string",
            "name": "_mood",
            "type": "string"
        }],
        "name": "setMood",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");

provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    MoodContract = new ethers.Contract(
      MoodContractAddress,
      MoodContractABI,
      signer
    );
  });
});

async function getMood() {
  const mood = await MoodContract.getMood();
  document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
  console.log(mood);
}

async function setMood() {
  const mood = document.getElementById("mood").value;
  await MoodContract.setMood(mood);
}

// Currently these two are undefined, we will use Ethers to assign them values
//let MoodContract = undefined;
//let signer = undefined;


