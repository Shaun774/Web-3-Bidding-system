const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;


const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "budget",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "category",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "deadline",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "duration",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "requirement",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "name": "ProjectCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_budget",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_category",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_deadline",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_duration",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_requirement",
        "type": "string"
      }
    ],
    "name": "createProject",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllProject",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "budget",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "category",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "deadline",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "duration",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "requirement",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          }
        ],
        "internalType": "struct BiddingSystem.Project[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "projectCounter",
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "projects",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "budget",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "category",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "deadline",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "duration",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "requirement",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

let web3;
let contract;

async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask is not installed. Please install MetaMask and try again.");
    return;
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);  // Connect contract with signer
    console.log("Connected to contract:", contract);
    alert("Wallet Connected!");
  } catch (error) {
    console.error("Wallet connection failed:", error);
    alert("Failed to connect wallet. Check the console for details.");
  }
}


// Function to create a project
async function createProject() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const budget = document.getElementById("budget").value;
  const category = document.getElementById("category").value;
  const deadline = Math.floor(new Date(document.getElementById("deadline").value).getTime() / 1000);
  const duration = document.getElementById("duration").value;
  const requirement = document.getElementById("requirement").value;
  if (!title || !description || !budget || !category || !deadline || !duration || !requirement) {
    alert("All fields are required!");
    return;
  }

  try {
    console.log("entered the try block")
    const tx = await contract.createProject(
      title,
      description,
      parseInt(budget),
      category,
      deadline,
      duration,
      requirement
    );
    await tx.wait();
    alert("Project Created Successfully!");
    loadProjects()
  } catch (error) {
    console.error("Error creating project:", error);
  }

}


// Function to load projects from the contract
async function loadProjects() {
  try {
    console.log("load intiated")
    const container = document.getElementById("project-container");
    if (container) {
      container.innerHTML = "";
      const projects = await contract.getAllProject();

      projects.forEach((project) => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
        <h2>${project.title}</h2>
        <p><strong>Description:</strong> ${project.description}</p>
        <p><strong>Budget:</strong> ${project.budget} wei</p>
        <p><strong>Category:</strong> ${project.category}</p>
        <p><strong>Deadline:</strong> ${project.deadline}</p>
        <p><strong>Duration:</strong> ${project.duration}</p>
        <p><strong>Requirement:</strong> ${project.requirement}</p>
      `;
        container.appendChild(card);
      });
      
    }
  } catch (error) {
    alert("Error loading projects: " + error.message);
    console.error("Error loading projects:", error);
  }
}


// Function to place a bid
async function placeBid(projectId) {
  const bidAmount = document.getElementById("bidAmount").value;
  if (!bidAmount) {
    alert("Please enter a bid amount.");
    return;
  }

  try {
    const tx = await contract.placeBid(projectId, { value: ethers.utils.parseEther(bidAmount) });
    await tx.wait();
    alert("Bid placed successfully!");
  } catch (error) {
    console.error("Error placing bid:", error);
  }
}

// Function to track milestones
async function loadMilestones() {
  const milestoneList = document.getElementById("milestoneList");
  milestoneList.innerHTML = "";

  try {
    const milestones = await contract.getMilestones();
    milestones.forEach((milestone, index) => {
      const milestoneElement = document.createElement("div");
      milestoneElement.classList.add("milestone");
      milestoneElement.innerHTML = `
              <p>Project ID: ${milestone.projectId}</p>
              <p>Milestone: ${milestone.description}</p>
              <p>Status: ${milestone.completed ? "Completed" : "Pending"}</p>
          `;
      milestoneList.appendChild(milestoneElement);
    });
  } catch (error) {
    console.error("Error loading milestones:", error);
  }
}

// Event Listeners
document.getElementById("connectButton").addEventListener("click", connectWallet);
document.getElementById("createProjectButton").addEventListener("click", createProject);
document.getElementById("placeBidButton").addEventListener("click", placeBid);

// Load Projects on Page Load
// window.onload = () => {
//   loadProjects();
//   loadMilestones();
// };

window.onload = () => {
  connectWallet();  // optional: auto-connect
  loadProjects(); // to autometecly load projects
};
