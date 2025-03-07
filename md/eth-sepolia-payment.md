Để tích hợp thanh toán bằng ETH trên testnet Sepolia với **Node.js** (backend) và **React** (frontend), bạn có thể làm như sau:

---

## **1. Chuẩn bị**

### **1.1. Cấu hình testnet Sepolia**

- Dùng **Alchemy** hoặc **Infura** để lấy API endpoint Sepolia.
- Tạo **wallet test** (ví dụ: MetaMask) và nhận ETH test từ faucet Sepolia.

### **1.2. Cài đặt thư viện cần thiết**

```sh
npm install ethers dotenv express cors
```

---

## **2. Backend (Node.js + Express)**

Tạo file `server.js`:

```javascript
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
app.use(cors());
app.use(express.json());

// Thông tin RPC Sepolia và Private Key ví nhận tiền
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

app.post("/create-transaction", async (req, res) => {
  try {
    const { to, amount } = req.body;
    const tx = {
      to,
      value: ethers.parseEther(amount),
      gasLimit: 21000, // Gas tối thiểu cho transaction
    };

    const transaction = await wallet.sendTransaction(tx);
    await transaction.wait(); // Chờ giao dịch xác nhận

    res.json({ txHash: transaction.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
```

**File `.env`:**

```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
PRIVATE_KEY=YOUR_WALLET_PRIVATE_KEY
```

---

## **3. Frontend (React)**

Tạo file `Payment.js`:

```javascript
import React, { useState } from "react";
import { ethers } from "ethers";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  const sendTransaction = async () => {
    if (!window.ethereum) return alert("Vui lòng cài MetaMask!");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const recipient = "0xYourReceivingAddress"; // Địa chỉ nhận

      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount),
      });

      setTransactionHash(tx.hash);
      alert("Giao dịch đang được xử lý...");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra!");
    }
  };

  return (
    <div>
      <h2>Thanh toán bằng ETH (Sepolia)</h2>
      <input type="text" placeholder="Nhập số ETH" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={sendTransaction}>Gửi ETH</button>
      {transactionHash && <p>Tx Hash: {transactionHash}</p>}
    </div>
  );
};

export default Payment;
```

---

## **4. Chạy ứng dụng**

- **Backend**:
  ```sh
  node server.js
  ```
- **Frontend**:
  ```sh
  npm start
  ```

---

## **5. Kiểm tra giao dịch**

- Dùng **Etherscan Sepolia**:  
  👉 [https://sepolia.etherscan.io/](https://sepolia.etherscan.io/)
- Dán **Transaction Hash** vào để xem trạng thái giao dịch.

---

### **Tóm tắt**

✔ **Node.js** backend để tạo giao dịch từ server.  
✔ **React + ethers.js** để gửi giao dịch từ MetaMask.  
✔ Kết nối với testnet **Sepolia** qua Alchemy/Infura.

Cần hỗ trợ thêm phần nào không? 🚀
