**Luồng hoạt động tổng thể:**

1.  **React Frontend:**
    - Người dùng chọn sản phẩm/dịch vụ và nhấn nút "Thanh toán bằng Metamask".
    - Ứng dụng kiểm tra xem Metamask đã được cài đặt và kết nối chưa.
    - Kết nối với ví Metamask của người dùng và lấy địa chỉ ví (account).
    - **Gửi yêu cầu tạo đơn hàng lên Express Server:** Gửi thông tin đơn hàng (sản phẩm, số lượng, giá trị ETH dự kiến, địa chỉ ví người dùng) lên backend.
    - **Backend (Express):**
      - Tạo một bản ghi đơn hàng trong cơ sở dữ liệu với trạng thái "pending" (chờ xử lý) hoặc tương tự.
      - Trả về ID của đơn hàng vừa tạo cho frontend.
    - **React Frontend:**
      - Nhận ID đơn hàng từ backend.
      - Sử dụng thư viện như `ethers.js` để tạo và gửi yêu cầu giao dịch ETH từ ví người dùng đến địa chỉ ví của bạn (ví nhận tiền). Giá trị ETH phải khớp với đơn hàng.
      - Metamask sẽ bật lên yêu cầu người dùng xác nhận giao dịch.
      - Nếu người dùng xác nhận, giao dịch được gửi lên mạng Sepolia.
      - Frontend chờ giao dịch được xác nhận trên blockchain và nhận được Transaction Hash (txHash).
      - **Gửi yêu cầu xác nhận thanh toán lên Express Server:** Gửi ID đơn hàng và txHash lên backend.
    - **Backend (Express):**
      - Nhận ID đơn hàng và txHash.
      - **Quan trọng: Xác thực giao dịch trên Blockchain:** Sử dụng một node provider (như Infura, Alchemy) và `ethers.js` (trên backend) để kiểm tra chi tiết của `txHash` trên mạng Sepolia:
        - Giao dịch có thành công không (`status: 1`)?
        - Người gửi (`from`) có đúng là địa chỉ ví người dùng đã cung cấp ban đầu không?
        - Người nhận (`to`) có đúng là địa chỉ ví của bạn không?
        - Số lượng ETH (`value`) có khớp với giá trị đơn hàng không?
      - Nếu tất cả thông tin khớp và hợp lệ:
        - Cập nhật trạng thái đơn hàng thành "completed" (hoàn thành) hoặc "paid" (đã thanh toán).
        - Lưu `txHash` vào bản ghi đơn hàng hoặc tạo bản ghi lịch sử thanh toán riêng biệt liên kết với đơn hàng.
      - Nếu không hợp lệ: Có thể cập nhật trạng thái đơn hàng thành "failed" (thất bại) hoặc giữ nguyên "pending" và ghi log lỗi.
    - **React Frontend:** Nhận phản hồi từ backend (thành công/thất bại) và hiển thị thông báo tương ứng cho người dùng.

**Triển khai chi tiết:**

**1. Cài đặt thư viện:**

```bash
# React Frontend
npm install ethers
# Hoặc
yarn add ethers

# Express Backend
npm install ethers express mongoose cors dotenv axios # (mongoose ví dụ cho DB, axios để gọi API nếu cần)
# Hoặc
yarn add ethers express mongoose cors dotenv axios
```

**2. React Frontend (Ví dụ sử dụng `ethers.js v6`):**

```jsx
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// Địa chỉ ví của bạn (nơi nhận ETH) - Nên lấy từ biến môi trường
const SELLER_WALLET_ADDRESS = "YOUR_SEPOLIA_WALLET_ADDRESS"; // Thay bằng địa chỉ ví Sepolia của bạn
const BACKEND_API_URL = "http://localhost:5000/api"; // URL của Express API

function PaymentButton({ orderDetails }) {
  // orderDetails = { productId: '123', amountEth: '0.01' }
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(""); // 'pending', 'success', 'failed'

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);
    } else {
      console.error("Metamask is not installed!");
      setError("Vui lòng cài đặt Metamask.");
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) return;
    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        const signerInstance = await provider.getSigner();
        setSigner(signerInstance);
        setError(null); // Clear previous errors
      }
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      setError("Kết nối ví thất bại. Vui lòng thử lại.");
      setAccount(null);
      setSigner(null);
    }
  };

  const handlePayment = async () => {
    if (!account || !signer || !orderDetails) {
      setError("Vui lòng kết nối ví và đảm bảo có thông tin đơn hàng.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPaymentStatus("pending");

    try {
      // --- Bước 1: Tạo đơn hàng trên Backend ---
      console.log("Creating order on backend...");
      const createOrderResponse = await fetch(`${BACKEND_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...orderDetails, // productId, etc.
          userAddress: account,
          amountEth: orderDetails.amountEth, // Gửi giá trị ETH dự kiến
        }),
      });

      if (!createOrderResponse.ok) {
        const errorData = await createOrderResponse.json();
        throw new Error(errorData.message || `Không thể tạo đơn hàng (status: ${createOrderResponse.status})`);
      }

      const { orderId } = await createOrderResponse.json();
      console.log("Order created with ID:", orderId);

      // --- Bước 2: Gửi giao dịch ETH bằng Metamask ---
      console.log(`Sending ${orderDetails.amountEth} ETH to ${SELLER_WALLET_ADDRESS}...`);
      const tx = {
        to: SELLER_WALLET_ADDRESS,
        value: ethers.parseEther(orderDetails.amountEth), // Chuyển đổi ETH sang Wei
      };

      const transactionResponse = await signer.sendTransaction(tx);
      console.log("Transaction sent:", transactionResponse.hash);

      // --- Bước 3: Chờ giao dịch được xác nhận ---
      console.log("Waiting for transaction confirmation...");
      // Chờ 1 xác nhận (bạn có thể tăng số này nếu cần độ chắc chắn cao hơn)
      const receipt = await transactionResponse.wait(1);
      console.log("Transaction confirmed:", receipt);

      if (!receipt || receipt.status !== 1) {
        // Cập nhật trạng thái thất bại lên backend (tùy chọn)
        await fetch(`${BACKEND_API_URL}/orders/${orderId}/fail`, { method: "POST" });
        throw new Error("Giao dịch thất bại trên blockchain.");
      }

      const txHash = receipt.hash;
      console.log("Transaction successful with hash:", txHash);

      // --- Bước 4: Gửi txHash lên Backend để xác thực ---
      console.log("Verifying payment on backend...");
      const verifyResponse = await fetch(`${BACKEND_API_URL}/orders/${orderId}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txHash: txHash }),
      });

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json();
        // Dù backend xác thực lỗi, giao dịch ETH đã thành công, cần xử lý cẩn thận
        console.error("Backend verification failed:", errorData.message);
        setError(`Thanh toán đã được gửi (${txHash}) nhưng xác thực phía server thất bại. Vui lòng liên hệ hỗ trợ.`);
        setPaymentStatus("failed_verification"); // Trạng thái đặc biệt
      } else {
        const successData = await verifyResponse.json();
        console.log("Payment verified successfully by backend:", successData);
        setPaymentStatus("success");
      }
    } catch (err) {
      console.error("Payment process failed:", err);
      setError(err.message || "Đã xảy ra lỗi trong quá trình thanh toán.");
      setPaymentStatus("failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {!account ? (
        <button onClick={connectWallet} disabled={!provider || isLoading}>
          {provider ? "Kết nối ví Metamask" : "Metamask chưa sẵn sàng"}
        </button>
      ) : (
        <div>
          <p>Đã kết nối với ví: {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}</p>
          <button onClick={handlePayment} disabled={isLoading || !signer}>
            {isLoading ? "Đang xử lý..." : `Thanh toán ${orderDetails.amountEth} ETH`}
          </button>
        </div>
      )}
      {isLoading && <p>Vui lòng xác nhận giao dịch trên Metamask và chờ xử lý...</p>}
      {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}
      {paymentStatus === "success" && <p style={{ color: "green" }}>Thanh toán thành công!</p>}
      {paymentStatus === "failed" && <p style={{ color: "red" }}>Thanh toán thất bại.</p>}
      {paymentStatus === "failed_verification" && <p style={{ color: "orange" }}>Cần hỗ trợ: Thanh toán đã gửi nhưng xác thực server lỗi.</p>}
    </div>
  );
}

export default PaymentButton;
```

**3. Express Backend (Ví dụ sử dụng `ethers.js`, `mongoose`):**

- **Cài đặt biến môi trường (`.env`):**

  ```
  MONGODB_URI=mongodb://localhost:27017/your_db_name
  PORT=5000
  SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID # Hoặc Alchemy URL
  SELLER_WALLET_ADDRESS=YOUR_SEPOLIA_WALLET_ADDRESS # Địa chỉ ví nhận tiền của bạn
  ```

- **Model (ví dụ: `models/Order.js`):**

  ```javascript
  const mongoose = require("mongoose");

  const orderSchema = new mongoose.Schema(
    {
      productId: { type: String, required: true },
      userAddress: { type: String, required: true, index: true },
      amountEth: { type: String, required: true }, // Lưu dưới dạng string để giữ độ chính xác
      amountWei: { type: String, required: true }, // Lưu giá trị Wei để so sánh chính xác
      status: {
        type: String,
        enum: ["pending", "paid", "failed", "verification_failed"], // Thêm các trạng thái cần thiết
        default: "pending",
        index: true,
      },
      txHash: { type: String, index: true, unique: true, sparse: true }, // txHash là duy nhất nếu tồn tại
      paidAt: { type: Date },
      // Thêm các trường khác nếu cần (số lượng, thông tin user...)
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Order", orderSchema);
  ```

  _Lưu ý:_ Có thể tạo thêm model `PaymentHistory` nếu muốn tách bạch.

- **Router (ví dụ: `routes/orderRoutes.js`):**

  ```javascript
  const express = require("express");
  const Order = require("../models/Order");
  const { verifySepoliaTransaction } = require("../utils/ethersUtils"); // Hàm xác thực sẽ tạo ở dưới
  const { ethers } = require("ethers"); // Import ethers

  const router = express.Router();

  // --- Endpoint tạo đơn hàng ---
  router.post("/", async (req, res) => {
    const { productId, userAddress, amountEth } = req.body;

    if (!productId || !userAddress || !amountEth) {
      return res.status(400).json({ message: "Thiếu thông tin đơn hàng." });
    }

    try {
      // Chuyển đổi sang Wei để lưu trữ và so sánh chính xác
      const amountWei = ethers.parseEther(amountEth).toString();

      const newOrder = new Order({
        productId,
        userAddress,
        amountEth,
        amountWei, // Lưu giá trị Wei
        status: "pending",
      });

      const savedOrder = await newOrder.save();
      console.log(`Order created: ${savedOrder._id} for user ${userAddress}`);
      res.status(201).json({ orderId: savedOrder._id });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Lỗi server khi tạo đơn hàng." });
    }
  });

  // --- Endpoint xác thực thanh toán ---
  router.post("/:orderId/verify", async (req, res) => {
    const { orderId } = req.params;
    const { txHash } = req.body;

    if (!txHash) {
      return res.status(400).json({ message: "Thiếu Transaction Hash (txHash)." });
    }

    try {
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
      }

      // Tránh xử lý lại đơn hàng đã thanh toán hoặc thất bại
      if (order.status === "paid") {
        return res.status(400).json({ message: "Đơn hàng này đã được thanh toán." });
      }
      if (order.status === "failed" || order.status === "verification_failed") {
        return res.status(400).json({ message: "Đơn hàng này đã bị đánh dấu thất bại trước đó." });
      }
      if (order.txHash) {
        return res.status(400).json({ message: "Đơn hàng này đang được xử lý hoặc đã có txHash." });
      }

      console.log(`Verifying tx: ${txHash} for order: ${orderId}`);

      // --- Gọi hàm xác thực giao dịch trên Sepolia ---
      const verificationResult = await verifySepoliaTransaction(
        txHash,
        order.userAddress, // Địa chỉ người gửi dự kiến
        process.env.SELLER_WALLET_ADDRESS, // Địa chỉ người nhận dự kiến (ví của bạn)
        order.amountWei // Số tiền Wei dự kiến
      );

      if (verificationResult.isValid) {
        // --- Cập nhật đơn hàng thành công ---
        order.status = "paid";
        order.txHash = txHash;
        order.paidAt = new Date();
        await order.save();
        console.log(`Order ${orderId} marked as paid. Tx: ${txHash}`);
        res.status(200).json({ message: "Thanh toán được xác thực thành công!", orderStatus: order.status });
      } else {
        // --- Giao dịch không hợp lệ ---
        console.warn(`Verification failed for order ${orderId}, tx ${txHash}: ${verificationResult.reason}`);
        // Cập nhật trạng thái thất bại để frontend biết và tránh thử lại
        order.status = "verification_failed";
        order.txHash = txHash; // Vẫn lưu txHash để điều tra
        await order.save();
        res.status(400).json({ message: `Xác thực thanh toán thất bại: ${verificationResult.reason}`, orderStatus: order.status });
      }
    } catch (error) {
      console.error(`Error verifying payment for order ${orderId}:`, error);
      // Cố gắng tìm và cập nhật trạng thái lỗi nếu có thể
      try {
        const order = await Order.findById(orderId);
        if (order && order.status === "pending") {
          order.status = "failed"; // Lỗi hệ thống chung
          await order.save();
        }
      } catch (updateError) {
        console.error("Error updating order status after verification error:", updateError);
      }
      res.status(500).json({ message: "Lỗi server khi xác thực thanh toán." });
    }
  });

  // (Tùy chọn) Endpoint để frontend báo cáo giao dịch bị hủy/thất bại sớm
  router.post("/:orderId/fail", async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { status: "failed" },
        { new: true, runValidators: true } // Chỉ cập nhật nếu trạng thái là hợp lệ
      );
      if (!order) {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
      }
      // Chỉ cập nhật nếu đang pending, tránh ghi đè 'paid'
      if (order.status !== "failed" && order.status !== "pending") {
        console.log(`Order ${orderId} not marked as failed because current status is ${order.status}`);
        return res.status(400).json({ message: `Không thể đánh dấu thất bại cho đơn hàng ở trạng thái ${order.status}` });
      }
      console.log(`Order ${orderId} marked as failed by frontend.`);
      res.status(200).json({ message: "Đã ghi nhận trạng thái thất bại." });
    } catch (error) {
      console.error("Error marking order as failed:", error);
      res.status(500).json({ message: "Lỗi server khi cập nhật trạng thái." });
    }
  });

  module.exports = router;
  ```

- **Hàm xác thực giao dịch (ví dụ: `utils/ethersUtils.js`):**

  ```javascript
  const { ethers } = require("ethers");
  require("dotenv").config(); // Đảm bảo biến môi trường được load

  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

  async function verifySepoliaTransaction(txHash, expectedFrom, expectedTo, expectedValueWei) {
    try {
      console.log(`Querying transaction receipt for: ${txHash}`);
      const receipt = await provider.getTransactionReceipt(txHash);

      if (!receipt) {
        console.warn(`Receipt not found for tx: ${txHash}. Still pending or invalid hash?`);
        return { isValid: false, reason: "Không tìm thấy giao dịch (có thể đang chờ hoặc sai hash)." };
      }

      console.log(`Receipt found for ${txHash}: Status ${receipt.status}, From ${receipt.from}, To ${receipt.to}`);

      // 1. Kiểm tra trạng thái giao dịch thành công
      if (receipt.status !== 1) {
        return { isValid: false, reason: "Giao dịch thất bại trên blockchain (status != 1)." };
      }

      // Case-insensitive comparison for addresses
      const isFromCorrect = receipt.from.toLowerCase() === expectedFrom.toLowerCase();
      const isToCorrect = receipt.to?.toLowerCase() === expectedTo.toLowerCase(); // Giao dịch tạo contract không có 'to'

      // 2. Kiểm tra địa chỉ người gửi
      if (!isFromCorrect) {
        return { isValid: false, reason: `Địa chỉ người gửi không khớp (thực tế: ${receipt.from}, dự kiến: ${expectedFrom}).` };
      }

      // 3. Kiểm tra địa chỉ người nhận
      if (!receipt.to || !isToCorrect) {
        return { isValid: false, reason: `Địa chỉ người nhận không khớp (thực tế: ${receipt.to}, dự kiến: ${expectedTo}).` };
      }

      // 4. Kiểm tra giá trị giao dịch (cần lấy chi tiết giao dịch, không chỉ receipt)
      console.log(`Querying transaction details for: ${txHash}`);
      const txDetails = await provider.getTransaction(txHash);
      if (!txDetails) {
        console.warn(`Transaction details not found for tx: ${txHash}.`);
        return { isValid: false, reason: "Không thể lấy chi tiết giao dịch để kiểm tra giá trị." };
      }

      console.log(`Transaction value: ${txDetails.value.toString()} Wei`);
      // So sánh BigInt hoặc string
      if (txDetails.value.toString() !== expectedValueWei.toString()) {
        return {
          isValid: false,
          reason: `Số tiền không khớp (thực tế: ${txDetails.value.toString()} Wei, dự kiến: ${expectedValueWei.toString()} Wei).`,
        };
      }

      // Nếu tất cả kiểm tra đều qua
      return { isValid: true, reason: "Giao dịch hợp lệ." };
    } catch (error) {
      console.error(`Error verifying transaction ${txHash}:`, error);
      return { isValid: false, reason: `Lỗi hệ thống khi xác thực: ${error.message}` };
    }
  }

  module.exports = { verifySepoliaTransaction };
  ```

- **Server chính (`server.js` hoặc `app.js`):**

  ```javascript
  require("dotenv").config();
  const express = require("express");
  const mongoose = require("mongoose");
  const cors = require("cors");
  const orderRoutes = require("./routes/orderRoutes");

  const app = express();
  const PORT = process.env.PORT || 5000;

  // Middleware
  app.use(cors()); // Cấu hình CORS cho phù hợp với môi trường thực tế
  app.use(express.json()); // Cho phép parse JSON body

  // Connect DB
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

  // Routes
  app.use("/api/orders", orderRoutes); // Gắn route cho orders

  // Basic root route
  app.get("/", (req, res) => {
    res.send("Payment Backend is running!");
  });

  // Error Handling Middleware (Thêm sau cùng)
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // Kiểm tra biến môi trường quan trọng
    if (!process.env.SEPOLIA_RPC_URL || !process.env.SELLER_WALLET_ADDRESS) {
      console.warn("CẢNH BÁO: SEPOLIA_RPC_URL hoặc SELLER_WALLET_ADDRESS chưa được đặt trong file .env!");
    }
  });
  ```

**4. Chạy ứng dụng:**

```bash
# Chạy Backend
cd your-express-app
npm start # Hoặc nodemon server.js

# Chạy Frontend
cd your-react-app
npm start # Hoặc yarn start
```

**Những điểm cần lưu ý và cải tiến:**

- **Bảo mật:**
  - **Không bao giờ tin tưởng dữ liệu từ Frontend:** Luôn xác thực giao dịch trên backend bằng cách truy vấn trực tiếp blockchain.
  - **Bảo vệ API Key:** Sử dụng biến môi trường (`.env`) cho RPC URL (Infura/Alchemy Key) và địa chỉ ví nhận tiền. Không commit file `.env` vào Git.
  - **Rate Limiting:** Áp dụng giới hạn yêu cầu cho các API endpoint để tránh bị tấn công DoS.
  - **Xử lý lỗi:** Xử lý tất cả các trường hợp lỗi (Metamask không cài đặt, người dùng từ chối giao dịch, giao dịch thất bại, lỗi mạng, lỗi server...).
- **Trải nghiệm người dùng (UX):**
  - Hiển thị trạng thái loading rõ ràng trong quá trình kết nối ví, tạo đơn hàng, chờ giao dịch và xác thực.
  - Cung cấp thông báo lỗi thân thiện.
  - Hiển thị txHash cho người dùng để họ có thể tự kiểm tra trên Etherscan (Sepolia).
  - Cân nhắc tự động kết nối lại ví nếu người dùng đã từng kết nối.
- **Quản lý trạng thái:** Sử dụng state management library (Redux, Zustand) trong React nếu ứng dụng phức tạp hơn.
- **Xử lý giá trị ETH:** Luôn sử dụng `ethers.parseEther` (hoặc `parseUnits`) để chuyển đổi sang Wei trước khi gửi giao dịch và `ethers.formatEther` để hiển thị lại cho người dùng. So sánh giá trị trên backend bằng Wei (dưới dạng `BigInt` hoặc `string`) để đảm bảo độ chính xác.
- **Node Provider:** Infura và Alchemy là lựa chọn phổ biến. Đăng ký tài khoản (thường có gói miễn phí) để lấy API key và RPC URL cho mạng Sepolia.
- **Cơ sở dữ liệu:** Ví dụ trên dùng Mongoose (MongoDB). Bạn có thể dùng bất kỳ DB nào khác (PostgreSQL với Sequelize,...)
- **Webhook (Nâng cao):** Thay vì để frontend chờ và gửi txHash, bạn có thể dùng dịch vụ theo dõi địa chỉ ví (như Alchemy Notify) để backend nhận được thông báo (webhook) ngay khi có giao dịch đến ví của bạn. Sau đó, backend có thể tự động tìm đơn hàng tương ứng (dựa trên giá trị hoặc ghi chú trong giao dịch nếu có) và xác thực. Cách này đáng tin cậy hơn.

Đây là một khung sườn hoàn chỉnh. Bạn cần điều chỉnh code cho phù hợp với cấu trúc dự án và yêu cầu cụ thể của mình. Hãy chắc chắn đã thay thế các placeholder như `YOUR_SEPOLIA_WALLET_ADDRESS` và `YOUR_INFURA_PROJECT_ID`. Luôn kiểm thử kỹ lưỡng trên mạng Sepolia trước khi triển khai lên mainnet!
