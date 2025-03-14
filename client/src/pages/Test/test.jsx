import { useEffect, useState } from "react";
import { fetchProvinces, fetchDistricts, fetchWards } from "../../APIs/adress";

export default function AddressSelect() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
  const [selectedDistrictCode, setSelectedDistrictCode] = useState("");
  const [selectedWardCode, setSelectedWardCode] = useState("");

  useEffect(() => {
    const getProvinces = async () => {
      const data = await fetchProvinces();
      setProvinces(data);
    };
    getProvinces();
  }, []);

  const handleProvinceChange = async (event) => {
    const provinceCode = event.target.value;
    setSelectedProvinceCode(provinceCode);
    setSelectedDistrictCode("");
    setSelectedWardCode("");
    setWards([]);

    const data = await fetchDistricts(provinceCode);
    setDistricts(data);
  };

  const handleDistrictChange = async (event) => {
    const districtCode = event.target.value;
    setSelectedDistrictCode(districtCode);
    setSelectedWardCode("");

    const data = await fetchWards(districtCode);
    setWards(data);
  };

  const handleWardChange = (event) => {
    setSelectedWardCode(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Dữ liệu gửi đi:", {
      province: selectedProvinceCode,
      district: selectedDistrictCode,
      ward: selectedWardCode,
    });
  };

  return (
    <div className="w-full space-y-4">
      <select
        className="w-full p-2 border rounded"
        onChange={handleProvinceChange}
      >
        <option value="">Chọn tỉnh/thành phố</option>
        {provinces.map((province) => (
          <option key={province.code} value={province.code}>
            {province.name}
          </option>
        ))}
      </select>

      <select
        className="w-full p-2 border rounded"
        onChange={handleDistrictChange}
        disabled={!selectedProvinceCode}
      >
        <option value="">Chọn quận/huyện</option>
        {districts.map((district) => (
          <option key={district.code} value={district.code}>
            {district.name}
          </option>
        ))}
      </select>

      <select
        className="w-full p-2 border rounded"
        onChange={handleWardChange}
        disabled={!selectedDistrictCode}
      >
        <option value="">Chọn phường/xã</option>
        {wards.map((ward) => (
          <option key={ward.code} value={ward.code}>
            {ward.name}
          </option>
        ))}
      </select>

      <button
        className="w-full p-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        Gửi
      </button>
    </div>
  );
}
